import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const clientIP = event.getClientAddress();
  event.locals.clientIP = clientIP;
  return resolve(event);
};

