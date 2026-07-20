/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sun, Moon, LogOut, ShieldCheck, User as UserIcon, Monitor } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  systemName: string;
}

export default function Header({
  user,
  darkMode,
  toggleDarkMode,
  onLogout,
  onNavigate,
  systemName,
}: HeaderProps) {
  return (
    <header id="app-header" className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors duration-300">
      <div className="px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate(user ? 'dashboard' : 'landing')}>
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
            <div className="w-3.5 h-3.5 border-2 border-white rounded-sm"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-slate-800 dark:text-white">
              AeroTryOut Pro
            </span>
            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 tracking-wider uppercase font-bold">
              Try Out Standard Nasional
            </span>
          </div>
        </div>

        {/* Dynamic Navigation/Controls */}
        <div className="flex items-center space-x-3">
          {/* Dark Mode Switcher */}
          <button
            id="theme-toggle"
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {user ? (
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-800">
              {/* User Identity Info */}
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {user.fullName}
                </span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono flex items-center justify-end gap-1 font-semibold uppercase">
                  <ShieldCheck className="w-2.5 h-2.5 text-emerald-500 inline" />
                  {user.role} {user.schoolClass ? `• ${user.schoolClass}` : ''}
                </span>
              </div>

              {/* Profile Menu Toggle */}
              <button
                id="profile-nav-btn"
                onClick={() => onNavigate('profil')}
                className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all focus:outline-none"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
              </button>

              {/* Quick Logout Icon */}
              <button
                id="header-logout-btn"
                onClick={onLogout}
                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/10 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Keluar"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              id="header-login-btn"
              onClick={() => onNavigate('login')}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              Masuk Sistem
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
