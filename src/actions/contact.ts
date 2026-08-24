"use server";

import { z } from "zod";
import { headers } from "next/headers";

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

    // 3. Construir URL a partir dos headers da requisição
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = headersList.get("x-forwarded-proto") || "http";
    const baseUrl = `${protocol}://${host}`;

    // 4. Enviar para a API de email como lead
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
      console.error("API /api/contact returned:", res.status, await res.text());
      return {
        success: false,
        message: "Error al enviar el mensaje. Por favor, intenta de nuevo.",
      };
    }

    // 5. Retornar éxito
    return {
      success: true,
      message: "¡Mensaje enviado con éxito! Nuestro equipo te contactará en breve.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues[0].message,
      };
    }

    console.error("Error in submitContactForm:", error);
    return {
      success: false,
      message: "Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo.",
    };
  }
}

