import { Collection, CollectionQuote } from '../types';
import { supabase } from './supabaseClient';

export const getCollections = async (userId: string): Promise<Collection[]> => {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []) as Collection[];
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch collections');
  }
};

export const createCollection = async (
  userId: string,
  name: string,
  description?: string
): Promise<Collection> => {
  try {
    const { data, error } = await supabase
      .from('collections')
      .insert({ user_id: userId, name, description })
      .select()
      .single();

    if (error) throw error;

    return data as Collection;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create collection');
  }
};

export const deleteCollection = async (collectionId: string): Promise<void> => {
  try {
    const { error: deleteQuotesError } = await supabase
      .from('collection_quotes')
      .delete()
      .eq('collection_id', collectionId);

    if (deleteQuotesError) throw deleteQuotesError;

    const { error } = await supabase
      .from('collections')
      .delete()
      .eq('id', collectionId);

    if (error) throw error;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to delete collection');
  }
};

export const getCollectionQuotes = async (collectionId: string): Promise<CollectionQuote[]> => {
  try {
    const { data, error } = await supabase
      .from('collection_quotes')
      .select('*, quote:quote_id(*)')
      .eq('collection_id', collectionId)
      .order('added_at', { ascending: false });

    if (error) throw error;

    return (data || []) as CollectionQuote[];
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch collection quotes');
  }
};

export const addQuoteToCollection = async (
  collectionId: string,
  quoteId: string
): Promise<CollectionQuote> => {
  try {
    const { data, error } = await supabase
      .from('collection_quotes')
      .insert({ collection_id: collectionId, quote_id: quoteId })
      .select('*, quote:quote_id(*)')
      .single();

    if (error) throw error;

    return data as CollectionQuote;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to add quote to collection');
  }
};

export const removeQuoteFromCollection = async (
  collectionId: string,
  quoteId: string
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('collection_quotes')
      .delete()
      .eq('collection_id', collectionId)
      .eq('quote_id', quoteId);

    if (error) throw error;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to remove quote from collection');
  }
};

export const updateCollection = async (
  collectionId: string,
  updates: Partial<Collection>
): Promise<Collection> => {
  try {
    const { data, error } = await supabase
      .from('collections')
      .update(updates)
      .eq('id', collectionId)
      .select()
      .single();

    if (error) throw error;

    return data as Collection;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update collection');
  }
};
