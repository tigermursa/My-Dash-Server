import NotepadModel from './notepad.model';

export const getContentNotePad = async (userId: string) => {
  try {
    return await NotepadModel.findOne({ userId })
      .select('contentNotePad')
      .lean();
  } catch (error) {
    throw new Error('Error fetching contentNotePad');
  }
};

export const getContentIdea = async (userId: string) => {
  try {
    return await NotepadModel.findOne({ userId }).select('contentIdea').lean();
  } catch (error) {
    throw new Error('Error fetching contentIdea');
  }
};

export const updateContentNotePad = async (
  userId: string,
  contentNotePad: string,
) => {
  try {
    return await NotepadModel.findOneAndUpdate(
      { userId },
      { contentNotePad },
      { new: true },
    );
  } catch (error) {
    throw new Error('Error updating contentNotePad');
  }
};

export const updateContentIdea = async (
  userId: string,
  contentIdea: string,
) => {
  try {
    return await NotepadModel.findOneAndUpdate(
      { userId },
      { contentIdea },
      { new: true },
    );
  } catch (error) {
    throw new Error('Error updating contentIdea');
  }
};

export const clearContentNotePad = async (userId: string) => {
  try {
    return await NotepadModel.findOneAndUpdate(
      { userId },
      { contentNotePad: '' },
      { new: true },
    );
  } catch (error) {
    throw new Error('Error clearing contentNotePad');
  }
};

export const clearContentIdea = async (userId: string) => {
  try {
    return await NotepadModel.findOneAndUpdate(
      { userId },
      { contentIdea: '' },
      { new: true },
    );
  } catch (error) {
    throw new Error('Error clearing contentIdea');
  }
};
