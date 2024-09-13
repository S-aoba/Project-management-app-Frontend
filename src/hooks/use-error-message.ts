import { ERROR_MESSAGE } from '@/features/auth/const/error-message'

export const useErrorMessage = () => {
  const conversionErrorMessage = (message: string) => {
    switch (message) {
      case 'These credentials do not match our records.':
        return ERROR_MESSAGE.VALIDATION_ERROR

      default:
        return ERROR_MESSAGE.OTHER_ERRORS
    }
  }

  return { conversionErrorMessage }
}
