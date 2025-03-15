import { WeeklyScheduleModel } from './dutyTime.model';
import { IWeeklySchedule } from './dutyTime.interface';

export class WeeklyScheduleService {
  static async createWeeklySchedule(
    data: IWeeklySchedule,
  ): Promise<IWeeklySchedule> {
    return await WeeklyScheduleModel.create(data);
  }

  static async getAllWeeklySchedules(): Promise<IWeeklySchedule[]> {
    return await WeeklyScheduleModel.find();
  }

  static async getDaySchedule(day: string) {
    const schedule = await WeeklyScheduleModel.findOne();
    if (!schedule) throw new Error('Weekly schedule not found.');
    const daySchedule = schedule.days.find(
      (d) => d.day.toLowerCase() === day.toLowerCase(),
    );
    if (!daySchedule) throw new Error(`Day schedule for ${day} not found.`);
    return daySchedule;
  }

  static async updateDaySchedule(
    day: string,
    updateData: Partial<IWeeklySchedule['days'][0]>,
  ) {
    const schedule = await WeeklyScheduleModel.findOne();
    if (!schedule) throw new Error('Weekly schedule not found.');
    const dayIndex = schedule.days.findIndex(
      (d) => d.day.toLowerCase() === day.toLowerCase(),
    );
    if (dayIndex === -1) throw new Error(`Day schedule for ${day} not found.`);
    schedule.days[dayIndex] = {
      ...schedule.days[dayIndex].toObject(),
      ...updateData,
    };
    await schedule.save();
    return schedule.days[dayIndex];
  }
}
