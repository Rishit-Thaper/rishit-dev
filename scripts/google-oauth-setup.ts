// One-time script: mints a Google OAuth refresh token for your own Google account
// so the portfolio bot can create real Calendar events (with Meet links + attendee
// invites) on your behalf. Run once with: npm run oauth-setup
//
// Prerequisites (Google Cloud Console, free):
//   1. Create a project, enable the "Google Calendar API".
//   2. OAuth consent screen: type "External", publishing status "Testing",
//      add your own Google account under "Test users".
//   3. Credentials -> Create OAuth client ID -> type "Desktop app".
//      Copy the Client ID / Client Secret into .env.local as
//      GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET.

import http from 'node:http';
import { google } from 'googleapis';

const PORT = 53682;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error('Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local first.');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: ['https://www.googleapis.com/auth/calendar'],
});

console.log('\nOpen this URL in your browser and sign in with your own Google account:\n');
console.log(authUrl);
console.log('\nWaiting for you to approve access...\n');

const server = http.createServer(async (req, res) => {
  if (!req.url?.startsWith('/oauth2callback')) {
    res.writeHead(404);
    res.end();
    return;
  }
  const url = new URL(req.url, REDIRECT_URI);
  const code = url.searchParams.get('code');

  if (!code) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Missing ?code in callback');
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Success — you can close this tab and go back to the terminal.');

    console.log('Add this to .env.local (and to your Vercel project env vars):\n');
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log(
      '\nIf refresh_token is missing above, revoke prior access at ' +
        'https://myaccount.google.com/permissions and rerun this script.',
    );
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Token exchange failed — check the terminal.');
    console.error(err);
  } finally {
    server.close();
    process.exit(0);
  }
});

server.listen(PORT);
