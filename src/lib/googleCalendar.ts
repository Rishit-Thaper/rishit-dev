import { google } from 'googleapis';
import { insertLead } from './db';

const TIMEZONE = 'Asia/Kolkata';
const BUSINESS_HOURS = { start: 10, end: 18 }; // 10:00–18:00 IST
const SLOT_MINUTES = 30;

function getOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Google OAuth env vars are not set (GOOGLE_CLIENT_ID/SECRET/REFRESH_TOKEN)');
  }
  const client = new google.auth.OAuth2(clientId, clientSecret);
  client.setCredentials({ refresh_token: refreshToken });
  return client;
}

function getCalendarClient() {
  return google.calendar({ version: 'v3', auth: getOAuthClient() });
}

export async function checkAvailability(date: string): Promise<string[]> {
  const calendar = getCalendarClient();
  const timeMin = `${date}T00:00:00+05:30`;
  const timeMax = `${date}T23:59:59+05:30`;

  const { data } = await calendar.freebusy.query({
    requestBody: { timeMin, timeMax, timeZone: TIMEZONE, items: [{ id: 'primary' }] },
  });
  const busy = data.calendars?.primary?.busy ?? [];
  const now = new Date();

  const slots: string[] = [];
  for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour++) {
    for (let minute = 0; minute < 60; minute += SLOT_MINUTES) {
      const startISO = `${date}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00+05:30`;
      const start = new Date(startISO);
      const end = new Date(start.getTime() + SLOT_MINUTES * 60_000);
      if (start <= now) continue;

      const overlaps = busy.some((b) => {
        if (!b.start || !b.end) return false;
        return start < new Date(b.end) && end > new Date(b.start);
      });
      if (!overlaps) slots.push(startISO);
    }
  }
  return slots;
}

export async function createMeeting(params: {
  name: string;
  email: string;
  startISO: string;
  durationMinutes?: number;
  notes?: string;
}): Promise<{ eventLink: string | null; meetLink: string | null; start: string }> {
  const duration = Math.min(Math.max(params.durationMinutes ?? 30, 15), 60);
  const start = new Date(params.startISO);
  if (Number.isNaN(start.getTime()) || start.getTime() <= Date.now()) {
    throw new Error('Meeting start time must be a valid, future date/time');
  }
  const end = new Date(start.getTime() + duration * 60_000);

  const calendar = getCalendarClient();
  const { data } = await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    sendUpdates: 'all',
    requestBody: {
      summary: `Call with ${params.name} (via portfolio chatbot)`,
      description: params.notes ?? '',
      start: { dateTime: start.toISOString(), timeZone: TIMEZONE },
      end: { dateTime: end.toISOString(), timeZone: TIMEZONE },
      attendees: [{ email: params.email }, { email: process.env.RISHIT_EMAIL }],
      conferenceData: {
        createRequest: {
          requestId: crypto.randomUUID(),
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    },
  });

  await insertLead({
    name: params.name,
    email: params.email,
    purpose: params.notes ?? null,
    requestedTime: start.toISOString(),
    calendarEventId: data.id ?? null,
  });

  return {
    eventLink: data.htmlLink ?? null,
    meetLink: data.hangoutLink ?? null,
    start: start.toISOString(),
  };
}
