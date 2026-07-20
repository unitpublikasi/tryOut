/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import {
  BarChart3,
  Award,
  Users,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  FileDown,
  ChevronRight
} from 'lucide-react';
import { Submission, Tryout } from '../types';

interface AnalyticsReportProps {
  submissions: Submission[];
  tryouts: Tryout[];
  onDeleteSubmission?: (id: string) => void;
}

export default function AnalyticsReport({ submissions, tryouts, onDeleteSubmission }: AnalyticsReportProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('All');

  // 1. Calculate aggregated statistics
  const totalSubmissions = submissions.length;
  const averageScore = totalSubmissions > 0
    ? Math.round(submissions.reduce((sum, s) => sum + s.score, 0) / totalSubmissions)
    : 0;
  
  const passedCount = submissions.filter((s) => s.isPassed).length;
  const passRate = totalSubmissions > 0 ? Math.round((passedCount / totalSubmissions) * 100) : 0;

  // 2. Prepare Chart Data - Score Ranges Histogram
  const ranges = [
    { name: '0-50', count: 0 },
    { name: '51-65', count: 0 },
    { name: '66-75', count: 0 },
    { name: '76-85', count: 0 },
    { name: '86-100', count: 0 },
  ];

  submissions.forEach((s) => {
    if (s.score <= 50) ranges[0].count++;
    else if (s.score <= 65) ranges[1].count++;
    else if (s.score <= 75) ranges[2].count++;
    else if (s.score <= 85) ranges[3].count++;
    else ranges[4].count++;
  });

  // 3. Prepare Chart Data - Pass vs Fail Pie
  const passFailData = [
    { name: 'Lulus (>= KKM)', value: passedCount, color: '#10B981' }, // emerald-500
    { name: 'Tidak Lulus', value: totalSubmissions - passedCount, color: '#EF4444' }, // red-500
  ];

  // 4. Prepare Chart Data - Average Scores by Subject/Category
  const categoryStats: Record<string, { totalScore: number; count: number }> = {};
  submissions.forEach((s) => {
    const to = tryouts.find((t) => t.id === s.tryoutId);
    const cat = to ? to.category : 'Umum';
    if (!categoryStats[cat]) {
      categoryStats[cat] = { totalScore: 0, count: 0 };
    }
    categoryStats[cat].totalScore += s.score;
    categoryStats[cat].count++;
  });

  const subjectChartData = Object.keys(categoryStats).map((cat) => ({
    subject: cat,
    rataRata: Math.round(categoryStats[cat].totalScore / categoryStats[cat].count),
  }));

  // Unique Classes for filtering
  const classes = ['All', ...Array.from(new Set(submissions.map((s) => s.studentClass).filter(Boolean)))];

  // Filtering submissions list
  const filteredSubmissions = submissions.filter((s) => {
    const matchesSearch = s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.tryoutTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === 'All' || s.studentClass === classFilter;
    return matchesSearch && matchesClass;
  });

  return (
    <div id="analytics-container" className="p-6 space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <span>Laporan & Analitik Hasil Try Out</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
            Pantau sebaran skor siswa, tingkat kelulusan per mata pelajaran, dan rekap nilai secara instan.
          </p>
        </div>
      </div>

      {/* Metrics Row in Professional Polish styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric Card 1: Total Partisipasi */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1 shadow-sm">
          <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Total Partisipasi</span>
          <div className="flex items-end justify-between mt-1">
            <span className="text-2xl font-bold text-slate-800 dark:text-white font-mono">{totalSubmissions} Siswa</span>
            <span className="text-blue-500 text-[10px] font-bold bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md">Siswa</span>
          </div>
        </div>

        {/* Metric Card 2: Rata-rata Nilai */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1 shadow-sm">
          <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Rata-Rata Nilai</span>
          <div className="flex items-end justify-between mt-1">
            <span className="text-2xl font-bold text-slate-800 dark:text-white font-mono">{averageScore} / 100</span>
            <span className="text-indigo-500 text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-md">Rata-Rata</span>
          </div>
        </div>

        {/* Metric Card 3: Kelulusan (KKM) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1 shadow-sm">
          <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Rasio Kelulusan</span>
          <div className="flex items-end justify-between mt-1">
            <span className="text-2xl font-bold text-slate-800 dark:text-white font-mono">{passRate}%</span>
            <span className="text-emerald-500 text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">Lulus</span>
          </div>
        </div>

        {/* Metric Card 4: Gagal (Di bawah KKM) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1 shadow-sm">
          <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Di Bawah KKM</span>
          <div className="flex items-end justify-between mt-1">
            <span className="text-2xl font-bold text-slate-800 dark:text-white font-mono">{totalSubmissions - passedCount} Siswa</span>
            <span className="text-red-500 text-[10px] font-bold bg-red-50 dark:bg-red-950/40 px-2.5 py-1 rounded-md">Remedi</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart A: Sebaran Skor Histogram (Bar) */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl col-span-1 lg:col-span-2">
          <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-6 uppercase tracking-wider font-mono">
            Distribusi Skor Try Out Siswa
          </h3>
          <div className="h-72 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ranges} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', color: '#fff', border: 'none' }}
                  cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} barSize={40} name="Jumlah Siswa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Kelulusan Ratio (Pie) */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wider font-mono">
              Rasio Kelulusan Siswa
            </h3>
            <div className="h-56 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={passFailData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {passFailData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', color: '#fff', border: 'none' }} />
                </PieChart>
              </ResponsiveContainer>
              {/* Inner Center Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-extrabold text-slate-800 dark:text-white font-mono">{passRate}%</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider font-mono">Lulus KKM</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            {passFailData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-500">
                  <span className="w-3 h-3 rounded-full block" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-bold font-mono text-slate-700 dark:text-slate-300">{item.value} Siswa</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recaps Table of Submissions */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl shadow-slate-100 dark:shadow-none">
        
        {/* Table Header Controls */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/20">
          <div>
            <span className="font-bold text-base text-slate-800 dark:text-white">Rekapitulasi Nilai Siswa</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 block mt-0.5">Daftar siswa yang telah menyelesaikan sesi Try Out.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari siswa/judul..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-60 pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Class filter dropdown */}
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="All">Semua Kelas</option>
              {classes.filter((c) => c !== 'All').map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Actual Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/10">
                <th className="py-4 px-6">Nama Siswa</th>
                <th className="py-4 px-6">Kelas</th>
                <th className="py-4 px-6">Judul Try Out</th>
                <th className="py-4 px-6 text-center">Score</th>
                <th className="py-4 px-6 text-center">Benar/Salah</th>
                <th className="py-4 px-6 text-center">Status Kelulusan</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs text-slate-600 dark:text-slate-400">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-800 dark:text-slate-200">{s.studentName}</td>
                    <td className="py-4 px-6 font-mono">{s.studentClass || '-'}</td>
                    <td className="py-4 px-6 font-medium max-w-[200px] truncate" title={s.tryoutTitle}>{s.tryoutTitle}</td>
                    <td className="py-4 px-6 text-center font-extrabold font-mono text-sm text-slate-800 dark:text-slate-100">{s.score}</td>
                    <td className="py-4 px-6 text-center font-mono">
                      <span className="text-emerald-500 font-bold">{s.correctCount}B</span>
                      <span className="text-slate-300 dark:text-slate-600 mx-1">/</span>
                      <span className="text-red-500 font-bold">{s.wrongCount}S</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase inline-block ${
                        s.isPassed
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600'
                          : 'bg-red-50 dark:bg-red-950/40 text-red-500'
                      }`}>
                        {s.isPassed ? 'Lulus KKM' : 'Tidak Lulus'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {onDeleteSubmission && (
                        <button
                          id={`delete-sub-btn-${s.id}`}
                          onClick={() => {
                            if (confirm(`Yakin ingin menghapus rekam ujian ${s.studentName}?`)) {
                              onDeleteSubmission(s.id);
                            }
                          }}
                          className="px-2.5 py-1.5 rounded-lg border border-red-200 dark:border-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/35 transition-all text-[11px] font-bold active:scale-95"
                        >
                          Hapus Rekam
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400 font-mono italic">
                    Belum ada riwayat pengerjaan yang terekam atau filter pencarian tidak cocok.
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
