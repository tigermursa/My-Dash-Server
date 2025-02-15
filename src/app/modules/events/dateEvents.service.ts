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
    // Parse the event date ignoring the provided year.
    const eventDateParsed = new Date(dateEventData.eventDate || '');
    if (isNaN(eventDateParsed.getTime())) {
      throw new Error('Invalid event date format');
    }

    // Get current date and normalize it (remove time-of-day)
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Extract the month and day from the parsed event date.
    const eventMonth = eventDateParsed.getMonth();
    const eventDay = eventDateParsed.getDate();

    // Create a date for this year's occurrence of the event.
    let upcomingEventDate = new Date(today.getFullYear(), eventMonth, eventDay);

    // If this year's event date has already passed, schedule for next year.
    if (upcomingEventDate < today) {
      upcomingEventDate = new Date(
        today.getFullYear() + 1,
        eventMonth,
        eventDay,
      );
    }

    // Calculate the difference in days.
    const diffTime = upcomingEventDate.getTime() - today.getTime();
    const dayLeft = Math.ceil(diffTime / (1000 * 3600 * 24));

    // Attach computed dayLeft to the data before saving.
    const dateEventWithDayLeft = { ...dateEventData, dayLeft };

    const newDateEvent = new DateEvent(dateEventWithDayLeft);
    return await newDateEvent.save();
  } catch (error) {
    throw new Error('Failed to create date event');
  }
};
