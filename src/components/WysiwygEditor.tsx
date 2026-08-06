/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Table as TableIcon,
  Image as ImageIcon,
  List,
  ListOrdered,
  Highlighter,
  Quote,
  Eye,
  Edit3,
  X,
  Upload,
  Link as LinkIcon,
  Sparkles,
  Calculator,
  Plus,
  Trash2,
  Check
} from 'lucide-react';
import MathRenderer from './MathRenderer';

interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  label?: string;
}

export default function WysiwygEditor({
  value,
  onChange,
  placeholder = 'Ketik teks pertanyaan atau gunakan toolbar untuk memasukkan tabel, gambar, dan rumus...',
  rows = 5,
  label,
}: WysiwygEditorProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [showTableModal, setShowTableModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showMathMenu, setShowMathMenu] = useState(false);

  // Table Generator Form State
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [hasHeader, setHasHeader] = useState(true);

  // Image Upload Form State
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageCaption, setImageCaption] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Insert snippet at current cursor position
  const insertAtCursor = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(value + before + after);
      return;
    }

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = value.substring(startPos, endPos);
    const replacement = before + (selectedText || '') + after;

    const newValue =
      value.substring(0, startPos) + replacement + value.substring(endPos);
    onChange(newValue);

    // Reposition cursor
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = startPos + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 50);
  };

  // Generate HTML Table Snippet
  const handleInsertTable = (presetRows?: number, presetCols?: number) => {
    const r = presetRows || tableRows;
    const c = presetCols || tableCols;

    let html = '\n<table class="w-full border-collapse border border-slate-300 dark:border-slate-700 my-3 text-sm rounded-xl overflow-hidden">\n';

    if (hasHeader) {
      html += '  <thead>\n    <tr class="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold">\n';
      for (let j = 1; j <= c; j++) {
        html += `      <th class="border border-slate-300 dark:border-slate-700 p-2.5 text-center">Kolom ${j}</th>\n`;
      }
      html += '    </tr>\n  </thead>\n';
    }

    html += '  <tbody>\n';
    for (let i = 1; i <= r; i++) {
      html += '    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">\n';
      for (let j = 1; j <= c; j++) {
        html += `      <td class="border border-slate-300 dark:border-slate-700 p-2 text-center">Data ${i}.${j}</td>\n`;
      }
      html += '    </tr>\n';
    }
    html += '  </tbody>\n</table>\n';

    insertAtCursor(html);
    setShowTableModal(false);
  };

  // Insert Image Snippet
  const handleInsertImage = () => {
    const src = imagePreview || imageUrlInput;
    if (!src) return;

    const imgTag = `\n<img src="${src}" alt="${imageCaption || 'Gambar Soal'}" class="max-w-full h-auto rounded-2xl border border-slate-200 dark:border-slate-700 my-3 mx-auto block shadow-sm" />\n`;
    insertAtCursor(imgTag);

    // Reset Image Modal State
    setImageUrlInput('');
    setImagePreview('');
    setImageCaption('');
    setShowImageModal(false);
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
            {label}
          </label>
          <span className="text-[10px] text-slate-400 font-mono">
            Mendukung WYSIWYG, Tabel HTML, Gambar, & LaTeX Math
          </span>
        </div>
      )}

      {/* Editor Container Box */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm transition-all focus-within:border-blue-500">
        {/* Top Control Bar: Toolbar & Tab Switcher */}
        <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 p-2 flex flex-wrap items-center justify-between gap-2">
          {/* Main Toolbar Buttons */}
          <div className="flex flex-wrap items-center gap-1">
            {/* Text Formatting Group */}
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200/80 dark:border-slate-700">
              <button
                type="button"
                onClick={() => insertAtCursor('<b>', '</b>')}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300"
                title="Cetak Tebal (Bold)"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertAtCursor('<i>', '</i>')}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300"
                title="Cetak Miring (Italic)"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertAtCursor('<u>', '</u>')}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300"
                title="Garis Bawah (Underline)"
              >
                <Underline className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertAtCursor('<s>', '</s>')}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300"
                title="Coret Teks (Strikethrough)"
              >
                <Strikethrough className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertAtCursor('<mark>', '</mark>')}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-amber-600 dark:text-amber-400"
                title="Sorot Warna (Highlight)"
              >
                <Highlighter className="w-4 h-4" />
              </button>
            </div>

            {/* Structure Group (Table & Image) */}
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200/80 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setShowTableModal(true)}
                className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 rounded text-slate-700 dark:text-slate-300 flex items-center gap-1 text-xs font-bold px-2"
                title="Sisipkan Tabel Data"
              >
                <TableIcon className="w-4 h-4 text-blue-500" />
                <span>Tabel</span>
              </button>

              <button
                type="button"
                onClick={() => setShowImageModal(true)}
                className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600 rounded text-slate-700 dark:text-slate-300 flex items-center gap-1 text-xs font-bold px-2"
                title="Sisipkan Gambar / Foto"
              >
                <ImageIcon className="w-4 h-4 text-emerald-500" />
                <span>Gambar</span>
              </button>
            </div>

            {/* Math Formula Dropdown Group */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMathMenu(!showMathMenu)}
                className="p-1.5 bg-white dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-600 rounded-lg border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1 text-xs font-bold px-2"
                title="Rumus & Simbol Matematika"
              >
                <Calculator className="w-4 h-4 text-violet-500" />
                <span>Rumus Math</span>
              </button>

              {/* Math Menu Popup */}
              {showMathMenu && (
                <div className="absolute left-0 top-full mt-1.5 z-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 shadow-xl w-64 text-xs space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                      Pilih Rumus Cepat
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowMathMenu(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        insertAtCursor('$\\frac{a}{b}$');
                        setShowMathMenu(false);
                      }}
                      className="p-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-950/50 rounded-lg text-left font-mono font-medium text-slate-700 dark:text-slate-300"
                    >
                      {'$\\frac{a}{b}$'} (Pecahan)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        insertAtCursor('$\\sqrt{x}$');
                        setShowMathMenu(false);
                      }}
                      className="p-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-950/50 rounded-lg text-left font-mono font-medium text-slate-700 dark:text-slate-300"
                    >
                      {'$\\sqrt{x}$'} (Akar)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        insertAtCursor('$x^2$');
                        setShowMathMenu(false);
                      }}
                      className="p-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-950/50 rounded-lg text-left font-mono font-medium text-slate-700 dark:text-slate-300"
                    >
                      {'$x^2$'} (Pangkat)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        insertAtCursor('$x_1$');
                        setShowMathMenu(false);
                      }}
                      className="p-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-950/50 rounded-lg text-left font-mono font-medium text-slate-700 dark:text-slate-300"
                    >
                      {'$x_1$'} (Indeks)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        insertAtCursor('$\\times$');
                        setShowMathMenu(false);
                      }}
                      className="p-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-950/50 rounded-lg text-left font-mono font-medium text-slate-700 dark:text-slate-300"
                    >
                      {'$\\times$'} (Kali)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        insertAtCursor('$\\pi$');
                        setShowMathMenu(false);
                      }}
                      className="p-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-950/50 rounded-lg text-left font-mono font-medium text-slate-700 dark:text-slate-300"
                    >
                      {'$\\pi$'} (Pi)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* List & Quote Group */}
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200/80 dark:border-slate-700">
              <button
                type="button"
                onClick={() => insertAtCursor('<ul>\n  <li>', '</li>\n</ul>')}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300"
                title="Daftar Poin (Unordered List)"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertAtCursor('<ol>\n  <li>', '</li>\n</ol>')}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300"
                title="Daftar Angka (Ordered List)"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertAtCursor('<blockquote>', '</blockquote>')}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300"
                title="Kotak Catatan (Blockquote)"
              >
                <Quote className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tab Switcher (Editor vs Pratinjau Live) */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'edit'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor WYSIWYG</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Pratinjau Live</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Editor View */}
        {activeTab === 'edit' ? (
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              rows={rows}
              className="w-full p-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans text-sm leading-relaxed focus:outline-none resize-y min-h-[120px]"
            />
          </div>
        ) : (
          /* Tab 2: Pratinjau Live View */
          <div className="p-4 bg-slate-50/50 dark:bg-slate-950/40 min-h-[140px] max-h-[350px] overflow-y-auto">
            {value.trim() ? (
              <div className="wysiwyg-content">
                <MathRenderer text={value} />
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 italic text-xs font-mono">
                Belum ada konten untuk ditampilkan. Ketik sesuatu di tab Editor.
              </div>
            )}
          </div>
        )}
      </div>

      {/* TABLE GENERATOR MODAL OVERLAY */}
      {showTableModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                <TableIcon className="w-4 h-4 text-blue-500" />
                <span>Buat & Sisipkan Tabel Data</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowTableModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Rows & Cols selector */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Jumlah Baris (Rows)
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={tableRows}
                  onChange={(e) => setTableRows(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-black font-semibold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Jumlah Kolom (Cols)
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={tableCols}
                  onChange={(e) => setTableCols(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-black font-semibold"
                />
              </div>
            </div>

            {/* Include Header Checkbox */}
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={hasHeader}
                onChange={(e) => setHasHeader(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300"
              />
              <span>Sertakan Baris Judul Kolom (Header)</span>
            </label>

            {/* Quick Presets */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Template Tabel Cepat:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleInsertTable(2, 3)}
                  className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-xl text-left text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                >
                  📊 Tabel Data (2x3)
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertTable(4, 2)}
                  className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-xl text-left text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                >
                  📈 Nilai & Frekuensi (4x2)
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowTableModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleInsertTable()}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-md shadow-blue-500/20"
              >
                Sisipkan Tabel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE UPLOAD / URL MODAL OVERLAY */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                <ImageIcon className="w-4 h-4 text-emerald-500" />
                <span>Sisipkan Gambar ke Soal</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Upload File Input */}
            <div className="space-y-3">
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-emerald-500 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/50 text-center relative transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (file.size > 2 * 1024 * 1024) {
                      alert('Ukuran berkas melebihi 2MB!');
                      return;
                    }
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        setImagePreview(event.target.result as string);
                      }
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                <span className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Pilih Gambar dari Komputer
                </span>
                <span className="text-[10px] text-slate-400">
                  Format PNG, JPG, WEBP (Maks 2MB)
                </span>
              </div>

              {/* Or Direct Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Atau Masukkan URL Tautan Gambar:
                </label>
                <input
                  type="text"
                  placeholder="https://contoh.com/gambar-soal.png"
                  value={imageUrlInput}
                  onChange={(e) => {
                    setImageUrlInput(e.target.value);
                    setImagePreview(e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-black font-semibold"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Keterangan / Alt Gambar (Opsional):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Diagram Sel Hewan"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-black font-semibold"
                />
              </div>

              {/* Image Thumbnail Preview */}
              {imagePreview && (
                <div className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={imagePreview}
                      alt="Pratinjau"
                      className="w-10 h-10 object-cover rounded-lg border shrink-0"
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                      Gambar Siap Disisipkan
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setImageUrlInput('');
                    }}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleInsertImage}
                disabled={!imagePreview && !imageUrlInput}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-xs font-bold text-white shadow-md shadow-emerald-500/20"
              >
                Sisipkan Gambar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
