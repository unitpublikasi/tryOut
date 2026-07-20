/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  FileSpreadsheet,
  BarChart3,
  User,
  Settings,
  GraduationCap,
  Clock,
  LogOut,
  FolderOpen,
  Users
} from 'lucide-react';
import { User as UserType } from '../types';

interface SidebarProps {
  user: UserType;
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ user, activePage, onNavigate, onLogout }: SidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'guru', 'siswa'],
    },
    {
      id: 'bank-soal',
      label: 'Bank Soal',
      icon: BookOpen,
      roles: ['admin', 'guru'],
    },
    {
      id: 'try-out-list',
      label: 'Manajemen Try Out',
      icon: FolderOpen,
      roles: ['admin', 'guru'],
    },
    {
      id: 'siswa-try-out',
      label: 'Mulai Try Out',
      icon: GraduationCap,
      roles: ['siswa'],
    },
    {
      id: 'siswa-hasil',
      label: 'Riwayat & Hasil',
      icon: Clock,
      roles: ['siswa'],
    },
    {
      id: 'laporan',
      label: 'Laporan & Analitik',
      icon: BarChart3,
      roles: ['admin', 'guru'],
    },
    {
      id: 'users-manage',
      label: 'Manajemen User',
      icon: Users,
      roles: ['admin'],
    },
    {
      id: 'profil',
      label: 'Profil Saya',
      icon: User,
      roles: ['admin', 'guru', 'siswa'],
    },
    {
      id: 'settings',
      label: 'Pengaturan',
      icon: Settings,
      roles: ['admin', 'guru', 'siswa'],
    },
  ];

  const filteredItems = menuItems.filter((item) => item.roles.includes(user.role));

  return (
    <aside id="app-sidebar" className="w-64 shrink-0 hidden lg:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* Brand Header Box as seen in Theme design HTML */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
          <div className="w-3.5 h-3.5 border-2 border-white rounded-sm"></div>
        </div>
        <span className="font-bold text-lg tracking-tight text-slate-800 dark:text-white truncate">
          AeroTryOut Pro
        </span>
      </div>

      {/* User Quick Info Box */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center space-x-3 p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/60">
          <div className="w-9 h-9 rounded-lg overflow-hidden border-2 border-indigo-500/10">
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
            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono uppercase font-bold tracking-wider">
              {user.role} {user.schoolClass ? `| ${user.schoolClass}` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2 font-mono">
          Menu Utama
        </div>
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-link-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-semibold tracking-tight transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Log Out Area */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button
          id="sidebar-logout-btn"
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/10 transition-colors duration-200"
        >
          <LogOut className="w-4 h-4 text-red-500 shrink-0" />
          <span>Keluar dari Sistem</span>
        </button>
      </div>
    </aside>
  );
}
