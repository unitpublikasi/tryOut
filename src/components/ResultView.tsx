/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Award,
  CheckCircle,
  XCircle,
  Clock,
  BookMarked,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { Submission, Tryout } from '../types';

interface ResultViewProps {
  submission: Submission;
  tryout: Tryout;
  onClose: () => void;
}

export default function ResultView({ submission, tryout, onClose }: ResultViewProps) {
  const isPassed = submission.isPassed;

  return (
    <div id="result-view-container" className="p-6 max-w-4xl mx-auto space-y-6">
      
      {/* Dynamic Header banner based on pass/fail */}
      <div className={`p-8 rounded-3xl border text-white relative overflow-hidden shadow-xl ${
        isPassed
          ? 'bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 border-emerald-500/20'
          : 'bg-gradient-to-br from-red-600 via-rose-700 to-slate-900 border-red-500/20'
      }`}>
        {/* Abstract grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <span className="px-3 py-1 bg-white/10 text-white border border-white/20 text-xs font-semibold rounded-lg font-mono">
              SESI EVALUASI HASIL UJIAN
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {tryout.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-200/80 max-w-lg leading-relaxed">
              Skor penilaian instan Anda telah dikalkulasi berdasarkan standard KKM yang ditetapkan yaitu {tryout.passingGrade}.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center shrink-0 min-w-[150px]">
            <span className="text-[10px] uppercase font-bold tracking-wider block font-mono text-white/70">NILAI AKHIR</span>
            <span className="text-4xl md:text-5xl font-extrabold font-mono text-white block mt-1">{submission.score}</span>
            <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase mt-3 inline-block bg-white text-slate-800">
              {isPassed ? 'LULUS KKM' : 'DI BAWAH KKM'}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics breakdown row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Benar</span>
            <span className="text-lg font-extrabold text-slate-800 dark:text-slate-100 font-mono">{submission.correctCount} Soal</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-3">
          <XCircle className="w-5 h-5 text-red-500 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Salah</span>
            <span className="text-lg font-extrabold text-slate-800 dark:text-slate-100 font-mono">{submission.wrongCount} Soal</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-3">
          <Clock className="w-5 h-5 text-blue-500 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Waktu Selesai</span>
            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 font-mono truncate max-w-[120px] block">
              {new Date(submission.submitTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-3">
          <Award className="w-5 h-5 text-amber-500 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Akurasi</span>
            <span className="text-lg font-extrabold text-slate-800 dark:text-slate-100 font-mono">
              {tryout.questions.length > 0
                ? Math.round((submission.correctCount / tryout.questions.length) * 100)
                : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* DETAILED QUESTION FEEDBACK (With answers & explanations) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
            Tinjauan Lembar Pembahasan Soal
          </h3>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Tinjau seluruh jawaban yang telah dianalisis</span>
        </div>

        <div className="space-y-5">
          {tryout.questions.map((q, idx) => {
            const selectedIdx = submission.answers[q.id];
            const isCorrect = selectedIdx === q.correctAnswer;
            const hasAnswered = selectedIdx !== undefined;

            return (
              <div
                key={q.id}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4"
              >
                {/* Status Indicator */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-bold text-xs">
                    SOAL {idx + 1}
                  </span>

                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase ${
                    !hasAnswered ? 'bg-slate-100 text-slate-400' :
                    isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600' :
                    'bg-red-50 dark:bg-red-950/40 text-red-500'
                  }`}>
                    {!hasAnswered ? 'Tidak Dijawab' : isCorrect ? 'JAWABAN BENAR' : 'JAWABAN SALAH'}
                  </span>
                </div>

                {/* Question text */}
                <h4 className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                  {q.text}
                </h4>

                {/* Display options highlighting student's choice and the correct one */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {q.options.map((opt, oIdx) => {
                    const isKeyCorrect = q.correctAnswer === oIdx;
                    const isStudentSelected = selectedIdx === oIdx;

                    let cardStyle = 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30';
                    let badgeStyle = 'bg-slate-200 text-slate-600 dark:bg-slate-700';

                    if (isKeyCorrect) {
                      cardStyle = 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300';
                      badgeStyle = 'bg-emerald-500 text-white';
                    } else if (isStudentSelected && !isCorrect) {
                      cardStyle = 'border-red-400 bg-red-50/50 dark:bg-red-950/20 text-red-900 dark:text-red-300';
                      badgeStyle = 'bg-red-500 text-white';
                    }

                    return (
                      <div
                        key={oIdx}
                        className={`p-3.5 rounded-xl border flex items-center gap-3 font-mono ${cardStyle}`}
                      >
                        <span className={`w-5.5 h-5.5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 ${badgeStyle}`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="truncate">{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Pembahasan Box */}
                {q.explanation && (
                  <div className="p-4 bg-blue-50/40 dark:bg-blue-950/20 rounded-2xl border border-dashed border-blue-200 dark:border-blue-900/40 text-xs mt-2">
                    <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 mb-1.5">
                      <BookMarked className="w-3.5 h-3.5" />
                      <span>Penjelasan & Pembahasan Kunci:</span>
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Back button */}
      <div className="pt-6 flex justify-center">
        <button
          id="close-result-view-btn"
          onClick={onClose}
          className="px-8 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all duration-200 active:scale-95 shadow-md flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4 text-white" />
          <span>Kembali ke Dashboard</span>
        </button>
      </div>
    </div>
  );
}
