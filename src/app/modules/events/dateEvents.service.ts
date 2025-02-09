import { IDateEvent } from './dateEvents.interface';
import DateEvent from './dateEvents.model';

export const createDateEvent = async (
  dateEventData: IDateEvent,
): Promise<IDateEvent> => {
  try {
    const newDateEvent = new DateEvent(dateEventData);
    return await newDateEvent.save();
  } catch (error) {
    throw new Error('Failed to create date event');
  }
};

export const getAllDateEvents = async (
  userId: string,
): Promise<IDateEvent[]> => {
  try {
    return await DateEvent.find({ userId }).exec();
  } catch (error) {
    throw new Error('Failed to fetch date events');
  }
};

export const updateDateEvent = async (
  userId: string,
  dateEventId: string,
  updateData: Partial<IDateEvent>,
): Promise<IDateEvent | null> => {
  try {
    return await DateEvent.findOneAndUpdate(
      { _id: dateEventId, userId },
      updateData,
      { new: true },
    ).exec();
  } catch (error) {
    throw new Error('Failed to update date event');
  }
};

export const deleteDateEvent = async (
  userId: string,
  dateEventId: string,
): Promise<IDateEvent | null> => {
  try {
    return await DateEvent.findOneAndDelete({
      _id: dateEventId,
      userId,
    }).exec();
  } catch (error) {
    throw new Error('Failed to delete date event');
  }
};
