import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {

    let weather = '';
    try {
        const response = await fetch('https://wttr.in/Bamberg?format=%c+%t');
        weather = await response.text();
    } catch (error) {
        console.error('Error fetching weather:', error);
        weather = 'Weather unavailable';
    }
  return {
    clientIP: locals.clientIP,
    weather
  };
};
