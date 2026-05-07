/**
 * Supabase Client Configuration
 * Ragit Dobel 4.0 - Kanwil DJPb Sumatera Selatan
 */

import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const supabaseUrl = 'https://zbexsukhqcgmzgqapoii.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZXhzdWtocWNnbXpncWFwb2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4ODM5NTAsImV4cCI6MjA4NzQ1OTk1MH0.7N9wIazzZZW5DbQUMMYu34y0alkt6N6tiGE7TNKbBDg';

// Create single instance - simple and straightforward
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storageKey: 'sb-zbexsukhqcgmzgqapoii-auth-token',
  },
});

// Database types
export interface AdminUser {
  id: string;
  username: string;
  password_hash: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
  last_login: string | null;
}

export interface DashboardLink {
  id: number;
  url: string;
  label: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
}

export interface LmsLink {
  id: number;
  url: string;
  label: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
}

export interface DokumentasiItem {
  id: number;
  title: string;
  description: string;
  date: string;
  kategori: string;
  image_url: string;
  dokumentasi_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

// Helper functions for common operations

/**
 * Get active dashboard link
 */
export async function getActiveDashboardLink(): Promise<DashboardLink | null> {
  const { data, error } = await supabase
    .from('dashboard_links')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching dashboard link:', error);
    return null;
  }

  return data;
}

/**
 * Update dashboard link (Admin only)
 */
export async function updateDashboardLink(url: string, updatedBy: string): Promise<boolean> {
  const { error } = await supabase
    .from('dashboard_links')
    .update({ 
      url, 
      updated_at: new Date().toISOString(),
      updated_by: updatedBy 
    })
    .eq('is_active', true);

  if (error) {
    console.error('Error updating dashboard link:', error);
    return false;
  }

  return true;
}

/**
 * Get active LMS link
 */
export async function getActiveLmsLink(): Promise<LmsLink | null> {
  const { data, error } = await supabase
    .from('lms_links')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching LMS link:', error);
    return null;
  }

  return data;
}

/**
 * Update LMS link (Admin only)
 */
export async function updateLmsLink(url: string, updatedBy: string): Promise<boolean> {
  const { error } = await supabase
    .from('lms_links')
    .update({ 
      url, 
      updated_at: new Date().toISOString(),
      updated_by: updatedBy 
    })
    .eq('is_active', true);

  if (error) {
    console.error('Error updating LMS link:', error);
    return false;
  }

  return true;
}

/**
 * Get all active dokumentasi items
 */
export async function getDokumentasiItems(): Promise<DokumentasiItem[]> {
  const { data, error } = await supabase
    .from('dokumentasi_kegiatan')
    .select('*')
    .eq('is_active', true)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching dokumentasi items:', error);
    return [];
  }

  return data || [];
}

/**
 * Add new dokumentasi item (Admin only)
 */
export async function addDokumentasiItem(
  item: Omit<DokumentasiItem, 'id' | 'created_at' | 'updated_at' | 'is_active'>
): Promise<DokumentasiItem | null> {
  const { data, error } = await supabase
    .from('dokumentasi_kegiatan')
    .insert([{
      ...item,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error adding dokumentasi item:', error);
    return null;
  }

  return data;
}

/**
 * Update dokumentasi item (Admin only)
 */
export async function updateDokumentasiItem(
  id: number,
  updates: Partial<Omit<DokumentasiItem, 'id' | 'created_at' | 'updated_at'>>
): Promise<boolean> {
  const { error } = await supabase
    .from('dokumentasi_kegiatan')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating dokumentasi item:', error);
    return false;
  }

  return true;
}

/**
 * Delete dokumentasi item (soft delete - set is_active to false)
 */
export async function deleteDokumentasiItem(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('dokumentasi_kegiatan')
    .update({ 
      is_active: false,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    console.error('Error deleting dokumentasi item:', error);
    return false;
  }

  return true;
}

/**
 * Verify admin credentials (simplified - for demo purposes)
 * In production, use proper Supabase Auth
 */
export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  // For demo purposes, using hardcoded credentials
  // In production, this should use bcrypt hash comparison via Edge Function
  if (username === 'RagitAdmin1' && password === 'SayaAdmin1234') {
    return true;
  }
  return false;
}

/**
 * Upload image to Supabase Storage
 */
export async function uploadImage(file: File, path: string): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from('dokumentasi-images')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('dokumentasi-images')
    .getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Get public URL for stored image
 */
export function getImagePublicUrl(path: string): string {
  const { data: { publicUrl } } = supabase.storage
    .from('dokumentasi-images')
    .getPublicUrl(path);

  return publicUrl;
}