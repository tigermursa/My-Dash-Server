export interface TimeSlot {
  label?: string; // e.g., "Afternoon", "Night"
  startTime?: string; // e.g., "15:00" or "3:00 PM"
  endTime?: string; // e.g., "16:30" or "4:30 PM"
}

export interface IDutySchedule {
  date: string; // date string in ISO format ("YYYY-MM-DD")
  day: string; // day of the week, e.g., "Sunday", "Monday", etc.
  session1?: 'morning' | 'afternoon' | 'night'; // first session details
  session2?: 'morning' | 'afternoon' | 'night' | 'none';
  groupMonitoring?: TimeSlot; // group monitoring session details
}
