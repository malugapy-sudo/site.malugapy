export function SchemaMaluga() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "InternetServiceProvider",
    "name": "Maluga Telecom Sociedad Anonima",
    "alternateName": "Maluga",
    "url": "https://www.maluga.com.py",
    "logo": "https://www.maluga.com.py/LogoMaluga.png",
    "image": "https://www.maluga.com.py/banner-gamer-es.png",
    "description": "Más que solo internet, conectividad social. Proveedor de Internet fibra óptica en Paraguay. Planes Básico, Familiar y Gamer con máxima estabilidad y atención personalizada.",
    "taxID": "80165701-6",
    "vatID": "80165701-6",
    "telephone": "+595991554700",
    "priceRange": "Gs 99.000 - Gs 160.000",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PY"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Paraguay"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+595991554700",
      "contactType": "customer service",
      "availableLanguage": "es"
    },
    "sameAs": [
      "https://www.youtube.com/@MALUGA-PY",
      "https://www.instagram.com/malugapy/",
      "https://wa.me/595991554700"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
