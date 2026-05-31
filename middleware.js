import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Update request cookies (so subsequent logic in middleware sees it)
            request.cookies.set(name, value);
            // Update response cookies (so browser saves it)
            supabaseResponse.cookies.set({ name, value, ...options });
          });
        },
      },
    }
  );

  // Retrieve the user from Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();

  // If unauthenticated and NOT on the login page -> Redirect to login
  if (!user && url.pathname !== '/admin/login') {
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  // If authenticated and trying to access login page -> Redirect to dashboard
  if (user && url.pathname === '/admin/login') {
    url.pathname = '/admin/dashboard';
    return NextResponse.redirect(url);
  }

  // Auto redirect base /admin to /admin/dashboard
  if (user && url.pathname === '/admin') {
    url.pathname = '/admin/dashboard';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/admin/:path*'],
};
