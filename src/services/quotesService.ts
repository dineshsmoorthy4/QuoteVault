import { Quote, QuoteCategory, ApiResponse } from '../types';
import { supabase } from './supabaseClient';
import { PAGE_SIZE } from '../constants/theme';

export const fetchQuotes = async (
  page: number = 1,
  category?: QuoteCategory | 'All',
  search?: string
): Promise<{ quotes: Quote[]; hasMore: boolean }> => {
  try {
    const offset = (page - 1) * PAGE_SIZE;
    let query = supabase.from('quotes').select('*');

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(
        `content.ilike.%${search}%,author.ilike.%${search}%`
      );
    }

    const { data, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    if (error) throw error;

    const quotes = (data || []) as Quote[];
    const hasMore = quotes.length === PAGE_SIZE;

    return { quotes, hasMore };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch quotes');
  }
};

export const getQuoteOfDay = async (): Promise<Quote | null> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const dayHash = getDayHash(today);
    const totalQuotes = await getTotalQuotesCount();

    if (totalQuotes === 0) return null;

    const offset = dayHash % totalQuotes;

    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .range(offset, offset)
      .single();

    if (error) throw error;

    return data as Quote;
  } catch (error: any) {
    console.error('Failed to fetch quote of day:', error);
    return null;
  }
};

export const searchQuotes = async (query: string): Promise<Quote[]> => {
  try {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .or(`content.ilike.%${query}%,author.ilike.%${query}%`)
      .limit(50);

    if (error) throw error;

    return (data || []) as Quote[];
  } catch (error: any) {
    throw new Error(error.message || 'Search failed');
  }
};

export const getCategories = async (): Promise<QuoteCategory[]> => {
  try {
    const { data } = await supabase
      .from('quotes')
      .select('category', { count: 'exact' })
      .then((result) => {
        if (result.error) throw result.error;
        const categories = new Set(result.data?.map((item) => item.category) || []);
        console.log('Fetched categories:', Array.from(categories));
        return { data: Array.from(categories) as QuoteCategory[] };
      });

    return data || [];
  } catch (error: any) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};

export const getTotalQuotesCount = async (): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('quotes')
      .select('id', { count: 'exact', head: true });

    if (error) throw error;

    return count || 0;
  } catch (error: any) {
    console.error('Failed to get total quotes count:', error);
    return 0;
  }
};

const getDayHash = (dateString: string): number => {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

export const likeQuote = async (quoteId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('quotes')
      .update({ likes: supabase.rpc('increment', { x: 1 }) })
      .eq('id', quoteId);

    if (error) throw error;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to like quote');
  }
};
