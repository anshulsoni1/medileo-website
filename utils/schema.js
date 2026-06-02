const BASE_URL = "https://www.medileohealthcare.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Medileo Healthcare",
  "url": BASE_URL,
  "logo": `${BASE_URL}/logo.png`,
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "medileohealthcare@gmail.com",
    "contactType": "Customer Service"
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Medileo Healthcare Pvt. Ltd.",
  "image": `${BASE_URL}/logo.png`,
  "url": BASE_URL,
  "email": "medileohealthcare@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Build TR(A), 2nd Floor, Mhada Colony",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400075",
    "addressCountry": "IN"
  }
};

export const getIndexSchema = () => {
  return [
    organizationSchema,
    localBusinessSchema,
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Medileo Healthcare",
      "url": BASE_URL
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What therapeutic areas does Medileo serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Medileo Healthcare focuses on advanced pharmaceutical formulations across Cardiology, Hypertension, Diabetology, Neuro-Psychiatry, Gastroenterology, and Cellular Nutrition."
          }
        },
        {
          "@type": "Question",
          "name": "Is Medileo WHO-GMP certified?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we partner exclusively with WHO-GMP certified manufacturing facilities to ensure all therapeutic formulations meet rigorous international quality, purity, and safety standards."
          }
        },
        {
          "@type": "Question",
          "name": "How can I contact Medileo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can reach our corporate team via the Contact page for business partnerships, contract manufacturing inquiries, and product information."
          }
        }
      ]
    }
  ];
};

export const getAboutSchema = () => {
  return [
    organizationSchema,
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Medileo Healthcare",
      "description": "Learn about Medileo Healthcare's mission, vision, and commitment to delivering high-quality, accessible, and innovative pharmaceutical solutions.",
      "url": `${BASE_URL}/about`
    },
    getBreadcrumbSchema([
      { name: "Home", item: BASE_URL },
      { name: "About Us", item: `${BASE_URL}/about` }
    ])
  ];
};

export const getContactSchema = () => {
  return [
    localBusinessSchema,
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Medileo Healthcare",
      "description": "Get in touch with Medileo Healthcare for global pharmaceutical partnerships, product inquiries, and corporate communications.",
      "url": `${BASE_URL}/contact`
    },
    getBreadcrumbSchema([
      { name: "Home", item: BASE_URL },
      { name: "Contact Us", item: `${BASE_URL}/contact` }
    ])
  ];
};

export const getBreadcrumbSchema = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.item
    }))
  };
};
