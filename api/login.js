import { createHash } from 'crypto';

const SALT = 'as-design-system-auth';

/**
 * Only allow same-origin, relative paths to avoid open redirects.
 */
function safeRedirect(target) {
  if (typeof target !== 'string' || !target.startsWith('/')) return '/';
  // Reject protocol-relative ("//evil.com") and backslash tricks ("/\evil.com")
  if (target.startsWith('//') || target.startsWith('/\\')) return '/';
  return target;
}

function withError(target) {
  return target + (target.includes('?') ? '&' : '?') + 'error=1';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { password, redirect } = req.body || {};
  const sitePassword = process.env.SITE_PASSWORD;
  const target = safeRedirect(redirect);

  if (!sitePassword || password !== sitePassword) {
    return res.redirect(302, withError(target));
  }

  const token = createHash('sha256')
    .update(sitePassword + SALT)
    .digest('hex');

  res.setHeader(
    'Set-Cookie',
    `site-auth=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${60 * 60 * 24 * 30}`
  );
  res.redirect(302, target);
}
