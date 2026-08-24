import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("[API /api/contact] Payload recebido:", JSON.stringify(body))

    const {
      name,
      email,
      phone,
      company,
      cpf,
      service,
      type,
      carteira,
      lang,
    } = body

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    })

    const recipients: string[] = ["maluga.py@gmail.com"]

    const htmlContent = `
      <h2>Novo lead recebido</h2>

      ${type ? `<p><strong>Tipo:</strong> ${type}</p>` : ""}
      ${lang ? `<p><strong>Idioma:</strong> ${lang}</p>` : ""}

      ${name ? `<p><strong>Nome:</strong> ${name}</p>` : ""}
      ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
      ${phone ? `<p><strong>Telefone:</strong> ${phone}</p>` : ""}
      ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ""}

      ${service ? `<p><strong>Serviço:</strong> ${service}</p>` : ""}

      ${cpf ? `<p><strong>Documento:</strong> ${cpf}</p>` : ""}
      ${carteira ? `<p><strong>Carteira:</strong> ${carteira}</p>` : ""}

      <hr/>
      <p style="font-size:12px;color:gray;">
        Este e-mail pode conter dados vindos do formulário ou do chatbot.
      </p>
    `

    await transporter.sendMail({
      from: `"Site Maluga SA" <${process.env.EMAIL_USER}>`,
      to: recipients,
      subject: `Novo Lead | ${type || "site"} | ${name || "N/A"} | ${new Date().toLocaleString("es-PY", {
        timeZone: "America/Asuncion",
      })}`,
      html: htmlContent,
    })

    console.log("[API /api/contact] Email enviado com sucesso para:", recipients)

    return Response.json({ success: true })
  } catch (error) {
    console.error("[API /api/contact] ERRO ao enviar email:", error)
    return Response.json({ success: false, error: String(error) }, { status: 500 })
  }
}