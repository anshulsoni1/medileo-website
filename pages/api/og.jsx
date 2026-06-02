import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const { searchParams, host, protocol } = new URL(req.url);

    // Dynamic params
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Medileo Healthcare | Premium Pharmaceutical Manufacturing';

    // Construct the absolute URL for the logo
    // Using x-forwarded-host if available, fallback to host
    const actualHost = req.headers.get('x-forwarded-host') || host;
    const actualProtocol = req.headers.get('x-forwarded-proto') || protocol.replace(':', '');
    const logoUrl = `${actualProtocol}://${actualHost}/logo.png`;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#021120', // Brand Dark Blue
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '80px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Top border accent */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '12px',
              background: 'linear-gradient(90deg, #14b8a6, #0f766e)',
            }}
          />

          {/* Logo Container */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              padding: '24px 40px',
              borderRadius: '20px',
              marginBottom: '60px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}
          >
            {/* Using raw img tag is required in @vercel/og */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={logoUrl} 
              alt="Medileo Logo" 
              style={{ height: '70px', objectFit: 'contain' }} 
            />
          </div>

          {/* Title Area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxWidth: '900px',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.1,
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '32px',
                color: '#94a3b8',
                margin: 0,
                fontWeight: 400,
              }}
            >
              WHO-GMP Certified Pharmaceutical Excellence
            </p>
          </div>

          {/* Bottom decorative element */}
          <div
            style={{
              position: 'absolute',
              bottom: '80px',
              right: '80px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#14b8a6' }} />
            <span style={{ color: '#14b8a6', fontSize: '24px', fontWeight: 600, letterSpacing: '0.1em' }}>MEDILEOHEALTHCARE.COM</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e.message);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
