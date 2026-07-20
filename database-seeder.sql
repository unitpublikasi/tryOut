-- Database Seeder Script - AeroTryOut Pro (PostgreSQL)
-- Adds default users, original test questions, schedules, and past try out results.

-- 1. Insert Default Users (Password hashes are simulated SHA256 matches)
INSERT INTO users (id, username, full_name, role, avatar, email, school_class, school_name, password_hash)
VALUES 
('u-1', 'admin', 'Rahmat Hidayat, M.Kom', 'admin', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200', 'admin@sekolah.sch.id', NULL, 'SMA Negeri 1 Jakarta', '$2y$10$1Y.M3e99G8Y2L0Nn2B3K4Od.E3gO.Y.6d7sA8h9O0S1R2W3B4C5D6'),
('u-2', 'guru', 'Dra. Sri Wahyuni, M.Pd', 'guru', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', 'sri.wahyuni@sekolah.sch.id', NULL, 'SMA Negeri 1 Jakarta', '$2y$10$2Y.M3e99G8Y2L0Nn2B3K4Od.E3gO.Y.6d7sA8h9O0S1R2W3B4C5D6'),
('u-3', 'siswa', 'Budi Santoso', 'siswa', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', 'budi.santoso@siswa.sch.id', 'XII-MIPA-1', 'SMA Negeri 1 Jakarta', '$2y$10$3Y.M3e99G8Y2L0Nn2B3K4Od.E3gO.Y.6d7sA8h9O0S1R2W3B4C5D6'),
('u-4', 'siti', 'Siti Rahmawati', 'siswa', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', 'siti.rahma@siswa.sch.id', 'XII-MIPA-1', 'SMA Negeri 1 Jakarta', '$2y$10$4Y.M3e99G8Y2L0Nn2B3K4Od.E3gO.Y.6d7sA8h9O0S1R2W3B4C5D6'),
('u-5', 'adi', 'Adi Wijaya', 'siswa', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', 'adi.wijaya@siswa.sch.id', 'XII-MIPA-2', 'SMA Negeri 1 Jakarta', '$2y$10$5Y.M3e99G8Y2L0Nn2B3K4Od.E3gO.Y.6d7sA8h9O0S1R2W3B4C5D6');

-- 2. Insert Original Questions (Bank Soal)
INSERT INTO questions (id, text, options, correct_answer, category, difficulty, explanation, teacher_id)
VALUES
('q-1', 'Jika f(x) = 3x^2 - 5x + 2, maka nilai turunan pertama f''(2) adalah...', '["7", "8", "9", "12"]'::jsonb, 0, 'Matematika', 'easy', 'f''(x) = 6x - 5. Maka f''(2) = 6(2) - 5 = 12 - 5 = 7.', 'u-2'),
('q-2', 'Nilai lim_{x -> 0} (sin 4x) / (3x) adalah...', '["3/4", "4/3", "1", "1/3"]'::jsonb, 1, 'Matematika', 'medium', 'Berdasarkan limit fungsi trigonometri, lim_{x -> 0} (sin ax) / (bx) = a/b. Di sini a=4, b=3, sehingga hasilnya 4/3.', 'u-2'),
('q-3', 'Dalam suatu kelas terdapat 20 siswa. Peluang terpilihnya 2 orang perwakilan jika 12 diantaranya adalah wanita adalah...', '["33/95", "66/190", "44/95", "22/95"]'::jsonb, 0, 'Matematika', 'hard', 'Jumlah wanita = 12, Pria = 8. Peluang terpilih 2 wanita = C(12,2) / C(20,2) = 66 / 190 = 33/95.', 'u-2'),
('q-4', 'Sebuah balok bermassa 5 kg ditarik dengan gaya 20 N di atas lantai licin. Percepatan yang dialami balok tersebut adalah...', '["2 m/s^2", "4 m/s^2", "6 m/s^2", "8 m/s^2"]'::jsonb, 1, 'Fisika', 'easy', 'Berdasarkan Hukum II Newton, F = m * a. Maka a = F / m = 20 N / 5 kg = 4 m/s^2.', 'u-2'),
('q-5', 'Sebuah kumparan memiliki induktansi diri 0.4 H. Jika arus yang mengalir berubah dari 10 A menjadi 2 A dalam waktu 0.1 detik, besar GGL induksi yang timbul adalah...', '["8 V", "16 V", "32 V", "64 V"]'::jsonb, 2, 'Fisika', 'medium', 'GGL Induksi (e) = -L * (dI/dt) = -0.4 * ((2 - 10) / 0.1) = -0.4 * (-8 / 0.1) = 32 Volt.', 'u-2'),
('q-6', 'Organel sel yang berfungsi sebagai tempat berlangsungnya respirasi seluler untuk menghasilkan energi (ATP) adalah...', '["Ribosom", "Mitokondria", "Kloroplas", "Lisosom"]'::jsonb, 1, 'Biologi', 'easy', 'Mitokondria sering disebut sebagai the power house of cell karena fungsinya memproduksi ATP melalui respirasi aerobik.', 'u-2'),
('q-7', 'Persilangan dihibrid antara tanaman kacang ercis berbiji bulat kuning (BbKk) dengan tanaman berbiji keriput hijau (bbkk) akan menghasilkan keturunan dengan rasio fenotip...', '["9:3:3:1", "1:1:1:1", "3:1", "12:3:1"]'::jsonb, 1, 'Biologi', 'medium', 'Ini adalah persilangan test cross dihibrid (BbKk x bbkk). Hasil gamet BbKk ada 4 jenis (BK, Bk, bK, bk) sedangkan bbkk hanya 1 jenis (bk). Maka keturunan memiliki proporsi sama yaitu 1 bulat kuning : 1 bulat hijau : 1 keriput kuning : 1 keriput hijau (1:1:1:1).', 'u-2'),
('q-8', 'Choose the correct form to complete the sentence: "If she ___ harder, she would have passed the scholarship examination last month."', '["studied", "has studied", "had studied", "would study"]'::jsonb, 2, 'Bahasa Inggris', 'medium', 'This is a Conditional Sentence Type 3 (past unreal condition). The structure is: If + Subject + past perfect (had + V3), Subject + would have + V3.', 'u-2'),
('q-9', 'Which sentence represents a correct passive voice conversion of: "The teacher is explaining the complex physics formula now."', '["The complex physics formula was explained by the teacher now.", "The complex physics formula is being explained by the teacher now.", "The complex physics formula has been explained by the teacher now.", "The complex physics formula is explained by the teacher now."]'::jsonb, 1, 'Bahasa Inggris', 'medium', 'The original sentence is in Present Continuous tense. The continuous passive form is: Subject + is/am/are + being + V3 + by agent.', 'u-2'),
('q-10', 'What is the synonym of the word "Meticulous" as used in academic research contexts?', '["Careless", "Extremely precise", "Hasty", "Superficial"]'::jsonb, 1, 'Bahasa Inggris', 'easy', 'Meticulous means showing great attention to detail; very careful and precise.', 'u-2');

-- 3. Insert Preset Tryout Exams
INSERT INTO tryouts (id, title, description, duration_minutes, passing_grade, category, created_by, is_published)
VALUES
('to-1', 'Try Out UTBK Matematika Saintek 2026', 'Ujian simulasi persiapan seleksi masuk perguruan tinggi negeri untuk mata pelajaran Matematika tingkat lanjut.', 45, 75, 'Matematika', 'u-2', TRUE),
('to-2', 'Simulasi Fisika & Biologi Terpadu SMA', 'Try out berkala untuk menguji kemampuan pemahaman konsep fisika mekanika serta struktur genetika seluler.', 30, 70, 'Sains', 'u-2', TRUE),
('to-3', 'Evaluasi Komprehensif Bahasa Inggris Akademik', 'Sesi latihan intensif tata bahasa (grammar), klausa kondisional, dan pemahaman kosakata tingkat lanjut.', 20, 80, 'Bahasa Inggris', 'u-2', TRUE);

-- 4. Map questions to Tryouts
INSERT INTO tryout_questions (tryout_id, question_id, sort_order)
VALUES
('to-1', 'q-1', 1),
('to-1', 'q-2', 2),
('to-1', 'q-3', 3),
('to-2', 'q-4', 1),
('to-2', 'q-5', 2),
('to-2', 'q-6', 3),
('to-2', 'q-7', 4),
('to-3', 'q-8', 1),
('to-3', 'q-9', 2),
('to-3', 'q-10', 3);

-- 5. Insert Past Submissions (History data)
INSERT INTO submissions (id, student_id, student_name, student_class, tryout_id, tryout_title, answers, flagged, score, correct_count, wrong_count, unanswered_count, is_passed, start_time, submit_time, status)
VALUES
('sub-1', 'u-4', 'Siti Rahmawati', 'XII-MIPA-1', 'to-1', 'Try Out UTBK Matematika Saintek 2026', '{"q-1": 0, "q-2": 1, "q-3": 1}'::jsonb, '[]'::jsonb, 67, 2, 1, 0, FALSE, '2026-07-15 10:00:00+07', '2026-07-15 10:35:00+07', 'completed'),
('sub-2', 'u-5', 'Adi Wijaya', 'XII-MIPA-2', 'to-1', 'Try Out UTBK Matematika Saintek 2026', '{"q-1": 0, "q-2": 1, "q-3": 0}'::jsonb, '[]'::jsonb, 100, 3, 0, 0, TRUE, '2026-07-16 14:00:00+07', '2026-07-16 14:40:00+07', 'completed'),
('sub-3', 'u-4', 'Siti Rahmawati', 'XII-MIPA-1', 'to-2', 'Simulasi Fisika & Biologi Terpadu SMA', '{"q-4": 1, "q-5": 2, "q-6": 1, "q-7": 1}'::jsonb, '[]'::jsonb, 100, 4, 0, 0, TRUE, '2026-07-18 09:00:00+07', '2026-07-18 09:25:00+07', 'completed'),
('sub-4', 'u-5', 'Adi Wijaya', 'XII-MIPA-2', 'to-3', 'Evaluasi Komprehensif Bahasa Inggris Akademik', '{"q-8": 2, "q-9": 1, "q-10": 0}'::jsonb, '[]'::jsonb, 67, 2, 1, 0, FALSE, '2026-07-19 11:00:00+07', '2026-07-19 11:15:00+07', 'completed');
