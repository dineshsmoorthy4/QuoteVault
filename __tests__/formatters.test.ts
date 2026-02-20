import {
  truncateText,
  formatQuoteForSharing,
  getInitials,
} from '@/utils/formatters';

describe('Formatters', () => {
  describe('truncateText', () => {
    it('should truncate text with ellipsis', () => {
      const text = 'This is a long text that should be truncated';
      const result = truncateText(text, 20);
      expect(result).toContain('...');
      expect(result.length).toBeLessThan(text.length);
    });

    it('should not truncate short text', () => {
      const text = 'Short';
      expect(truncateText(text, 20)).toBe(text);
    });
  });

  describe('formatQuoteForSharing', () => {
    it('should format quote correctly', () => {
      const content = 'Be yourself';
      const author = 'Oscar Wilde';
      const result = formatQuoteForSharing(content, author);
      expect(result).toContain(content);
      expect(result).toContain(author);
      expect(result).toContain('—');
    });
  });

  describe('getInitials', () => {
    it('should extract initials from name', () => {
      expect(getInitials('John Doe')).toBe('JD');
      expect(getInitials('Alice')).toBe('AL');
      expect(getInitials('John Doe Smith')).toBe('JD');
    });
  });
});
