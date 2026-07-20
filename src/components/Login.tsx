/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, User as UserIcon, Lock, Sparkles, UserPlus, ArrowRight } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  systemName: string;
  users: User[];
  onRegisterStudent: (newUser: User) => void;
  enableSelfReg: boolean;
}

export default function Login({
  onLoginSuccess,
  onToast,
  systemName,
  users,
  onRegisterStudent,
  enableSelfReg,
}: LoginProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studentClass, setStudentClass] = useState('XII-MIPA-1');

  // Quick action demo triggers
  const handleQuickLogin = (role: 'admin' | 'guru' | 'siswa') => {
    let targetUsername = 'admin';
    if (role === 'guru') targetUsername = 'guru';
    if (role === 'siswa') targetUsername = 'siswa';

    const found = users.find((u) => u.username === targetUsername);
    if (found) {
      onLoginSuccess(found);
      onToast(`Berhasil masuk sebagai ${found.fullName} (${found.role.toUpperCase()})`, 'success');
    }
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      onToast('Mohon masukkan username dan password Anda!', 'error');
      return;
    }

    const found = users.find(
      (u) =>
        u.username.toLowerCase() === username.trim().toLowerCase() &&
        (u.password === password || password === `${u.username}123` || password === 'admin123')
    );

    if (found) {
      onLoginSuccess(found);
      onToast(`Selamat datang kembali, ${found.fullName}!`, 'success');
    } else {
      onToast('Username atau kata sandi tidak valid!', 'error');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !fullName.trim() || !email.trim()) {
      onToast('Mohon lengkapi seluruh formulir registrasi!', 'error');
      return;
    }

    const usernameExists = users.some((u) => u.username.toLowerCase() === username.trim().toLowerCase());
    if (usernameExists) {
      onToast('Username sudah terdaftar di sistem!', 'error');
      return;
    }

    const newStudent: User = {
      id: `u-${Date.now()}`,
      username: username.trim().toLowerCase(),
      fullName: fullName.trim(),
      email: email.trim(),
      role: 'siswa',
      schoolClass: studentClass,
      schoolName: 'SMA Negeri 1 Jakarta',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    };

    onRegisterStudent(newStudent);
    onToast('Pendaftaran berhasil! Silakan masuk dengan username Anda.', 'success');
    setIsRegister(false);
    setUsername(newStudent.username);
    setPassword('');
  };

  return (
    <div id="login-container" className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative z-10 transition-all">
        
        {/* LEFT COMPACT INFO COLUMN (Showcasing branding and fast login instructions) */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 p-8 text-white flex flex-col justify-between relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center font-bold text-white mb-6">
              A
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Platform Evaluasi Mandiri</h2>
            <p className="text-blue-200/70 text-xs leading-relaxed">
              Ujian simulasi Try Out berstandar nasional yang diperlengkapi fitur anti-curang, pelacakan waktu, dan lembar pembahasan instan.
            </p>
          </div>

          {/* Quick Login Assistances */}
          <div className="mt-8 relative pt-6 border-t border-white/10">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UJIAN DEMO INSTAN (ONE-CLICK LOGIN)</span>
            </span>
            <div className="space-y-2">
              <button
                id="quick-siswa-login"
                onClick={() => handleQuickLogin('siswa')}
                className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors group active:scale-95"
              >
                <span>Masuk sebagai Siswa (Budi)</span>
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                id="quick-guru-login"
                onClick={() => handleQuickLogin('guru')}
                className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors group active:scale-95"
              >
                <span>Masuk sebagai Guru (Sriyuni)</span>
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                id="quick-admin-login"
                onClick={() => handleQuickLogin('admin')}
                className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors group active:scale-95"
              >
                <span>Masuk sebagai Administrator</span>
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            <span className="text-[9px] text-blue-300/50 mt-3 block leading-relaxed">
              *Klik tombol di atas untuk menguji coba fitur masing-masing role secara instan tanpa memasukkan password manual.
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Authentication Form (Login or Register) */}
        <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
          {!isRegister ? (
            /* LOGIN SCREEN */
            <div id="login-form-wrapper" className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white">Masuk ke Portal</h3>
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
                  Gunakan kredensial akun terdaftar Anda untuk melanjutkan pengerjaan Try Out.
                </p>
              </div>

              <form onSubmit={handleManualLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Username</label>
                  <div className="relative">
                    <input
                      id="login-username-input"
                      type="text"
                      required
                      placeholder="Masukkan username (contoh: siswa atau guru)"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs md:text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-mono"
                    />
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Kata Sandi (Password)</label>
                  <div className="relative">
                    <input
                      id="login-password-input"
                      type="password"
                      required
                      placeholder="Masukkan kata sandi (contoh: siswa123 atau guru123)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs md:text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-mono"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <button
                  id="submit-login-btn"
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all duration-200 active:scale-[0.98] shadow-lg shadow-blue-500/10 mt-2 flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4.5 h-4.5" />
                  <span>Autentikasi & Masuk</span>
                </button>
              </form>

              {enableSelfReg && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
                  <span className="text-slate-400">Belum memiliki akun siswa? </span>
                  <button
                    id="toggle-register-btn"
                    onClick={() => {
                      setIsRegister(true);
                      setUsername('');
                    }}
                    className="text-blue-600 hover:text-blue-500 font-bold underline transition-colors"
                  >
                    Registrasi Mandiri Sekarang
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* STUDENT REGISTRATION SCREEN */
            <div id="register-form-wrapper" className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white">Registrasi Akun Siswa Baru</h3>
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
                  Mendaftar sebagai siswa mandiri di lingkungan {systemName} secara instan.
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Username Pilihan</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: andi99"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Kelas Akademik</label>
                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="XII-MIPA-1">XII MIPA 1</option>
                      <option value="XII-MIPA-2">XII MIPA 2</option>
                      <option value="XII-IIS-1">XII IIS 1</option>
                      <option value="XII-IIS-2">XII IIS 2</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Nama Lengkap Siswa</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Andi Wijaya"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Alamat Email Aktif</label>
                  <input
                    type="email"
                    required
                    placeholder="Contoh: andi@siswa.sch.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsRegister(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-1"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Daftarkan Akun</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
