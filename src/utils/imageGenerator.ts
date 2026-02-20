import { Quote, QuoteCard } from './../types';
import { COLORS } from '../constants/theme';
import { GRADIENT_COLORS } from '../constants/colors';

export const generateQuoteCardImage = async (
  quote: Quote,
  template: QuoteCard['template'],
  theme: 'light' | 'dark'
): Promise<string> => {
  const width = 1080;
  const height = 1920;
  const colors = theme === 'light' ? COLORS.light : COLORS.dark;

  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;

  switch (template) {
    case 'minimal':
      svg += `<rect width="${width}" height="${height}" fill="${colors.background}"/>`;
      svg += `<text x="540" y="960" font-size="60" fill="${colors.text}" text-anchor="middle" font-weight="bold">"${quote.content}"</text>`;
      svg += `<text x="540" y="1100" font-size="40" fill="${colors.textSecondary}" text-anchor="middle">— ${quote.author}</text>`;
      break;

    case 'gradient':
      const gradientId = 'grad1';
      const gradientColors = GRADIENT_COLORS.indigoViolet;
      svg += `<defs><linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">`;
      svg += `<stop offset="0%" style="stop-color:${gradientColors[0]};stop-opacity:1" />`;
      svg += `<stop offset="100%" style="stop-color:${gradientColors[1]};stop-opacity:1" />`;
      svg += `</linearGradient></defs>`;
      svg += `<rect width="${width}" height="${height}" fill="url(#${gradientId})"/>`;
      svg += `<text x="540" y="960" font-size="60" fill="white" text-anchor="middle" font-weight="bold">"${quote.content}"</text>`;
      svg += `<text x="540" y="1100" font-size="40" fill="rgba(255,255,255,0.9)" text-anchor="middle">— ${quote.author}</text>`;
      break;

    case 'elegant':
      svg += `<rect width="${width}" height="${height}" fill="${colors.background}"/>`;
      svg += `<circle cx="540" cy="400" r="200" fill="${colors.surface}"/>`;
      svg += `<text x="540" y="500" font-size="80" fill="${colors.primary}" text-anchor="middle">"</text>`;
      svg += `<text x="540" y="960" font-size="56" fill="${colors.text}" text-anchor="middle" font-weight="600">${quote.content}</text>`;
      svg += `<line x1="340" y1="1050" x2="740" y2="1050" stroke="${colors.primary}" stroke-width="3"/>`;
      svg += `<text x="540" y="1150" font-size="40" fill="${colors.textSecondary}" text-anchor="middle">— ${quote.author}</text>`;
      break;

    case 'modern':
      svg += `<rect width="${width}" height="${height}" fill="${colors.surface}"/>`;
      svg += `<rect x="0" y="0" width="${width}" height="600" fill="${colors.primary}"/>`;
      svg += `<text x="540" y="200" font-size="60" fill="white" text-anchor="middle" font-weight="bold">${quote.author}</text>`;
      svg += `<text x="540" y="900" font-size="54" fill="${colors.text}" text-anchor="middle" font-weight="600">"${quote.content}"</text>`;
      svg += `<rect x="100" y="1600" width="880" height="200" fill="${colors.primary}" opacity="0.1" rx="16"/>`;
      break;
  }

  svg += '</svg>';

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};
