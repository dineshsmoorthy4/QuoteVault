import * as authService from '@/services/authService';
import { validateEmail, validatePassword } from '@/utils/validators';

describe('Auth Service', () => {
  describe('validateEmail', () => {
    it('should validate correct email format', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('invalid.email')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should validate password length', () => {
      expect(validatePassword('short')).toBe(false);
      expect(validatePassword('validpassword123')).toBe(true);
      expect(validatePassword('12345678')).toBe(true);
    });
  });
});
