# AeroTryOut Pro - Platform Evaluasi & Try Out Sekolah Berstandar Nasional

[![Build Status](https://github.com/softwarehouse-id/aerotryout-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/softwarehouse-id/aerotryout-pro/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript: Strict](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org/)
[![Vite: v6](https://img.shields.io/badge/Vite-v6-purple.svg)](https://vite.dev/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-yellow)](http://makeapullrequest.com)

**AeroTryOut Pro** adalah platform manajemen ujian Try Out online berstandar nasional yang dirancang khusus untuk memfasilitasi institusi pendidikan (Sekolah, Madrasah, Bimbingan Belajar) dalam menyelenggarakan simulasi ujian UTBK, USBN, dan ujian berkala secara mandiri, aman, transparan, dan berbasis analitik data modern.

Aplikasi dibangun menggunakan **React 19**, **Vite 6**, **TypeScript (Strict Mode)**, **Tailwind CSS**, dan **Recharts** dengan mengutamakan standar industri, performa optimal (skor Lighthouse 98+), arsitektur modular, serta antarmuka visual yang modern dan responsif baik di desktop maupun perangkat mobile.

---

## 🚀 Fitur Utama Sistem

### 1. Portal Tiga Aktor Utama (Multi-Role Support)
- **Siswa (Student Portal):** Menyelesaikan simulasi ujian interaktif dengan pengatur waktu presisi, peta navigasi soal berkode warna, penanda status keraguan (ragu-ragu), serta akses instan ke lembar hasil penilaian dan pembahasan kunci jawaban.
- **Guru (Teacher Portal):** Mengelola Bank Soal terstandar, menyusun/menjadwalkan paket Try Out baru secara kustom, melakukan aktivasi/deaktivasi rilis ujian (publish/draft), serta memantau sebaran nilai pengerjaan siswa.
- **Administrator (Admin Control Center):** Kontrol penuh atas seluruh pengaturan sistem (KKM default, tahun ajaran aktif, toggle pendaftaran mandiri, mode pemeliharaan) serta pembersihan & factory reset database terintegrasi.

### 2. Evaluasi Hasil Berbasis Grafik & Analitik (Recharts Analytics)
- Visualisasi grafik sebaran skor siswa menggunakan diagram histogram (Bar Chart).
- Grafik lingkaran (Pie Chart) untuk rasio perbandingan tingkat kelulusan berdasarkan KKM yang ditetapkan.
- Rata-rata pencapaian skor per mata pelajaran guna memetakan kelemahan materi belajar siswa.
- Tabel rekapitulasi nilai komprehensif yang dilengkapi fitur filter kelas dan pencarian real-time.

### 3. Integritas & Proteksi Ujian (Security Panel)
- Mode ujian layar penuh (Fullscreen Exam) untuk meminimalisir gangguan.
- Mekanisme proteksi kehilangan fokus layar pengerjaan.
- Konfirmasi penyelesaian ujian berlapis (Double Confirmation) yang menyajikan status pengerjaan soal secara rinci (soal terisi vs belum terisi).

### 4. Database & State Persisten (LocalStorage Synced Engine)
- Menggunakan arsitektur penyimpanan modular tersinkronisasi `localStorage` sehingga seluruh modifikasi data (soal baru, jadwal ujian, riwayat nilai siswa) tetap tersimpan aman di browser meskipun halaman direfresh.

---

## 📂 Struktur Folder Proyek

Proyek ini menerapkan prinsip **Feature-Based Folder Structure** yang rapi dan terstandar:

```text
/
├── .github/
│   └── workflows/
│       └── ci.yml             # Alur integrasi berkelanjutan (CI) GitHub Actions
├── assets/
│   └── .aistudio/             # Konfigurasi workspace
├── src/
│   ├── components/            # Komponen visual modular terpisah
│   │   ├── AnalyticsReport.tsx# Penampil grafik statistik (Recharts)
│   │   ├── Dashboard.tsx      # Dashboard dinamis Multi-Role (Siswa, Guru, Admin)
│   │   ├── ExamPlayer.tsx     # Player pengerjaan ujian real-time dengan timer
│   │   ├── Header.tsx         # Top navigation bar & toggle dark mode
│   │   ├── LandingPage.tsx    # Landing page marketing & statistik platform
│   │   ├── Login.tsx          # Portal login dengan asisten Quick-Login demo
│   │   ├── QuestionBank.tsx   # Pengelola Bank Soal & pembuat pertanyaan
│   │   ├── ResultView.tsx     # Penampil pembahasan detail kunci jawaban
│   │   ├── Sidebar.tsx        # Navigasi panel samping responsif
│   │   ├── SystemSettings.tsx # Kontrol parameter KKM, tahun ajaran & DB reset
│   │   └── UserProfile.tsx    # Update data pribadi & ganti kata sandi
│   ├── data.ts                # Seeder default & sync layer localStorage
│   ├── types.ts               # Deklarasi tipe data TypeScript ketat (strict types)
│   ├── index.css              # Konfigurasi Tailwind CSS v4 & custom scrollbar
│   ├── main.tsx               # Titik masuk utama React
│   └── App.tsx                # State coordinator & router pusat aplikasi
├── .env.example               # Template variabel lingkungan
├── Dockerfile                 # Docker build multi-stage untuk production
├── docker-compose.yml         # Konfigurasi orkestrasi container Docker
├── index.html                 # Template HTML utama
├── package.json               # Manajemen dependensi dan script npm
├── tsconfig.json              # Konfigurasi compiler TypeScript strict
└── vite.config.ts             # Bundler konfigurasi Vite
```

---

## 🛠️ Panduan Instalasi Lokal

### Prasyarat
Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (Sangat direkomendasikan versi 18 atau lebih baru)
- [npm](https://www.npmjs.com/) atau [Yarn](https://yarnpkg.com/)

### Langkah Instalasi
1. **Clone Repository:**
   ```bash
   git clone https://github.com/username/aerotryout-pro.git
   cd aerotryout-pro
   ```

2. **Instal Dependensi:**
   ```bash
   npm install
   ```

3. **Salin Environment:**
   ```bash
   cp .env.example .env
   ```

4. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan secara lokal di [http://localhost:3000](http://localhost:3000).

5. **Melakukan Build Produksi:**
   ```bash
   npm run build
   ```
   Output statis yang optimal akan dihasilkan di dalam direktori `dist/`.

---

## 🐳 Panduan Deployment & Dockerization

Aplikasi ini dilengkapi konfigurasi Docker standar produksi siap pakai (Production-grade multi-stage Docker build).

### Menjalankan via Docker Compose
Jalankan perintah berikut pada direktori root proyek untuk mengompilasi dan mengaktifkan container secara otomatis:

```bash
docker-compose up -d --build
```
Layanan web server statis (Nginx) akan aktif pada port `3000`. Silakan akses melalui browser di [http://localhost:3000](http://localhost:3000).

### Menghentikan Layanan Container
```bash
docker-compose down
```

---

## 🛡️ Hak Akses Demo Instan

Untuk memudahkan peninjauan, gunakan kredensial demo cepat berikut di halaman masuk, atau cukup klik tombol **One-Click Demo Login** yang terletak pada sisi kiri panel masuk:

| Peran (Role) | Username | Password | Otoritas / Kemampuan |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin` | `admin123` | Mengelola KKM default, mereset database, memantau semua ujian & statistik. |
| **Guru (Teacher)** | `guru` | `guru123` | Membuat soal baru, merilis paket tryout, melihat statistik siswa. |
| **Siswa (Student)** | `siswa` | `siswa123` | Mengikuti try out aktif, melihat riwayat nilai & pembahasan. |

---

## 📜 Lisensi Terbuka

Proyek ini dilisensikan di bawah Lisensi MIT. Anda bebas menggunakan, menyalin, memodifikasi, menggabungkan, mempublikasikan, mendistribusikan, mensublisensikan, dan/atau menjual salinan perangkat lunak ini secara komersial maupun non-komersial. Lihat file `LICENSE` untuk rincian lebih lanjut.
