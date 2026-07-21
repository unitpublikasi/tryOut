/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  initializeLocalStorageDatabase,
  getFromLocalStorage,
  saveToLocalStorage,
  MOCK_USERS,
  MOCK_QUESTIONS,
  MOCK_TRYOUTS,
  MOCK_SUBMISSIONS,
  DEFAULT_SETTINGS
} from './data';
import { User, Question, Tryout, Submission, SystemSettings, ToastNotification } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import QuestionBank from './components/QuestionBank';
import AnalyticsReport from './components/AnalyticsReport';
import UserProfile from './components/UserProfile';
import SystemSettingsComponent from './components/SystemSettings';
import ExamPlayer from './components/ExamPlayer';
import ResultView from './components/ResultView';
import UserManagement from './components/UserManagement';
import TryoutManagement from './components/TryoutManagement';

import { Menu, X, ShieldAlert, Sparkles, Check, AlertCircle } from 'lucide-react';

export default function App() {
  // 1. Initial State Sync
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [tryouts, setTryouts] = useState<Tryout[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [settings, setSettings] = useState<SystemSettings>(DEFAULT_SETTINGS);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true); // Default to dark mode for modern high-tech feel
  const [activePage, setActivePage] = useState<string>('landing');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Special active views
  const [activeTryout, setActiveTryout] = useState<Tryout | null>(null);
  const [activeResultSubmission, setActiveResultSubmission] = useState<Submission | null>(null);

  // Notifications
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Initialize DB from LocalStorage on mount
  useEffect(() => {
    initializeLocalStorageDatabase();
    setUsers(getFromLocalStorage<User[]>('to_users', MOCK_USERS));
    setQuestions(getFromLocalStorage<Question[]>('to_questions', MOCK_QUESTIONS));
    setTryouts(getFromLocalStorage<Tryout[]>('to_tryouts', MOCK_TRYOUTS));
    setSubmissions(getFromLocalStorage<Submission[]>('to_submissions', MOCK_SUBMISSIONS));
    setSettings(getFromLocalStorage<SystemSettings>('to_settings', DEFAULT_SETTINGS));
    setIsDbInitialized(true);

    // Keep active user login persistence
    const savedUser = localStorage.getItem('to_active_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser) as User);
        setActivePage('dashboard');
      } catch {
        localStorage.removeItem('to_active_user');
      }
    }
  }, []);

  // Sync dark theme class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toast notification dispatcher
  const triggerToast = (message: string, type: 'success' | 'error' | 'info') => {
    const id = `toast-${Date.now()}`;
    const newToast: ToastNotification = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // 2. Data modification handlers
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('to_active_user', JSON.stringify(user));
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    if (confirm('Yakin ingin keluar dari sesi sistem Anda?')) {
      setCurrentUser(null);
      localStorage.removeItem('to_active_user');
      setActivePage('landing');
      setActiveTryout(null);
      setActiveResultSubmission(null);
      triggerToast('Sesi Anda telah diakhiri dengan aman.', 'info');
    }
  };

  const handleRegisterStudent = (newStudent: User) => {
    const updatedUsers = [...users, newStudent];
    setUsers(updatedUsers);
    saveToLocalStorage('to_users', updatedUsers);
  };

  const handleAddQuestion = (newQuestion: Question) => {
    const updated = [newQuestion, ...questions];
    setQuestions(updated);
    saveToLocalStorage('to_questions', updated);
    triggerToast('Butir soal baru berhasil dimasukkan ke Bank Soal!', 'success');
  };

  const handleAddQuestionsBulk = (newQuestions: Question[]) => {
    const updated = [...newQuestions, ...questions];
    setQuestions(updated);
    saveToLocalStorage('to_questions', updated);
    triggerToast(`Berhasil mengimpor ${newQuestions.length} butir soal ke Bank Soal!`, 'success');
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm('Yakin ingin menghapus butir soal ini? Tindakan ini permanen.')) {
      const updated = questions.filter((q) => q.id !== id);
      setQuestions(updated);
      saveToLocalStorage('to_questions', updated);
      triggerToast('Butir soal berhasil dihapus dari database.', 'info');
    }
  };

  const handleAddTryout = (newTryout: Tryout) => {
    const updated = [newTryout, ...tryouts];
    setTryouts(updated);
    saveToLocalStorage('to_tryouts', updated);
  };

  const handleUpdateTryout = (updatedTryout: Tryout) => {
    const updated = tryouts.map((t) => (t.id === updatedTryout.id ? updatedTryout : t));
    setTryouts(updated);
    saveToLocalStorage('to_tryouts', updated);
    triggerToast(`Jadwal Try Out "${updatedTryout.title}" berhasil diperbarui!`, 'success');
  };

  const handleDeleteTryout = (id: string) => {
    const updated = tryouts.filter((t) => t.id !== id);
    setTryouts(updated);
    saveToLocalStorage('to_tryouts', updated);
    triggerToast('Jadwal Try Out berhasil dihapus.', 'info');
  };

  const handleTogglePublish = (id: string) => {
    const updated = tryouts.map((t) => {
      if (t.id === id) {
        const nextState = !t.isPublished;
        triggerToast(`Status Try Out diubah menjadi ${nextState ? 'PUBLISHED' : 'DRAFT'}`, 'success');
        return { ...t, isPublished: nextState };
      }
      return t;
    });
    setTryouts(updated);
    saveToLocalStorage('to_tryouts', updated);
  };

  const handleAddSubmission = (sub: Submission) => {
    const updated = [...submissions, sub];
    setSubmissions(updated);
    saveToLocalStorage('to_submissions', updated);
    setActiveTryout(null);
    setActiveResultSubmission(sub);
    setActivePage('siswa-hasil');
    triggerToast('Ujian selesai dikerjakan! Skor Anda sedang dikonstruksi.', 'success');
  };

  const handleDeleteSubmission = (id: string) => {
    const updated = submissions.filter((s) => s.id !== id);
    setSubmissions(updated);
    saveToLocalStorage('to_submissions', updated);
    triggerToast('Rekam nilai ujian berhasil dihapus.', 'info');
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('to_active_user', JSON.stringify(updatedUser));

    const updatedList = users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
    setUsers(updatedList);
    saveToLocalStorage('to_users', updatedList);
  };

  const handleAddUser = (newUser: User) => {
    const updated = [...users, newUser];
    setUsers(updated);
    saveToLocalStorage('to_users', updated);
  };

  const handleUpdateUser = (updatedUser: User) => {
    const updated = users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
    setUsers(updated);
    saveToLocalStorage('to_users', updated);
    
    // If updating currently logged in admin user themselves
    if (updatedUser.id === currentUser?.id) {
      setCurrentUser(updatedUser);
      localStorage.setItem('to_active_user', JSON.stringify(updatedUser));
    }
  };

  const handleDeleteUser = (id: string) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    saveToLocalStorage('to_users', updated);
  };

  const handleUpdateSettings = (newSettings: SystemSettings) => {
    setSettings(newSettings);
    saveToLocalStorage('to_settings', newSettings);
  };

  const handleResetDatabase = () => {
    localStorage.removeItem('to_users');
    localStorage.removeItem('to_questions');
    localStorage.removeItem('to_tryouts');
    localStorage.removeItem('to_submissions');
    localStorage.removeItem('to_settings');
    localStorage.removeItem('to_active_user');
  };

  // Navigations routing controller
  const navigateToPage = (pageName: string) => {
    setActivePage(pageName);
    setIsMobileMenuOpen(false);
    // Reset specific states when leaving pages
    if (pageName !== 'siswa-hasil') {
      setActiveResultSubmission(null);
    }
  };

  if (!isDbInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-mono text-sm">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 animate-spin flex items-center justify-center font-bold text-xl">
            A
          </div>
          <span>SEDANG MENSINKRONISASI DATABASE LOKAL...</span>
        </div>
      </div>
    );
  }

  // 3. RENDER CONTROLLER
  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* GLOBAL BACKGROUND NOISE GRAPHICS */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

      {/* RENDER EXAM MODE (Fullscreen exclusive viewport) */}
      {activeTryout ? (
        <ExamPlayer
          tryout={activeTryout}
          studentId={currentUser?.id || 'guest'}
          studentName={currentUser?.fullName || 'Siswa Mandiri'}
          studentClass={currentUser?.schoolClass || 'XII-MIPA-1'}
          onSubmit={handleAddSubmission}
          onCancel={() => {
            if (confirm('Yakin ingin membatalkan pengerjaan ujian? Jawaban Anda saat ini tidak akan disimpan.')) {
              setActiveTryout(null);
              navigateToPage('dashboard');
              triggerToast('Ujian dibatalkan.', 'info');
            }
          }}
        />
      ) : (
        /* STANDARD NAVIGATION FRAME */
        <>
          <Header
            user={currentUser}
            darkMode={darkMode}
            toggleDarkMode={() => setDarkMode(!darkMode)}
            onLogout={handleLogout}
            onNavigate={navigateToPage}
            systemName={settings.systemName}
          />

          <div className="flex-1 flex relative">
            {/* Sidebar Navigation (Visible on Desktop) */}
            {currentUser && (
              <Sidebar
                user={currentUser}
                activePage={activePage}
                onNavigate={navigateToPage}
                onLogout={handleLogout}
              />
            )}

            {/* Viewport Core Container */}
            <main className="flex-1 min-w-0 relative z-10">
              
              {/* Dynamic Responsive Mobile Float Menu Trigger */}
              {currentUser && (
                <div className="lg:hidden p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold font-mono tracking-wider text-slate-400">
                    MENU NAVIGASI PORTAL
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  >
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              )}

              {/* Mobile Drawer Menu overlay */}
              {currentUser && isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm lg:hidden animate-fade-in">
                  <div className="w-72 bg-white dark:bg-slate-900 h-full p-6 flex flex-col justify-between border-r border-slate-200 dark:border-slate-800">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                        <span className="font-bold text-sm bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent uppercase font-mono">{settings.systemName}</span>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                          <X className="w-5 h-5 text-slate-400" />
                        </button>
                      </div>

                      {/* Mobile Links */}
                      <nav className="space-y-2">
                        {[
                          { id: 'dashboard', label: 'Dashboard' },
                          { id: 'bank-soal', label: 'Bank Soal', roles: ['admin', 'guru'] },
                          { id: 'try-out-list', label: 'Manajemen Try Out', roles: ['admin', 'guru'] },
                          { id: 'laporan', label: 'Laporan & Analitik', roles: ['admin', 'guru'] },
                          { id: 'users-manage', label: 'Manajemen User', roles: ['admin'] },
                          { id: 'profil', label: 'Profil Saya' },
                          { id: 'settings', label: 'Pengaturan' }
                        ]
                          .filter((item) => !item.roles || item.roles.includes(currentUser.role))
                          .map((item) => (
                            <button
                              key={item.id}
                              onClick={() => navigateToPage(item.id)}
                              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase transition-all ${
                                activePage === item.id
                                  ? 'bg-blue-600 text-white'
                                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                      </nav>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full py-3.5 rounded-xl border border-red-200 dark:border-red-950/40 text-red-600 dark:text-red-400 font-bold text-xs"
                    >
                      Keluar Sistem
                    </button>
                  </div>
                </div>
              )}

              {/* ROUTER SWITCH VIEWPORT */}
              <div className="animate-fade-in">
                {/* 1. VIEW GUEST LANDING */}
                {!currentUser && activePage === 'landing' && (
                  <LandingPage
                    systemName={settings.systemName}
                    onStart={() => navigateToPage('login')}
                  />
                )}

                {/* 2. VIEW GUEST LOGIN / REGISTER */}
                {!currentUser && activePage === 'login' && (
                  <Login
                    onLoginSuccess={handleLoginSuccess}
                    onToast={triggerToast}
                    systemName={settings.systemName}
                    users={users}
                    onRegisterStudent={handleRegisterStudent}
                    enableSelfReg={settings.enableSelfRegistration}
                  />
                )}

                {/* 3. VIEW LOGGED IN DASHBOARD */}
                {currentUser && activePage === 'dashboard' && (
                  <Dashboard
                    user={currentUser}
                    tryouts={tryouts}
                    submissions={submissions}
                    questions={questions}
                    onStartTryout={setActiveTryout}
                    onViewResult={setActiveResultSubmission}
                    onAddTryout={handleAddTryout}
                    onUpdateTryout={handleUpdateTryout}
                    onDeleteTryout={handleDeleteTryout}
                    onTogglePublish={handleTogglePublish}
                    onToast={triggerToast}
                  />
                )}

                {/* 4. VIEW BANK SOAL */}
                {currentUser && activePage === 'bank-soal' && (
                  <QuestionBank
                    questions={questions}
                    onAddQuestion={handleAddQuestion}
                    onAddQuestionsBulk={handleAddQuestionsBulk}
                    onDeleteQuestion={handleDeleteQuestion}
                    userRole={currentUser.role}
                    userId={currentUser.id}
                  />
                )}

                {/* 4.5. VIEW MANAJEMEN TRY OUT (CRUD) */}
                {currentUser && activePage === 'try-out-list' && (currentUser.role === 'admin' || currentUser.role === 'guru') && (
                  <TryoutManagement
                    user={currentUser}
                    tryouts={tryouts}
                    questions={questions}
                    onAddTryout={handleAddTryout}
                    onUpdateTryout={handleUpdateTryout}
                    onDeleteTryout={handleDeleteTryout}
                    onTogglePublish={handleTogglePublish}
                    onToast={triggerToast}
                  />
                )}

                {/* 5. VIEW STUDENT TRY OUT LISTS OR HISTORY SWITCH */}
                {currentUser && activePage === 'siswa-try-out' && (
                  <Dashboard
                    user={currentUser}
                    tryouts={tryouts}
                    submissions={submissions}
                    questions={questions}
                    onStartTryout={setActiveTryout}
                    onViewResult={setActiveResultSubmission}
                    onAddTryout={handleAddTryout}
                    onUpdateTryout={handleUpdateTryout}
                    onDeleteTryout={handleDeleteTryout}
                    onTogglePublish={handleTogglePublish}
                    onToast={triggerToast}
                  />
                )}

                {/* 6. VIEW STUDENT RESULTS / REPORT CARD LIST */}
                {currentUser && activePage === 'siswa-hasil' && (
                  activeResultSubmission ? (
                    <ResultView
                      submission={activeResultSubmission}
                      tryout={tryouts.find((t) => t.id === activeResultSubmission.tryoutId) || tryouts[0]}
                      onClose={() => navigateToPage('dashboard')}
                    />
                  ) : (
                    <Dashboard
                      user={currentUser}
                      tryouts={tryouts}
                      submissions={submissions}
                      questions={questions}
                      onStartTryout={setActiveTryout}
                      onViewResult={setActiveResultSubmission}
                      onAddTryout={handleAddTryout}
                      onUpdateTryout={handleUpdateTryout}
                      onDeleteTryout={handleDeleteTryout}
                      onTogglePublish={handleTogglePublish}
                      onToast={triggerToast}
                    />
                  )
                )}

                {/* 7. VIEW TEACHER ANALYTICS REPORT */}
                {currentUser && activePage === 'laporan' && (
                  <AnalyticsReport
                    submissions={submissions}
                    tryouts={tryouts}
                    onDeleteSubmission={handleDeleteSubmission}
                  />
                )}

                {/* 8. VIEW PROFILE MANAGEMENT */}
                {currentUser && activePage === 'profil' && (
                  <UserProfile
                    user={currentUser}
                    onUpdateProfile={handleUpdateProfile}
                    onToast={triggerToast}
                  />
                )}

                {/* 8.5. VIEW USER MANAGEMENT */}
                {currentUser && activePage === 'users-manage' && currentUser.role === 'admin' && (
                  <UserManagement
                    users={users}
                    onAddUser={handleAddUser}
                    onUpdateUser={handleUpdateUser}
                    onDeleteUser={handleDeleteUser}
                    currentUser={currentUser}
                    onToast={triggerToast}
                  />
                )}

                {/* 9. VIEW SYSTEM SETTINGS */}
                {currentUser && activePage === 'settings' && (
                  <SystemSettingsComponent
                    settings={settings}
                    onUpdateSettings={handleUpdateSettings}
                    onResetDatabase={handleResetDatabase}
                    onToast={triggerToast}
                    userRole={currentUser.role}
                  />
                )}
              </div>
            </main>
          </div>
        </>
      )}

      {/* ANIMATED SLIDING TOAST NOTIFICATIONS DRAWER */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`p-4 rounded-2xl shadow-xl border flex items-start gap-3 transform translate-y-0 transition-all duration-300 ${
              t.type === 'success'
                ? 'bg-slate-900 border-emerald-500/30 text-white'
                : t.type === 'error'
                ? 'bg-slate-900 border-red-500/30 text-white'
                : 'bg-slate-900 border-blue-500/30 text-white'
            }`}
          >
            <div className="pt-0.5">
              {t.type === 'success' ? (
                <Check className="w-5 h-5 text-emerald-500" />
              ) : t.type === 'error' ? (
                <ShieldAlert className="w-5 h-5 text-red-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-blue-500" />
              )}
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-wider block font-mono text-slate-400 mb-0.5">
                {t.type.toUpperCase()} SYSTEM
              </span>
              <p className="text-xs font-medium leading-relaxed">{t.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
