/**
 * Mock Data Peringatan Dini (Early Warning)
 * Tingkat: 'Info', 'Warning', 'Critical'
 * Ditampilkan di Dashboard Masyarakat dan dikelola oleh Admin
 */

export const initialWarnings = [
  {
    id: 'warn-001',
    title: 'Peningkatan Risiko Genangan & Potensi DBD',
    level: 'Warning',
    region: 'Kelurahan Sejahtera (RW 02, RW 04)',
    date: '2026-09-15',
    active: true,
    description: 'Terdapat peningkatan laporan genangan air lebih dari 3 hari di beberapa titik pemukiman. Warga diimbau aktif melakukan Pemberantasan Sarang Nyamuk (PSN) 3M Plus mandiri.',
    actionRequired: 'Periksa bak mandi, talang air, dan wadah terbuka di sekeliling rumah minimal 2 kali seminggu.'
  },
  {
    id: 'warn-002',
    title: 'Penurunan Kualitas Udara Akibat Musim Kering & Debu',
    level: 'Warning',
    region: 'Kecamatan Metro Timur & Sekitarnya',
    date: '2026-09-13',
    active: true,
    description: 'Indeks partikel debu jalanan meningkat di siang hingga sore hari seiring tiupan angin kering.',
    actionRequired: 'Kelompok rentan (anak-anak, lansia, penderita asma) disarankan mengenakan masker saat beraktivitas di luar ruangan.'
  },
  {
    id: 'warn-003',
    title: 'Waspada Penularan Flu Musiman di Fasilitas Umum',
    level: 'Info',
    region: 'Seluruh Wilayah Kota',
    date: '2026-09-10',
    active: true,
    description: 'Perubahan suhu ekstrem antara siang dan malam meningkatkan kerentanan infeksi batuk pilek ringan.',
    actionRequired: 'Jaga daya tahan tubuh dengan cukup tidur, perbanyak buah bervitamin C, dan minum air hangat.'
  },
  {
    id: 'warn-004',
    title: 'Insiden Pencemaran Air Selokan Industri Rumah Tangga',
    level: 'Critical',
    region: 'Bantaran Kali Baru RT 06',
    date: '2026-09-07',
    active: false,
    description: 'Ditemukan pembuangan limbah sablon berkadar zat warna tinggi. Petugas telah menghentikan operasional sumber pencemar.',
    actionRequired: 'Warga dilarang menggunakan air sungai untuk mencuci atau mandi sementara waktu hingga sterilisasi selesai.'
  },
  {
    id: 'warn-005',
    title: 'Jadwal Fogging & Larvasidasi Terfokus RW 03',
    level: 'Info',
    region: 'Komplek Griya Asri RW 03',
    date: '2026-09-04',
    active: false,
    description: 'Puskesmas bersama RT melaksanakan pengasapan terfokus menyusul laporan kasus demam berdarah warga.',
    actionRequired: 'Tutup rapat makanan saat pelaksanaan dan buka ventilasi 30 menit setelah fogging selesai.'
  }
]
