/**
 * Mock Data Lokasi Faskes & Titik Laporan Kesehatan Lingkungan
 * Kategori: Puskesmas, Rumah Sakit, Apotek, Posyandu, Laporan masyarakat
 */

export const initialLocations = [
  {
    id: 'loc-001',
    name: 'Puskesmas Kecamatan Sejahtera',
    category: 'Puskesmas',
    address: 'Jl. Sejahtera Raya No. 45',
    phone: '(021) 789-0123',
    operatingHours: '24 Jam (UGD) / 08.00 - 15.00 (Poli)',
    services: ['Poli Umum', 'Poli Gigi', 'KIA / KB', 'Laboratorium Dasar', 'Farmasi'],
    coordinates: { x: 38, y: 35 }, // percentage on interactive map canvas
    description: 'Puskesmas rujukan pertama dengan layanan rawat inap tingkat pertama.'
  },
  {
    id: 'loc-002',
    name: 'RSUD Sehat Sentosa',
    category: 'Rumah Sakit',
    address: 'Jl. Jenderal Sudirman Kav. 88',
    phone: '(021) 555-4321',
    operatingHours: '24 Jam Setiap Hari',
    services: ['UGD 24 Jam', 'Spesialis Penyakit Dalam', 'Spesialis Anak', 'Radiologi', 'ICU'],
    coordinates: { x: 65, y: 25 },
    description: 'Rumah Sakit Umum Daerah Tipe B dengan fasilitas rawat inap lengkap.'
  },
  {
    id: 'loc-003',
    name: 'Apotek Kimia Farma Sejahtera',
    category: 'Apotek',
    address: 'Jl. Melati No. 8',
    phone: '(021) 789-4567',
    operatingHours: '07.00 - 22.00 WIB',
    services: ['Obat Resep', 'Obat Bebas', 'Konsultasi Apoteker', 'Cek Gula Darah & Tensi'],
    coordinates: { x: 42, y: 52 },
    description: 'Apotek resmi dengan stok obat lengkap dan konsultasi apoteker gratis.'
  },
  {
    id: 'loc-004',
    name: 'Posyandu Balita & Lansia Kenanga',
    category: 'Posyandu',
    address: 'Balai Warga RW 02, Kel. Sejahtera',
    phone: '0812-9988-7766',
    operatingHours: 'Setiap Selasa & Kamis (08.30 - 11.30)',
    services: ['Penimbangan Balita', 'Imunisasi Dasar', 'Pemberian Makanan Tambahan', 'Pemeriksaan Lansia'],
    coordinates: { x: 25, y: 60 },
    description: 'Pos pelayanan terpadu berbasis komunitas warga RW 02.'
  },
  {
    id: 'loc-005',
    name: 'Puskesmas Pembantu Kelurahan Melati',
    category: 'Puskesmas',
    address: 'Jl. Flamboyan Timur No. 12',
    phone: '(021) 789-9911',
    operatingHours: 'Senin - Jumat (08.00 - 14.00)',
    services: ['Pemeriksaan Umum', 'Konsultasi Gizi', 'Penyuluhan Lingkungan'],
    coordinates: { x: 78, y: 55 },
    description: 'Puskesmas pembantu untuk mendekatkan akses layanan kesehatan dasar.'
  },
  {
    id: 'loc-006',
    name: 'Apotek K-24 Asri',
    category: 'Apotek',
    address: 'Komplek Griya Asri Ruko No. 3',
    phone: '(021) 788-1122',
    operatingHours: '24 Jam Nonstop',
    services: ['Tersedia Obat 24 Jam', 'Antar Obat Wilayah Dekat', 'Alat Kesehatan'],
    coordinates: { x: 55, y: 70 },
    description: 'Apotek buka 24 jam dengan ketersediaan obat-obatan esensial.'
  },
  {
    id: 'loc-007',
    name: 'Rumah Sakit Ibu dan Anak Kasih Ibu',
    category: 'Rumah Sakit',
    address: 'Jl. Anggrek Utama No. 102',
    phone: '(021) 765-8899',
    operatingHours: '24 Jam',
    services: ['Persalinan 24 Jam', 'Klinik Tumbuh Kembang', 'NICU/PICU', 'Dokter Anak'],
    coordinates: { x: 20, y: 28 },
    description: 'Layanan spesifik kesehatan ibu, bayi, dan anak terpadu.'
  },
  {
    id: 'loc-008',
    name: 'Posyandu Melati Indah RW 05',
    category: 'Posyandu',
    address: 'Jl. Bantaran No. 7, RW 05',
    phone: '0813-1122-3344',
    operatingHours: 'Rabu Minggu ke-1 & ke-3 (09.00 - 12.00)',
    services: ['Pemeriksaan Tumbuh Kembang', 'Vitamin A Berkala', 'Cek Kolesterol Lansia'],
    coordinates: { x: 80, y: 80 },
    description: 'Posyandu aktif yang melayani 120 balita dan 60 lansia di bantaran RW 05.'
  },
  {
    id: 'loc-009',
    name: 'Laporan: Genangan Air RT 04 (Rawan Jentik)',
    category: 'Laporan masyarakat',
    address: 'Jl. Melati RT 04 / RW 02',
    phone: '-',
    operatingHours: 'Status: Diproses',
    services: ['Kategori: Genangan Air', 'Pelapor: Siti Rahmawati', 'Target: Tindakan Larvasidasi'],
    coordinates: { x: 45, y: 48 },
    description: 'Genangan saluran tersumbat yang sedang dalam jadwal pembersihan tim kelurahan.'
  },
  {
    id: 'loc-010',
    name: 'Laporan: Tumpukan Sampah Lapangan Voli',
    category: 'Laporan masyarakat',
    address: 'Taman Blok C, Kel. Sejahtera',
    phone: '-',
    operatingHours: 'Status: Ditangani',
    services: ['Kategori: Sampah', 'Pelapor: Siti Rahmawati', 'Target: Pembersihan Kontainer'],
    coordinates: { x: 32, y: 40 },
    description: 'Sampah liar di dekat sarana olahraga umum yang sedang dibersihkan dinas kebersihan.'
  },
  {
    id: 'loc-011',
    name: 'Laporan: Saluran Limbah Tersumbat',
    category: 'Laporan masyarakat',
    address: 'Gang Kancil RT 02 / RW 01',
    phone: '-',
    operatingHours: 'Status: Dikirim',
    services: ['Kategori: Sanitasi', 'Pelapor: Budi Santoso', 'Target: Normalisasi Saluran'],
    coordinates: { x: 60, y: 62 },
    description: 'Sedimentasi got yang meluap saat hujan deras, menunggu peninjauan regu kerja.'
  }
]
