import { createHash } from 'crypto';

const SALT = 'as-design-system-auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { password } = req.body || {};
  const sitePassword = process.env.SITE_PASSWORD;

  if (!sitePassword || password !== sitePassword) {
    return res.redirect(302, '/?error=1');
  }

  const token = createHash('sha256')
    .update(sitePassword + SALT)
    .digest('hex');

  res.setHeader(
    'Set-Cookie',
    `site-auth=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${60 * 60 * 24 * 30}`
  );
  res.redirect(302, '/');
}
