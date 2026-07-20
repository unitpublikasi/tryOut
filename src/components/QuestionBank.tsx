/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Trash2,
  BookOpen,
  HelpCircle,
  FolderOpen,
  Check,
  Tag,
  BookMarked,
  X
} from 'lucide-react';
import { Question } from '../types';

interface QuestionBankProps {
  questions: Question[];
  onAddQuestion: (newQuestion: Question) => void;
  onDeleteQuestion: (id: string) => void;
  userRole: string;
  userId: string;
}

export default function QuestionBank({
  questions,
  onAddQuestion,
  onDeleteQuestion,
  userRole,
  userId,
}: QuestionBankProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for new question
  const [newText, setNewText] = useState('');
  const [newOptions, setNewOptions] = useState<string[]>(['', '', '', '']);
  const [newCorrectAnswer, setNewCorrectAnswer] = useState<number>(0);
  const [newCategory, setNewCategory] = useState('Matematika');
  const [newDifficulty, setNewDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [newExplanation, setNewExplanation] = useState('');

  const categories = ['All', ...Array.from(new Set(questions.map((q) => q.category)))];

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.text.toLowerCase().includes(search.toLowerCase()) ||
                          q.explanation.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || q.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleOptionChange = (idx: number, val: string) => {
    setNewOptions((prev) => {
      const copy = [...prev];
      copy[idx] = val;
      return copy;
    });
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim() || newOptions.some((o) => !o.trim())) {
      alert('Mohon isi teks soal dan keempat pilihan jawaban!');
      return;
    }

    const created: Question = {
      id: `q-${Date.now()}`,
      text: newText,
      options: newOptions,
      correctAnswer: newCorrectAnswer,
      category: newCategory,
      difficulty: newDifficulty,
      explanation: newExplanation || 'Tidak ada penjelasan tambahan.',
      teacherId: userId,
    };

    onAddQuestion(created);
    setShowAddModal(false);

    // Reset Form
    setNewText('');
    setNewOptions(['', '', '', '']);
    setNewCorrectAnswer(0);
    setNewExplanation('');
  };

  return (
    <div id="question-bank-container" className="p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span>Bank Soal Terintegrasi</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
            Kelola, saring, dan distribusikan butir-butir soal ujian untuk evaluasi Try Out sekolah.
          </p>
        </div>

        {/* Add Question Trigger */}
        {(userRole === 'admin' || userRole === 'guru') && (
          <button
            id="add-question-trigger-btn"
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Butir Soal</span>
          </button>
        )}
      </div>

      {/* Filters & Search Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
        {/* Search Bar */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input
            id="search-questions-input"
            type="text"
            placeholder="Cari teks pertanyaan atau pembahasan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            id="category-filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Mata Pelajaran: {cat === 'All' ? 'Semua' : cat}
              </option>
            ))}
          </select>
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Difficulty Filter */}
        <div className="relative">
          <select
            id="difficulty-filter-select"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
          >
            <option value="All">Kesulitan: Semua</option>
            <option value="easy">Mudah</option>
            <option value="medium">Sedang</option>
            <option value="hard">Sukar</option>
          </select>
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Questions list display */}
      <div id="questions-list-grid" className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl relative hover:shadow-lg transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-mono">
                    {q.category.toUpperCase()}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase ${
                    q.difficulty === 'easy' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600' :
                    q.difficulty === 'medium' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-500' :
                    'bg-red-50 dark:bg-red-950/40 text-red-500'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>

                {/* Delete button (only Creator/Admin) */}
                {(userRole === 'admin' || userRole === 'guru') && (
                  <button
                    id={`delete-question-btn-${q.id}`}
                    onClick={() => onDeleteQuestion(q.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all active:scale-95"
                    title="Hapus Soal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Text Question */}
              <h3 className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-100 leading-relaxed mb-4">
                {idx + 1}. {q.text}
              </h3>

              {/* Options list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 font-mono text-xs">
                {q.options.map((opt, oIdx) => {
                  const isCorrect = q.correctAnswer === oIdx;
                  return (
                    <div
                      key={oIdx}
                      className={`p-3 rounded-xl border flex items-center gap-3 ${
                        isCorrect
                          ? 'bg-emerald-50/75 dark:bg-emerald-950/20 border-emerald-500/50 text-emerald-900 dark:text-emerald-300'
                          : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 ${
                        isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700'
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="truncate">{opt}</span>
                      {isCorrect && <Check className="w-3.5 h-3.5 text-emerald-500 ml-auto shrink-0" />}
                    </div>
                  );
                })}
              </div>

              {/* Explanation Pembahasan Section */}
              {q.explanation && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1.5">
                    <BookMarked className="w-3.5 h-3.5 text-blue-500" />
                    <span>Pembahasan Kunci:</span>
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">{q.explanation}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <span className="font-bold text-slate-700 dark:text-slate-300 block">Tidak Ada Pertanyaan</span>
            <span className="text-slate-400 text-xs mt-1 block">Silakan tambahkan butir soal baru atau ubah filter pencarian Anda.</span>
          </div>
        )}
      </div>

      {/* Add Question Modal Overlay */}
      {showAddModal && (
        <div id="add-question-modal" className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl relative my-8 animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-blue-500" />
                <span>Buat Pertanyaan Pilihan Ganda</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateQuestion} className="space-y-5">
              {/* Category & Difficulty Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Mata Pelajaran (Kategori)</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
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
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Tingkat Kesulitan</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as any)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="easy">Mudah</option>
                    <option value="medium">Sedang</option>
                    <option value="hard">Sukar</option>
                  </select>
                </div>
              </div>

              {/* Question text */}
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Isi Teks Pertanyaan</label>
                <textarea
                  required
                  placeholder="Ketik teks pertanyaan di sini..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Options inputs */}
              <div className="space-y-3.5">
                <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Pilihan Jawaban (A-D) & Kunci</span>
                {newOptions.map((opt, oIdx) => (
                  <div key={oIdx} className="flex items-center gap-3">
                    {/* Option letter label / correct selection trigger */}
                    <button
                      type="button"
                      onClick={() => setNewCorrectAnswer(oIdx)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border shrink-0 transition-all ${
                        newCorrectAnswer === oIdx
                          ? 'bg-emerald-500 border-emerald-600 text-white shadow-md'
                          : 'bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-500 hover:bg-slate-200'
                      }`}
                      title="Set as Correct Answer"
                    >
                      {String.fromCharCode(65 + oIdx)}
                    </button>
                    <input
                      type="text"
                      required
                      placeholder={`Isi pilihan jawaban ${String.fromCharCode(65 + oIdx)}`}
                      value={opt}
                      onChange={(e) => handleOptionChange(oIdx, e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>

              {/* Explanation Pembahasan */}
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Teks Pembahasan (Opsional)</label>
                <textarea
                  placeholder="Ketik penjelasan singkat mengenai jawaban yang benar..."
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-blue-500/10"
                >
                  Simpan Soal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
