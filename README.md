# SehatSosial — Platform Digital Kesehatan Masyarakat

> **“Sehat Dimulai dari Kita.”**  
> *Pantau kesehatanmu, peduli lingkunganmu, dan bersama menjaga kesehatan masyarakat.*

---

## 1. Tentang SehatSosial

**SehatSosial** adalah platform web kesehatan masyarakat terpadu yang menghubungkan:
**Kesehatan Individu + Kondisi Lingkungan + Laporan Masyarakat + Edukasi Kesehatan + Early Warning.**

Konsep Utama:
```text
Pantau → Laporkan → Dapatkan Informasi → Bersama Menjaga Kesehatan
```

Aplikasi dirancang modern, ramah pengguna, bersih, dan memprioritaskan pengalaman perangkat seluler (*mobile-first*) dengan *bottom navigation* di ponsel pintar dan *topbar/sidebar* di desktop.

> [!IMPORTANT]
> **Prinsip Keselamatan Medis (Medical Safety):**  
> SehatSosial **bukan alat diagnosis medis**. Platform ini tidak memberikan diagnosis penyakit atau resep obat mandiri. Semua data monitoring mandiri dan peringatan dini berfungsi sebagai instrumen pencatatan dan kesiapsiagaan preventif masyarakat.

---

## 2. Teknologi

- **Vue 3** (Composition API `<script setup>`)
- **Vite** (Build tool & development server cepat)
- **Pinia** (Manajemen state global modular)
- **Vue Router 4** (Sistem perutean dengan Route Guard terproteksi)
- **Tailwind CSS** (Desain responsif mobile-first, soft shadow, & palet kesehatan)
- **LocalStorage** (Simulasi penyimpanan persisten aman via helper enkapsulasi)
- **SVG Charts** (Visualisasi tren berat badan, suhu, dan tensi tanpa library berat)

---

## 3. Akun Demo untuk Pengujian Langsung

Aplikasi menyediakan dua peran (*roles*) yang dapat langsung diuji dari tombol 1-klik di halaman `/login`:

| Peran | Email | Kata Sandi | Akses |
| :--- | :--- | :--- | :--- |
| **Masyarakat** | `user@sehatsosial.test` | `user123` | Dashboard, Monitoring, Laporan, Peta, Edukasi, Forum, Profil |
| **Admin/Petugas** | `admin@sehatsosial.test` | `admin123` | Statistik, Verifikasi & Status Laporan, CRUD Edukasi, Early Warning |

---

## 4. Fitur Utama

### A. Fitur Masyarakat
1. **Autentikasi & Registrasi**: Login cepat akun demo atau pendaftaran warga baru dengan validasi lengkap.
2. **Dashboard Warga**: Ringkasan 4 parameter kondisi tubuh terkini, aksi cepat, kartu *early warning* aktif wilayah, dan artikel pilihan.
3. **Monitoring Kesehatan**: Pencatatan mandiri tanggal, berat badan (kg), suhu tubuh (°C), tekanan darah sistolik/diastolik, keluhan gejala, dan catatan.
4. **Riwayat & Grafik Tren**: Visualisasi grafik interaktif perkembangan berat badan, suhu, dan tensi dari waktu ke waktu, serta tabel riwayat kartu responsif.
5. **Laporan Masalah Lingkungan**: Pengaduan masalah sampah liar, genangan air berpotensi jentik, sanitasi saluran, atau penyakit dengan upload preview foto bukti.
6. **Pelacak Status Laporan**: Status alur transparan (`Dikirim` → `Diproses` → `Ditangani` → `Selesai`) dengan riwayat catatan tindakan petugas kelurahan.
7. **Peta Fasilitas Kesehatan**: Peta simulasi interaktif tanpa perlu API key external, memetakan Puskesmas, Rumah Sakit, Apotek, Posyandu, dan titik aduan warga.
8. **Edukasi & Literasi**: Kumpulan artikel hidup bersih sehat preventif dengan pencarian kata kunci dan filter kategori.
9. **Forum Komunitas**: Ruang diskusi tanya-jawab dan gotong royong antar-warga dengan penafian non-konsultasi dokter.
10. **Pemberitahuan (Notifikasi)**: Notifikasi unread badge untuk perubahan status laporan, peringatan wilayah, dan pengingat pemantauan.
11. **Profil Pengguna**: Manajemen profil, ubah identitas kontak, dan tombol ganti role pengujian cepat.

### B. Fitur Admin / Petugas
1. **Statistik Pengawasan**: Total pengguna terdaftar, total laporan, laporan dalam proses, dan laporan selesai.
2. **Distribusi Kategori Masalah**: Grafik proporsi masalah lingkungan di lapangan.
3. **Pengelolaan Laporan Warga**: Filter kategori dan status, peninjauan foto, pembaruan status, dan pemberian instruksi/catatan petugas.
4. **Manajemen Edukasi**: Tambah artikel baru, ubah artikel yang ada, atau hapus materi edukasi.
5. **Pusat Early Warning**: Pembuatan peringatan dini (*Info*, *Warning*, *Critical*) yang langsung disiarkan ke dashboard warga dan memicu notifikasi.

---

## 5. Struktur Folder Project

```text
sehatsosial/
├── public/
│   └── favicon.svg               # Logo icon SehatSosial
├── src/
│   ├── assets/
│   │   └── main.css              # Directive Tailwind & custom utility
│   ├── components/
│   │   ├── education/
│   │   │   └── ArticleCard.vue
│   │   ├── health/
│   │   │   ├── HealthHistory.vue      # Tabel riwayat & grafik SVG tren
│   │   │   ├── HealthSummaryCard.vue  # 4 kartu ringkasan metrik
│   │   │   └── MonitoringForm.vue     # Formulir input & validasi
│   │   ├── layout/
│   │   │   ├── BottomNav.vue          # Bottom navigation khusus smartphone
│   │   │   ├── Navbar.vue             # Header desktop & avatar dropdown
│   │   │   └── Sidebar.vue            # Sidebar navigasi panel admin
│   │   ├── notifications/
│   │   │   └── NotificationItem.vue
│   │   ├── reports/
│   │   │   ├── ReportCard.vue
│   │   │   ├── ReportForm.vue         # Form laporan + photo preview
│   │   │   └── ReportStatusTimeline.vue # Visual status tracker
│   │   └── ui/
│   │       ├── BaseAlert.vue
│   │       ├── BaseBadge.vue
│   │       ├── BaseButton.vue
│   │       ├── BaseCard.vue
│   │       ├── BaseInput.vue
│   │       ├── BaseModal.vue
│   │       ├── BaseSelect.vue
│   │       ├── LoadingSpinner.vue
│   │       └── Toast.vue              # Feedback notifikasi mengambang
│   ├── data/                          # Mock dataset realistis
│   │   ├── articles.js
│   │   ├── forum.js
│   │   ├── healthRecords.js
│   │   ├── locations.js
│   │   ├── notifications.js
│   │   ├── reports.js
│   │   ├── users.js
│   │   └── warnings.js
│   ├── layouts/
│   │   ├── AdminLayout.vue
│   │   ├── PublicLayout.vue
│   │   └── UserLayout.vue
│   ├── router/
│   │   └── index.js                   # Konfigurasi rute & Route Guard
│   ├── stores/                        # Pinia state stores
│   │   ├── adminStore.js
│   │   ├── authStore.js
│   │   ├── educationStore.js
│   │   ├── forumStore.js
│   │   ├── healthStore.js
│   │   ├── locationStore.js
│   │   ├── notificationStore.js
│   │   ├── reportStore.js
│   │   └── toastStore.js
│   ├── utils/
│   │   └── storage.js                 # Helper aman LocalStorage
│   ├── views/                         # View halaman aplikasi
│   │   ├── admin/
│   │   │   ├── AdminDashboardView.vue
│   │   │   ├── AdminEducationView.vue
│   │   │   ├── AdminReportsView.vue
│   │   │   └── AdminWarningView.vue
│   │   ├── CreateReportView.vue
│   │   ├── DashboardView.vue
│   │   ├── EducationDetailView.vue
│   │   ├── EducationView.vue
│   │   ├── ForumDetailView.vue
│   │   ├── ForumView.vue
│   │   ├── LandingView.vue
│   │   ├── LoginView.vue
│   │   ├── MapView.vue
│   │   ├── MonitoringView.vue
│   │   ├── NotificationsView.vue
│   │   ├── ProfileView.vue
│   │   ├── RegisterView.vue
│   │   ├── ReportDetailView.vue
│   │   └── ReportsView.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 6. Cara Menginstal dan Menjalankan Aplikasi

Pastikan Node.js (versi 18+) dan npm sudah terpasang di komputer Anda.

### 1. Masuk ke folder project:
```bash
cd /Users/muhammadfahrimaulana/.gemini/antigravity/scratch/sehatsosial
```

### 2. Pasang dependensi:
```bash
npm install
```

### 3. Jalankan server lokal Vite:
```bash
npm run dev
```

Buka browser dan akses alamat:
```text
http://localhost:5173/
```

### 4. Build untuk produksi:
```bash
npm run build
```

---

## 7. Penjelasan Pinia State Management

1. **`authStore`**: Menangani sesi pengguna, login, registrasi, logout, dan pembaruan profil dengan sinkronisasi ke LocalStorage.
2. **`healthStore`**: Menyimpan catatan pemantauan tubuh, evaluasi non-diagnostik parameter, dan riwayat untuk visualisasi grafik.
3. **`reportStore`**: Mengelola siklus laporan masyarakat dari pengiriman hingga penyelesaian oleh dinas.
4. **`educationStore`**: Menyimpan katalog materi edukasi kesehatan dan aksi CRUD oleh admin.
5. **`notificationStore`**: Menghitung *unreadCount* secara reaktif dan menyiarkan peringatan sistem.
6. **`adminStore`**: Mengalkulasi metrik statistik dinamis dan mengelola publikasi *Early Warning*.
7. **`locationStore`**: Memetakan koordinat titik fasilitas kesehatan dan menghubungkan titik laporan warga ke peta.
8. **`toastStore`**: Menyediakan umpan balik visual (*toast notification*) instan untuk setiap aksi interaktif pengguna.
