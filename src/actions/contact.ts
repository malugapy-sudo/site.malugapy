"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  whatsapp: z.string().min(8, "El número de WhatsApp no es válido"),
  interest: z.string().min(1, "Debes seleccionar un interés"),
});

export async function submitContactForm(prevState: { success: boolean; message: string }, formData: FormData) {
  try {
    // 1. Extrair os dados do FormData
    const rawData = {
      name: formData.get("name"),
      whatsapp: formData.get("whatsapp"),
      interest: formData.get("interest"),
    };

    // 2. Validar os dados
    const validatedData = contactSchema.parse(rawData);

    // 3. Enviar email diretamente via nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = `
      <h2>Novo lead recebido</h2>
      <p><strong>Tipo:</strong> Formulário do Site</p>
      <p><strong>Nome:</strong> ${validatedData.name}</p>
      <p><strong>WhatsApp:</strong> ${validatedData.whatsapp}</p>
      <p><strong>Interesse:</strong> ${validatedData.interest}</p>
      <hr/>
      <p style="font-size:12px;color:gray;">
        Este e-mail foi enviado pelo formulário de contato do site.
      </p>
    `;

    await transporter.sendMail({
      from: `"Site Maluga SA" <${process.env.EMAIL_USER}>`,
      to: ["maluga.py@gmail.com"],
      subject: `Novo Lead | Formulário | ${validatedData.name} | ${new Date().toLocaleString("es-PY", {
        timeZone: "America/Asuncion",
      })}`,
      html: htmlContent,
    });

    // 4. Retornar éxito
    return {
      success: true,
      message: "¡Mensaje enviado con éxito! Nuestro equipo te contactará en breve.",
    };
  } catch (error) {
    // Manejo de errores de validación de Zod u otros
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues[0].message,
      };
    }

    console.error("Error sending contact form email:", error);
    return {
      success: false,
      message: "Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo.",
    };
  }
}
