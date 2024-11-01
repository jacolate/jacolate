import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const clientIP = event.getClientAddress();
  console.log(`Client IP: ${clientIP}`);
  event.locals.clientIP = clientIP;
  return resolve(event);
};

