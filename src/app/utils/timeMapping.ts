export const SESSION_START_TIMES: Record<
  'morning' | 'afternoon' | 'night',
  string
> = {
  morning: '01:55',
  afternoon: '16:00',
  night: '21:00',
};

// If you ever need end times, you could also export those:
export const SESSION_END_TIMES: Record<
  'morning' | 'afternoon' | 'night',
  string
> = {
  morning: '13:00',
  afternoon: '18:00',
  night: '23:00',
};
