import { IDutySchedule } from './dutyTime.interface';
import DutySchedule from './dutyTime.model';

export const createDutyScheduleService = async (
  data: Partial<IDutySchedule>,
): Promise<IDutySchedule> => {
  return await DutySchedule.create(data);
};

export const getAllDutySchedulesService = async (): Promise<
  IDutySchedule[]
> => {
  return await DutySchedule.find();
};

export const updateDutyScheduleService = async (
  id: string,
  data: Partial<IDutySchedule>,
): Promise<IDutySchedule | null> => {
  return await DutySchedule.findByIdAndUpdate(id, data, { new: true });
};
