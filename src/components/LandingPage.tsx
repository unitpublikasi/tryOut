/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  GraduationCap,
  Award,
  Users,
  Database,
  LineChart,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  BookMarked
} from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  systemName: string;
}

export default function LandingPage({ onStart, systemName }: LandingPageProps) {
  const stats = [
    { label: 'Siswa Aktif', value: '45,280+', icon: Users, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40' },
    { label: 'Bank Soal', value: '18,500+', icon: Database, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40' },
    { label: 'Try Out Selesai', value: '124,900+', icon: GraduationCap, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' },
    { label: 'Rata-rata Skor', value: '82.4%', icon: Award, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' },
  ];

  const features = [
    {
      title: 'Sistem Bank Soal Terstandar',
      desc: 'Manajemen soal yang mudah dikelompokkan berdasarkan kategori, kurikulum nasional, tingkat kesulitan, serta pembobotan nilai otomatis.',
      icon: BookMarked,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Analitik Belajar Real-Time',
      desc: 'Guru dan siswa mendapatkan laporan grafis secara instan setelah ujian selesai, lengkap dengan analisis kelemahan materi belajar.',
      icon: LineChart,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Proteksi Integritas Ujian',
      desc: 'Fungsi deteksi kehilangan fokus, acak soal & jawaban (randomizer), serta pembatasan waktu pengerjaan demi integritas hasil ujian.',
      icon: ShieldAlert,
      color: 'from-red-500 to-orange-500',
    },
  ];

  const partners = [
    'SMA Negeri 1 Jakarta',
    'SMA Negeri 3 Bandung',
    'SMA Negeri 5 Surabaya',
    'SMA LabSchool UNJ',
    'SMA Taruna Nusantara',
  ];

  return (
    <div id="landing-page" className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Subtle decorative mesh gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6 animate-fade-in font-mono">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>SIAP UNTUK UTBK & UJIAN NASIONAL 2026/2027</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
            Satu Platform untuk Seluruh Kebutuhan <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Evaluasi & Try Out Sekolah
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Sederhanakan pembuatan bank soal, monitoring ujian siswa secara real-time, dan evaluasi hasil instan berbasis analitik modern.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="landing-cta-primary"
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base transition-all duration-300 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Mulai Ujian Sekarang</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              id="landing-cta-secondary"
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-base transition-all duration-300 active:scale-95 flex items-center justify-center"
            >
              Portal Demo Guru & Admin
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800/60 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all duration-200"
                >
                  <div className={`p-4 rounded-2xl shrink-0 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white font-mono">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-slate-400 dark:text-slate-500 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Fitur Utama Ekosistem {systemName}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Sistem terintegrasi yang dirancang khusus untuk mempermudah kegiatan belajar-mengajar di era digital secara aman dan transparan.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white mb-6 shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-400 dark:text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Partners / Trusted Section */}
      <section className="py-16 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-200/50 dark:border-slate-800/40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">
            DIPERCAYA OLEH SATUAN PENDIDIKAN UNGGULAN
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70">
            {partners.map((partner, idx) => (
              <span
                key={idx}
                className="text-sm md:text-base font-semibold text-slate-600 dark:text-slate-400 hover:opacity-100 transition-opacity cursor-default font-mono"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Call to Action */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Tingkatkan Standar Kelulusan Sekolah Anda Sekarang
          </h2>
          <p className="text-blue-200/80 max-w-xl mx-auto text-sm md:text-base mb-10 leading-relaxed">
            Bergabunglah dengan ratusan sekolah yang telah berhasil mengintegrasikan evaluasi Try Out berbasis teknologi bersama AeroTryOut Pro.
          </p>
          <button
            id="landing-bottom-cta"
            onClick={onStart}
            className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold transition-all duration-300 shadow-2xl active:scale-95 inline-flex items-center gap-2"
          >
            <span>Daftar / Masuk ke Portal</span>
            <ArrowRight className="w-5 h-5 text-slate-900" />
          </button>
        </div>
      </section>

      {/* Modern Compact Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400 text-xs border-t border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p>© 2026 {systemName}. Dikembangkan oleh Software House Indonesia. Lisensi Terbuka MIT.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Dokumentasi</a>
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Kontak Kami</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
