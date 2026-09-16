/**
 * Mock Data Notifikasi
 * Tipe: status_laporan, reminder_monitoring, artikel_baru, warning_kesehatan, info_lingkungan
 */

export const initialNotifications = [
  {
    id: 'notif-001',
    userId: 'user-001',
    title: 'Status Laporan Diperbarui',
    message: 'Laporan Anda "Genangan Air Pasca Hujan di RT 04" telah diubah menjadi: Diproses oleh petugas kelurahan.',
    type: 'status_laporan',
    targetId: 'lap-001',
    route: '/laporan/lap-001',
    isRead: false,
    createdAt: '2026-09-15T11:00:00.000Z'
  },
  {
    id: 'notif-002',
    userId: 'user-001',
    title: 'Peringatan Kesehatan Wilayah',
    message: 'Terjadi peningkatan genangan air berpotensi jentik nyamuk di Kelurahan Sejahtera. Mari giatkan PSN 3M Plus.',
    type: 'warning_kesehatan',
    targetId: 'warn-001',
    route: '/dashboard',
    isRead: false,
    createdAt: '2026-09-15T09:00:00.000Z'
  },
  {
    id: 'notif-003',
    userId: 'user-001',
    title: 'Waktunya Monitoring Kesehatan',
    message: 'Sudah 2 hari sejak monitoring terakhir Anda. Yuk catat suhu dan tekanan darah hari ini.',
    type: 'reminder_monitoring',
    targetId: null,
    route: '/monitoring',
    isRead: false,
    createdAt: '2026-09-16T06:30:00.000Z'
  },
  {
    id: 'notif-004',
    userId: 'user-001',
    title: 'Artikel Edukasi Baru',
    message: 'Baca artikel terbaru: "Mengenal Siklus Nyamuk Aedes dan Cara Efektif PSN 3M Plus".',
    type: 'artikel_baru',
    targetId: 'art-001',
    route: '/edukasi/art-001',
    isRead: true,
    createdAt: '2026-09-12T14:20:00.000Z'
  },
  {
    id: 'notif-005',
    userId: 'user-001',
    title: 'Laporan Selesai Ditangani',
    message: 'Laporan "Air Keran Berbau dan Agak Keruh di RW 03" telah ditandai Selesai setelah uji kualitas air.',
    type: 'status_laporan',
    targetId: 'lap-003',
    route: '/laporan/lap-003',
    isRead: true,
    createdAt: '2026-09-06T15:00:00.000Z'
  },
  {
    id: 'notif-006',
    userId: 'user-001',
    title: 'Kerja Bakti Minggu Pagi',
    message: 'Info Lingkungan: Pengurus RW 02 mengundang warga dalam aksi bersih selokan bersama pukul 07.00 WIB.',
    type: 'info_lingkungan',
    targetId: null,
    route: '/forum',
    isRead: true,
    createdAt: '2026-09-05T08:00:00.000Z'
  },
  {
    id: 'notif-007',
    userId: 'user-001',
    title: 'Tips Gizi Seimbang Ditambahkan',
    message: 'Pelajari proporsi makan harian dalam "Panduan Gizi Seimbang: Mengenal Prinsip Isi Piringku".',
    type: 'artikel_baru',
    targetId: 'art-002',
    route: '/edukasi/art-002',
    isRead: true,
    createdAt: '2026-09-10T10:00:00.000Z'
  },
  {
    id: 'notif-008',
    userId: 'user-001',
    title: 'Pembaruan Profil Berhasil',
    message: 'Data kontak dan alamat Anda telah diperbarui dengan sukses.',
    type: 'info_lingkungan',
    targetId: null,
    route: '/profil',
    isRead: true,
    createdAt: '2026-08-20T12:00:00.000Z'
  }
]
