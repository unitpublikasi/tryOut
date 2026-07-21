/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BookMarked,
  Layers,
  Plus,
  Trash2,
  Edit2,
  X,
  FileText,
  School,
  Sparkles,
  Search,
  Check
} from 'lucide-react';
import { Subject, SchoolLevel, Question, Tryout } from '../types';

interface SubjectLevelManagementProps {
  subjects: Subject[];
  schoolLevels: SchoolLevel[];
  onAddSubject: (s: Subject) => void;
  onUpdateSubject: (s: Subject) => void;
  onDeleteSubject: (id: string) => void;
  onAddSchoolLevel: (l: SchoolLevel) => void;
  onUpdateSchoolLevel: (l: SchoolLevel) => void;
  onDeleteSchoolLevel: (id: string) => void;
  questions: Question[];
  tryouts: Tryout[];
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export default function SubjectLevelManagement({
  subjects,
  schoolLevels,
  onAddSubject,
  onUpdateSubject,
  onDeleteSubject,
  onAddSchoolLevel,
  onUpdateSchoolLevel,
  onDeleteSchoolLevel,
  questions,
  tryouts,
  onToast,
}: SubjectLevelManagementProps) {
  const [activeTab, setActiveTab] = useState<'subjects' | 'levels'>('subjects');

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');

  // Modals / Form states
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);

  // Subject Form inputs
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [subjectName, setSubjectName] = useState('');
  const [subjectDesc, setSubjectDesc] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  // Level Form inputs
  const [editingLevel, setEditingLevel] = useState<SchoolLevel | null>(null);
  const [levelName, setLevelName] = useState('');
  const [levelDesc, setLevelDesc] = useState('');

  // 1. SUBJECT HANDLERS
  const handleOpenSubjectCreate = () => {
    setEditingSubject(null);
    setSubjectName('');
    setSubjectDesc('');
    setSelectedLevels([]);
    setShowSubjectModal(true);
  };

  const handleOpenSubjectEdit = (s: Subject) => {
    setEditingSubject(s);
    setSubjectName(s.name);
    setSubjectDesc(s.description);
    setSelectedLevels(s.levels || []);
    setShowSubjectModal(true);
  };

  const handleSaveSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName.trim()) {
      alert('Nama Mata Pelajaran tidak boleh kosong!');
      return;
    }

    if (editingSubject) {
      const updated: Subject = {
        ...editingSubject,
        name: subjectName.trim(),
        description: subjectDesc.trim(),
        levels: selectedLevels,
      };
      onUpdateSubject(updated);
      onToast(`Mata Pelajaran "${subjectName}" berhasil diperbarui.`, 'success');
    } else {
      // Check duplicate name
      const duplicate = subjects.some(
        (s) => s.name.toLowerCase() === subjectName.trim().toLowerCase()
      );
      if (duplicate) {
        alert('Mata Pelajaran dengan nama tersebut sudah ada!');
        return;
      }

      const newSub: Subject = {
        id: `sb-${Date.now()}`,
        name: subjectName.trim(),
        description: subjectDesc.trim(),
        levels: selectedLevels,
      };
      onAddSubject(newSub);
      onToast(`Mata Pelajaran "${subjectName}" berhasil ditambahkan.`, 'success');
    }

    setShowSubjectModal(false);
  };

  const handleDeleteSubjectClick = (s: Subject) => {
    // Check if there are questions or tryouts in this subject
    const questionsCount = questions.filter((q) => q.category.toLowerCase() === s.name.toLowerCase()).length;
    const tryoutsCount = tryouts.filter((t) => t.category.toLowerCase() === s.name.toLowerCase()).length;

    let confirmMsg = `Apakah Anda yakin ingin menghapus Mata Pelajaran "${s.name}"?`;
    if (questionsCount > 0 || tryoutsCount > 0) {
      confirmMsg = `PERHATIAN: Mata Pelajaran "${s.name}" sedang digunakan oleh ${questionsCount} butir soal dan ${tryoutsCount} jadwal Try Out.\n\nMenghapus mata pelajaran ini tidak akan menghapus soal terkait secara otomatis, tetapi data referensi mata pelajaran ini akan hilang.\n\nKetik kata "HAPUS" untuk mengonfirmasi:`;
      const userInput = prompt(confirmMsg);
      if (userInput?.toUpperCase() === 'HAPUS') {
        onDeleteSubject(s.id);
        onToast(`Mata Pelajaran "${s.name}" berhasil dihapus.`, 'info');
      }
    } else {
      if (confirm(confirmMsg)) {
        onDeleteSubject(s.id);
        onToast(`Mata Pelajaran "${s.name}" telah dihapus.`, 'info');
      }
    }
  };

  const toggleLevelAssociation = (lvlName: string) => {
    setSelectedLevels((prev) =>
      prev.includes(lvlName) ? prev.filter((name) => name !== lvlName) : [...prev, lvlName]
    );
  };

  // 2. LEVEL HANDLERS
  const handleOpenLevelCreate = () => {
    setEditingLevel(null);
    setLevelName('');
    setLevelDesc('');
    setShowLevelModal(true);
  };

  const handleOpenLevelEdit = (l: SchoolLevel) => {
    setEditingLevel(l);
    setLevelName(l.name);
    setLevelDesc(l.description);
    setShowLevelModal(true);
  };

  const handleSaveLevel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!levelName.trim()) {
      alert('Nama Tingkat Sekolah tidak boleh kosong!');
      return;
    }

    if (editingLevel) {
      const updated: SchoolLevel = {
        ...editingLevel,
        name: levelName.trim().toUpperCase(),
        description: levelDesc.trim(),
      };
      onUpdateSchoolLevel(updated);
      onToast(`Tingkat Sekolah "${levelName.trim().toUpperCase()}" berhasil diperbarui.`, 'success');
    } else {
      // Check duplicate name
      const duplicate = schoolLevels.some(
        (l) => l.name.toLowerCase() === levelName.trim().toLowerCase()
      );
      if (duplicate) {
        alert('Tingkat sekolah dengan nama tersebut sudah ada!');
        return;
      }

      const newLvl: SchoolLevel = {
        id: `lv-${Date.now()}`,
        name: levelName.trim().toUpperCase(),
        description: levelDesc.trim(),
      };
      onAddSchoolLevel(newLvl);
      onToast(`Tingkat Sekolah "${levelName.trim().toUpperCase()}" berhasil ditambahkan.`, 'success');
    }

    setShowLevelModal(false);
  };

  const handleDeleteLevelClick = (l: SchoolLevel) => {
    // Check if any subject is associated with this level
    const associatedSubjects = subjects.filter((s) => s.levels?.includes(l.name));
    
    let confirmMsg = `Apakah Anda yakin ingin menghapus Tingkat Sekolah "${l.name}"?`;
    if (associatedSubjects.length > 0) {
      const subNames = associatedSubjects.map((s) => s.name).join(', ');
      confirmMsg = `PERHATIAN: Tingkat Sekolah "${l.name}" berasosiasi dengan ${associatedSubjects.length} mata pelajaran: (${subNames}).\n\nMenghapus tingkat ini akan memutuskan hubungan asosiasi tersebut.\n\nKetik kata "HAPUS" untuk mengonfirmasi:`;
      const userInput = prompt(confirmMsg);
      if (userInput?.toUpperCase() === 'HAPUS') {
        onDeleteSchoolLevel(l.id);
        onToast(`Tingkat Sekolah "${l.name}" berhasil dihapus.`, 'info');
      }
    } else {
      if (confirm(confirmMsg)) {
        onDeleteSchoolLevel(l.id);
        onToast(`Tingkat Sekolah "${l.name}" telah dihapus.`, 'info');
      }
    }
  };

  // 3. FILTERED DATA
  const filteredSubjects = subjects.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredLevels = schoolLevels.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div id="subject-level-management-container" className="p-6 space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2.5">
            <School className="w-6 h-6 text-indigo-500" />
            <span>Manajemen Pelajaran & Tingkat</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
            Konfigurasi dan kelola mata pelajaran (kurikulum) serta tingkat sekolah (SD, SMP, SMA) untuk basis soal dan simulasi.
          </p>
        </div>

        {/* Action Button depending on active tab */}
        <div className="shrink-0">
          {activeTab === 'subjects' ? (
            <button
              id="add-subject-btn"
              onClick={handleOpenSubjectCreate}
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs md:text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Mata Pelajaran</span>
            </button>
          ) : (
            <button
              id="add-level-btn"
              onClick={handleOpenLevelCreate}
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs md:text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/25 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Tingkat Sekolah</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Selector & Search bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-2xl self-start">
          <button
            type="button"
            onClick={() => {
              setActiveTab('subjects');
              setSearchTerm('');
            }}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-2 ${
              activeTab === 'subjects'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Mata Pelajaran ({subjects.length})</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('levels');
              setSearchTerm('');
            }}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-2 ${
              activeTab === 'levels'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tingkat Sekolah ({schoolLevels.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="search-subject-level-input"
            type="text"
            placeholder={activeTab === 'subjects' ? 'Cari mata pelajaran...' : 'Cari tingkat sekolah...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs md:text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* RENDER GRID CARDS */}
      {activeTab === 'subjects' ? (
        <div id="subjects-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((sub) => (
              <div
                key={sub.id}
                className="group relative p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:shadow-xl dark:hover:shadow-slate-950/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2.5 mb-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <BookMarked className="w-5 h-5" />
                    </div>
                    
                    {/* Action buttons on hover */}
                    <div className="flex items-center gap-1.5 opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleOpenSubjectEdit(sub)}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg"
                        title="Edit Mata Pelajaran"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSubjectClick(sub)}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 rounded-lg"
                        title="Hapus Mata Pelajaran"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-800 dark:text-white leading-tight mb-2.5 select-all">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mb-4 line-clamp-2 select-all">
                    {sub.description || 'Tidak ada deskripsi tambahan untuk mata pelajaran ini.'}
                  </p>
                </div>

                {/* Level badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-4.5 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[9px] font-bold text-slate-400 uppercase font-mono tracking-wider mr-1">Tingkat:</span>
                  {sub.levels && sub.levels.length > 0 ? (
                    sub.levels.map((lvl) => (
                      <span
                        key={lvl}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400"
                      >
                        {lvl}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Semua Tingkat</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3.5" />
              <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">Tidak ada Mata Pelajaran ditemukan</h4>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Silakan tambah mata pelajaran baru melalui tombol di kanan atas.</p>
            </div>
          )}
        </div>
      ) : (
        <div id="levels-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLevels.length > 0 ? (
            filteredLevels.map((lvl) => (
              <div
                key={lvl.id}
                className="group relative p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-indigo-500/30 dark:hover:border-indigo-500/30 hover:shadow-xl dark:hover:shadow-slate-950/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2.5 mb-3">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Layers className="w-5 h-5" />
                    </div>

                    {/* Action buttons on hover */}
                    <div className="flex items-center gap-1.5 opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleOpenLevelEdit(lvl)}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg"
                        title="Edit Tingkat Sekolah"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteLevelClick(lvl)}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 rounded-lg"
                        title="Hapus Tingkat Sekolah"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-mono font-black text-indigo-600 dark:text-indigo-400 leading-none mb-1 select-all">
                    {lvl.name}
                  </h3>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-2.5">
                    {lvl.name === 'SD' ? 'Sekolah Dasar' : lvl.name === 'SMP' ? 'Sekolah Menengah Pertama' : 'Sekolah Menengah Atas'}
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mb-4 select-all">
                    {lvl.description || 'Deskripsi singkat tingkat pendidikan.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    ID Ref: <strong className="text-slate-700 dark:text-slate-300 font-bold">{lvl.id}</strong>
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
              <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3.5" />
              <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">Tidak ada Tingkat Sekolah ditemukan</h4>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Silakan tambah tingkat baru melalui tombol di kanan atas.</p>
            </div>
          )}
        </div>
      )}

      {/* 4. MODAL FORM MATA PELAJARAN (SUBJECT) */}
      {showSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold font-mono text-indigo-500 dark:text-indigo-400 uppercase tracking-widest block mb-1">
                  {editingSubject ? 'MODIFIKASI' : 'TAMBAH BARU'}
                </span>
                <h3 className="text-lg font-bold text-slate-850 dark:text-white">
                  {editingSubject ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSubjectModal(false)}
                className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveSubject} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Nama Mata Pelajaran</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kimia, Sejarah, Sosiologi..."
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Deskripsi Ringkas</label>
                <textarea
                  placeholder="Ketik deskripsi atau pokok materi di sini..."
                  value={subjectDesc}
                  onChange={(e) => setSubjectDesc(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Level Association checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2.5">
                  Hubungkan dengan Tingkat Sekolah
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {schoolLevels.map((lvl) => {
                    const isChecked = selectedLevels.includes(lvl.name);
                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => toggleLevelAssociation(lvl.name)}
                        className={`py-3 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                          isChecked
                            ? 'bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                            : 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-750 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                        <span>{lvl.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer Save Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => setShowSubjectModal(false)}
                  className="px-5 py-3 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-2xl transition-all shadow-md shadow-blue-500/10 active:scale-95"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL FORM TINGKAT SEKOLAH (LEVEL) */}
      {showLevelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold font-mono text-indigo-500 dark:text-indigo-400 uppercase tracking-widest block mb-1">
                  {editingLevel ? 'MODIFIKASI' : 'TAMBAH BARU'}
                </span>
                <h3 className="text-lg font-bold text-slate-850 dark:text-white">
                  {editingLevel ? 'Edit Tingkat Sekolah' : 'Tambah Tingkat Sekolah'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowLevelModal(false)}
                className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveLevel} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Nama Tingkat (Singkatan)</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: SD, SMP, SMA, SMK, MI..."
                  value={levelName}
                  onChange={(e) => setLevelName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-blue-500 font-mono font-bold"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Deskripsi Tingkat</label>
                <input
                  type="text"
                  placeholder="Contoh: Sekolah Menengah Atas (Kelas X-XII)..."
                  value={levelDesc}
                  onChange={(e) => setLevelDesc(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Footer Save Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => setShowLevelModal(false)}
                  className="px-5 py-3 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-2xl transition-all shadow-md shadow-indigo-500/10 active:scale-95"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
