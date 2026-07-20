/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, ShieldCheck, Mail, School, Landmark, KeyRound, Save } from 'lucide-react';
import { User as UserType } from '../types';

interface UserProfileProps {
  user: UserType;
  onUpdateProfile: (updated: UserType) => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export default function UserProfile({ user, onUpdateProfile, onToast }: UserProfileProps) {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [schoolName, setSchoolName] = useState(user.schoolName);
  const [schoolClass, setSchoolClass] = useState(user.schoolClass || '');
  const [avatar, setAvatar] = useState(user.avatar);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const PRESET_AVATARS = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      onToast('Nama Lengkap dan Email tidak boleh kosong!', 'error');
      return;
    }

    if (password) {
      if (password !== confirmPassword) {
        onToast('Password baru tidak cocok dengan konfirmasi!', 'error');
        return;
      }
      if (password.length < 6) {
        onToast('Password minimal harus 6 karakter!', 'error');
        return;
      }
    }

    const updatedUser: UserType = {
      ...user,
      fullName,
      email,
      schoolName,
      schoolClass: user.role === 'siswa' ? schoolClass : undefined,
      avatar,
    };

    if (password) {
      updatedUser.password = password;
    }

    onUpdateProfile(updatedUser);
    onToast('Profil berhasil diperbarui dengan aman!', 'success');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div id="profile-container" className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <User className="w-6 h-6 text-blue-600" />
          <span>Pengaturan Profil Saya</span>
        </h2>
        <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
          Perbarui informasi personal, institusi sekolah, foto profil, dan kata sandi keamanan Anda di sini.
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT CARD: Avatar Picker */}
        <div className="md:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center shadow-md flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 block">Foto Profil Aktif</span>
          <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-indigo-500/20 shadow-lg mb-4">
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{fullName}</h4>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase mt-0.5">{user.role} {schoolClass ? `• ${schoolClass}` : ''}</span>

          {/* Preset Avatar Selection Grid */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 w-full">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-3 block">Pilih Avatar Instan</span>
            <div className="grid grid-cols-3 gap-2">
              {PRESET_AVATARS.map((pAvatar, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAvatar(pAvatar)}
                  className={`w-11 h-11 rounded-xl overflow-hidden border-2 transition-all active:scale-95 ${
                    avatar === pAvatar ? 'border-blue-500 ring-2 ring-blue-500/10 scale-105' : 'border-slate-100 hover:border-slate-300'
                  }`}
                >
                  <img src={pAvatar} alt={`Preset ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT CARD: Information Form Fields */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono border-b border-slate-100 dark:border-slate-800 pb-2">Informasi Personal</h3>
            
            {/* Full Name & Username */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Username (Unik)</label>
                <input
                  type="text"
                  disabled
                  value={user.username}
                  className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-xl text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed font-mono"
                  title="Username sistem tidak dapat diubah"
                />
              </div>
            </div>

            {/* Email & School Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Alamat Email</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Nama Sekolah / Lembaga</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                  <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Class Input (Only for student) */}
            {user.role === 'siswa' && (
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Kelas Akademik</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Contoh: XII-IPA-1 atau XI-IPS-2"
                    value={schoolClass}
                    onChange={(e) => setSchoolClass(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                  <Landmark className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}
          </div>

          {/* Password Security Form */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-indigo-500" />
              <span>Ganti Kata Sandi Keamanan</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Password Baru</label>
                <input
                  type="password"
                  placeholder="Ketik password baru jika ingin mengubah"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Konfirmasi Password Baru</label>
                <input
                  type="password"
                  placeholder="Ketik ulang password baru Anda"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Action Block */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/10 flex items-center gap-2"
            >
              <Save className="w-4.5 h-4.5" />
              <span>Simpan Perubahan Profil</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
