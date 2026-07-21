/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// Common LaTeX/Math symbols to beautiful Unicode mappings
const symbolMap: { [key: string]: string } = {
  '\\times': '×',
  '\\div': '÷',
  '\\le': '≤',
  '\\ge': '≥',
  '\\neq': '≠',
  '\\pm': '±',
  '\\degree': '°',
  '\\pi': 'π',
  '\\alpha': 'α',
  '\\beta': 'β',
  '\\theta': 'θ',
  '\\sigma': 'σ',
  '\\lambda': 'λ',
  '\\delta': 'δ',
  '\\Delta': 'Δ',
  '\\int': '∫',
  '\\sum': '∑',
  '\\infty': '∞',
  '\\approx': '≈',
  '\\to': '→',
  '\\cdot': '•',
  '\\log': 'log',
  '\\sin': 'sin',
  '\\cos': 'cos',
  '\\tan': 'tan',
};

// Find matching closing curly brace
function findMatchingBrace(str: string, openIndex: number): number {
  let depth = 0;
  for (let i = openIndex; i < str.length; i++) {
    if (str[i] === '{') {
      depth++;
    } else if (str[i] === '}') {
      depth--;
      if (depth === 0) {
        return i;
      }
    }
  }
  return -1;
}

export function renderMathContent(str: string): React.ReactNode {
  if (!str) return '';

  // Process common symbol strings first
  let processed = str;
  for (const [latex, unicode] of Object.entries(symbolMap)) {
    processed = processed.replaceAll(latex, unicode);
  }

  const elements: React.ReactNode[] = [];
  let i = 0;
  let keyCounter = 0;

  while (i < processed.length) {
    // 1. FRACTION: \frac{numerator}{denominator}
    if (processed.startsWith('\\frac{', i)) {
      const numStart = i + 5; // index of '{'
      const numEnd = findMatchingBrace(processed, numStart);
      if (numEnd !== -1) {
        const denStart = numEnd + 1;
        if (processed[denStart] === '{') {
          const denEnd = findMatchingBrace(processed, denStart);
          if (denEnd !== -1) {
            const numContent = processed.slice(numStart + 1, numEnd);
            const denContent = processed.slice(denStart + 1, denEnd);

            elements.push(
              <span 
                key={`frac-${i}-${keyCounter++}`} 
                className="inline-flex flex-col items-center justify-center align-middle mx-1 font-sans text-xs"
              >
                <span className="border-b-1.5 border-slate-700 dark:border-slate-300 px-1.5 text-center leading-none pb-0.5 font-bold text-slate-900 dark:text-white">
                  {renderMathContent(numContent)}
                </span>
                <span className="text-center leading-none pt-0.5 font-bold text-slate-900 dark:text-white">
                  {renderMathContent(denContent)}
                </span>
              </span>
            );
            i = denEnd + 1;
            continue;
          }
        }
      }
    }

    // 2. SQUARE ROOT: \sqrt{content}
    if (processed.startsWith('\\sqrt{', i)) {
      const rootStart = i + 5; // index of '{'
      const rootEnd = findMatchingBrace(processed, rootStart);
      if (rootEnd !== -1) {
        const rootContent = processed.slice(rootStart + 1, rootEnd);
        elements.push(
          <span key={`sqrt-${i}-${keyCounter++}`} className="inline-flex items-center align-middle mx-0.5">
            <span className="text-sm md:text-base font-light leading-none mr-[-1px] text-slate-900 dark:text-white select-none">√</span>
            <span className="border-t border-slate-700 dark:border-slate-300 px-1 pt-0.5 leading-none text-xs font-bold text-slate-900 dark:text-white">
              {renderMathContent(rootContent)}
            </span>
          </span>
        );
        i = rootEnd + 1;
        continue;
      }
    }

    // 3. POWERS / EXPONENTS: ^{expr} or ^char
    if (processed[i] === '^') {
      if (processed[i + 1] === '{') {
        const expStart = i + 1;
        const expEnd = findMatchingBrace(processed, expStart);
        if (expEnd !== -1) {
          const expContent = processed.slice(expStart + 1, expEnd);
          elements.push(
            <sup key={`exp-${i}-${keyCounter++}`} className="text-[10px] leading-none align-super font-bold text-slate-900 dark:text-white ml-0.5">
              {renderMathContent(expContent)}
            </sup>
          );
          i = expEnd + 1;
          continue;
        }
      } else {
        // Single character exponent
        const char = processed[i + 1] || '';
        elements.push(
          <sup key={`exp-char-${i}-${keyCounter++}`} className="text-[10px] leading-none align-super font-bold text-slate-900 dark:text-white ml-0.5">
            {char}
          </sup>
        );
        i += 2;
        continue;
      }
    }

    // 4. SUBSCRIPTS: _{expr} or _char
    if (processed[i] === '_') {
      if (processed[i + 1] === '{') {
        const subStart = i + 1;
        const subEnd = findMatchingBrace(processed, subStart);
        if (subEnd !== -1) {
          const subContent = processed.slice(subStart + 1, subEnd);
          elements.push(
            <sub key={`sub-${i}-${keyCounter++}`} className="text-[10px] leading-none align-sub font-bold text-slate-900 dark:text-white ml-0.5">
              {renderMathContent(subContent)}
            </sub>
          );
          i = subEnd + 1;
          continue;
        }
      } else {
        // Single character subscript
        const char = processed[i + 1] || '';
        elements.push(
          <sub key={`sub-char-${i}-${keyCounter++}`} className="text-[10px] leading-none align-sub font-bold text-slate-900 dark:text-white ml-0.5">
            {char}
          </sub>
        );
        i += 2;
        continue;
      }
    }

    // 5. VARIABLES / MATH NUMERICS
    const char = processed[i];
    
    // Style variables like x, y, z, a, b, c in classic italic serif style
    if (/[a-zA-Z]/.test(char)) {
      let word = '';
      let tempIdx = i;
      while (tempIdx < processed.length && /[a-zA-Z]/.test(processed[tempIdx])) {
        word += processed[tempIdx];
        tempIdx++;
      }
      
      const commonMathWords = ['sin', 'cos', 'tan', 'log', 'lim', 'det', 'mod'];
      if (commonMathWords.includes(word.toLowerCase())) {
        elements.push(
          <span key={`mathword-${i}-${keyCounter++}`} className="font-sans font-medium text-slate-700 dark:text-slate-300 mx-0.5 select-all">
            {word}
          </span>
        );
        i += word.length;
        continue;
      }

      elements.push(
        <span key={`var-${i}-${keyCounter++}`} className="font-serif italic font-bold text-slate-900 dark:text-white mx-0.5 select-all">
          {char}
        </span>
      );
    } else {
      // General punctuation or numbers
      elements.push(
        <span key={`char-${i}-${keyCounter++}`} className="font-mono font-bold text-slate-900 dark:text-white select-all">
          {char}
        </span>
      );
    }
    i++;
  }

  return <>{elements}</>;
}

export default function MathRenderer({ text }: { text: string }) {
  if (!text) return null;

  // Split content by inline/block math delimiters (e.g. $...$ or $$...$$)
  const parts = text.split(/(\$\$?.*?\$\$?)/g);

  return (
    <span className="leading-relaxed select-text inline-block">
      {parts.map((part, index) => {
        // Match math blocks wrapped in $ or $$
        if (part.startsWith('$') && part.endsWith('$')) {
          const isBlock = part.startsWith('$$') && part.endsWith('$$');
          const cleanMath = isBlock ? part.slice(2, -2) : part.slice(1, -1);
          
          if (isBlock) {
            return (
              <span 
                key={index} 
                className="block my-3 text-center overflow-x-auto py-2 px-4 bg-slate-50/40 dark:bg-slate-900/10 rounded-xl border border-slate-100 dark:border-slate-800"
              >
                <span className="inline-flex items-center text-sm md:text-base">
                  {renderMathContent(cleanMath)}
                </span>
              </span>
            );
          } else {
            return (
              <span key={index} className="inline-flex items-center align-middle mx-1 text-xs md:text-sm">
                {renderMathContent(cleanMath)}
              </span>
            );
          }
        }

        // Auto-detect mathy terms in general text without delimiters
        if (
          part.includes('\\frac') || 
          part.includes('\\sqrt') || 
          part.includes('^') || 
          part.includes('_') || 
          part.includes('\\times')
        ) {
          return (
            <span key={index} className="inline-flex items-center align-middle">
              {renderMathContent(part)}
            </span>
          );
        }

        return (
          <span key={index} className="text-slate-800 dark:text-slate-100 select-text">
            {part}
          </span>
        );
      })}
    </span>
  );
}
