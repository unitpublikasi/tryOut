/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Crown,
  Search,
  Filter,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  User as UserIcon,
  BookOpen,
  Eye,
  School,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { User, Tryout, Submission, SchoolLevel, Subject } from '../types';

interface RankingViewProps {
  currentUser: User;
  submissions: Submission[];
  tryouts: Tryout[];
  schoolLevels?: SchoolLevel[];
  subjects?: Subject[];
  onViewResult?: (submission: Submission) => void;
  onStartTryout?: (tryout: Tryout) => void;
}

export default function RankingView({
  currentUser,
  submissions,
  tryouts,
  schoolLevels = [],
  subjects = [],
  onViewResult,
  onStartTryout,
}: RankingViewProps) {
  const [selectedTryoutId, setSelectedTryoutId] = useState<string>('all');
  const [selectedSchoolLevel, setSelectedSchoolLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Completed submissions only
  const completedSubmissions = submissions.filter((s) => s.status === 'completed' || s.score !== undefined);

  // Filter submissions based on selection
  const filteredSubmissions = completedSubmissions.filter((sub) => {
    // Match Tryout ID
    if (selectedTryoutId !== 'all' && sub.tryoutId !== selectedTryoutId) return false;

    // Match Tryout metadata
    const associatedTryout = tryouts.find((t) => t.id === sub.tryoutId);

    if (selectedSchoolLevel !== 'all') {
      const tLevel = associatedTryout?.schoolLevel;
      if (tLevel && tLevel !== selectedSchoolLevel) return false;
    }

    if (selectedCategory !== 'all') {
      const tCat = associatedTryout?.category;
      if (tCat && tCat !== selectedCategory) return false;
    }

    // Match Search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const nameMatch = sub.studentName.toLowerCase().includes(term);
      const classMatch = sub.studentClass.toLowerCase().includes(term);
      const tryoutMatch = sub.tryoutTitle.toLowerCase().includes(term);
      if (!nameMatch && !classMatch && !tryoutMatch) return false;
    }

    return true;
  });

  // Sort ranked submissions: Score DESC, then Duration ASC, then submit time ASC
  const rankedSubmissions = [...filteredSubmissions].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // Calculate time taken if available
    const timeA = new Date(a.submitTime).getTime() - new Date(a.startTime).getTime();
    const timeB = new Date(b.submitTime).getTime() - new Date(b.startTime).getTime();
    if (timeA !== timeB && !isNaN(timeA) && !isNaN(timeB)) {
      return timeA - timeB; // Faster duration wins tie
    }
    return new Date(a.submitTime).getTime() - new Date(b.submitTime).getTime();
  });

  // Logged in student's rank details in filtered set
  const myRankIndex = rankedSubmissions.findIndex((s) => s.studentId === currentUser.id);
  const myBestSubmission = completedSubmissions
    .filter((s) => s.studentId === currentUser.id)
    .sort((a, b) => b.score - a.score)[0];

  // Helper for formatting duration
  const formatDuration = (startTimeStr: string, submitTimeStr: string) => {
    if (!startTimeStr || !submitTimeStr) return '-';
    const start = new Date(startTimeStr).getTime();
    const submit = new Date(submitTimeStr).getTime();
    const diffMs = submit - start;
    if (isNaN(diffMs) || diffMs <= 0) return '15m 00s';
    const minutes = Math.floor(diffMs / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  // Top 3 Podium Participants
  const top1 = rankedSubmissions[0];
  const top2 = rankedSubmissions[1];
  const top3 = rankedSubmissions[2];

  // Calculate Overall Statistics
  const totalParticipants = rankedSubmissions.length;
  const avgScore = totalParticipants > 0
    ? Math.round(rankedSubmissions.reduce((acc, curr) => acc + curr.score, 0) / totalParticipants)
    : 0;
  const highestScore = totalParticipants > 0 ? Math.max(...rankedSubmissions.map((s) => s.score)) : 0;
  const passRate = totalParticipants > 0
    ? Math.round((rankedSubmissions.filter((s) => s.isPassed).length / totalParticipants) * 100)
    : 0;

  return (
    <div id="ranking-view-container" className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 1. Header Section */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-amber-500/10 via-amber-500/5 to-transparent pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono uppercase bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/50">
                Leaderboard Siswa
              </span>
              <span className="text-xs text-slate-400 font-mono font-bold">Real-Time Update</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mt-1">
              Ranking & Papan Peringkat Try Out
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Pantau peringkat perolehan skor tertinggi, akurasi pengerjaan, dan prestasi akademik siswa secara transparan.
            </p>
          </div>
        </div>

        {currentUser.role === 'siswa' && (
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg font-mono">
              {myRankIndex !== -1 ? `#${myRankIndex + 1}` : '-'}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                Peringkat Anda
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {myBestSubmission ? `Skor Tertinggi: ${myBestSubmission.score}` : 'Belum Ada Hasil'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Logged In Student Performance Spotlight Card */}
      {currentUser.role === 'siswa' && (
        <div className="p-5 bg-gradient-to-r from-blue-900/90 via-slate-900 to-indigo-900 text-white rounded-3xl border border-blue-800/50 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none">
            <Award className="w-64 h-64 text-amber-300" />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-md shrink-0">
                <img src={currentUser.avatar} alt={currentUser.fullName} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold font-mono text-amber-300 uppercase tracking-wider">Pencapaian Pribadi</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                </div>
                <h3 className="text-lg font-bold text-white">{currentUser.fullName}</h3>
                <p className="text-xs text-blue-200 font-mono">
                  Kelas: {currentUser.schoolClass || 'Siswa'} &bull; Sekolah: {currentUser.schoolName || 'AeroTryOut'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] uppercase font-mono text-blue-200 block">Posisi Rank</span>
                <span className="text-lg font-bold text-amber-300 font-mono">
                  {myRankIndex !== -1 ? `#${myRankIndex + 1}` : '-'}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] uppercase font-mono text-blue-200 block">Total Diikuti</span>
                <span className="text-lg font-bold text-white font-mono">
                  {completedSubmissions.filter((s) => s.studentId === currentUser.id).length} Ujian
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] uppercase font-mono text-blue-200 block">Skor Terbaik</span>
                <span className="text-lg font-bold text-emerald-300 font-mono">
                  {myBestSubmission ? myBestSubmission.score : 0}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] uppercase font-mono text-blue-200 block">Status KKM</span>
                <span className="text-xs font-bold text-emerald-300 font-mono mt-1 block">
                  {myBestSubmission?.isPassed ? 'LULUS' : 'EVALUASI'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Stats Overview Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
              Total Peserta Terdaftar
            </span>
            <div className="text-2xl font-bold text-slate-800 dark:text-white font-mono mt-1">
              {totalParticipants} Siswa
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <UserIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
              Nilai Tertinggi (Top 1)
            </span>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-1">
              {highestScore} / 100
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Crown className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
              Rata-Rata Nilai Ujian
            </span>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 font-mono mt-1">
              {avgScore}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
              Tingkat Kelulusan
            </span>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono mt-1">
              {passRate}%
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 4. Top 3 Podium Cards Showcase */}
      {rankedSubmissions.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-500" />
            <span>Pemenang Top 3 Peringkat Tertinggi</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* 2nd Place - Silver */}
            <div className="order-2 md:order-1 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-3xl p-5 shadow-sm text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-400" />
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold font-mono text-lg mb-2 shadow-inner border border-slate-200 dark:border-slate-700">
                🥈 2
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-base truncate">
                {top2 ? top2.studentName : 'Belum Ada'}
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                {top2 ? `${top2.studentClass} • ${top2.tryoutTitle}` : '-'}
              </p>
              <div className="mt-3 py-2 px-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Skor:</span>
                <span className="font-bold font-mono text-slate-800 dark:text-slate-200 text-sm">
                  {top2 ? `${top2.score} / 100` : '-'}
                </span>
              </div>
            </div>

            {/* 1st Place - Gold */}
            <div className="order-1 md:order-2 bg-gradient-to-b from-amber-500/10 via-white to-white dark:from-amber-500/20 dark:via-slate-900 dark:to-slate-900 border-2 border-amber-400 dark:border-amber-500 rounded-3xl p-6 shadow-xl text-center relative overflow-hidden -translate-y-2">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-yellow-300" />
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-white font-bold font-mono text-xl mb-2 shadow-lg shadow-amber-500/30">
                🥇 1
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-[10px] font-bold font-mono uppercase mb-1">
                JUARA UTAMA
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-lg truncate">
                {top1 ? top1.studentName : 'Belum Ada'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {top1 ? `${top1.studentClass} • ${top1.tryoutTitle}` : '-'}
              </p>
              <div className="mt-4 py-2.5 px-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl flex items-center justify-between text-xs border border-amber-200/50">
                <span className="text-amber-700 dark:text-amber-300 font-mono font-bold">Skor Sempurna:</span>
                <span className="font-bold font-mono text-amber-600 dark:text-amber-400 text-base">
                  {top1 ? `${top1.score} / 100` : '-'}
                </span>
              </div>
            </div>

            {/* 3rd Place - Bronze */}
            <div className="order-3 bg-white dark:bg-slate-900 border-2 border-amber-800/40 dark:border-amber-900/60 rounded-3xl p-5 shadow-sm text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-700" />
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-900/10 text-amber-800 dark:text-amber-400 font-bold font-mono text-lg mb-2 shadow-inner border border-amber-700/20">
                🥉 3
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-base truncate">
                {top3 ? top3.studentName : 'Belum Ada'}
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                {top3 ? `${top3.studentClass} • ${top3.tryoutTitle}` : '-'}
              </p>
              <div className="mt-3 py-2 px-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Skor:</span>
                <span className="font-bold font-mono text-slate-800 dark:text-slate-200 text-sm">
                  {top3 ? `${top3.score} / 100` : '-'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Toolbar Filters & Search */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search bar */}
          <div className="relative lg:col-span-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama siswa / kelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Tryout selector */}
          <div>
            <select
              value={selectedTryoutId}
              onChange={(e) => setSelectedTryoutId(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="all">Semua Ujian Try Out</option>
              {tryouts.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title} ({t.category} - {t.schoolLevel || 'Umum'})
                </option>
              ))}
            </select>
          </div>

          {/* School Level selector */}
          <div>
            <select
              value={selectedSchoolLevel}
              onChange={(e) => setSelectedSchoolLevel(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="all">Semua Tingkat Sekolah</option>
              {schoolLevels.map((lvl) => (
                <option key={lvl.id} value={lvl.name}>
                  Tingkat {lvl.name}
                </option>
              ))}
              {!schoolLevels.some((sl) => sl.name === 'SD') && <option value="SD">Tingkat SD</option>}
              {!schoolLevels.some((sl) => sl.name === 'SMP') && <option value="SMP">Tingkat SMP</option>}
              {!schoolLevels.some((sl) => sl.name === 'SMA') && <option value="SMA">Tingkat SMA</option>}
            </select>
          </div>

          {/* Subject Category selector */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="all">Semua Mata Pelajaran</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.name}>
                  {sub.name}
                </option>
              ))}
              {!subjects.some((s) => s.name === 'Matematika') && <option value="Matematika">Matematika</option>}
              {!subjects.some((s) => s.name === 'Fisika') && <option value="Fisika">Fisika</option>}
              {!subjects.some((s) => s.name === 'Biologi') && <option value="Biologi">Biologi</option>}
              {!subjects.some((s) => s.name === 'Kimia') && <option value="Kimia">Kimia</option>}
            </select>
          </div>
        </div>
      </div>

      {/* 6. Leaderboard Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 uppercase font-mono">
              Tabel Klasemen Peringkat Siswa ({rankedSubmissions.length} Data)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Urutan: Skor Tertinggi &rarr; Waktu Tercepat
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-mono font-bold">
                <th className="py-3.5 px-4 text-center">Peringkat</th>
                <th className="py-3.5 px-4">Nama Siswa & Kelas</th>
                <th className="py-3.5 px-4">Judul Try Out</th>
                <th className="py-3.5 px-4 text-center">Skor Akhir</th>
                <th className="py-3.5 px-4 text-center">Akurasi Jawaban</th>
                <th className="py-3.5 px-4 text-center">Durasi Waktu</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                {onViewResult && <th className="py-3.5 px-4 text-center">Aksi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {rankedSubmissions.length > 0 ? (
                rankedSubmissions.map((sub, index) => {
                  const isCurrentUser = sub.studentId === currentUser.id;
                  const associatedTryout = tryouts.find((t) => t.id === sub.tryoutId);
                  const levelBadge = associatedTryout?.schoolLevel;

                  return (
                    <tr
                      key={sub.id}
                      className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                        isCurrentUser
                          ? 'bg-blue-50/70 dark:bg-blue-950/40 border-l-4 border-l-blue-600 font-medium'
                          : ''
                      }`}
                    >
                      {/* Rank Position */}
                      <td className="py-4 px-4 text-center font-bold font-mono">
                        {index === 0 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 font-bold border border-amber-300">
                            1
                          </span>
                        ) : index === 1 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-300">
                            2
                          </span>
                        ) : index === 2 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-900/10 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 font-bold border border-amber-800/30">
                            3
                          </span>
                        ) : (
                          <span className="text-slate-500">#{index + 1}</span>
                        )}
                      </td>

                      {/* Student Info */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 font-bold text-slate-600 dark:text-slate-300 font-mono">
                            {sub.studentName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                              <span>{sub.studentName}</span>
                              {isCurrentUser && (
                                <span className="px-1.5 py-0.2 bg-blue-600 text-white text-[9px] rounded font-mono font-normal">
                                  Anda
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              Kelas: {sub.studentClass || 'Siswa'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Tryout Title */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-700 dark:text-slate-300">
                          {sub.tryoutTitle}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {levelBadge && (
                            <span className="px-1.5 py-0.5 bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 text-[9px] font-bold rounded font-mono uppercase">
                              {levelBadge}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(sub.submitTime).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </td>

                      {/* Score */}
                      <td className="py-4 px-4 text-center font-bold font-mono text-base text-slate-800 dark:text-slate-100">
                        {sub.score}
                      </td>

                      {/* Accuracy */}
                      <td className="py-4 px-4 text-center">
                        <div className="font-mono font-bold text-slate-700 dark:text-slate-300">
                          {sub.correctCount} / {sub.correctCount + sub.wrongCount + sub.unansweredCount}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Benar: {sub.correctCount} | Salah: {sub.wrongCount}
                        </div>
                      </td>

                      {/* Duration */}
                      <td className="py-4 px-4 text-center font-mono text-slate-500 dark:text-slate-400">
                        {formatDuration(sub.startTime, sub.submitTime)}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 text-center">
                        {sub.isPassed ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold font-mono border border-emerald-200/50">
                            <CheckCircle2 className="w-3 h-3" /> LULUS
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-[10px] font-bold font-mono border border-red-200/50">
                            <XCircle className="w-3 h-3" /> REVAL
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      {onViewResult && (
                        <td className="py-4 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => onViewResult(sub)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 transition-colors inline-flex items-center justify-center"
                            title="Lihat Detail Pembahasan"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-mono text-xs">
                    Belum ada data pengerjakan Try Out yang memenuhi kriteria filter saat ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
