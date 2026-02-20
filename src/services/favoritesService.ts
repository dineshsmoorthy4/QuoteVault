import { Favorite } from '../types';
import { supabase } from './supabaseClient';

export const getFavorites = async (userId: string): Promise<Favorite[]> => {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('*, quote:quote_id(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []) as Favorite[];
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch favorites');
  }
};

export const addToFavorites = async (userId: string, quoteId: string): Promise<Favorite> => {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .insert({ user_id: userId, quote_id: quoteId })
      .select('*, quote:quote_id(*)')
      .single();

    if (error) throw error;

    return data as Favorite;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to add favorite');
  }
};

export const removeFromFavorites = async (userId: string, quoteId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('quote_id', quoteId);

    if (error) throw error;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to remove favorite');
  }
};

export const isFavorite = async (userId: string, quoteId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('quote_id', quoteId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    return !!data;
  } catch (error: any) {
    console.error('Failed to check favorite status:', error);
    return false;
  }
};
