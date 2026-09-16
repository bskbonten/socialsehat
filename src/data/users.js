/**
 * Mock Data Pengguna (Users)
 * Role: 'masyarakat' dan 'admin'
 */

export const initialUsers = [
  {
    id: 'user-001',
    name: 'Siti Rahmawati',
    email: 'user@sehatsosial.test',
    password: 'user123',
    role: 'masyarakat',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    phone: '0812-3456-7890',
    address: 'Jl. Melati No. 12, Kelurahan Sejahtera, Jakarta Selatan',
    joinedDate: '2026-01-10',
    bloodType: 'O+',
    birthDate: '1995-04-12'
  },
  {
    id: 'user-002',
    name: 'Budi Santoso',
    email: 'budi@sehatsosial.test',
    password: 'budi123',
    role: 'masyarakat',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    phone: '0813-9876-5432',
    address: 'Jl. Kenanga Indah No. 5, Jakarta Barat',
    joinedDate: '2026-02-15',
    bloodType: 'B+',
    birthDate: '1990-08-23'
  },
  {
    id: 'admin-001',
    name: 'dr. Hendra Kusuma',
    email: 'admin@sehatsosial.test',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    phone: '0811-2233-4455',
    address: 'Dinas Kesehatan Kota & Posko Pemantauan Terpadu',
    joinedDate: '2025-11-01',
    department: 'Tim Pengendalian Masalah Kesehatan & Lingkungan'
  }
]
