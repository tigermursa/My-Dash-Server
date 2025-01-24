import { Error } from 'mongoose';
import { ServiceResponse } from '../types/plan';

export const handleServiceError = (error: unknown): ServiceResponse<never> => {
  console.error('Service Error:', error);

  if (error instanceof Error.ValidationError) {
    const errorMessages = Object.values(error.errors).map((err) => err.message);
    return {
      success: false,
      error: `Validation error: ${errorMessages.join(', ')}`,
    };
  }

  if (error instanceof Error.CastError) {
    return { success: false, error: 'Invalid ID format' };
  }

  if (error instanceof Error) {
    return { success: false, error: 'Database operation failed' };
  }

  return { success: false, error: 'Internal server error' };
};

export const determineStatusCode = (error: string): number => {
  const statusCodes: Record<string, number> = {
    'User not found': 404,
    'Invalid ID format': 400,
    'Validation error': 400,
    'Task not found': 404,
  };
  return statusCodes[error] || 500;
};
