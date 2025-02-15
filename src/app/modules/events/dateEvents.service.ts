import { IDateEvent } from './dateEvents.interface';
import DateEvent from './dateEvents.model';

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

export const createDateEvent = async (
  dateEventData: Partial<IDateEvent>, // using Partial since dayLeft will be computed
): Promise<IDateEvent> => {
  try {
    const eventDateObj = new Date(dateEventData.eventDate || '');
    if (isNaN(eventDateObj.getTime())) {
      throw new Error('Invalid event date format');
    }

    const now = new Date();
    // Calculate difference in milliseconds and convert to days.
    const diffTime = eventDateObj.getTime() - now.getTime();
    const dayLeft = Math.ceil(diffTime / (1000 * 3600 * 24));

    // Attach computed dayLeft to the data before saving.
    const dateEventWithDayLeft = { ...dateEventData, dayLeft };

    const newDateEvent = new DateEvent(dateEventWithDayLeft);
    return await newDateEvent.save();
  } catch (error) {
    throw new Error('Failed to create date event');
  }
};
