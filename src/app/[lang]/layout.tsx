import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Nunito } from "next/font/google";
import "../globals.css";
import { Providers } from "@/components/layout/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";
import { WhatsAppConfirmProvider } from "@/components/ui/whatsapp-confirm";
import { BottomNav } from "@/components/pwa/bottom-nav";
import { InstallPrompt } from "@/components/pwa/install-prompt";
import { ServiceWorkerRegistrar } from "@/components/pwa/sw-registrar";
import { i18n, type Locale } from "@/middleware";
import { getDictionary } from "@/dictionaries";

const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#001f52",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  return {
    title: { default: dict.metadata.title, template: '%s | Maluga Telecom' },
    description: dict.metadata.description,
    manifest: '/manifest.json',
    other: { google: 'notranslate' },
    appleWebApp: {
      capable: false,
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout(props: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} translate="no" data-scroll-behavior="smooth" className={`${nunito.variable} h-full antialiased scroll-smooth`}>
      <head>
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xitfnerghi");`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <WhatsAppConfirmProvider lang={lang}>
            <ServiceWorkerRegistrar />
            <Header lang={lang} dict={dictionary} />
            <main className="flex-1 pb-safe">{props.children}</main>
            <Footer dict={dictionary} />
            <BottomNav lang={lang} dict={dictionary} />
            <InstallPrompt />
            <FloatingWhatsApp lang={lang} />
          </WhatsAppConfirmProvider>
        </Providers>
      </body>
    </html>
  );
}
