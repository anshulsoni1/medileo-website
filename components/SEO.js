import Head from 'next/head';

export default function SEO({ 
  title = "Medileo Healthcare | Premium Pharmaceutical Manufacturing",
  description = "Medileo Healthcare is a dynamic pharmaceutical company dedicated to high-quality, affordable, and innovative healthcare solutions.",
  canonicalUrl = "https://www.medileo.com",
  ogType = "website",
  structuredData = null
}) {
  const encodedTitle = encodeURIComponent(title);
  const ogImage = `${canonicalUrl}/api/og?title=${encodedTitle}`;
  return (
    <Head>
      {/* Basic Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph (Facebook/LinkedIn) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Medileo Healthcare" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Robots index/follow */}
      <meta name="robots" content="index, follow" />

      {/* JSON-LD Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
}
