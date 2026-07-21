/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, Question, Tryout, Submission, SystemSettings, Subject, SchoolLevel } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u-1',
    username: 'admin',
    fullName: 'Rahmat Hidayat, M.Kom',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    email: 'admin@sekolah.sch.id',
    schoolName: 'SMA Negeri 1 Jakarta',
  },
  {
    id: 'u-2',
    username: 'guru',
    fullName: 'Dra. Sri Wahyuni, M.Pd',
    role: 'guru',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    email: 'sri.wahyuni@sekolah.sch.id',
    schoolName: 'SMA Negeri 1 Jakarta',
  },
  {
    id: 'u-3',
    username: 'siswa',
    fullName: 'Budi Santoso',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    email: 'budi.santoso@siswa.sch.id',
    schoolClass: 'XII-MIPA-1',
    schoolName: 'SMA Negeri 1 Jakarta',
  },
  {
    id: 'u-4',
    username: 'siti',
    fullName: 'Siti Rahmawati',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    email: 'siti.rahma@siswa.sch.id',
    schoolClass: 'XII-MIPA-1',
    schoolName: 'SMA Negeri 1 Jakarta',
  },
  {
    id: 'u-5',
    username: 'adi',
    fullName: 'Adi Wijaya',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    email: 'adi.wijaya@siswa.sch.id',
    schoolClass: 'XII-MIPA-2',
    schoolName: 'SMA Negeri 1 Jakarta',
  }
];

export const MOCK_QUESTIONS: Question[] = [
  // Mathematics Questions
  {
    id: 'q-1',
    text: 'Jika f(x) = 3x^2 - 5x + 2, maka nilai turunan pertama f\'(2) adalah...',
    options: ['7', '8', '9', '12'],
    correctAnswer: 0, // '7'
    category: 'Matematika',
    difficulty: 'easy',
    explanation: 'f\'(x) = 6x - 5. Maka f\'(2) = 6(2) - 5 = 12 - 5 = 7.',
    teacherId: 'u-2',
    schoolLevel: 'SMA'
  },
  {
    id: 'q-2',
    text: 'Nilai lim_{x -> 0} (sin 4x) / (3x) adalah...',
    options: ['3/4', '4/3', '1', '1/3'],
    correctAnswer: 1, // '4/3'
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Berdasarkan limit fungsi trigonometri, lim_{x -> 0} (sin ax) / (bx) = a/b. Di sini a=4, b=3, sehingga hasilnya 4/3.',
    teacherId: 'u-2',
    schoolLevel: 'SMA'
  },
  {
    id: 'q-3',
    text: 'Dalam suatu kelas terdapat 20 siswa. Peluang terpilihnya 2 orang perwakilan jika 12 diantaranya adalah wanita adalah...',
    options: ['33/95', '66/190', '44/95', '22/95'],
    correctAnswer: 0, // '33/95'
    category: 'Matematika',
    difficulty: 'hard',
    explanation: 'Jumlah wanita = 12, Pria = 8. Peluang terpilih 2 wanita = C(12,2) / C(20,2) = 66 / 190 = 33/95.',
    teacherId: 'u-2',
    schoolLevel: 'SMA'
  },
  // Physics Questions
  {
    id: 'q-4',
    text: 'Sebuah balok bermassa 5 kg ditarik dengan gaya 20 N di atas lantai licin. Percepatan yang dialami balok tersebut adalah...',
    options: ['2 m/s^2', '4 m/s^2', '6 m/s^2', '8 m/s^2'],
    correctAnswer: 1, // '4 m/s^2'
    category: 'Fisika',
    difficulty: 'easy',
    explanation: 'Berdasarkan Hukum II Newton, F = m * a. Maka a = F / m = 20 N / 5 kg = 4 m/s^2.',
    teacherId: 'u-2',
    schoolLevel: 'SMA'
  },
  {
    id: 'q-5',
    text: 'Sebuah kumparan memiliki induktansi diri 0.4 H. Jika arus yang mengalir berubah dari 10 A menjadi 2 A dalam waktu 0.1 detik, besar GGL induksi yang timbul adalah...',
    options: ['8 V', '16 V', '32 V', '64 V'],
    correctAnswer: 2, // '32 V'
    category: 'Fisika',
    difficulty: 'medium',
    explanation: 'GGL Induksi (e) = -L * (dI/dt) = -0.4 * ((2 - 10) / 0.1) = -0.4 * (-8 / 0.1) = 32 Volt.',
    teacherId: 'u-2',
    schoolLevel: 'SMA'
  },
  // Biology Questions
  {
    id: 'q-6',
    text: 'Organel sel yang berfungsi sebagai tempat berlangsungnya respirasi seluler untuk menghasilkan energi (ATP) adalah...',
    options: ['Ribosom', 'Mitokondria', 'Kloroplas', 'Lisosom'],
    correctAnswer: 1, // 'Mitokondria'
    category: 'Biologi',
    difficulty: 'easy',
    explanation: 'Mitokondria sering disebut sebagai the power house of cell karena fungsinya memproduksi ATP melalui respirasi aerobik.',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-7',
    text: 'Persilangan dihibrid antara tanaman kacang ercis berbiji bulat kuning (BbKk) dengan tanaman berbiji keriput hijau (bbkk) akan menghasilkan keturunan dengan rasio fenotip...',
    options: ['9:3:3:1', '1:1:1:1', '3:1', '12:3:1'],
    correctAnswer: 1, // '1:1:1:1'
    category: 'Biologi',
    difficulty: 'medium',
    explanation: 'Ini adalah persilangan test cross dihibrid (BbKk x bbkk). Hasil gamet BbKk ada 4 jenis (BK, Bk, bK, bk) sedangkan bbkk hanya 1 jenis (bk). Maka keturunan memiliki proporsi sama yaitu 1 bulat kuning : 1 bulat hijau : 1 keriput kuning : 1 keriput hijau (1:1:1:1).',
    teacherId: 'u-2',
    schoolLevel: 'SMA'
  },
  // English Questions
  {
    id: 'q-8',
    text: 'Choose the correct form to complete the sentence: "If she ___ harder, she would have passed the scholarship examination last month."',
    options: ['studied', 'has studied', 'had studied', 'would study'],
    correctAnswer: 2, // 'had studied'
    category: 'Bahasa Inggris',
    difficulty: 'medium',
    explanation: 'This is a Conditional Sentence Type 3 (past unreal condition). The structure is: If + Subject + past perfect (had + V3), Subject + would have + V3.',
    teacherId: 'u-2',
    schoolLevel: 'SMA'
  },
  {
    id: 'q-9',
    text: 'Which sentence represents a correct passive voice conversion of: "The teacher is explaining the complex physics formula now."',
    options: [
      'The complex physics formula was explained by the teacher now.',
      'The complex physics formula is being explained by the teacher now.',
      'The complex physics formula has been explained by the teacher now.',
      'The complex physics formula is explained by the teacher now.'
    ],
    correctAnswer: 1, // 'The complex physics formula is being explained...'
    category: 'Bahasa Inggris',
    difficulty: 'medium',
    explanation: 'The original sentence is in Present Continuous tense. The continuous passive form is: Subject + is/am/are + being + V3 + by agent.',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-10',
    text: 'What is the synonym of the word "Meticulous" as used in academic research contexts?',
    options: ['Careless', 'Extremely precise', 'Hasty', 'Superficial'],
    correctAnswer: 1, // 'Extremely precise'
    category: 'Bahasa Inggris',
    difficulty: 'easy',
    explanation: 'Meticulous means showing great attention to detail; very careful and precise.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  }
];

export const MOCK_TRYOUTS: Tryout[] = [
  {
    id: 'to-1',
    title: 'Try Out UTBK Matematika Saintek 2026',
    description: 'Ujian simulasi persiapan seleksi masuk perguruan tinggi negeri untuk mata pelajaran Matematika tingkat lanjut.',
    durationMinutes: 45,
    passingGrade: 75,
    category: 'Matematika',
    questions: [MOCK_QUESTIONS[0], MOCK_QUESTIONS[1], MOCK_QUESTIONS[2]],
    startDate: '2026-07-01T08:00:00Z',
    endDate: '2026-08-31T23:59:59Z',
    createdBy: 'u-2',
    isPublished: true,
    schoolLevel: 'SMA'
  },
  {
    id: 'to-2',
    title: 'Simulasi Fisika & Biologi Terpadu SMA',
    description: 'Try out berkala untuk menguji kemampuan pemahaman konsep fisika mekanika serta struktur genetika seluler.',
    durationMinutes: 30,
    passingGrade: 70,
    category: 'Sains',
    questions: [MOCK_QUESTIONS[3], MOCK_QUESTIONS[4], MOCK_QUESTIONS[5], MOCK_QUESTIONS[6]],
    startDate: '2026-07-10T08:00:00Z',
    endDate: '2026-08-25T23:59:59Z',
    createdBy: 'u-2',
    isPublished: true,
    schoolLevel: 'SMA'
  },
  {
    id: 'to-3',
    title: 'Evaluasi Komprehensif Bahasa Inggris Akademik',
    description: 'Sesi latihan intensif tata bahasa (grammar), klausa kondisional, dan pemahaman kosakata tingkat lanjut.',
    durationMinutes: 20,
    passingGrade: 80,
    category: 'Bahasa Inggris',
    questions: [MOCK_QUESTIONS[7], MOCK_QUESTIONS[8], MOCK_QUESTIONS[9]],
    startDate: '2026-07-15T09:00:00Z',
    endDate: '2026-08-30T17:00:00Z',
    createdBy: 'u-2',
    isPublished: true,
    schoolLevel: 'SMA'
  }
];

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-1',
    studentId: 'u-4', // Siti
    studentName: 'Siti Rahmawati',
    studentClass: 'XII-MIPA-1',
    tryoutId: 'to-1',
    tryoutTitle: 'Try Out UTBK Matematika Saintek 2026',
    answers: {
      'q-1': 0, // correct
      'q-2': 1, // correct
      'q-3': 1  // wrong (correct is 0)
    },
    flagged: [],
    score: 67,
    correctCount: 2,
    wrongCount: 1,
    unansweredCount: 0,
    isPassed: false, // passing was 75
    startTime: '2026-07-15T10:00:00Z',
    submitTime: '2026-07-15T10:35:00Z',
    status: 'completed'
  },
  {
    id: 'sub-2',
    studentId: 'u-5', // Adi
    studentName: 'Adi Wijaya',
    studentClass: 'XII-MIPA-2',
    tryoutId: 'to-1',
    tryoutTitle: 'Try Out UTBK Matematika Saintek 2026',
    answers: {
      'q-1': 0, // correct
      'q-2': 1, // correct
      'q-3': 0  // correct
    },
    flagged: [],
    score: 100,
    correctCount: 3,
    wrongCount: 0,
    unansweredCount: 0,
    isPassed: true,
    startTime: '2026-07-16T14:00:00Z',
    submitTime: '2026-07-16T14:40:00Z',
    status: 'completed'
  },
  {
    id: 'sub-3',
    studentId: 'u-4', // Siti
    studentName: 'Siti Rahmawati',
    studentClass: 'XII-MIPA-1',
    tryoutId: 'to-2',
    tryoutTitle: 'Simulasi Fisika & Biologi Terpadu SMA',
    answers: {
      'q-4': 1, // correct
      'q-5': 2, // correct
      'q-6': 1, // correct
      'q-7': 1  // correct
    },
    flagged: [],
    score: 100,
    correctCount: 4,
    wrongCount: 0,
    unansweredCount: 0,
    isPassed: true,
    startTime: '2026-07-18T09:00:00Z',
    submitTime: '2026-07-18T09:25:00Z',
    status: 'completed'
  },
  {
    id: 'sub-4',
    studentId: 'u-5', // Adi
    studentName: 'Adi Wijaya',
    studentClass: 'XII-MIPA-2',
    tryoutId: 'to-3',
    tryoutTitle: 'Evaluasi Komprehensif Bahasa Inggris Akademik',
    answers: {
      'q-8': 2, // correct
      'q-9': 1, // correct
      'q-10': 0 // wrong
    },
    flagged: [],
    score: 67,
    correctCount: 2,
    wrongCount: 1,
    unansweredCount: 0,
    isPassed: false,
    startTime: '2026-07-19T11:00:00Z',
    submitTime: '2026-07-19T11:15:00Z',
    status: 'completed'
  }
];

export const DEFAULT_SETTINGS: SystemSettings = {
  systemName: 'AeroTryOut Pro',
  schoolYear: '2026/2027',
  passingGradeDefault: 75,
  enableSelfRegistration: true,
  maintenanceMode: false,
};

export const MOCK_SUBJECTS: Subject[] = [
  { id: 'sb-1', name: 'Matematika', description: 'Mata pelajaran hitung, aljabar, kalkulus, dan logika numerik.', levels: ['SD', 'SMP', 'SMA'] },
  { id: 'sb-2', name: 'Fisika', description: 'Studi kinematika, dinamika, listrik, magnet, dan termodinamika.', levels: ['SMP', 'SMA'] },
  { id: 'sb-3', name: 'Biologi', description: 'Studi tentang struktur sel, keanekaragaman hayati, ekologi, dan genetika.', levels: ['SMP', 'SMA'] },
  { id: 'sb-4', name: 'Kimia', description: 'Studi reaksi zat kimia, tabel periodik, stoikiometri, dan larutan.', levels: ['SMA'] },
  { id: 'sb-5', name: 'Bahasa Indonesia', description: 'Tata bahasa baku, pemahaman bacaan teks, dan karya sastra.', levels: ['SD', 'SMP', 'SMA'] },
  { id: 'sb-6', name: 'Bahasa Inggris', description: 'English grammar, reading comprehension, vocabulary, and dialogue.', levels: ['SD', 'SMP', 'SMA'] },
];

export const MOCK_SCHOOL_LEVELS: SchoolLevel[] = [
  { id: 'lv-1', name: 'SD', description: 'Sekolah Dasar (Kelas 1 - 6)' },
  { id: 'lv-2', name: 'SMP', description: 'Sekolah Menengah Pertama (Kelas 7 - 9)' },
  { id: 'lv-3', name: 'SMA', description: 'Sekolah Menengah Atas atau Kejuruan (Kelas 10 - 12)' },
];

// Local storage init helper
export function initializeLocalStorageDatabase() {
  if (!localStorage.getItem('to_users')) {
    localStorage.setItem('to_users', JSON.stringify(MOCK_USERS));
  }
  if (!localStorage.getItem('to_questions')) {
    localStorage.setItem('to_questions', JSON.stringify(MOCK_QUESTIONS));
  }
  if (!localStorage.getItem('to_tryouts')) {
    localStorage.setItem('to_tryouts', JSON.stringify(MOCK_TRYOUTS));
  }
  if (!localStorage.getItem('to_submissions')) {
    localStorage.setItem('to_submissions', JSON.stringify(MOCK_SUBMISSIONS));
  }
  if (!localStorage.getItem('to_settings')) {
    localStorage.setItem('to_settings', JSON.stringify(DEFAULT_SETTINGS));
  }
  if (!localStorage.getItem('to_subjects')) {
    localStorage.setItem('to_subjects', JSON.stringify(MOCK_SUBJECTS));
  }
  if (!localStorage.getItem('to_school_levels')) {
    localStorage.setItem('to_school_levels', JSON.stringify(MOCK_SCHOOL_LEVELS));
  }
}

export function getFromLocalStorage<T>(key: string, fallback: T): T {
  const data = localStorage.getItem(key);
  if (!data) return fallback;
  try {
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

export function saveToLocalStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}
