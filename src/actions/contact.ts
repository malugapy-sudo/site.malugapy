"use server";

import { z } from "zod";

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

    // 3. Enviar para a API de email como lead
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: validatedData.name,
        phone: validatedData.whatsapp,
        service: validatedData.interest,
        type: "formulario",
      }),
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Error al enviar el mensaje. Por favor, intenta de nuevo.",
      };
    }

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

    return {
      success: false,
      message: "Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo.",
    };
  }
}

