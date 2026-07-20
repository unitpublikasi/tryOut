/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Shield,
  GraduationCap,
  Briefcase,
  Trash2,
  Edit2,
  X,
  Check,
  Mail,
  User as UserIcon,
  BookOpen,
  Eye,
  EyeOff
} from 'lucide-react';
import { User, UserRole } from '../types';

interface UserManagementProps {
  users: User[];
  onAddUser: (newUser: User) => void;
  onUpdateUser: (updatedUser: User) => void;
  onDeleteUser: (userId: string) => void;
  currentUser: User;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export default function UserManagement({
  users,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  currentUser,
  onToast,
}: UserManagementProps) {
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<'all' | UserRole>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form Fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('siswa');
  const [schoolClass, setSchoolClass] = useState('XII-MIPA-1');
  const [schoolName, setSchoolName] = useState('SMA Negeri 1 Jakarta');
  const [showPassword, setShowPassword] = useState(false);

  // Open form for adding
  const handleOpenAdd = () => {
    setEditingUser(null);
    setUsername('');
    setPassword('');
    setFullName('');
    setEmail('');
    setRole('siswa');
    setSchoolClass('XII-MIPA-1');
    setSchoolName('SMA Negeri 1 Jakarta');
    setShowPassword(false);
    setIsFormOpen(true);
  };

  // Open form for editing
  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setUsername(user.username);
    setPassword(user.password || `${user.username}123`);
    setFullName(user.fullName);
    setEmail(user.email);
    setRole(user.role);
    setSchoolClass(user.schoolClass || 'XII-MIPA-1');
    setSchoolName(user.schoolName || 'SMA Negeri 1 Jakarta');
    setShowPassword(false);
    setIsFormOpen(true);
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !fullName.trim() || !email.trim()) {
      onToast('Mohon lengkapi seluruh field wajib!', 'error');
      return;
    }

    const cleanUsername = username.trim().toLowerCase();

    // Check if username is taken (excluding current editing user)
    const usernameTaken = users.some(
      (u) => u.username.toLowerCase() === cleanUsername && (!editingUser || u.id !== editingUser.id)
    );

    if (usernameTaken) {
      onToast('Username sudah terdaftar! Pilih username lain.', 'error');
      return;
    }

    if (editingUser) {
      // Edit mode
      const updated: User = {
        ...editingUser,
        username: cleanUsername,
        password: password || undefined,
        fullName: fullName.trim(),
        email: email.trim(),
        role,
        schoolClass: role === 'siswa' ? schoolClass : undefined,
        schoolName: schoolName.trim(),
      };
      onUpdateUser(updated);
      onToast(`Profil user ${updated.fullName} berhasil diperbarui!`, 'success');
    } else {
      // Create mode
      // Determine avatar based on role/gender (simple default)
      let avatarUrl = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200'; // default student
      if (role === 'admin') {
        avatarUrl = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200';
      } else if (role === 'guru') {
        avatarUrl = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200';
      }

      const newUser: User = {
        id: `u-${Date.now()}`,
        username: cleanUsername,
        password: password || `${cleanUsername}123`,
        fullName: fullName.trim(),
        email: email.trim(),
        role,
        schoolClass: role === 'siswa' ? schoolClass : undefined,
        schoolName: schoolName.trim(),
        avatar: avatarUrl,
      };
      onAddUser(newUser);
      onToast(`User baru ${newUser.fullName} (${newUser.role.toUpperCase()}) berhasil dibuat!`, 'success');
    }

    setIsFormOpen(false);
  };

  // Handle Delete
  const handleDelete = (user: User) => {
    if (user.id === currentUser.id) {
      onToast('Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif!', 'error');
      return;
    }

    if (confirm(`Apakah Anda yakin ingin menghapus user "${user.fullName}" (${user.role.toUpperCase()})? Semua data terkait user ini akan terhapus.`)) {
      onDeleteUser(user.id);
      onToast(`User ${user.fullName} telah dihapus.`, 'info');
    }
  };

  // Filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.schoolClass && user.schoolClass.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = selectedRoleFilter === 'all' || user.role === selectedRoleFilter;

    return matchesSearch && matchesRole;
  });

  // Get Badge Color
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border border-red-100 dark:border-red-900/30">
            <Shield className="w-3.5 h-3.5" />
            Admin
          </span>
        );
      case 'guru':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
            <Briefcase className="w-3.5 h-3.5" />
            Guru
          </span>
        );
      case 'siswa':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
            <GraduationCap className="w-3.5 h-3.5" />
            Siswa
          </span>
        );
    }
  };

  return (
    <div id="user-management-container" className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span>Manajemen Akun Pengguna</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
            Kelola hak akses sistem, tambah atau perbarui profil akun administrator, guru, dan siswa dalam database lokal.
          </p>
        </div>

        <button
          id="add-user-btn"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-tight transition-all shadow-sm shadow-blue-500/10 flex items-center gap-2 justify-center"
        >
          <UserPlus className="w-4 h-4" />
          <span>Tambah User Baru</span>
        </button>
      </div>

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 gap-6">
        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <input
              id="user-search-input"
              type="text"
              placeholder="Cari nama, username, email, kelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:border-blue-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Filter:
            </span>
            <button
              onClick={() => setSelectedRoleFilter('all')}
              className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all shrink-0 ${
                selectedRoleFilter === 'all'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700'
                  : 'text-slate-500 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Semua ({users.length})
            </button>
            <button
              onClick={() => setSelectedRoleFilter('admin')}
              className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all shrink-0 ${
                selectedRoleFilter === 'admin'
                  ? 'bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400 border border-red-100 dark:border-red-900/30'
                  : 'text-slate-500 hover:text-red-600'
              }`}
            >
              Administrator ({users.filter((u) => u.role === 'admin').length})
            </button>
            <button
              onClick={() => setSelectedRoleFilter('guru')}
              className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all shrink-0 ${
                selectedRoleFilter === 'guru'
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30'
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              Guru ({users.filter((u) => u.role === 'guru').length})
            </button>
            <button
              onClick={() => setSelectedRoleFilter('siswa')}
              className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all shrink-0 ${
                selectedRoleFilter === 'siswa'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30'
                  : 'text-slate-500 hover:text-emerald-600'
              }`}
            >
              Siswa ({users.filter((u) => u.role === 'siswa').length})
            </button>
          </div>
        </div>

        {/* User Table Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850/50">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">Pengguna</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">Username</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">Peran (Role)</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">Detail Tambahan</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                    >
                      {/* Avatar & Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100">
                            <img
                              src={user.avatar}
                              alt={user.fullName}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                              {user.fullName}
                            </span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate flex items-center gap-1">
                              <Mail className="w-3 h-3 text-slate-400" />
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Username */}
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                          {user.username}
                        </span>
                      </td>

                      {/* Role Badge */}
                      <td className="px-6 py-4">
                        {getRoleBadge(user.role)}
                      </td>

                      {/* School/Class Details */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col text-xs">
                          {user.role === 'siswa' ? (
                            <>
                              <span className="text-slate-800 dark:text-slate-200 font-semibold">
                                Kelas: {user.schoolClass || '-'}
                              </span>
                              <span className="text-[10px] text-slate-400">{user.schoolName}</span>
                            </>
                          ) : (
                            <span className="text-slate-500 dark:text-slate-400">
                              {user.schoolName || 'SMA Negeri 1 Jakarta'}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(user)}
                            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            title="Edit User"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(user)}
                            disabled={user.id === currentUser.id}
                            className={`p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors ${
                              user.id === currentUser.id ? 'opacity-30 cursor-not-allowed' : ''
                            }`}
                            title={user.id === currentUser.id ? 'Akun aktif tidak bisa dihapus' : 'Hapus User'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Users className="w-8 h-8 text-slate-300" />
                        <span className="text-xs font-semibold">Tidak ada data pengguna ditemukan</span>
                        <span className="text-[10px] text-slate-400">Silakan sesuaikan filter pencarian atau buat user baru.</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Form Drawer Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-white uppercase tracking-wider font-mono">
                  {editingUser ? 'Perbarui Profil Pengguna' : 'Tambah Pengguna Baru'}
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {editingUser ? `Menyunting data akun: ${editingUser.fullName}` : 'Daftarkan guru, murid, atau administrator baru.'}
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Username & Password */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="contoh: sriyuni"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white font-mono"
                    />
                    <UserIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                    Kata Sandi (Password)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={editingUser ? 'Biarkan default jika tidak diubah' : 'Min 6 karakter'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white font-mono"
                    />
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                  Nama Lengkap Pemilik <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="contoh: Dra. Sri Wahyuni, M.Pd"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                  Alamat Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="contoh: sri.yuni@sekolah.sch.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Role & Class Choice */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                    Peran / Hak Akses (Role)
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="siswa">Siswa (Student)</option>
                    <option value="guru">Guru (Teacher)</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                    Kelas Akademik <span className="text-slate-400 font-normal">(Hanya Siswa)</span>
                  </label>
                  <select
                    disabled={role !== 'siswa'}
                    value={schoolClass}
                    onChange={(e) => setSchoolClass(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <option value="XII-MIPA-1">XII MIPA 1</option>
                    <option value="XII-MIPA-2">XII MIPA 2</option>
                    <option value="XII-IIS-1">XII IIS 1</option>
                    <option value="XII-IIS-2">XII IIS 2</option>
                  </select>
                </div>
              </div>

              {/* School Name */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                  Nama Institusi / Sekolah
                </label>
                <input
                  type="text"
                  required
                  placeholder="contoh: SMA Negeri 1 Jakarta"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingUser ? 'Perbarui Akun' : 'Daftarkan Akun'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
