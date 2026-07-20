/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, Question, Tryout, Submission } from './src/types';

/**
 * AeroTryOut Pro Mock Database Factory
 * Programmatic entity generator for scalable test assertions.
 */
export class DatabaseFactory {
  private static userIds = 100;
  private static questionIds = 100;
  private static submissionIds = 100;

  /**
   * Generates a realistic mock Student User
   */
  public static createStudent(custom: Partial<User> = {}): User {
    this.userIds++;
    const id = `u-${this.userIds}`;
    return {
      id,
      username: `siswa_${this.userIds}`,
      fullName: `Siswa Ke-${this.userIds}`,
      role: 'siswa',
      avatar: `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200`,
      email: `siswa_${this.userIds}@sekolah.sch.id`,
      schoolClass: 'XII-MIPA-1',
      schoolName: 'SMA Negeri 1 Jakarta',
      ...custom,
    };
  }

  /**
   * Generates a mock Multiple Choice Question
   */
  public static createQuestion(custom: Partial<Question> = {}): Question {
    this.questionIds++;
    const id = `q-${this.questionIds}`;
    return {
      id,
      text: `Pertanyaan simulasi nomor ${this.questionIds}?`,
      options: [
        'Pilihan jawaban A (Benar)',
        'Pilihan jawaban B',
        'Pilihan jawaban C',
        'Pilihan jawaban D'
      ],
      correctAnswer: 0,
      category: 'Umum',
      difficulty: 'medium',
      explanation: 'Pembahasan kunci jawaban penyelesaian soal secara logis.',
      teacherId: 'u-2',
      ...custom,
    };
  }

  /**
   * Generates a completed mock Submission
   */
  public static createSubmission(
    student: User,
    tryout: Tryout,
    custom: Partial<Submission> = {}
  ): Submission {
    this.submissionIds++;
    const id = `sub-${this.submissionIds}`;
    
    const correctCount = tryout.questions.length;
    const score = 100;

    return {
      id,
      studentId: student.id,
      studentName: student.fullName,
      studentClass: student.schoolClass || 'XII-MIPA-1',
      tryoutId: tryout.id,
      tryoutTitle: tryout.title,
      answers: tryout.questions.reduce<Record<string, number>>((acc, q) => {
        acc[q.id] = q.correctAnswer;
        return acc;
      }, {}),
      flagged: [],
      score,
      correctCount,
      wrongCount: 0,
      unansweredCount: 0,
      isPassed: score >= tryout.passingGrade,
      startTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      submitTime: new Date().toISOString(),
      status: 'completed',
      ...custom,
    };
  }
}
