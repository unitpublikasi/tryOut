/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Settings, ShieldAlert, Check, RefreshCcw, Save, Trash2 } from 'lucide-react';
import { SystemSettings as SettingsType } from '../types';

interface SystemSettingsProps {
  settings: SettingsType;
  onUpdateSettings: (newSettings: SettingsType) => void;
  onResetDatabase: () => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  userRole: string;
}

export default function SystemSettings({
  settings,
  onUpdateSettings,
  onResetDatabase,
  onToast,
  userRole,
}: SystemSettingsProps) {
  const [systemName, setSystemName] = useState(settings.systemName);
  const [schoolYear, setSchoolYear] = useState(settings.schoolYear);
  const [passingGrade, setPassingGrade] = useState(settings.passingGradeDefault);
  const [selfReg, setSelfReg] = useState(settings.enableSelfRegistration);
  const [maintenance, setMaintenance] = useState(settings.maintenanceMode);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole !== 'admin') {
      onToast('Hanya Administrator yang diperbolehkan mengubah pengaturan sistem!', 'error');
      return;
    }

    const updated: SettingsType = {
      systemName,
      schoolYear,
      passingGradeDefault: Number(passingGrade),
      enableSelfRegistration: selfReg,
      maintenanceMode: maintenance,
    };

    onUpdateSettings(updated);
    onToast('Pengaturan sistem berhasil diperbarui!', 'success');
  };

  const handleReset = () => {
    if (confirm('PERINGATAN! Seluruh data kustom (pertanyaan baru, tryout baru, nilai ujian siswa) akan terhapus dan direset ke data awal. Lanjutkan?')) {
      onResetDatabase();
      onToast('Database berhasil direset ke seeder bawaan!', 'info');
      // Reload page to reflect original seeder
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  return (
    <div id="settings-container" className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-600" />
          <span>Pengaturan Parameter Sistem</span>
        </h2>
        <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
          Konfigurasi standar kelulusan minimal (KKM), tahun ajaran, hak registrasi, serta pemeliharaan server secara terpusat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT PANEL: Save configurations */}
        <form onSubmit={handleSaveSettings} className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono border-b border-slate-100 dark:border-slate-800 pb-2">Branding & Akademik</h3>
            
            {/* System Name & School Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Nama Platform Sistem</label>
                <input
                  type="text"
                  required
                  disabled={userRole !== 'admin'}
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Tahun Ajaran Aktif</label>
                <input
                  type="text"
                  required
                  disabled={userRole !== 'admin'}
                  value={schoolYear}
                  onChange={(e) => setSchoolYear(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                />
              </div>
            </div>

            {/* Default Passing Grade */}
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Kriteria Ketuntasan Minimal (KKM) Default</label>
              <input
                type="number"
                required
                min={10}
                max={100}
                disabled={userRole !== 'admin'}
                value={passingGrade}
                onChange={(e) => setPassingGrade(Number(e.target.value))}
                className="w-full max-w-xs px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 block">
                KKM default akan otomatis diterapkan saat guru membuat jadwal ujian baru (misal: 75).
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono border-b border-slate-100 dark:border-slate-800 pb-2">Kebijakan Hak Akses & Keamanan</h3>
            
            {/* Toggles */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  disabled={userRole !== 'admin'}
                  checked={selfReg}
                  onChange={(e) => setSelfReg(e.target.checked)}
                  className="w-4.5 h-4.5 rounded text-blue-600 focus:ring-blue-500 bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-700"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Izinkan Registrasi Mandiri Siswa</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">Siswa dapat mendaftarkan akun secara mandiri langsung dari halaman masuk.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  disabled={userRole !== 'admin'}
                  checked={maintenance}
                  onChange={(e) => setMaintenance(e.target.checked)}
                  className="w-4.5 h-4.5 rounded text-red-600 focus:ring-red-500 bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-700"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 text-red-600 dark:text-red-400">Aktifkan Mode Pemeliharaan (Maintenance Mode)</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">Kunci seluruh aktivitas Try Out dan tampilkan halaman pemeliharaan sistem kepada siswa.</span>
                </div>
              </label>
            </div>
          </div>

          {/* Action Trigger Button */}
          {userRole === 'admin' && (
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/10 flex items-center gap-2"
              >
                <Save className="w-4.5 h-4.5" />
                <span>Simpan Pengaturan</span>
              </button>
            </div>
          )}
        </form>

        {/* RIGHT PANEL: System Operations (Factory reset) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block font-mono border-b border-slate-100 dark:border-slate-800 pb-2">
              Operasi Database
            </span>
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-950/40 text-red-700 dark:text-red-400 text-xs flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 shrink-0 text-red-500" />
              <div>
                <span className="font-bold">Wilayah Berbahaya!</span>
                <p className="mt-1 leading-relaxed opacity-90">
                  Melakukan reset pabrik akan mengosongkan seluruh perubahan bank soal kustom, menghapus riwayat pengerjaan siswa, dan mengembalikan seluruh pengaturan ke default seeder asli.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              id="factory-reset-btn"
              disabled={userRole !== 'admin'}
              onClick={handleReset}
              className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-red-500/10 flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4.5 h-4.5" />
              <span>Reset Ke Setelan Pabrik</span>
            </button>
            {userRole !== 'admin' && (
              <span className="text-[10px] text-slate-400 text-center block mt-2">
                Hanya akun "admin" yang memiliki otorisasi penuh reset database.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
