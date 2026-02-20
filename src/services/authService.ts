import { User } from '../types';
import { supabase } from './supabaseClient';
import { validateEmail, validatePassword } from '../utils/validators';

export const login = async (email: string, password: string): Promise<User> => {
  if (!validateEmail(email)) {
    throw new Error('Invalid email format');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  if (!data.user) throw new Error('Authentication failed');

  return mapAuthUserToUser(data.user);
};

export const signUp = async (
  email: string,
  password: string,
  username: string
): Promise<User> => {
  if (!validateEmail(email)) {
    throw new Error('Invalid email format');
  }

  if (!validatePassword(password)) {
    throw new Error('Password must be at least 8 characters');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  if (!data.user) throw new Error('Sign up failed');

  const { error: profileError } = await supabase.from('users').insert({
    id: data.user.id,
    email,
    username,
    preferences: {
      theme: 'light',
      fontSize: 'medium',
      accentColor: 'indigo',
      notificationTime: '09:00',
      notificationsEnabled: true,
    },
  });

  if (profileError) throw profileError;

  return mapAuthUserToUser(data.user);
};

export const resetPasswordEmail = async (email: string): Promise<void> => {
  if (!validateEmail(email)) {
    throw new Error('Invalid email format');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'quotevault://reset-password',
  });

  if (error) throw error;
};

export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { data } = await supabase.auth.getSession();

  if (!data.session) return null;

  const { data: userData, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.session.user.id)
    .single();

  if (error) return null;

  return userData as User;
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<User>
): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as User;
};

const mapAuthUserToUser = (authUser: any): User => {
  return {
    id: authUser.id,
    email: authUser.email || '',
    username: authUser.user_metadata?.username || 'User',
    profilePicture: authUser.user_metadata?.avatar_url,
    preferences: {
      theme: 'light',
      fontSize: 'medium',
      accentColor: 'indigo',
      notificationTime: '09:00',
      notificationsEnabled: true,
    },
    createdAt: authUser.created_at || new Date().toISOString(),
  };
};
