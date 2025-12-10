/**
 * Validation utilities
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: string | undefined | null): boolean => {
  return value !== undefined && value !== null && value.trim() !== '';
};

export const validatePositiveNumber = (value: number | undefined): boolean => {
  return value !== undefined && value >= 0;
};

