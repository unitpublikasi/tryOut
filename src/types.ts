/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'admin' | 'guru' | 'siswa';

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  avatar: string;
  email: string;
  schoolClass?: string; // Only for 'siswa'
  schoolName: string;
  password?: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[]; // Exactly 4 options for a standard multiple-choice quiz
  correctAnswer: number; // 0, 1, 2, or 3
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  teacherId: string;
}

export interface Tryout {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  passingGrade: number; // e.g., 75
  category: string;
  questions: Question[];
  startDate: string; // ISO String
  endDate: string; // ISO String
  createdBy: string; // Teacher or Admin ID
  isPublished: boolean;
}

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  tryoutId: string;
  tryoutTitle: string;
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  flagged: string[]; // list of questionIds that are flagged as doubtful
  score: number; // 0 to 100
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  isPassed: boolean;
  startTime: string; // ISO String
  submitTime: string; // ISO String
  status: 'ongoing' | 'completed';
}

export interface SystemSettings {
  systemName: string;
  schoolYear: string;
  passingGradeDefault: number;
  enableSelfRegistration: boolean;
  maintenanceMode: boolean;
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}
