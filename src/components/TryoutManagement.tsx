/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FolderPlus,
  BookOpen,
  Clock,
  Check,
  Plus,
  Trash2,
  Calendar,
  X,
  Edit2,
  Search,
  Shuffle,
  Sparkles,
  Info
} from 'lucide-react';
import { User, Tryout, Question, Subject, SchoolLevel } from '../types';

interface TryoutManagementProps {
  user: User;
  tryouts: Tryout[];
  questions: Question[];
  subjects: Subject[];
  schoolLevels?: SchoolLevel[];
  onAddTryout: (newTryout: Tryout) => void;
  onUpdateTryout: (updatedTryout: Tryout) => void;
  onDeleteTryout: (id: string) => void;
  onTogglePublish: (id: string) => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export default function TryoutManagement({
  user,
  tryouts,
  questions,
  subjects,
  schoolLevels = [],
  onAddTryout,
  onUpdateTryout,
  onDeleteTryout,
  onTogglePublish,
  onToast,
}: TryoutManagementProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states for scheduling/editing a Tryout
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [duration, setDuration] = useState<number>(30);
  const [passingGrade, setPassingGrade] = useState<number>(75);
  const [category, setCategory] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('SMA');
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  // Sync default category from dynamic subjects list
  React.useEffect(() => {
    if (subjects && subjects.length > 0 && !category) {
      setCategory(subjects[0].name);
    }
  }, [subjects, category]);

  // Sync default school level from dynamic school levels list
  React.useEffect(() => {
    if (schoolLevels && schoolLevels.length > 0) {
      setSchoolLevel(schoolLevels[0].name);
    }
  }, [schoolLevels]);

  // Editing tryout pointer (null if creating, Tryout object if editing)
  const [editingTryout, setEditingTryout] = useState<Tryout | null>(null);

  // Question Import / Selection helper filters in Modal
  const [modalSearchTerm, setModalSearchTerm] = useState('');
  const [modalCategoryFilter, setModalCategoryFilter] = useState('all');
  const [modalDifficultyFilter, setModalDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [modalSchoolLevelFilter, setModalSchoolLevelFilter] = useState('all');
  const [randomCount, setRandomCount] = useState<number>(5);

  // Search filter for main Try Out list
  const [mainSearchTerm, setMainSearchTerm] = useState('');
  const [mainCategoryFilter, setMainCategoryFilter] = useState('all');
  const [mainSchoolLevelFilter, setMainSchoolLevelFilter] = useState('all');

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
    const firstCat = subjects[0]?.name || 'Matematika';
    const firstLevel = schoolLevels[0]?.name || 'SMA';
    setCategory(firstCat);
    setSchoolLevel(firstLevel);
    setSelectedQuestionIds([]);
    setModalCategoryFilter(firstCat); // match category automatically
    setModalSchoolLevelFilter(firstLevel); // match school level automatically
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
    setSchoolLevel(t.schoolLevel || 'SMA');
    setSelectedQuestionIds(t.questions.map((q) => q.id));
    setModalCategoryFilter(t.category);
    setModalSchoolLevelFilter(t.schoolLevel || 'all');
    setModalSearchTerm('');
    setModalDifficultyFilter('all');
    setShowCreateModal(true);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setModalCategoryFilter(newCategory);
  };

  const handleSchoolLevelChange = (newLevel: string) => {
    setSchoolLevel(newLevel);
    setModalSchoolLevelFilter(newLevel);
  };

  // Filtered available questions list for select in modal
  const filteredModalQuestions = questions.filter((q) => {
    const matchesSearch = q.text.toLowerCase().includes(modalSearchTerm.toLowerCase());
    const matchesCategory = modalCategoryFilter === 'all' || q.category === modalCategoryFilter;
    const matchesDifficulty = modalDifficultyFilter === 'all' || q.difficulty === modalDifficultyFilter;
    const matchesSchoolLevel = modalSchoolLevelFilter === 'all' || q.schoolLevel === modalSchoolLevelFilter;
    return matchesSearch && matchesCategory && matchesDifficulty && matchesSchoolLevel;
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
      const updatedTryout: Tryout = {
        ...editingTryout,
        title: title.trim(),
        description: desc || 'Ujian evaluasi Try Out sekolah berkala.',
        durationMinutes: Number(duration),
        passingGrade: Number(passingGrade),
        category,
        schoolLevel,
        questions: compiledQuestions,
      };
      onUpdateTryout(updatedTryout);
      setShowCreateModal(false);
    } else {
      const newTryout: Tryout = {
        id: `to-${Date.now()}`,
        title: title.trim(),
        description: desc || 'Ujian evaluasi Try Out sekolah berkala.',
        durationMinutes: Number(duration),
        passingGrade: Number(passingGrade),
        category,
        schoolLevel,
        questions: compiledQuestions,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
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

  // Filter main list of Try Outs
  const filteredTryouts = tryouts.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(mainSearchTerm.toLowerCase()) || 
                          t.description.toLowerCase().includes(mainSearchTerm.toLowerCase());
    const matchesCategory = mainCategoryFilter === 'all' || t.category === mainCategoryFilter;
    const matchesSchoolLevel = mainSchoolLevelFilter === 'all' || t.schoolLevel === mainSchoolLevelFilter;
    return matchesSearch && matchesCategory && matchesSchoolLevel;
  });

  const uniqueCategories = Array.from(new Set(tryouts.map((t) => t.category)));

  return (
    <div id="tryout-management-view" className="p-6 space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none" />
        <div className="text-center sm:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
            <FolderPlus className="w-6 h-6 text-indigo-500" />
            <span>Manajemen & Penyelenggaraan Try Out</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 mt-1">
            Gunakan panel ini untuk mengelola jadwal ujian, menyusun paket soal, memantau KKM, dan mengatur status rilis Try Out secara real-time.
          </p>
        </div>
        <button
          id="btn-schedule-new-tryout"
          onClick={handleOpenCreateModal}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs md:text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-500/15 flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Jadwalkan Try Out</span>
        </button>
      </div>

      {/* Control Filters Area */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Cari nama try out..."
              value={mainSearchTerm}
              onChange={(e) => setMainSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Category Dropdown */}
          <div className="relative w-full sm:w-48">
            <select
              value={mainCategoryFilter}
              onChange={(e) => setMainCategoryFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Semua Mata Pelajaran</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* School Level Dropdown */}
          <div className="relative w-full sm:w-48">
            <select
              value={mainSchoolLevelFilter}
              onChange={(e) => setMainSchoolLevelFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Semua Tingkat Sekolah</option>
              {schoolLevels.map((lvl) => (
                <option key={lvl.id} value={lvl.name}>{lvl.name}</option>
              ))}
              {!schoolLevels.some(sl => sl.name === 'SD') && <option value="SD">SD</option>}
              {!schoolLevels.some(sl => sl.name === 'SMP') && <option value="SMP">SMP</option>}
              {!schoolLevels.some(sl => sl.name === 'SMA') && <option value="SMA">SMA</option>}
            </select>
          </div>
        </div>

        {/* Counter Info */}
        <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
          TERTAMPIL: {filteredTryouts.length} dari {tryouts.length} Paket Ujian
        </span>
      </div>

      {/* Tryouts List Grid */}
      <div id="tryouts-crud-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTryouts.length > 0 ? (
          filteredTryouts.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2.5 py-0.5 text-[9px] font-bold rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-mono uppercase tracking-wider">
                      {t.category}
                    </span>
                    {t.schoolLevel && (
                      <span className="px-2.5 py-0.5 text-[9px] font-bold rounded bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 font-mono uppercase tracking-wider">
                        {t.schoolLevel}
                      </span>
                    )}
                  </div>

                  {/* Publish/Draft toggle button */}
                  <button
                    id={`btn-toggle-status-${t.id}`}
                    onClick={() => onTogglePublish(t.id)}
                    className={`px-2.5 py-0.5 text-[9px] font-extrabold rounded uppercase transition-all shadow-sm ${
                      t.isPublished
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50 dark:bg-emerald-950/20 dark:border-emerald-900/30'
                        : 'bg-amber-50 text-amber-600 border border-amber-200/50 dark:bg-amber-950/20 dark:border-amber-900/30'
                    }`}
                    title="Klik untuk mengubah status rilis"
                  >
                    {t.isPublished ? '● Published' : '○ Draft (Hidden)'}
                  </button>
                </div>

                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm md:text-base leading-snug tracking-tight">
                  {t.title}
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                  {t.description}
                </p>
              </div>

              {/* Footer info & Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3.5">
                {/* Specs row */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span>{t.durationMinutes} Menit</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-violet-500" />
                    <span>{t.questions.length} Soal</span>
                  </span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    KKM: <span className="text-emerald-500 font-extrabold">{t.passingGrade}</span>
                  </span>
                </div>

                {/* CRUD button handlers */}
                <div className="flex gap-2">
                  <button
                    id={`btn-edit-tryout-${t.id}`}
                    onClick={() => handleOpenEditModal(t)}
                    className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Sunting</span>
                  </button>
                  <button
                    id={`btn-delete-tryout-${t.id}`}
                    onClick={() => {
                      if (confirm(`Yakin ingin menghapus jadwal Try Out "${t.title}"? Tindakan ini tidak dapat dibatalkan.`)) {
                        onDeleteTryout(t.id);
                      }
                    }}
                    className="p-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 border border-red-200/50 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-xl transition-all active:scale-95"
                    title="Hapus Try Out"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-slate-400 italic text-xs font-mono">
            Tidak ada Try Out terdaftar yang cocok dengan kriteria filter Anda.
          </div>
        )}
      </div>

      {/* SCHEDULE TRYOUT MODAL OVERLAY */}
      {showCreateModal && (
        <div id="schedule-tryout-modal-overlay" className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl relative my-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-indigo-500" />
                <span>{editingTryout ? 'Edit Paket & Distribusi Try Out' : 'Jadwalkan Paket Try Out Baru'}</span>
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
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-indigo-500 text-black font-semibold"
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
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-indigo-500 resize-none text-black font-semibold"
                />
              </div>

              {/* Duration, KKM, Category & School Level Row */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Durasi (Menit)</label>
                  <input
                    type="number"
                    required
                    min={5}
                    max={180}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-indigo-500 font-mono text-black font-semibold"
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
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-indigo-500 font-mono text-black font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Mata Pelajaran</label>
                  <select
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-indigo-500 text-black font-semibold"
                  >
                    {subjects.map((sub) => (
                      <option key={sub.id} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                    {!subjects.some((s) => s.name === category) && category && (
                      <option value={category}>{category}</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Tingkat Sekolah</label>
                  <select
                    value={schoolLevel}
                    onChange={(e) => handleSchoolLevelChange(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-indigo-500 text-black font-semibold"
                  >
                    {schoolLevels.map((lvl) => (
                      <option key={lvl.id} value={lvl.name}>
                        {lvl.name}
                      </option>
                    ))}
                    {!schoolLevels.some(sl => sl.name === 'SD') && <option value="SD">SD</option>}
                    {!schoolLevels.some(sl => sl.name === 'SMP') && <option value="SMP">SMP</option>}
                    {!schoolLevels.some(sl => sl.name === 'SMA') && <option value="SMA">SMA</option>}
                  </select>
                </div>
              </div>

              {/* Upgraded Import & Select Section from Question Bank */}
              <div className="space-y-3.5 bg-slate-50/50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
                  <div>
                    <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                      Pilih Butir Soal dari Bank Soal ({questions.length} Tersedia)
                    </span>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      Cari, filter, dan pilih butir-butir soal ujian secara manual atau otomatis.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-md shrink-0 self-start sm:self-auto">
                    {selectedQuestionIds.length} Soal Terpilih
                  </span>
                </div>

                {/* Filters Row inside modal */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                  {/* Search Term */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Cari teks soal..."
                      value={modalSearchTerm}
                      onChange={(e) => setModalSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:border-indigo-500 text-black font-semibold"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Category Filter */}
                  <div>
                    <select
                      value={modalCategoryFilter}
                      onChange={(e) => setModalCategoryFilter(e.target.value)}
                      className="w-full px-2.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:border-indigo-500 text-black font-semibold"
                    >
                      <option value="all">Semua Mapel</option>
                      {subjects.map((sub) => (
                        <option key={sub.id} value={sub.name}>
                          {sub.name}
                        </option>
                      ))}
                      {!subjects.some((s) => s.name === modalCategoryFilter) && modalCategoryFilter !== 'all' && (
                        <option value={modalCategoryFilter}>{modalCategoryFilter}</option>
                      )}
                    </select>
                  </div>

                  {/* School Level Filter inside modal */}
                  <div>
                    <select
                      value={modalSchoolLevelFilter}
                      onChange={(e) => setModalSchoolLevelFilter(e.target.value)}
                      className="w-full px-2.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:border-indigo-500 text-black font-semibold"
                    >
                      <option value="all">Semua Tingkat</option>
                      {schoolLevels.map((lvl) => (
                        <option key={lvl.id} value={lvl.name}>
                          {lvl.name}
                        </option>
                      ))}
                      {!schoolLevels.some(sl => sl.name === 'SD') && <option value="SD">SD</option>}
                      {!schoolLevels.some(sl => sl.name === 'SMP') && <option value="SMP">SMP</option>}
                      {!schoolLevels.some(sl => sl.name === 'SMA') && <option value="SMA">SMA</option>}
                    </select>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <select
                      value={modalDifficultyFilter}
                      onChange={(e) => setModalDifficultyFilter(e.target.value as any)}
                      className="w-full px-2.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:border-indigo-500 text-black font-semibold"
                    >
                      <option value="all">Semua Kesulitan</option>
                      <option value="easy">Mudah</option>
                      <option value="medium">Sedang</option>
                      <option value="hard">Sukar / Hard</option>
                    </select>
                  </div>
                </div>

                {/* Bulk Actions Block */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200/50 dark:border-slate-750 text-xs">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleSelectAllFiltered}
                      disabled={filteredModalQuestions.length === 0}
                      className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-all text-[11px]"
                    >
                      Pilih Semua ({filteredModalQuestions.length})
                    </button>
                    <button
                      type="button"
                      onClick={handleDeselectAllFiltered}
                      disabled={filteredModalQuestions.length === 0}
                      className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-all text-[11px]"
                    >
                      Kosongkan
                    </button>
                  </div>

                  {/* Random Import Section */}
                  <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-850 p-1 rounded-lg border border-slate-200/50 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider font-mono px-1.5 shrink-0">
                      Acak:
                    </span>
                    <input
                      type="number"
                      min={1}
                      max={questions.length || 50}
                      value={randomCount}
                      onChange={(e) => setRandomCount(Math.max(1, Number(e.target.value)))}
                      className="w-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded py-0.5 px-1 text-center text-xs font-mono text-black font-semibold"
                    />
                    <button
                      type="button"
                      onClick={handleSelectRandom}
                      className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] uppercase transition-all flex items-center gap-1"
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
                              ? 'bg-indigo-50/60 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/60 shadow-sm'
                              : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border-slate-200/60 dark:border-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleCheckboxChange(q.id)}
                            className="w-4 h-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs leading-relaxed">
                              {q.text}
                            </span>
                            {q.imageUrl && (
                              <span className="inline-block mt-1 text-[10px] text-blue-500 font-semibold bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.2 rounded">
                                🖼 Memiliki Gambar Ilustrasi
                              </span>
                            )}
                            <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400 font-mono">
                              <span className="px-1.5 py-0.2 bg-slate-100 dark:bg-slate-750 text-slate-500 dark:text-slate-400 rounded-md font-sans uppercase text-[8px] font-bold">
                                {q.category}
                              </span>
                              <span>•</span>
                              <span className="capitalize">Kesulitan: {q.difficulty}</span>
                            </div>
                          </div>
                        </label>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 bg-white dark:bg-slate-800 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 italic text-xs">
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
                  className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-indigo-500/10"
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
