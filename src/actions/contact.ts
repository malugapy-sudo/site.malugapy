"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  whatsapp: z.string().min(8, "El número de WhatsApp no es válido"),
  interest: z.string().min(1, "Debes seleccionar un interés"),
});

export async function submitContactForm(prevState: { success: boolean; message: string }, formData: FormData) {
  try {
    // 1. Extraer los datos del FormData
    const rawData = {
      name: formData.get("name"),
      whatsapp: formData.get("whatsapp"),
      interest: formData.get("interest"),
    };

    // 2. Validar los datos
    const validatedData = contactSchema.parse(rawData);

    // 3. TODO: enviar a un CRM, base de datos o API externa
    void validatedData;

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
