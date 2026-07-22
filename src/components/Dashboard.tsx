/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  GraduationCap,
  FolderPlus,
  BookOpen,
  Users,
  Award,
  CheckCircle,
  Clock,
  Play,
  Check,
  Plus,
  Trash2,
  Calendar,
  X,
  FileSpreadsheet,
  Edit2,
  Search,
  Shuffle,
  Filter,
  Sparkles,
  Trophy,
  Crown,
  ChevronRight
} from 'lucide-react';
import { User, Tryout, Submission, Question } from '../types';

interface DashboardProps {
  user: User;
  tryouts: Tryout[];
  submissions: Submission[];
  questions: Question[];
  onStartTryout: (tryout: Tryout) => void;
  onViewResult: (submission: Submission) => void;
  onAddTryout: (newTryout: Tryout) => void;
  onUpdateTryout: (updatedTryout: Tryout) => void;
  onDeleteTryout: (id: string) => void;
  onTogglePublish: (id: string) => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  onNavigate?: (page: string) => void;
}

export default function Dashboard({
  user,
  tryouts,
  submissions,
  questions,
  onStartTryout,
  onViewResult,
  onAddTryout,
  onUpdateTryout,
  onDeleteTryout,
  onTogglePublish,
  onToast,
  onNavigate,
}: DashboardProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'tryouts' | 'activities'>('tryouts');

  // Form states for scheduling/editing a Tryout
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [duration, setDuration] = useState<number>(30);
  const [passingGrade, setPassingGrade] = useState<number>(75);
  const [category, setCategory] = useState('Matematika');
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  // Editing tryout pointer (null if creating, Tryout object if editing)
  const [editingTryout, setEditingTryout] = useState<Tryout | null>(null);

  // Question Import / Selection helper filters in Modal
  const [modalSearchTerm, setModalSearchTerm] = useState('');
  const [modalCategoryFilter, setModalCategoryFilter] = useState('Matematika');
  const [modalDifficultyFilter, setModalDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [randomCount, setRandomCount] = useState<number>(5);

  // Filters
  const studentSubmissions = submissions.filter((s) => s.studentId === user.id);

  const handleCheckboxChange = (qId: string) => {
    setSelectedQuestionIds((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
  };

  const handleOpenCreateModal = () => {
    setEditingTryout(null);
    setTitle('');
    setDesc('');
    setDuration(30);
    setPassingGrade(75);
    setCategory('Matematika');
    setSelectedQuestionIds([]);
    setModalCategoryFilter('Matematika');
    setModalSearchTerm('');
    setModalDifficultyFilter('all');
    setShowCreateModal(true);
  };

  const handleOpenEditModal = (t: Tryout) => {
    setEditingTryout(t);
    setTitle(t.title);
    setDesc(t.description);
    setDuration(t.durationMinutes);
    setPassingGrade(t.passingGrade);
    setCategory(t.category);
    setSelectedQuestionIds(t.questions.map((q) => q.id));
    setModalCategoryFilter(t.category);
    setModalSearchTerm('');
    setModalDifficultyFilter('all');
    setShowCreateModal(true);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setModalCategoryFilter(newCategory);
  };

  // Filtered available questions list for select in modal
  const filteredModalQuestions = questions.filter((q) => {
    const matchesSearch = q.text.toLowerCase().includes(modalSearchTerm.toLowerCase());
    const matchesCategory = modalCategoryFilter === 'all' || q.category === modalCategoryFilter;
    const matchesDifficulty = modalDifficultyFilter === 'all' || q.difficulty === modalDifficultyFilter;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Bulk operation actions
  const handleSelectAllFiltered = () => {
    const filteredIds = filteredModalQuestions.map((q) => q.id);
    setSelectedQuestionIds((prev) => {
      const union = new Set([...prev, ...filteredIds]);
      return Array.from(union);
    });
    onToast(`Berhasil memilih ${filteredModalQuestions.length} butir soal terfilter!`, 'success');
  };

  const handleDeselectAllFiltered = () => {
    const filteredIds = filteredModalQuestions.map((q) => q.id);
    setSelectedQuestionIds((prev) => prev.filter((id) => !filteredIds.includes(id)));
    onToast('Batal memilih soal-soal terfilter.', 'info');
  };

  const handleSelectRandom = () => {
    if (filteredModalQuestions.length === 0) {
      onToast('Tidak ada soal dalam daftar terfilter untuk dipilih secara acak.', 'error');
      return;
    }
    const countToPick = Math.min(randomCount, filteredModalQuestions.length);
    if (countToPick <= 0) {
      onToast('Masukkan jumlah acak yang valid!', 'error');
      return;
    }

    const shuffled = [...filteredModalQuestions].sort(() => 0.5 - Math.random());
    const pickedIds = shuffled.slice(0, countToPick).map((q) => q.id);

    setSelectedQuestionIds((prev) => {
      const union = new Set([...prev, ...pickedIds]);
      return Array.from(union);
    });
    onToast(`Berhasil memilih ${countToPick} butir soal secara acak!`, 'success');
  };

  const handleScheduleTryout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || selectedQuestionIds.length === 0) {
      onToast('Mohon lengkapi judul dan pilih minimal 1 butir soal!', 'error');
      return;
    }

    const compiledQuestions = questions.filter((q) => selectedQuestionIds.includes(q.id));

    if (editingTryout) {
      // UPDATE Tryout CRUD
      const updatedTryout: Tryout = {
        ...editingTryout,
        title: title.trim(),
        description: desc || 'Ujian evaluasi Try Out sekolah berkala.',
        durationMinutes: Number(duration),
        passingGrade: Number(passingGrade),
        category,
        questions: compiledQuestions,
      };
      onUpdateTryout(updatedTryout);
      setShowCreateModal(false);
    } else {
      // CREATE Tryout
      const newTryout: Tryout = {
        id: `to-${Date.now()}`,
        title: title.trim(),
        description: desc || 'Ujian evaluasi Try Out sekolah berkala.',
        durationMinutes: Number(duration),
        passingGrade: Number(passingGrade),
        category,
        questions: compiledQuestions,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days validity
        createdBy: user.id,
        isPublished: true,
      };

      onAddTryout(newTryout);
      setShowCreateModal(false);
      onToast(`Ujian Try Out "${title}" berhasil dijadwalkan dan dipublikasi!`, 'success');
    }

    // Reset Form
    setTitle('');
    setDesc('');
    setDuration(30);
    setPassingGrade(75);
    setSelectedQuestionIds([]);
    setEditingTryout(null);
  };

  return (
    <div id="dashboard-container" className="p-6 space-y-6">
      
      {/* 1. GREETING ROW */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm relative overflow-hidden transition-all duration-300">
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none" />
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
            Selamat Datang, {user.fullName}!
          </h2>
          <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 mt-1">
            {user.role === 'siswa'
              ? `Akses ujian aktif, pantau skor kelulusan, dan lihat pembahasan kunci Try Out Anda di sini.`
              : `Kelola jadwal ujian aktif, buat bank soal baru, dan monitor pencapaian nilai siswa secara real-time.`}
          </p>
        </div>
        <span className="px-4 py-1.5 rounded-full text-xs font-bold font-mono uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
          Tahun Ajaran 2026/2027
        </span>
      </div>

      {/* 2. DYNAMIC LAYOUT BASED ON ROLE */}
      {user.role === 'siswa' ? (
        /* SISWA (STUDENT) VIEWPORT */
        <div className="space-y-6">
          {/* Metrics cards row in Professional Polish styling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Ujian Diikuti</span>
              <div className="flex items-end justify-between mt-1">
                <span className="text-2xl font-bold text-slate-800 dark:text-white font-mono">{studentSubmissions.length} Sesi</span>
                <span className="text-blue-500 text-[10px] font-bold bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md">Aktif</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Rata-Rata Nilai</span>
              <div className="flex items-end justify-between mt-1">
                <span className="text-2xl font-bold text-slate-800 dark:text-white font-mono">
                  {studentSubmissions.length > 0
                    ? Math.round(studentSubmissions.reduce((sum, s) => sum + s.score, 0) / studentSubmissions.length)
                    : 0}
                </span>
                <span className="text-indigo-500 text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-md">Skor</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Kelulusan (KKM)</span>
              <div className="flex items-end justify-between mt-1">
                <span className="text-2xl font-bold text-slate-800 dark:text-white font-mono">
                  {studentSubmissions.filter((s) => s.isPassed).length} Ujian
                </span>
                <span className="text-emerald-500 text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">Lulus</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Akurasi Rata-rata</span>
              <div className="flex items-end justify-between mt-1">
                <span className="text-2xl font-bold text-slate-800 dark:text-white font-mono">
                  {studentSubmissions.length > 0
                    ? Math.round(
                        (studentSubmissions.reduce((sum, s) => sum + s.correctCount, 0) /
                          studentSubmissions.reduce((sum, s) => sum + (s.correctCount + s.wrongCount), 0)) *
                          100
                      ) || 0
                    : 0}%
                </span>
                <span className="text-amber-500 text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-md">Akurasi</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Active Tryouts */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono border-b border-slate-100 dark:border-slate-800 pb-2">
                Daftar Ujian Try Out Tersedia
              </h3>

              <div id="tryouts-grid" className="space-y-4">
                {tryouts.filter((t) => t.isPublished).length > 0 ? (
                  tryouts.filter((t) => t.isPublished).map((t) => {
                    const hasTaken = studentSubmissions.some((s) => s.tryoutId === t.id);
                    return (
                      <div
                        key={t.id}
                        className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-lg transition-all"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="px-2.5 py-0.5 text-[10px] font-bold rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-mono">
                              {t.category.toUpperCase()}
                            </span>
                            {t.schoolLevel && (
                              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 font-mono uppercase">
                                {t.schoolLevel}
                              </span>
                            )}
                            <span className="text-xs text-slate-400 font-mono font-bold">KKM: {t.passingGrade}</span>
                          </div>
                          <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base">{t.title}</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">{t.description}</p>
                          
                          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono mt-1">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-500" /> {t.durationMinutes} Menit</span>
                            <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-indigo-500" /> {t.questions.length} Butir Soal</span>
                          </div>
                        </div>

                        <div className="shrink-0 w-full md:w-auto mt-2 md:mt-0">
                          {hasTaken ? (
                            <div className="flex flex-col items-end gap-1">
                              <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                                <Check className="w-4 h-4" /> Sudah Dikerjakan
                              </span>
                              <button
                                id={`review-btn-${t.id}`}
                                onClick={() => {
                                  const sub = studentSubmissions.find((s) => s.tryoutId === t.id);
                                  if (sub) onViewResult(sub);
                                }}
                                className="text-[11px] text-blue-500 hover:underline font-bold"
                              >
                                Lihat Lembar Pembahasan
                              </button>
                            </div>
                          ) : (
                            <button
                              id={`start-exam-btn-${t.id}`}
                              onClick={() => {
                                if (t.questions.length === 0) {
                                  onToast('Gagal: Tryout ini belum memiliki butir soal!', 'error');
                                  return;
                                }
                                onStartTryout(t);
                              }}
                              className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all active:scale-95 shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Mulai Mengerjakan</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 bg-white rounded-3xl border text-slate-400 text-xs italic font-mono">
                    Belum ada jadwal ujian Try Out terdaftar saat ini.
                  </div>
                )}
              </div>
            </div>

            {/* Historical Submissions & Quick Ranking */}
            <div className="lg:col-span-5 space-y-6">
              {/* Leaderboard Top 5 Preview Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <h3 className="font-bold text-xs uppercase tracking-wider font-mono text-slate-800 dark:text-slate-200">
                      Papan Ranking Hasil Try Out
                    </h3>
                  </div>
                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate('siswa-ranking')}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                    >
                      <span>Lihat Semua</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {submissions.filter((s) => s.status === 'completed' || s.score !== undefined).length > 0 ? (
                    [...submissions]
                      .filter((s) => s.status === 'completed' || s.score !== undefined)
                      .sort((a, b) => b.score - a.score)
                      .slice(0, 4)
                      .map((sub, index) => {
                        const isMe = sub.studentId === user.id;
                        return (
                          <div
                            key={`top-rank-${sub.id}-${index}`}
                            className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                              isMe
                                ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800'
                                : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold font-mono text-xs shrink-0 ${
                                index === 0
                                  ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-600 border border-amber-300'
                                  : index === 1
                                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                                  : index === 2
                                  ? 'bg-amber-900/10 text-amber-800 dark:text-amber-400'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                              }`}>
                                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                              </span>
                              <div className="min-w-0">
                                <div className="font-bold text-slate-800 dark:text-slate-200 truncate flex items-center gap-1">
                                  <span>{sub.studentName}</span>
                                  {isMe && (
                                    <span className="text-[8px] bg-blue-600 text-white px-1 py-0.2 rounded font-mono font-normal">
                                      Anda
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono truncate">
                                  {sub.studentClass || 'Siswa'} &bull; {sub.tryoutTitle}
                                </div>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="font-bold font-mono text-slate-800 dark:text-slate-100 text-sm">
                                {sub.score}
                              </span>
                              <span className="text-[9px] text-slate-400 block font-mono">Skor</span>
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <div className="text-center py-6 text-slate-400 font-mono text-xs italic">
                      Belum ada perolehan skor terdaftar.
                    </div>
                  )}
                </div>
              </div>

              {/* Historical Submissions */}
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono border-b border-slate-100 dark:border-slate-800 pb-2">
                  Riwayat & Lembar Nilai Anda
                </h3>

              <div className="space-y-3">
                {studentSubmissions.length > 0 ? (
                  studentSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-4 hover:shadow"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <h5 className="font-semibold text-slate-800 dark:text-slate-200 text-xs md:text-sm truncate" title={sub.tryoutTitle}>
                          {sub.tryoutTitle}
                        </h5>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                          <span>{new Date(sub.submitTime).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className={sub.isPassed ? 'text-emerald-500 font-bold' : 'text-red-500 font-bold'}>
                            {sub.isPassed ? 'LULUS KKM' : 'DI BAWAH KKM'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-extrabold text-slate-800 dark:text-slate-100 text-base font-mono bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                          {sub.score}
                        </span>
                        <button
                          id={`history-detail-btn-${sub.id}`}
                          onClick={() => onViewResult(sub)}
                          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all text-slate-400 hover:text-blue-600"
                          title="Review Answers"
                        >
                          <CheckCircle className="w-5 h-5 text-blue-500" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-3xl border text-slate-400 text-xs italic font-mono">
                    Anda belum menyelesaikan satu pun Try Out.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        /* GURU (TEACHER) & ADMIN VIEWPORT */
        <div className="space-y-6">
          {/* Metrics row in Professional Polish styling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Total Try Out</span>
              <div className="flex items-end justify-between mt-1">
                <span className="text-2xl font-bold text-slate-800 dark:text-white font-mono">{tryouts.length} Paket</span>
                <span className="text-blue-500 text-[10px] font-bold bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md">Jadwal</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Bank Soal Aktif</span>
              <div className="flex items-end justify-between mt-1">
                <span className="text-2xl font-bold text-slate-800 dark:text-white font-mono">{questions.length} Butir</span>
                <span className="text-indigo-500 text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-md">Soal</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Total Ujian Masuk</span>
              <div className="flex items-end justify-between mt-1">
                <span className="text-2xl font-bold text-slate-800 dark:text-white font-mono">{submissions.length} Sesi</span>
                <span className="text-emerald-500 text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">Siswa</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Ketuntasan (KKM)</span>
              <div className="flex items-end justify-between mt-1">
                <span className="text-2xl font-bold text-slate-800 dark:text-white font-mono">
                  {submissions.length > 0
                    ? Math.round((submissions.filter((s) => s.isPassed).length / submissions.length) * 100)
                    : 0}%
                </span>
                <span className="text-amber-500 text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-md">Lulus</span>
              </div>
            </div>
          </div>

          {/* Teacher Navigation Tabs */}
          <div className="border-b border-slate-200 dark:border-slate-800 flex items-center space-x-6">
            <button
              onClick={() => setActiveTab('tryouts')}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === 'tryouts'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
              }`}
            >
              Manajemen Try Out
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === 'activities'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
              }`}
            >
              Aktivitas Selesai Siswa
            </button>
          </div>

          {activeTab === 'tryouts' ? (
            /* TRYOUTS MANAGER */
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-slate-400 uppercase tracking-wider font-mono">Daftar Jadwal Penyelenggaraan</span>
                <button
                  id="open-schedule-modal-btn"
                  onClick={handleOpenCreateModal}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center gap-1 shadow-md shadow-blue-500/10"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Jadwalkan Try Out</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tryouts.map((t) => (
                  <div
                    key={t.id}
                    className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2.5">
                        <span className="px-2.5 py-0.5 text-[9px] font-bold rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-mono uppercase">
                          {t.category}
                        </span>

                        {/* Publish/Draft toggle indicator */}
                        <button
                          id={`toggle-publish-btn-${t.id}`}
                          onClick={() => onTogglePublish(t.id)}
                          className={`px-2.5 py-0.5 text-[9px] font-bold rounded uppercase transition-all ${
                            t.isPublished
                              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {t.isPublished ? 'Published' : 'Draft (Hidden)'}
                        </button>
                      </div>

                      <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base leading-snug">{t.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex gap-4 font-mono text-[10px]">
                        <span>{t.durationMinutes} Menit</span>
                        <span>{t.questions.length} Soal</span>
                        <span className="font-bold">KKM: {t.passingGrade}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          id={`edit-tryout-btn-${t.id}`}
                          onClick={() => handleOpenEditModal(t)}
                          className="p-1.5 text-slate-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/25 transition-all"
                          title="Sunting Jadwal Try Out"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          id={`delete-tryout-btn-${t.id}`}
                          onClick={() => {
                            if (confirm(`Yakin ingin menghapus jadwal Try Out "${t.title}"?`)) {
                              onDeleteTryout(t.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/25 transition-all"
                          title="Delete Tryout Schedule"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* RECENT STUDENT SUBMISSIONS FEED */
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/20">
                      <th className="py-4 px-6">Nama Siswa</th>
                      <th className="py-4 px-6">Kelas</th>
                      <th className="py-4 px-6">Nama Try Out</th>
                      <th className="py-4 px-6 text-center">Skor</th>
                      <th className="py-4 px-6 text-center">Status Kelulusan</th>
                      <th className="py-4 px-6 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs text-slate-600 dark:text-slate-400">
                    {submissions.length > 0 ? (
                      submissions.slice(-6).reverse().map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                          <td className="py-4 px-6 font-semibold text-slate-800 dark:text-slate-100">{s.studentName}</td>
                          <td className="py-4 px-6 font-mono">{s.studentClass || '-'}</td>
                          <td className="py-4 px-6 font-medium max-w-[200px] truncate">{s.tryoutTitle}</td>
                          <td className="py-4 px-6 text-center font-bold font-mono text-sm text-slate-800 dark:text-slate-200">{s.score}</td>
                          <td className="py-4 px-6 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase inline-block ${
                              s.isPassed
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600'
                                : 'bg-red-50 dark:bg-red-950/40 text-red-500'
                            }`}>
                              {s.isPassed ? 'Lulus' : 'Gagal'}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              id={`view-detail-btn-${s.id}`}
                              onClick={() => onViewResult(s)}
                              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-[11px]"
                            >
                              Tinjau Jawaban
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-slate-400 font-mono italic">
                          Belum ada aktivitas pengerjaan terdaftar saat ini.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SCHEDULE TRYOUT MODAL OVERLAY */}
      {showCreateModal && (
        <div id="schedule-modal" className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl relative my-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-blue-600" />
                <span>{editingTryout ? 'Edit Jadwal & Distribusi Try Out' : 'Buat Jadwal & Distribusi Try Out'}</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleScheduleTryout} className="space-y-5">
              
              {/* Title Input */}
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Judul Try Out</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Try Out Utama Biologi Seluler XII-IPA"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Deskripsi Ujian (Petunjuk Singkat)</label>
                <textarea
                  placeholder="Ketik deskripsi atau instruksi pengerjaan bagi siswa..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Duration, KKM & Category Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Durasi (Menit)</label>
                  <input
                    type="number"
                    required
                    min={5}
                    max={180}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">KKM Kelulusan</label>
                  <input
                    type="number"
                    required
                    min={10}
                    max={100}
                    value={passingGrade}
                    onChange={(e) => setPassingGrade(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Mata Pelajaran</label>
                  <select
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Matematika">Matematika</option>
                    <option value="Fisika">Fisika</option>
                    <option value="Biologi">Biologi</option>
                    <option value="Kimia">Kimia</option>
                    <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                    <option value="Bahasa Inggris">Bahasa Inggris</option>
                  </select>
                </div>
              </div>

              {/* Upgraded Import & Select Section from Question Bank */}
              <div className="space-y-3.5 bg-slate-50/50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
                  <div>
                    <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                      Import & Pilih Soal dari Bank Soal
                    </span>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      Cari, filter, dan pilih butir-butir soal ujian secara manual atau otomatis.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md shrink-0 self-start sm:self-auto">
                    {selectedQuestionIds.length} Soal Terpilih
                  </span>
                </div>

                {/* Filters Row inside modal */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {/* Search Term */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Cari teks soal..."
                      value={modalSearchTerm}
                      onChange={(e) => setModalSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 rounded-lg text-xs focus:outline-none focus:border-blue-500"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Category Filter */}
                  <div>
                    <select
                      value={modalCategoryFilter}
                      onChange={(e) => setModalCategoryFilter(e.target.value)}
                      className="w-full px-2.5 py-2 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 rounded-lg text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="all">Semua Mapel</option>
                      <option value="Matematika">Matematika</option>
                      <option value="Fisika">Fisika</option>
                      <option value="Biologi">Biologi</option>
                      <option value="Kimia">Kimia</option>
                      <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                      <option value="Bahasa Inggris">Bahasa Inggris</option>
                    </select>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <select
                      value={modalDifficultyFilter}
                      onChange={(e) => setModalDifficultyFilter(e.target.value as any)}
                      className="w-full px-2.5 py-2 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 rounded-lg text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="all">Semua Kesulitan</option>
                      <option value="easy">Mudah</option>
                      <option value="medium">Sedang</option>
                      <option value="hard">Sukar / Hard</option>
                    </select>
                  </div>
                </div>

                {/* Bulk Actions Block */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-850 p-3 rounded-xl border border-slate-200/50 dark:border-slate-750 text-xs">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleSelectAllFiltered}
                      disabled={filteredModalQuestions.length === 0}
                      className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 text-slate-700 dark:text-slate-300 font-semibold rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-all text-[11px]"
                    >
                      Pilih Semua ({filteredModalQuestions.length})
                    </button>
                    <button
                      type="button"
                      onClick={handleDeselectAllFiltered}
                      disabled={filteredModalQuestions.length === 0}
                      className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 text-slate-700 dark:text-slate-300 font-semibold rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-all text-[11px]"
                    >
                      Kosongkan
                    </button>
                  </div>

                  {/* Random Import Section */}
                  <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 p-1 rounded-lg border border-slate-200/50 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider font-mono px-1.5 shrink-0">
                      Acak:
                    </span>
                    <input
                      type="number"
                      min={1}
                      max={questions.length || 50}
                      value={randomCount}
                      onChange={(e) => setRandomCount(Math.max(1, Number(e.target.value)))}
                      className="w-10 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 rounded py-0.5 px-1 text-center text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleSelectRandom}
                      className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] uppercase transition-all flex items-center gap-1"
                    >
                      <Shuffle className="w-3 h-3" />
                      <span>Ambil</span>
                    </button>
                  </div>
                </div>

                {/* Display Area for Filtered Questions list */}
                <div className="max-h-[180px] overflow-y-auto space-y-2 pr-1 text-xs">
                  {filteredModalQuestions.length > 0 ? (
                    filteredModalQuestions.map((q) => {
                      const isSelected = selectedQuestionIds.includes(q.id);
                      return (
                        <label
                          key={q.id}
                          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/60 shadow-sm'
                              : 'bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-slate-200/60 dark:border-slate-750'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleCheckboxChange(q.id)}
                            className="w-4 h-4 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs leading-relaxed">
                              {q.text}
                            </span>
                            <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400 font-mono">
                              <span className="px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md font-sans uppercase text-[8px] font-bold">
                                {q.category}
                              </span>
                              <span>•</span>
                              <span className="capitalize">Kesulitan: {q.difficulty}</span>
                              <span>•</span>
                              <span className="truncate">Opsi: {q.options.join(' | ')}</span>
                            </div>
                          </div>
                        </label>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 bg-white dark:bg-slate-850 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 italic text-xs">
                      Tidak ada butir soal dalam database yang cocok dengan kriteria filter di atas.
                    </div>
                  )}
                </div>
              </div>

              {/* Submit / Cancel block */}
              <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={selectedQuestionIds.length === 0}
                  className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-blue-500/10"
                >
                  {editingTryout ? 'Simpan Perubahan' : 'Simpan & Rilis Ujian'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
