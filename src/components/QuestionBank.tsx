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
  X,
  Download,
  Upload,
  Copy,
  Info,
  FileSpreadsheet
} from 'lucide-react';
import { Question, Subject, SchoolLevel } from '../types';
import MathRenderer from './MathRenderer';

/// Sample Templates for Import
const SAMPLE_QUESTIONS_JSON = [
  {
    "text": "Berapakah hasil dari perkalian 12 dengan 15?",
    "options": ["160", "170", "180", "190"],
    "correctAnswer": 2,
    "category": "Matematika",
    "difficulty": "easy",
    "explanation": "12 dikali 15 adalah 180.",
    "imageUrl": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400"
  },
  {
    "text": "Gaya tarik-menarik antara dua muatan listrik sebanding dengan perkalian kedua muatan dan berbanding terbalik dengan kuadrat jaraknya. Teori ini dikemukakan oleh...",
    "options": ["Newton", "Coulomb", "Ampere", "Ohm"],
    "correctAnswer": 1,
    "category": "Fisika",
    "difficulty": "medium",
    "explanation": "Ini merupakan bunyi Hukum Coulomb, yang dirumuskan oleh Charles-Augustin de Coulomb.",
    "imageUrl": ""
  }
];

const SAMPLE_QUESTIONS_CSV = 
`Pertanyaan,Pilihan A,Pilihan B,Pilihan C,Pilihan D,Kunci Jawaban (A/B/C/D),Kategori,Kesulitan,Pembahasan,LinkGambar
"Berapakah hasil dari perkalian 12 dengan 15?","160","170","180","190","C","Matematika","easy","12 dikali 15 adalah 180.","https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400"
"Gaya tarik-menarik antara dua muatan listrik sebanding dengan perkalian kedua muatan dan berbanding terbalik dengan kuadrat jaraknya. Teori ini dikemukakan oleh...","Newton","Coulomb","Ampere","Ohm","B","Fisika","medium","Ini merupakan bunyi Hukum Coulomb.",""`;

interface ParsedQuestion {
  text: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  imageUrl?: string;
}

// Robust CSV parser to handle quotes, commas, semicolons and correct answer indices
function parseCSV(text: string): ParsedQuestion[] {
  const lines = text.split(/\r?\n/);
  if (lines.length < 2) return [];
  
  const header = lines[0];
  const separator = header.includes(';') ? ';' : ',';
  
  const results: ParsedQuestion[] = [];
  
  const splitCSVLine = (line: string, sep: string) => {
    const fields = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === sep && !inQuotes) {
        fields.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    fields.push(current.trim());
    return fields.map(f => f.replace(/^"|"$/g, '').trim());
  };

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const columns = splitCSVLine(line, separator);
    if (columns.length < 6) continue;
    
    const textVal = columns[0];
    const optA = columns[1];
    const optB = columns[2];
    const optC = columns[3];
    const optD = columns[4];
    const correctRaw = columns[5];
    const catVal = columns[6] || 'Umum';
    const diffValRaw = (columns[7] || 'medium').toLowerCase();
    const expVal = columns[8] || '';
    const imgVal = columns[9] || '';

    let correctAnswer = 0;
    if (['a', 'b', 'c', 'd'].includes(correctRaw.toLowerCase())) {
      correctAnswer = correctRaw.toLowerCase().charCodeAt(0) - 97;
    } else {
      const parsedNum = parseInt(correctRaw, 10);
      if (!isNaN(parsedNum) && parsedNum >= 0 && parsedNum <= 3) {
        correctAnswer = parsedNum;
      }
    }

    const difficulty: 'easy' | 'medium' | 'hard' = 
      ['easy', 'medium', 'hard'].includes(diffValRaw) ? (diffValRaw as any) : 'medium';

    results.push({
      text: textVal,
      options: [optA, optB, optC, optD],
      correctAnswer,
      category: catVal,
      difficulty,
      explanation: expVal,
      imageUrl: imgVal
    });
  }
  return results;
}

interface QuestionBankProps {
  questions: Question[];
  subjects: Subject[];
  schoolLevels?: SchoolLevel[];
  onAddQuestion: (newQuestion: Question) => void;
  onAddQuestionsBulk: (newQuestions: Question[]) => void;
  onDeleteQuestion: (id: string) => void;
  onDeleteQuestionsBulk?: (ids: string[]) => void;
  userRole: string;
  userId: string;
}

export default function QuestionBank({
  questions,
  subjects,
  schoolLevels = [],
  onAddQuestion,
  onAddQuestionsBulk,
  onDeleteQuestion,
  onDeleteQuestionsBulk,
  userRole,
  userId,
}: QuestionBankProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [schoolLevelFilter, setSchoolLevelFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Import / Export states
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [importFormat, setImportFormat] = useState<'json' | 'csv'>('json');
  const [importError, setImportError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Form states for new question
  const [newText, setNewText] = useState('');
  const [newOptions, setNewOptions] = useState<string[]>(['', '', '', '']);
  const [newCorrectAnswer, setNewCorrectAnswer] = useState<number>(0);
  const [newCategory, setNewCategory] = useState('');
  const [newDifficulty, setNewDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [newSchoolLevel, setNewSchoolLevel] = useState('SMA');
  const [newExplanation, setNewExplanation] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Sync default category from dynamic subjects list
  React.useEffect(() => {
    if (subjects && subjects.length > 0 && !newCategory) {
      setNewCategory(subjects[0].name);
    }
  }, [subjects, newCategory]);

  // Sync default school level from dynamic school levels list
  React.useEffect(() => {
    if (schoolLevels && schoolLevels.length > 0) {
      setNewSchoolLevel(schoolLevels[0].name);
    }
  }, [schoolLevels]);

  const categories = ['All', ...Array.from(new Set([...subjects.map((s) => s.name), ...questions.map((q) => q.category)]))];

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.text.toLowerCase().includes(search.toLowerCase()) ||
                          q.explanation.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || q.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
    const matchesSchoolLevel = schoolLevelFilter === 'All' || q.schoolLevel === schoolLevelFilter;
    return matchesSearch && matchesCategory && matchesDifficulty && matchesSchoolLevel;
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
      imageUrl: newImageUrl || undefined,
      schoolLevel: newSchoolLevel,
    };

    onAddQuestion(created);
    setShowAddModal(false);

    // Reset Form
    setNewText('');
    setNewOptions(['', '', '', '']);
    setNewCorrectAnswer(0);
    setNewExplanation('');
    setNewImageUrl('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJSONTemplate = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(SAMPLE_QUESTIONS_JSON, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "template_import_soal.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const downloadCSVTemplate = () => {
    const dataStr = "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(SAMPLE_QUESTIONS_CSV);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "template_import_soal.csv");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportQuestions = () => {
    if (questions.length === 0) {
      alert('Tidak ada soal di dalam database untuk diekspor!');
      return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `bank_soal_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setImportText(content);
      
      if (file.name.endsWith('.csv')) {
        setImportFormat('csv');
      } else if (file.name.endsWith('.json')) {
        setImportFormat('json');
      }
    };
    reader.readAsText(file);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setImportError(null);

    if (!importText.trim()) {
      setImportError('Teks atau file yang akan diimport tidak boleh kosong!');
      return;
    }

    let parsedQuestions: ParsedQuestion[] = [];

    try {
      if (importFormat === 'json') {
        const parsed = JSON.parse(importText);
        if (!Array.isArray(parsed)) {
          setImportError('Data JSON harus berupa Array berisi kumpulan pertanyaan!');
          return;
        }

        for (let i = 0; i < parsed.length; i++) {
          const item = parsed[i];
          if (!item.text || typeof item.text !== 'string') {
            setImportError(`Error pada item ke-${i+1}: Kolom "text" (pertanyaan) wajib diisi dengan teks.`);
            return;
          }
          if (!Array.isArray(item.options) || item.options.length < 4) {
            setImportError(`Error pada item ke-${i+1}: Atribut "options" wajib berupa array dengan minimal 4 opsi.`);
            return;
          }
          if (typeof item.correctAnswer !== 'number' || item.correctAnswer < 0 || item.correctAnswer > 3) {
            setImportError(`Error pada item ke-${i+1}: Kolom "correctAnswer" wajib bernilai angka indeks antara 0 sampai 3.`);
            return;
          }
        }
        parsedQuestions = parsed;
      } else {
        const parsed = parseCSV(importText);
        if (parsed.length === 0) {
          setImportError('Gagal memproses file CSV. Pastikan baris data sesuai dengan format template (minimal 6 kolom: Teks soal, Pilihan A-D, Kunci).');
          return;
        }
        parsedQuestions = parsed;
      }

      const finalQuestions: Question[] = parsedQuestions.map((q, index) => ({
        id: `q-${Date.now()}-${index}`,
        text: q.text,
        options: q.options.slice(0, 4),
        correctAnswer: q.correctAnswer,
        category: q.category || 'Umum',
        difficulty: q.difficulty || 'medium',
        explanation: q.explanation || 'Tidak ada penjelasan tambahan.',
        teacherId: userId,
        imageUrl: q.imageUrl || undefined,
        schoolLevel: (q as any).schoolLevel || newSchoolLevel || 'SMA'
      }));

      onAddQuestionsBulk(finalQuestions);
      setShowImportModal(false);
      setImportText('');
      setImportError(null);
    } catch (err: any) {
      setImportError(`Format salah: ${err.message || 'Harap periksa kembali baris kode atau data yang dimasukkan.'}`);
    }
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

        {/* Actions Button Bar */}
        {(userRole === 'admin' || userRole === 'guru') && (
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Export Button */}
            <button
              id="export-questions-btn"
              onClick={handleExportQuestions}
              className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-750 dark:text-slate-200 font-semibold text-xs transition-all duration-200 active:scale-95 flex items-center gap-1.5 shadow-sm border border-slate-200/60 dark:border-slate-750"
              title="Ekspor Seluruh Bank Soal ke JSON"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Ekspor JSON</span>
            </button>

            {/* Import Button */}
            <button
              id="import-questions-btn"
              onClick={() => {
                setImportText('');
                setImportError(null);
                setShowImportModal(true);
              }}
              className="px-4 py-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/20 dark:hover:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold text-xs transition-all duration-200 active:scale-95 flex items-center gap-1.5 shadow-sm border border-indigo-200/50 dark:border-indigo-900/30"
              title="Impor Soal Baru dari JSON atau CSV"
            >
              <Upload className="w-3.5 h-3.5 text-indigo-500" />
              <span>Impor Soal</span>
            </button>

            {/* Add Question Button */}
            <button
              id="add-question-trigger-btn"
              onClick={() => setShowAddModal(true)}
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs md:text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Butir Soal</span>
            </button>
          </div>
        )}
      </div>

      {/* Filters & Search Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
        {/* Search Bar */}
        <div className="relative sm:col-span-2 lg:col-span-2">
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

        {/* School Level Filter */}
        <div className="relative">
          <select
            id="school-level-filter-select"
            value={schoolLevelFilter}
            onChange={(e) => setSchoolLevelFilter(e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
          >
            <option value="All">Tingkat: Semua</option>
            {schoolLevels.map((lvl) => (
              <option key={lvl.id} value={lvl.name}>
                Tingkat: {lvl.name}
              </option>
            ))}
            {!schoolLevels.some(sl => sl.name === 'SD') && <option value="SD">Tingkat: SD</option>}
            {!schoolLevels.some(sl => sl.name === 'SMP') && <option value="SMP">Tingkat: SMP</option>}
            {!schoolLevels.some(sl => sl.name === 'SMA') && <option value="SMA">Tingkat: SMA</option>}
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

      {/* Active Filters Row */}
      {(search || categoryFilter !== 'All' || difficultyFilter !== 'All' || schoolLevelFilter !== 'All') && (
        <div id="active-filters-row" className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-5 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider mr-1">Filter Aktif:</span>
            {search && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-xl border border-blue-200/50 font-medium">
                <span>Kata kunci: "{search}"</span>
                <button type="button" onClick={() => setSearch('')} className="hover:text-red-500 text-blue-400 flex items-center justify-center">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {categoryFilter !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 rounded-xl border border-violet-200/50 font-medium">
                <span>Mapel: {categoryFilter}</span>
                <button type="button" onClick={() => setCategoryFilter('All')} className="hover:text-red-500 text-violet-400 flex items-center justify-center">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {schoolLevelFilter !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 rounded-xl border border-pink-200/50 font-medium">
                <span>Tingkat: {schoolLevelFilter}</span>
                <button type="button" onClick={() => setSchoolLevelFilter('All')} className="hover:text-red-500 text-pink-400 flex items-center justify-center">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {difficultyFilter !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl border border-emerald-200/50 font-medium">
                <span>Kesulitan: {difficultyFilter === 'easy' ? 'Mudah' : difficultyFilter === 'medium' ? 'Sedang' : 'Sukar'}</span>
                <button type="button" onClick={() => setDifficultyFilter('All')} className="hover:text-red-500 text-emerald-400 flex items-center justify-center">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              id="clear-all-filters-btn"
              type="button"
              onClick={() => {
                setSearch('');
                setCategoryFilter('All');
                setSchoolLevelFilter('All');
                setDifficultyFilter('All');
              }}
              className="text-red-600 dark:text-red-400 font-bold hover:underline ml-2 text-xs font-semibold"
            >
              Hapus Semua Filter
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 justify-end shrink-0">
            <span className="text-slate-500 dark:text-slate-400 font-mono text-center sm:text-right font-medium">
              Terfilter: <strong className="text-slate-800 dark:text-white font-bold">{filteredQuestions.length}</strong> butir soal
            </span>

            {filteredQuestions.length > 0 && onDeleteQuestionsBulk && (
              <button
                id="btn-bulk-delete-filtered"
                type="button"
                onClick={() => {
                  const qCount = filteredQuestions.length;
                  const promptMessage = `PERHATIAN! Anda akan menghapus secara masal ${qCount} butir soal yang saat ini terpilih oleh filter.\n\nKetik kata "HAPUS" untuk mengonfirmasi tindakan permanen ini:`;
                  const userInput = prompt(promptMessage);
                  if (userInput?.toUpperCase() === 'HAPUS') {
                    const idsToDelete = filteredQuestions.map((q) => q.id);
                    onDeleteQuestionsBulk(idsToDelete);
                  } else if (userInput !== null) {
                    alert('Konfirmasi salah atau dibatalkan! Tindakan penghapusan masal dibatalkan.');
                  }
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl flex items-center gap-1.5 transition-all active:scale-95 shadow-lg shadow-red-500/15 text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Masal ({filteredQuestions.length})</span>
              </button>
            )}
          </div>
        </div>
      )}

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
                  {q.schoolLevel && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 font-mono uppercase">
                      {q.schoolLevel}
                    </span>
                  )}
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
                {idx + 1}. <MathRenderer text={q.text} />
              </h3>

              {/* Optional Question Image Illustration */}
              {q.imageUrl && (
                <div className="mb-4 max-h-[250px] overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-850 bg-slate-50 dark:bg-slate-900/40 flex justify-center p-3">
                  <img
                    src={q.imageUrl}
                    alt={`Ilustrasi Soal ${idx + 1}`}
                    className="max-h-[220px] object-contain rounded-xl shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

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
                      <span className="truncate whitespace-normal"><MathRenderer text={opt} /></span>
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
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic"><MathRenderer text={q.explanation} /></p>
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
              {/* Category, Difficulty & School Level Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Mata Pelajaran (Kategori)</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-blue-500"
                  >
                    {subjects.map((sub) => (
                      <option key={sub.id} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                    {!subjects.some((s) => s.name === newCategory) && newCategory && (
                      <option value={newCategory}>{newCategory}</option>
                    )}
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
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Tingkat Sekolah</label>
                  <select
                    value={newSchoolLevel}
                    onChange={(e) => setNewSchoolLevel(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-blue-500"
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

              {/* Optional Image Upload / URL Illustration */}
              <div className="space-y-2 bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-750">
                <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Gambar Ilustrasi Soal (Opsional)</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* File Upload Selector */}
                  <div className="flex flex-col justify-center border border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-xl p-3 bg-white dark:bg-slate-900 text-center transition-colors relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        if (file.size > 1.5 * 1024 * 1024) {
                          alert('Ukuran gambar terlalu besar! Silakan pilih berkas di bawah 1.5 MB.');
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          if (event.target?.result) {
                            setNewImageUrl(event.target.result as string);
                          }
                        };
                        reader.readAsDataURL(file);
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      Klik / Seret Berkas Gambar disini
                    </div>
                    <span className="text-[9px] text-slate-400 mt-0.5">(Format PNG, JPG, WEBP maks 1.5MB)</span>
                  </div>

                  {/* Input URL Direct */}
                  <div className="flex flex-col justify-center space-y-1.5">
                    <label className="text-[10px] font-semibold text-slate-400">Atau tautkan URL gambar langsung:</label>
                    <input
                      type="text"
                      placeholder="Contoh: https://link-gambar.com/ilustrasi.jpg"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Preview Selected Image */}
                {newImageUrl && (
                  <div className="mt-3 flex items-center justify-between p-2.5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-750 rounded-xl">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={newImageUrl}
                        alt="Preview ilustrasi"
                        className="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block truncate">
                          Pratinjau Gambar Berhasil Dimuat
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono block truncate">
                          {newImageUrl.startsWith('data:') ? 'Format Base64 Tersemat (Durable)' : newImageUrl}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNewImageUrl('')}
                      className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors shrink-0"
                      title="Hapus Gambar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
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

      {/* Import Questions Modal Overlay */}
      {showImportModal && (
        <div id="import-questions-modal" className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl relative my-8 animate-fade-in flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-500" />
                <span>Impor Butir Soal Massal</span>
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Split layout (Panduan vs Form) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto max-h-[70vh] pr-1">
              {/* LEFT: PANDUAN FORMAT (Col Span 5) */}
              <div className="lg:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 text-xs uppercase tracking-wider font-mono">
                    <Info className="w-3.5 h-3.5 text-blue-500" />
                    <span>Panduan Format & Template</span>
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Sistem mendukung import massal butir soal via berkas <strong>JSON</strong> (Sangat Disarankan) atau <strong>CSV / Excel</strong> (Praktis).
                  </p>
                </div>

                {/* Download Template Section */}
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800">
                  <span className="font-semibold text-[11px] text-slate-700 dark:text-slate-300 block mb-2">Unduh File Template:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={downloadJSONTemplate}
                      className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1"
                    >
                      <Download className="w-3 h-3 text-blue-500" />
                      <span>Template JSON</span>
                    </button>
                    <button
                      type="button"
                      onClick={downloadCSVTemplate}
                      className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1"
                    >
                      <FileSpreadsheet className="w-3 h-3 text-emerald-500" />
                      <span>Template CSV</span>
                    </button>
                  </div>
                </div>

                {/* Format Rules */}
                <div className="space-y-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block text-[11px]">Ketentuan Pengisian:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-500 dark:text-slate-400 leading-relaxed text-[10.5px]">
                    <li><strong>Mata Pelajaran (Kategori)</strong>: Sesuaikan nama mapel (contoh: Matematika, Fisika, Kimia).</li>
                    <li><strong>Tingkat Kesulitan</strong>: Wajib diisi salah satu: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded font-mono">easy</code>, <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded font-mono">medium</code>, atau <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded font-mono">hard</code>.</li>
                    <li><strong>Pilihan Ganda (Opsi)</strong>: Harus menyediakan tepat 4 pilihan jawaban ganda.</li>
                    <li><strong>Kunci Jawaban</strong>: Diisi angka indeks <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded font-mono">0 s.d 3</code> (0=A, 1=B, 2=C, 3=D) atau langsung huruf <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded font-mono">A s.d D</code>.</li>
                  </ul>
                </div>

                {/* Copy Template Block */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-[11px] text-slate-700 dark:text-slate-300">Salin Struktur JSON:</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(JSON.stringify(SAMPLE_QUESTIONS_JSON, null, 2))}
                      className="text-blue-500 hover:text-blue-600 font-bold text-[10px] flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Tersalin!' : 'Salin Kode'}</span>
                    </button>
                  </div>
                  <pre className="p-2.5 bg-slate-900 text-[10px] text-slate-300 rounded-lg overflow-x-auto font-mono max-h-[140px] border border-slate-800">
                    {JSON.stringify(SAMPLE_QUESTIONS_JSON, null, 2)}
                  </pre>
                </div>
              </div>

              {/* RIGHT: FILE UPLOAD & TEXT AREA (Col Span 7) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Format Toggle Switches */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750">
                  <button
                    type="button"
                    onClick={() => {
                      setImportFormat('json');
                      setImportError(null);
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      importFormat === 'json'
                        ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    Format JSON (.json)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImportFormat('csv');
                      setImportError(null);
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      importFormat === 'csv'
                        ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    Format CSV / Spreadsheet (.csv)
                  </button>
                </div>

                {/* File Drop/Selector Area */}
                <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-2xl p-5 bg-slate-50/20 dark:bg-slate-900/10 text-center transition-colors">
                  <input
                    type="file"
                    accept={importFormat === 'json' ? '.json' : '.csv'}
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-1.5">
                    {importFormat === 'csv' ? (
                      <FileSpreadsheet className="w-8 h-8 text-emerald-500" />
                    ) : (
                      <Upload className="w-8 h-8 text-indigo-500" />
                    )}
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Seret file template atau Klik untuk Memilih Berkas
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Mendukung format {importFormat === 'json' ? '.json (JSON file)' : '.csv (CSV file)'}
                    </p>
                  </div>
                </div>

                {/* Manual Text Area Input */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                    Tempel data teks / Lihat Kode Terunggah
                  </label>
                  <textarea
                    value={importText}
                    onChange={(e) => {
                      setImportText(e.target.value);
                      setImportError(null);
                    }}
                    placeholder={
                      importFormat === 'json'
                        ? 'Tempelkan atau ketik kode JSON soal Anda di sini...'
                        : 'Tempelkan atau ketik teks baris CSV soal Anda di sini...'
                    }
                    rows={7}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-mono focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                  />
                </div>

                {/* Real-time Status Alert / Errors */}
                {importError ? (
                  <div className="p-3 bg-red-50 dark:bg-red-950/25 text-red-600 dark:text-red-400 rounded-xl border border-red-200/60 dark:border-red-900/40 text-xs flex items-start gap-2">
                    <span className="font-bold shrink-0">⚠ Gagal:</span>
                    <span>{importError}</span>
                  </div>
                ) : importText.trim() ? (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-200/50 dark:border-emerald-900/30 text-xs flex items-center gap-1.5">
                    <Check className="w-4 h-4 shrink-0 text-emerald-500" />
                    <span>Format terdeteksi aman. Siap diimpor ke sistem bank soal!</span>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-6">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="flex-1 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleImportSubmit}
                disabled={!importText.trim()}
                className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-indigo-500/10"
              >
                Mulai Impor Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
