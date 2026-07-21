/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  HelpCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Send,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Minimize2,
  Expand
} from 'lucide-react';
import { Tryout, Submission, Question } from '../types';

interface ExamPlayerProps {
  tryout: Tryout;
  studentId: string;
  studentName: string;
  studentClass: string;
  onSubmit: (submission: Submission) => void;
  onCancel: () => void;
}

export default function ExamPlayer({
  tryout,
  studentId,
  studentName,
  studentClass,
  onSubmit,
  onCancel,
}: ExamPlayerProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(tryout.durationMinutes * 60);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<string>(new Date().toISOString());

  // Timer Countdown Logic
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Format Seconds to hh:mm:ss
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? String(h).padStart(2, '0') + ':' : ''}${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleToggleFlag = (questionId: string) => {
    setFlagged((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleClearSelection = (questionId: string) => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  // Grading calculations
  const calculateResult = (): Submission => {
    const questions = tryout.questions;
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    questions.forEach((q) => {
      const selected = answers[q.id];
      if (selected === undefined) {
        unanswered++;
      } else if (selected === q.correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const score = Math.round((correct / questions.length) * 100);
    const isPassed = score >= tryout.passingGrade;

    return {
      id: `sub-${Date.now()}`,
      studentId,
      studentName,
      studentClass,
      tryoutId: tryout.id,
      tryoutTitle: tryout.title,
      answers,
      flagged,
      score,
      correctCount: correct,
      wrongCount: wrong,
      unansweredCount: unanswered,
      isPassed,
      startTime: startTime.current,
      submitTime: new Date().toISOString(),
      status: 'completed',
    };
  };

  const handleAutoSubmit = () => {
    const finalSubmission = calculateResult();
    onSubmit(finalSubmission);
  };

  const triggerManualSubmit = () => {
    const finalSubmission = calculateResult();
    onSubmit(finalSubmission);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const currentQuestion = tryout.questions[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = tryout.questions.length;

  return (
    <div id="exam-player-container" className="flex flex-col lg:flex-row gap-6 p-6 min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* LEFT: Exam Workspace */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl shadow-slate-100 dark:shadow-none">
        
        {/* Workspace Sub Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-mono">
              SOAL {currentIdx + 1} DARI {totalQuestions}
            </span>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${
              currentQuestion.difficulty === 'easy' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' :
              currentQuestion.difficulty === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
              'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            } capitalize`}>
              Tingkat: {currentQuestion.difficulty}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
              title="Layar Penuh"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
            </button>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono font-bold uppercase">
              {tryout.category}
            </span>
          </div>
        </div>

        {/* Question Panel */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Question Text */}
          <div id={`question-text-${currentQuestion.id}`} className="text-lg font-medium text-slate-800 dark:text-slate-100 leading-relaxed mb-6">
            {currentQuestion.text}
          </div>

          {/* Optional Question Image Illustration */}
          {currentQuestion.imageUrl && (
            <div className="mb-8 max-h-[350px] overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-center p-4">
              <img
                src={currentQuestion.imageUrl}
                alt="Ilustrasi Soal"
                className="max-h-[300px] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Options Grid */}
          <div id="options-grid" className="space-y-4">
            {currentQuestion.options.map((option, oIdx) => {
              const optionLetter = String.fromCharCode(65 + oIdx); // A, B, C, D
              const isSelected = answers[currentQuestion.id] === oIdx;

              return (
                <button
                  key={oIdx}
                  id={`option-button-${currentQuestion.id}-${oIdx}`}
                  onClick={() => handleSelectOption(currentQuestion.id, oIdx)}
                  className={`w-full flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-200 active:scale-[0.99] group ${
                    isSelected
                      ? 'bg-blue-50/75 dark:bg-blue-950/25 border-blue-500 text-blue-900 dark:text-blue-100 shadow-md shadow-blue-500/5'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 group-hover:text-slate-700'
                  }`}>
                    {optionLetter}
                  </span>
                  <span className="pt-1.5 text-sm md:text-base font-medium">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="px-6 py-5 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              id="clear-answer-btn"
              onClick={() => handleClearSelection(currentQuestion.id)}
              disabled={answers[currentQuestion.id] === undefined}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:pointer-events-none active:scale-95 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Hapus Pilihan</span>
            </button>

            <button
              id="flag-doubt-btn"
              onClick={() => handleToggleFlag(currentQuestion.id)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 flex items-center gap-1.5 ${
                flagged.includes(currentQuestion.id)
                  ? 'bg-amber-500 border-amber-600 text-white hover:bg-amber-600 shadow-md'
                  : 'border-slate-200 dark:border-slate-700 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 shrink-0" />
              <span>{flagged.includes(currentQuestion.id) ? 'Ragu-Ragu Aktif' : 'Ragu-Ragu'}</span>
            </button>
          </div>

          <div className="flex items-center justify-end space-x-3 w-full sm:w-auto">
            <button
              id="prev-question-btn"
              onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
              disabled={currentIdx === 0}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {currentIdx < totalQuestions - 1 ? (
              <button
                id="next-question-btn"
                onClick={() => setCurrentIdx((p) => Math.min(totalQuestions - 1, p + 1))}
                className="px-5 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white font-medium text-sm transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>Soal Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="finish-exam-btn"
                onClick={() => setShowConfirmModal(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all duration-200 active:scale-95 shadow-md shadow-emerald-600/10 flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Selesaikan Ujian</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: Stats & Question Grid Navigation */}
      <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
        
        {/* Real-time Countdown Panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-100 dark:shadow-none">
          <div className="flex items-center space-x-3 text-slate-400 dark:text-slate-500 mb-2 font-mono text-xs font-bold tracking-wider">
            <Clock className="w-4 h-4 text-blue-500 animate-pulse shrink-0" />
            <span>SISA WAKTU PENGERJAAN</span>
          </div>
          <div id="countdown-timer" className={`text-3xl md:text-4xl font-extrabold font-mono tracking-tight transition-colors ${
            timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-slate-800 dark:text-slate-100'
          }`}>
            {formatTime(timeLeft)}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 dark:text-slate-500 font-medium">Terjawab:</span>
            <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">
              {answeredCount} / {totalQuestions} Soal
            </span>
          </div>
          {/* Visual Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation Map of Questions */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-100 dark:shadow-none flex-1 flex flex-col">
          <span className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-4 block">
            Peta Navigasi Soal
          </span>

          <div id="question-nav-grid" className="grid grid-cols-5 gap-2.5 overflow-y-auto max-h-[300px] pr-1">
            {tryout.questions.map((q, idx) => {
              const isCurrent = currentIdx === idx;
              const isAnswered = answers[q.id] !== undefined;
              const isFlagged = flagged.includes(q.id);

              let buttonStyle = 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-700 hover:border-slate-300';
              if (isAnswered) {
                buttonStyle = 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-400 dark:border-blue-800/80 hover:bg-blue-100/50';
              }
              if (isFlagged) {
                buttonStyle = 'bg-amber-500 text-white border-amber-600 hover:bg-amber-600';
              }
              if (isCurrent) {
                buttonStyle += ' ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2 dark:ring-offset-slate-900';
              }

              return (
                <button
                  key={q.id}
                  id={`nav-btn-${idx}`}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-11 rounded-xl font-bold text-sm flex items-center justify-center border font-mono transition-all active:scale-95 ${buttonStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Map Color Legend */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-slate-500">
              <span className="w-3.5 h-3.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 block" />
              <span>Belum Terjawab</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-500">
              <span className="w-3.5 h-3.5 rounded-md bg-blue-50 dark:bg-blue-950/40 border border-blue-400 block" />
              <span>Sudah Terjawab</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-500">
              <span className="w-3.5 h-3.5 rounded-md bg-amber-500 block" />
              <span>Ragu-Ragu (Flagged)</span>
            </div>
          </div>

          <button
            id="quit-exam-btn"
            onClick={onCancel}
            className="mt-6 w-full py-3 rounded-2xl border border-red-200 dark:border-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 text-xs font-bold transition-all active:scale-[0.98]"
          >
            Batalkan & Keluar
          </button>
        </div>
      </div>

      {/* Manual Submit Double-Confirmation Modal */}
      {showConfirmModal && (
        <div id="submit-confirm-modal" className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl relative animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 flex items-center justify-center text-amber-500 mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Selesaikan Ujian Sekarang?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Anda masih memiliki sisa waktu. Pastikan seluruh jawaban Anda telah diteliti kembali sebelum disubmit ke sistem penilaian.
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl space-y-2 mb-6 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Siswa:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{studentName} ({studentClass})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Soal:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{totalQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Terjawab:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{answeredCount} Soal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Belum Dijawab:</span>
                <span className="font-bold text-red-500">{totalQuestions - answeredCount} Soal</span>
              </div>
              {flagged.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Doubtful (Ragu-Ragu):</span>
                  <span className="font-bold text-amber-500">{flagged.length} Soal</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                id="modal-cancel-btn"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
              >
                Kembali Menjawab
              </button>
              <button
                id="modal-confirm-submit-btn"
                onClick={() => {
                  setShowConfirmModal(false);
                  triggerManualSubmit();
                }}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Ya, Submit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
