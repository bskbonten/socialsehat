/**
 * Mock Data Laporan Masalah Kesehatan & Lingkungan Masyarakat
 * Status: 'Dikirim' -> 'Diproses' -> 'Ditangani' -> 'Selesai'
 */

export const initialReports = [
  {
    id: 'lap-001',
    userId: 'user-001',
    userName: 'Siti Rahmawati',
    title: 'Genangan Air Pasca Hujan di RT 04 Rawan Jentik Nyamuk',
    category: 'Genangan Air',
    location: 'Jl. Melati RT 04 / RW 02, Kel. Sejahtera',
    coordinates: { lat: -6.2297, lng: 106.8271 },
    description: 'Saluran air tersumbat dedaunan mengakibatkan genangan air bertahan lebih dari 3 hari. Warga khawatir memicu sarang nyamuk demam berdarah.',
    photo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?w=600&auto=format&fit=crop&q=80',
    status: 'Diproses',
    createdAt: '2026-09-14T09:30:00.000Z',
    updatedAt: '2026-09-15T11:00:00.000Z',
    officerNotes: 'Laporan telah diteruskan ke tim Penanganan Prasarana dan Sarana Umum (PPSU) dan Puskesmas setempat untuk penjadwalan pembersihan dan larvasidasi.',
    timeline: [
      { status: 'Dikirim', date: '2026-09-14T09:30:00.000Z', note: 'Laporan berhasil dibuat oleh warga.' },
      { status: 'Diproses', date: '2026-09-15T11:00:00.000Z', note: 'Petugas dinas lingkungan telah memverifikasi lokasi dan berkoordinasi dengan pengurus RT.' }
    ]
  },
  {
    id: 'lap-002',
    userId: 'user-001',
    userName: 'Siti Rahmawati',
    title: 'Tumpukan Sampah Liar di Pinggir Lapangan Voli',
    category: 'Sampah',
    location: 'Taman Blok C, Kel. Sejahtera',
    coordinates: { lat: -6.2312, lng: 106.8295 },
    description: 'Terdapat tumpukan sampah plastik dan sisa makanan yang mengeluarkan bau tak sedap dan mengundang lalat di dekat fasilitas olahraga warga.',
    photo: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&auto=format&fit=crop&q=80',
    status: 'Ditangani',
    createdAt: '2026-09-10T14:15:00.000Z',
    updatedAt: '2026-09-12T16:30:00.000Z',
    officerNotes: 'Armada kebersihan kelurahan telah mengangkut 80% sampah dan memasang papan larangan membuang sampah sembarangan.',
    timeline: [
      { status: 'Dikirim', date: '2026-09-10T14:15:00.000Z', note: 'Laporan diterima sistem.' },
      { status: 'Diproses', date: '2026-09-11T08:00:00.000Z', note: 'Verifikasi tim wilayah.' },
      { status: 'Ditangani', date: '2026-09-12T16:30:00.000Z', note: 'Truk kebersihan dikerahkan.' }
    ]
  },
  {
    id: 'lap-003',
    userId: 'user-001',
    userName: 'Siti Rahmawati',
    title: 'Air Keran Berbau dan Agak Keruh di RW 03',
    category: 'Kualitas Air',
    location: 'Komplek Griya Asri RW 03',
    coordinates: { lat: -6.2285, lng: 106.8310 },
    description: 'Air pipa PDAM selama dua hari terakhir tampak kecokelatan dan sedikit berbau lumut. Beberapa warga sementara membeli air galon.',
    photo: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80',
    status: 'Selesai',
    createdAt: '2026-09-02T10:00:00.000Z',
    updatedAt: '2026-09-06T15:00:00.000Z',
    officerNotes: 'Tim teknis PAM Jaya telah melakukan flushing pipa transmisi dan pengetesan kualitas air. Kualitas air kini telah kembali jernih dan sesuai standar baku mutu air bersih.',
    timeline: [
      { status: 'Dikirim', date: '2026-09-02T10:00:00.000Z', note: 'Laporan diajukan warga.' },
      { status: 'Diproses', date: '2026-09-03T09:00:00.000Z', note: 'Koordinasi dengan operator distribusi air.' },
      { status: 'Ditangani', date: '2026-09-04T13:00:00.000Z', note: 'Flushing jaringan pipa dilakukan.' },
      { status: 'Selesai', date: '2026-09-06T15:00:00.000Z', note: 'Pengujian sampel air selesai, kualitas air kembali jernih.' }
    ]
  },
  {
    id: 'lap-004',
    userId: 'user-002',
    userName: 'Budi Santoso',
    title: 'Saluran Pembuangan Tersumbat Limbah Rumah Tangga',
    category: 'Sanitasi',
    location: 'Gang Kancil RT 02 / RW 01',
    coordinates: { lat: -6.2340, lng: 106.8250 },
    description: 'Got tertutup sedimentasi pasir dan lemak makanan sehingga air meluap ke badan jalan saat hujan deras.',
    photo: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?w=600&auto=format&fit=crop&q=80',
    status: 'Dikirim',
    createdAt: '2026-09-15T16:20:00.000Z',
    updatedAt: '2026-09-15T16:20:00.000Z',
    officerNotes: 'Menunggu peninjauan jadwal giliran tim lapangan.',
    timeline: [
      { status: 'Dikirim', date: '2026-09-15T16:20:00.000Z', note: 'Laporan berhasil dicatat.' }
    ]
  },
  {
    id: 'lap-005',
    userId: 'user-002',
    userName: 'Budi Santoso',
    title: 'Pohon Tumbang Membabat Kabel dan Menutup Akses Posyandu',
    category: 'Lingkungan',
    location: 'Dekat Posyandu Kenanga, Kelurahan Sejahtera',
    coordinates: { lat: -6.2360, lng: 106.8320 },
    description: 'Dahan pohon trembesi patah terkena angin kencang kemarin sore, menghalangi ibu-ibu yang membawa balita.',
    photo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    status: 'Selesai',
    createdAt: '2026-09-08T08:10:00.000Z',
    updatedAt: '2026-09-09T14:00:00.000Z',
    officerNotes: 'Dinas Kehutanan dan Pertamanan telah memotong dan membersihkan seluruh ranting pohon.',
    timeline: [
      { status: 'Dikirim', date: '2026-09-08T08:10:00.000Z', note: 'Laporan darurat lingkungan masuk.' },
      { status: 'Diproses', date: '2026-09-08T09:30:00.000Z', note: 'Tim reaksi cepat bergerak.' },
      { status: 'Ditangani', date: '2026-09-08T11:00:00.000Z', note: 'Pemotongan dahan pohon berlangsung.' },
      { status: 'Selesai', date: '2026-09-09T14:00:00.000Z', note: 'Akses jalan telah bersih dan aman dilewati.' }
    ]
  },
  {
    id: 'lap-006',
    userId: 'user-001',
    userName: 'Siti Rahmawati',
    title: 'Beberapa Anak di RW 05 Mengalami Gejala Gatal dan Ruam Kulit',
    category: 'Penyakit',
    location: 'Bantaran Sungai Melati RW 05',
    coordinates: { lat: -6.2305, lng: 106.8340 },
    description: 'Anak-anak yang sering bermain di area rumput dekat sungai dilaporkan mengalami gatal bintik merah. Perlu edukasi dan pemeriksaan lingkungan.',
    photo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
    status: 'Diproses',
    createdAt: '2026-09-13T10:45:00.000Z',
    updatedAt: '2026-09-14T14:00:00.000Z',
    officerNotes: 'Puskesmas telah menurunkan kader kesehatan untuk sosialisasi ke orang tua dan memeriksa dugaan kontak serangga air/rumput.',
    timeline: [
      { status: 'Dikirim', date: '2026-09-13T10:45:00.000Z', note: 'Laporan masuk.' },
      { status: 'Diproses', date: '2026-09-14T14:00:00.000Z', note: 'Kader puskesmas menjadwalkan kunjungan edukasi.' }
    ]
  },
  {
    id: 'lap-007',
    userId: 'user-002',
    userName: 'Budi Santoso',
    title: 'Pembakaran Sampah Terbuka di Lahan Kosong',
    category: 'Lingkungan',
    location: 'Lahan Sebelah Timur Pasar Pagi',
    coordinates: { lat: -6.2330, lng: 106.8235 },
    description: 'Asap tebal mengganggu pernapasan anak-anak dan lansia di sore hari secara berulang.',
    photo: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=600&auto=format&fit=crop&q=80',
    status: 'Ditangani',
    createdAt: '2026-09-11T17:00:00.000Z',
    updatedAt: '2026-09-13T10:00:00.000Z',
    officerNotes: 'Satpol PP dan aparat RT telah memberikan teguran lisan dan tertulis kepada pemilik lahan.',
    timeline: [
      { status: 'Dikirim', date: '2026-09-11T17:00:00.000Z', note: 'Laporan diajukan.' },
      { status: 'Diproses', date: '2026-09-12T09:00:00.000Z', note: 'Koordinasi aparat kelurahan.' },
      { status: 'Ditangani', date: '2026-09-13T10:00:00.000Z', note: 'Penertiban lapangan.' }
    ]
  },
  {
    id: 'lap-008',
    userId: 'user-001',
    userName: 'Siti Rahmawati',
    title: 'Toilet Umum Lapangan Rusak dan Terbengkalai',
    category: 'Sanitasi',
    location: 'Taman Terbuka Hijau RW 06',
    coordinates: { lat: -6.2270, lng: 106.8280 },
    description: 'Kran bocor dan pintu rusak sehingga tidak higienis bagi masyarakat yang sedang beraktivitas santai.',
    photo: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
    status: 'Dikirim',
    createdAt: '2026-09-16T08:00:00.000Z',
    updatedAt: '2026-09-16T08:00:00.000Z',
    officerNotes: 'Belum ditinjau petugas operasional.',
    timeline: [
      { status: 'Dikirim', date: '2026-09-16T08:00:00.000Z', note: 'Laporan baru dibuat.' }
    ]
  },
  {
    id: 'lap-009',
    userId: 'user-002',
    userName: 'Budi Santoso',
    title: 'Penumpukan Limbah Sayuran Organik Pasar',
    category: 'Sampah',
    location: 'Pintu Masuk Belakang Pasar Tradisional',
    coordinates: { lat: -6.2355, lng: 106.8220 },
    description: 'Bak penampungan sampah pasar penuh dan belum diangkut selama 2 hari.',
    photo: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
    status: 'Selesai',
    createdAt: '2026-09-01T07:30:00.000Z',
    updatedAt: '2026-09-02T16:00:00.000Z',
    officerNotes: 'Pengelola pasar telah menjadwalkan ritasi kontainer sampah tambahan dua kali sehari.',
    timeline: [
      { status: 'Dikirim', date: '2026-09-01T07:30:00.000Z', note: 'Laporan diterima.' },
      { status: 'Diproses', date: '2026-09-01T11:00:00.000Z', note: 'Tinjauan dinas pasar.' },
      { status: 'Selesai', date: '2026-09-02T16:00:00.000Z', note: 'Kontainer telah dikosongkan dan disemprot disinfektan.' }
    ]
  },
  {
    id: 'lap-010',
    userId: 'user-001',
    userName: 'Siti Rahmawati',
    title: 'Bau Kimia Ringan Dekat Bengkel Sablon',
    category: 'Lainnya',
    location: 'Jl. Kemuning No. 19 RT 01',
    coordinates: { lat: -6.2325, lng: 106.8260 },
    description: 'Uap pembersih sablon tercium menyengat saat siang hari. Warga berharap adanya ventilasi filter penyaring bau.',
    photo: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&auto=format&fit=crop&q=80',
    status: 'Diproses',
    createdAt: '2026-09-12T13:40:00.000Z',
    updatedAt: '2026-09-14T09:00:00.000Z',
    officerNotes: 'Petugas lingkungan hidup bersama pihak kelurahan telah berkomunikasi dengan pemilik usaha untuk perbaikan cerobong hisap.',
    timeline: [
      { status: 'Dikirim', date: '2026-09-12T13:40:00.000Z', note: 'Laporan tercatat.' },
      { status: 'Diproses', date: '2026-09-14T09:00:00.000Z', note: 'Pengecekan ke lokasi usaha.' }
    ]
  }
]
