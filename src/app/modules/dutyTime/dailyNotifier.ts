import schedule from 'node-schedule';
import DutySchedule from './dutyTime.model'; // Adjust the path as needed

// Hardcoded job time: 7:02 AM, March 18, 2025
// Note: Months are 0-indexed in JavaScript Date (0 = January, so 2 = March)
const jobTime = new Date(2025, 2, 18, 7, 2, 0);

const job = schedule.scheduleJob(jobTime, async function () {
  try {
    // Format the date to match the stored format (e.g., "18 march 2025")
    const day = jobTime.getDate();
    const month = jobTime
      .toLocaleString('default', { month: 'long' })
      .toLowerCase();
    const year = jobTime.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    // Fetch all duty schedules for the given date
    const duties = await DutySchedule.find({ date: formattedDate });
    console.log(`Duty Schedules for ${formattedDate}:`, duties);
  } catch (error) {
    console.error('Error fetching duty schedules:', error);
  }
});

console.log(`Job scheduled for ${jobTime} to fetch today's duty schedules.`);
