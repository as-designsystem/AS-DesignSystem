const COOKIE_NAME = 'site-auth';
const SALT = 'as-design-system-auth';

async function createToken(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getPasswordPage(error = false) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AS Design System — Accès protégé</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0a0a;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .container {
      background: #141414;
      border: 1px solid #262626;
      border-radius: 12px;
      padding: 40px;
      width: 100%;
      max-width: 400px;
    }
    h1 { font-size: 20px; margin-bottom: 8px; }
    p { font-size: 14px; color: #888; margin-bottom: 24px; }
    .error { color: #ef4444; font-size: 13px; margin-bottom: 16px; }
    input {
      width: 100%;
      padding: 10px 14px;
      background: #0a0a0a;
      border: 1px solid #333;
      border-radius: 8px;
      color: #fff;
      font-size: 14px;
      outline: none;
      margin-bottom: 16px;
    }
    input:focus { border-color: #555; }
    button {
      width: 100%;
      padding: 10px;
      background: #fff;
      color: #000;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }
    button:hover { background: #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Accès protégé</h1>
    <p>Entrez le mot de passe pour accéder à la documentation.</p>
    ${error ? '<div class="error">Mot de passe incorrect.</div>' : ''}
    <form method="POST" action="/api/login">
      <input type="password" name="password" placeholder="Mot de passe" autofocus required />
      <button type="submit">Accéder</button>
    </form>
  </div>
</body>
</html>`;
}

export default async function middleware(request) {
  const url = new URL(request.url);

  if (url.pathname.startsWith('/api')) {
    return;
  }

  const sitePassword = process.env.SITE_PASSWORD;
  if (!sitePassword) {
    return;
  }

  const cookies = request.headers.get('cookie') || '';
  const match = cookies.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));

  if (match) {
    const expectedToken = await createToken(sitePassword);
    if (match[1] === expectedToken) {
      return;
    }
  }

  const error = url.searchParams.get('error') === '1';

  return new Response(getPasswordPage(error), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export const config = {
  matcher: ['/((?!api).*)'],
};
