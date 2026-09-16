/**
 * Mock Data Forum Diskusi Kesehatan & Lingkungan Warga
 * Disclaimer: Forum SehatSosial adalah ruang berbagi informasi dan bukan pengganti konsultasi tenaga kesehatan.
 */

export const initialForumPosts = [
  {
    id: 'post-001',
    authorId: 'user-001',
    authorName: 'Siti Rahmawati',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    title: 'Bagaimana cara efektif menjaga kebersihan kamar agar tidak lembap dan bebas tungau?',
    category: 'Kebersihan',
    content: 'Halo bapak/ibu sekalian, kamar tidur saya menghadap sisi barat dan agak lembap di musim seperti ini. Anak sering bersin saat bangun tidur. Ada yang punya tips sederhana untuk sirkulasi udara dan membersihkan kasur tanpa alat mahal?',
    createdAt: '2026-09-14T10:00:00.000Z',
    likes: 12,
    comments: [
      {
        id: 'c-001',
        authorName: 'Budi Santoso',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        content: 'Saya biasanya jemur bantal dan guling di bawah sinar matahari langsung setiap hari Sabtu bu. Sprei dicuci air hangat minimal 2 minggu sekali. Alhamdulillah berkurang bersinnya.',
        createdAt: '2026-09-14T11:20:00.000Z'
      },
      {
        id: 'c-002',
        authorName: 'dr. Hendra Kusuma',
        authorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
        content: 'Tips praktis: Usahakan pintu dan jendela dibuka selebar mungkin di pagi hari jam 7-9 agar terjadi pertukaran udara alami. Hindari menumpuk pakaian bekas pakai di gantungan kamar karena menyerap kelembapan dan menjadi sarang debu. Jika bersin disertai sesak, segera konsultasi ke dokter ya bu.',
        createdAt: '2026-09-14T13:45:00.000Z'
      }
    ]
  },
  {
    id: 'post-002',
    authorId: 'user-002',
    authorName: 'Budi Santoso',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    title: 'Rencana Kerja Bakti Bersih Selokan RW 02 Hari Minggu Pagi Ini',
    category: 'Lingkungan',
    content: 'Mengingat sudah mulai ada laporan genangan dan jentik nyamuk, kami warga RT 02 berencana mengadakan kerja bakti membersihkan selokan depan rumah masing-masing hari Minggu jam 07.00. Mohon partisipasi bapak-bapak membawa cangkul dan karung sampah ya.',
    createdAt: '2026-09-13T08:30:00.000Z',
    likes: 24,
    comments: [
      {
        id: 'c-003',
        authorName: 'Siti Rahmawati',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        content: 'Siap pak Budi! Dari ibu-ibu RT nanti kami siapkan air minum teh hangat dan camilan pisang rebus untuk bapak-bapak yang gotong royong.',
        createdAt: '2026-09-13T09:15:00.000Z'
      }
    ]
  },
  {
    id: 'post-003',
    authorId: 'user-001',
    authorName: 'Siti Rahmawati',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    title: 'Menu bekal sekolah sehat dan disukai anak yang praktis dibuat',
    category: 'Nutrisi',
    content: 'Ibu-ibu sekalian, boleh share ide menu bekal sekolah yang tidak membosankan tapi tetap kaya sayur dan protein? Anak saya agak susah makan sayur bening biasa.',
    createdAt: '2026-09-10T16:00:00.000Z',
    likes: 18,
    comments: [
      {
        id: 'c-004',
        authorName: 'Dewi Lestari',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        content: 'Bisa dicoba dibuatkan rolade ayam cincang dicampur wortel serut dan brokoli cincang halus bu Siti. Di kukus lalu digoreng telur tipis, anak-anak biasanya suka banget karena gurih dan sayurnya tidak terasa pahit.',
        createdAt: '2026-09-10T17:30:00.000Z'
      }
    ]
  }
]
