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
    schoolLevel: 'SMA',
    schoolName: 'SMA Negeri 1 Jakarta',
  },
  {
    id: 'u-2',
    username: 'guru',
    fullName: 'Dra. Sri Wahyuni, M.Pd',
    role: 'guru',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    email: 'sri.wahyuni@sekolah.sch.id',
    schoolLevel: 'SMA',
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
    schoolLevel: 'SMA',
    schoolName: 'SMA Negeri 1 Jakarta',
  },
  {
    id: 'u-4',
    username: 'siti',
    fullName: 'Siti Rahmawati',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    email: 'siti.rahma@siswa.sch.id',
    schoolClass: 'VI-A SD',
    schoolLevel: 'SD',
    schoolName: 'SD Negeri 1 Jakarta',
  },
  {
    id: 'u-5',
    username: 'adi',
    fullName: 'Adi Wijaya',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    email: 'adi.wijaya@siswa.sch.id',
    schoolClass: 'IX-1 SMP',
    schoolLevel: 'SMP',
    schoolName: 'SMP Negeri 1 Jakarta',
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
  },
  // AKM Table Statement / Matrix True-False Questions
  {
    id: 'q-akm-1',
    type: 'matrix_true_false',
    text: '<b>Bacalah teks berikut!</b><br/>Udara bersih sangat penting bagi kesehatan. Asap kendaraan bermotor, pembakaran sampah, dan penggunaan bahan bakar berlebihan dapat mencemari udara. Jika dibiarkan terus-menerus, udara kotor dapat menyebabkan gangguan pernapasan dan membuat lingkungan menjadi tidak nyaman. Oleh karena itu, diperlukan kebiasaan hidup yang peduli terhadap kualitas udara.<br/><br/><b>Peristiwa manakah yang berkaitan dengan kehidupan sehari-hari agar tidak mengalami kejadian seperti pada teks tersebut?</b><br/>Tentukan <b>Sesuai</b> atau <b>Tidak Sesuai</b> untuk setiap pernyataan berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Sesuai', 'Tidak Sesuai'],
    matrixRows: [
      'Raka membakar sampah plastik di halaman rumah.',
      'Sinta memilih berjalan kaki ke sekolah yang jaraknya dekat.',
      'Warga menanam pohon di pinggir jalan kampung.'
    ],
    matrixCorrectAnswers: [1, 0, 0],
    category: 'Bahasa Indonesia',
    difficulty: 'medium',
    explanation: '1. Raka membakar sampah plastik mencemari udara (Tidak Sesuai). 2. Sinta berjalan kaki menghemat bahan bakar & kurangi polusi (Sesuai). 3. Warga menanam pohon dapat menyaring udara kotor (Sesuai).',
    teacherId: 'u-2',
    schoolLevel: 'SMA'
  },

  // ==========================================
  // SOAL TRY OUT TKA IPA SD KKKS JETIS 1 (30 SOAL)
  // ==========================================
  {
    id: 'q-ipa-1',
    text: 'Ekosistem sawah terdapat beberapa jenis makhluk hidup yang membentuk beberapa rantai makanan. Setiap mahkluk hidup memiliki peran masing-masing. Ada yang berperan sebagai produsen, konsumen, dan pengurai seperti pada bagan berikut:<br/><br/><b>Padi &rarr; X &rarr; Musang &rarr; Ular</b><br/><b>Padi &rarr; Tikus &rarr; Musang / Ular</b><br/><br/>Mahkluk hidup yang dapat menduduki komponen bertanda <b>X</b> pada rantai makanan tersebut adalah ....',
    options: ['katak', 'burung hantu', 'burung pipit', 'wereng'],
    correctAnswer: 2, // 'burung pipit'
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Burung pipit memakan bulir padi (konsumen I) dan dimakan oleh musang serta ular pada rantai makanan ekosistem sawah.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-2',
    type: 'matrix_true_false',
    text: 'Guru menyiapkan gambar interaksi antara dua makhluk hidup yang membentuk simbiosis (Tumbuhan Tali Putri / Benalu pada tanaman inang). Aulia bertugas mengambil gambar dan Halya bertugas menyebutkan contoh lain yang memiliki kesamaan jenis simbiosis.<br/><br/>Berikut adalah contoh simbiosis yang memiliki kesamaan simbiosis dengan contoh milik Aulia (Simbiosis Parasitisme). Nyatakanlah <b>Benar</b> atau <b>Salah</b> pada setiap pernyataan!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. cacing pita yang hidup di tubuh sapi',
      'B. tanaman tanduk rusa menempel pada pohon mangga',
      'C. kutu yang menghisap darah manusia',
      'D. burung jalak memakan kutu yang hidup di tubuh kerbau'
    ],
    matrixCorrectAnswers: [0, 1, 0, 1], // A: Benar, B: Salah, C: Benar, D: Salah
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Contoh milik Aulia adalah Simbiosis Parasitisme. Cacing pita (A) dan Kutu manusia (C) adalah parasitisme (Benar). Tanduk rusa (B) adalah komensalisme (Salah) dan Jalak-Kerbau (D) adalah mutualisme (Salah).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-3',
    text: 'Perhatikan tabel berikut:<br/>- <b>Unta</b> : Punuk berisi lemak<br/>- <b>Ikan</b> : Insang untuk bernapas<br/>- <b>Trenggiling</b> : Mempunyai duri yang tajam<br/>- <b>Kelelawar</b> : Kemampuan ekolokasi<br/><br/>Setiap hewan memiliki kemampuan khusus (adaptasi) untuk bertahan hidup. Berdasarkan tabel di atas, pasangan hewan dan cara adaptasi sesuai dengan fungsi bagian tubuh yang tepat adalah ....',
    options: [
      'Trenggiling (mempunyai duri yang tajam)',
      'Kelelawar (kemampuan ekolokasi)',
      'Unta (punuk berisi lemak)',
      'Ikan (insang untuk bernapas)'
    ],
    correctAnswer: 1, // Kelelawar
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Kelelawar memiliki kemampuan ekolokasi untuk bernavigasi di tempat gelap. Trenggiling adaptasinya bersisik keras dan menggulungkan tubuh (duri tajam adalah adaptasi landak).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-4',
    text: 'Perhatikan gambar kondisi lingkungan suatu daerah yang tercemar tumpukan sampah dan sungai kotor.<br/><br/>Berdasarkan kondisi lingkungan tersebut, langkah yang paling tepat untuk melestarikan sumber daya alam dan menjaga lingkungan adalah ....',
    options: [
      'Membiarkan sampah terurai secara alami',
      'Menebang pohon untuk memperluas lahan pertanian',
      'Melakukan reboisasi dan mengelola sampah dengan benar',
      'Membakar sampah di sekitar sungai agar tidak mengganggu pemandangan'
    ],
    correctAnswer: 2, // Melakukan reboisasi & mengelola sampah
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Melakukan reboisasi (penanaman kembali) dan mengelola sampah dengan benar (pemilahan & daur ulang) adalah tindakan nyata menjaga kelestarian lingkungan.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-5',
    type: 'matrix_true_false',
    text: 'Perhatikan ilustrasi kampanye ramah lingkungan membawa tas belanja kain dari rumah (NO MORE PLASTIC).<br/><br/>Berikut adalah pernyataan terkait pengelolaan sampah. Tentukan <b>Benar</b> atau <b>Salah</b> dari setiap pernyataan!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Tindakan membawa tas belanja kain dari rumah adalah implementasi prinsip Reuse',
      'B. Prinsip Reduce dapat diterapkan dengan mengganti sikat gigi plastik dengan sikat gigi bambu',
      'C. Sampah plastik yang dibuang ke laut merupakan ancaman serius bagi biota laut karena terurainya menjadi mikroplastik',
      'D. Recycle adalah upaya yang wajib dilakukan untuk semua jenis sampah rumah tangga sebagai langkah pertama'
    ],
    matrixCorrectAnswers: [1, 0, 0, 1], // A: Salah, B: Benar, C: Benar, D: Salah
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'A: Salah (membawa tas belanja kain menolak kantong plastik sekali pakai adalah prinsip Reduce). B: Benar (mengurangi sampah plastik). C: Benar (mikroplastik berbahaya). D: Salah (langkah pertama adalah Reduce dan Reuse, bukan Recycle).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-6',
    text: 'Tumbuhan memiliki bagian-bagian yang memiliki fungsi masing-masing meliputi akar, batang, daun, bunga, buah, dan biji.<br/><br/>Fungsi bagian tumbuhan yang ditunjukkan huruf <b>X</b> (Daun) pada gambar adalah ....',
    options: [
      'menyerap air dan garam mineral dari udara',
      'alat perkembangbiakan tumbuhan secara generatif',
      'terdapat stomata untuk menghirup CO2 dari udara',
      'mengedarkan hasil fotosintesis ke seluruh bagian tumbuhan'
    ],
    correctAnswer: 2, // stomata menghirup CO2
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Daun memiliki mulut daun (stomata) yang berfungsi mengambil gas karbondioksida (CO2) dari udara sebagai bahan utama fotosintesis.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-7',
    text: 'Daur hidup merupakan tahap tumbuh dan perkembangan hewan. Gambar menunjukkan metamorfosis tidak lengkap pada belalang (Telur &rarr; X &rarr; Dewasa) dan metamorfosis lengkap pada lalat (Telur &rarr; Larva &rarr; Y &rarr; Dewasa).<br/><br/>Tahapan daur hidup hewan yang tepat untuk melengkapi huruf <b>X</b> dan <b>Y</b> berturut-turut adalah ....',
    options: [
      'pupa dan telur',
      'larva dan pupa',
      'nimfa dan pupa',
      'telur dan nimfa'
    ],
    correctAnswer: 2, // nimfa dan pupa
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'X adalah Nimfa (belalang muda tanpa sayap) dan Y adalah Pupa (kepompong lalat).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-8',
    type: 'matrix_true_false',
    text: 'Perhatikan gambar sendi pada bahu/pangkal lengan (Sendi Peluru). Sistem gerak pada manusia terdiri dari tulang, sendi, dan otot.<br/><br/>Berikut adalah pernyataan terkait ilustrasi sendi tersebut. Tentukan <b>Benar</b> atau <b>Salah</b> dari setiap pernyataan!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Sendi yang terdapat pada gambar ilustrasi di atas adalah sendi peluru',
      'B. Sendi yang terdapat pada gambar ilustrasi di atas adalah sendi putar',
      'C. Arah gerak sendi pada gambar ilustrasi di atas adalah ke segala arah',
      'D. Arah gerak sendi pada gambar ilustrasi di atas adalah berputar pada poros'
    ],
    matrixCorrectAnswers: [0, 1, 0, 1], // A: Benar, B: Salah, C: Benar, D: Salah
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Sendi peluru menghubungkan tulang lengan atas dan gelang bahu, memungkinkan gerakan bebas ke segala arah (A: Benar, B: Salah, C: Benar, D: Salah).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-9',
    text: 'Sistem pencernaan manusia terdiri atas organ mulut hingga anus. Selama berada dalam saluran pencernaan, makanan mengalami pencernaan mekanik dan kimiawi.<br/><br/><b>Proses pencernaan kimiawi:</b><br/>I. Mengubah karbohidrat menjadi glukosa oleh enzim amilase<br/>II. Mengubah protein susu menjadi pepton oleh enzim pepsin<br/>III. Mengubah protein susu menjadi kasein oleh enzim renin<br/>IV. Mengubah lemak menjadi asam lemak oleh enzim lipase<br/>V. Mengubah protein menjadi asam amino oleh enzim tripsin<br/><br/>Proses pencernaan makanan yang sesuai dengan organ usus halus/pankreas yang ditunjuk panah adalah ....',
    options: [
      'Mengubah lemak menjadi asam lemak dan gliserol oleh enzim lipase',
      'Mengubah protein menjadi asam amino oleh enzim tripsin',
      'Mengubah protein susu menjadi kasein oleh enzim renin',
      'Mengasamkan makanan oleh asam klorida'
    ],
    correctAnswer: 0, // Mengubah lemak menjadi asam lemak
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Enzim lipase yang dihasilkan pankreas dan bekerja di usus halus bertugas mencerna lemak menjadi asam lemak dan gliserol.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-10',
    text: 'Sistem gerak manusia terdiri dari anggota gerak pasif (tulang) dan aktif (otot). Otot terbagi menjadi otot polos, lurik, dan jantung. Gambar mengilustrasikan jaringan otot jantung.<br/><br/>Pernyataan yang tepat mengenai ciri-ciri otot pada gambar tersebut adalah ....',
    options: [
      'Berbentuk gelendong dengan kedua ujungnya meruncing',
      'Berbentuk silindris, memanjang, bercabang, dan bekerja di luar kesadaran',
      'Bekerja tanpa diperintah otak atau secara tidak sadar (involunter)',
      'Bekerja sesuai dengan perintah otak (volunter)'
    ],
    correctAnswer: 1, // Berbentuk silindris memanjang bercabang...
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Otot jantung berbentuk silindris memanjang, memiliki percabangan (sintisium), dan bekerja secara tidak sadar (otonom/involunter).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-11',
    text: 'Seorang siswi bernama Dina (16 tahun) sering mengalami batuk kering, hidung tersumbat, dan sesak napas setelah pulang sekolah naik motor melewati jalan ramai berdebu. Ia memiliki riwayat alergi debu.<br/><br/>Berdasarkan kondisi tersebut, upaya yang paling tepat dan mudah Dina lakukan untuk mengurangi gejala dan menjaga kesehatan pernapasannya adalah ....',
    options: [
      'Minum obat alergi secara rutin tanpa resep dokter dan segera menjual kucing peliharaan',
      'Mulai merokok ringan agar batuk berdahak dan mencuci hidung dengan air garam setiap jam',
      'Menggunakan masker N95 atau masker ganda saat berkendara dan rutin membersihkan debu kamar',
      'Berhenti naik motor dan beralih ke bus kota serta tidur di ruangan ber-AC sangat dingin'
    ],
    correctAnswer: 2, // Menggunakan masker & bersihkan debu
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Memakai masker N95 saat berkendara dan rutin membersihkan debu kamar adalah langkah pencegahan paling efektif untuk penderita alergi saluran pernapasan.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-12',
    text: 'Sistem peredaran darah manusia merupakan peredaran darah ganda tertutup. Pada skema peredaran darah dari paru-paru menuju jantung melalui vena pulmonalis (bagian yang ditunjuk panah), terjadi proses ....',
    options: [
      'darah mengandung CO2 mengalir dari pembuluh kapiler ke serambi kanan',
      'darah yang mengandung O2 dari paru-paru mengalir ke serambi kiri',
      'memompa darah minim O2 dari serambi kanan ke paru-paru',
      'darah kaya O2 dari serambi kiri dialirkan ke bilik kiri'
    ],
    correctAnswer: 1, // darah O2 dari paru-paru ke serambi kiri
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Vena pulmonalis mengalirkan darah bersih kaya O2 yang telah disaring di paru-paru masuk ke serambi kiri jantung.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-13',
    text: 'Bu guru menunjukkan gambar bagian telinga (1: Daun telinga, 2: Saluran telinga luar, 3: Gendang telinga, 4: Rumah siput/Koklea).<br/><br/><b>Hasil catatan siswa:</b><br/>- <b>Citra (No 1)</b>: Mengumpulkan gelombang suara.<br/>- <b>Lala (No 2)</b>: Menangkap dan mencegah debu masuk.<br/>- <b>Risa (No 3)</b>: Menangkap gelombang suara.<br/>- <b>Dika (No 4)</b>: Mengubah getaran menjadi impuls saraf diteruskan ke otak.<br/><br/>Murid-murid yang menjawab dengan benar adalah ....',
    options: ['Lala dan Risa', 'Citra dan Dika', 'Lala, Risa, dan Dika', 'Citra, Lala, dan Risa'],
    correctAnswer: 1, // Citra dan Dika
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Citra benar (Daun telinga berfungsi mengumpulkan gelombang suara) dan Dika benar (Koklea/rumah siput mengubah getaran suara menjadi impuls saraf).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-14',
    text: 'Perkembangbiakan vegetatif tumbuhan pada gambar:<br/>(I) Singkong (Umbi akar)<br/>(II) Jahe (Rizhoma / Akar tinggal)<br/>(III) Pegagan (Geragih / Stolon)<br/>(IV) Tumbuhan Paku (Spora)<br/><br/>Perkembangbiakan tumbuhan dengan <b>rizhoma</b> dan <b>spora</b> ditunjukkan gambar nomor ....',
    options: ['(I) dan (II)', '(II) dan (III)', '(II) dan (IV)', '(III) dan (IV)'],
    correctAnswer: 2, // (II) dan (IV)
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Jahe (II) berkembang biak secara vegetatif dengan rizhoma (akar tinggal), sedangkan tanaman paku (IV) berkembang biak dengan spora.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-15',
    text: 'Perubahan fisik pada masa pubertas:<br/>1) mengalami mimpi basah<br/>2) mengalami menstruasi<br/>3) dada membidang<br/>4) pinggul mulai membesar<br/>5) tumbuh rambut di bagian tubuh tertentu<br/>6) suara memberat dan jakun membesar<br/><br/>Ciri-ciri sekunder yang dialami oleh laki-laki pada masa puber ditunjukkan nomor ....',
    options: ['1), 3), dan 5)', '1), 4), dan 5)', '2), 4), dan 6)', '3), 5), dan 6)'],
    correctAnswer: 3, // 3), 5), dan 6)
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Ciri-ciri sekunder fisik laki-laki saat pubertas adalah dada membidang (3), tumbuh rambut di bagian tertentu (5), serta suara memberat dan tumbuh jakun (6).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-16',
    type: 'matrix_true_false',
    text: 'Perhatikan ilustrasi es batu berbentuk kubus yang diletakkan di atas piring (Zat Padat). Es batu memiliki bentuk tetap dan tidak tumpah saat piring dimiringkan.<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> pernyataan berikut mengenai sifat zat padat tersebut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Zat tersebut memiliki kerapatan partikel yang tinggi / sangat rapat',
      'B. Zat tersebut memiliki volume yang tetap tetapi bentuknya akan berubah mengikuti wadah',
      'C. Zat tersebut memiliki bentuk dan volume yang tetap',
      'D. Zat tersebut akan selalu menempati seluruh ruangan tempat ia diletakkan'
    ],
    matrixCorrectAnswers: [0, 1, 0, 1], // A: Benar, B: Salah, C: Benar, D: Salah
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Es batu adalah zat padat: memiliki kerapatan partikel sangat rapat (A: Benar), serta bentuk dan volume yang tetap (C: Benar). B adalah sifat zat cair dan D adalah sifat zat gas.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-17',
    text: 'Pada zaman dahulu, orang memasak menggunakan kayu bakar di tungku. Asap kayu bakar menempel di dinding sekitar tungku dan lama kelamaan menebal membentuk "jelaga" (perubahan wujud gas menjadi padat / mengkristal).<br/><br/>Proses perubahan wujud benda yang sama dengan peristiwa terbentuknya jelaga adalah ....',
    options: [
      'Kapur barus yang diletakkan di lemari dan lama kelamaan habis',
      'Baju basah yang dijemur lama kelamaan akan mengering',
      'Terbentuknya bunga es di dinding freezer',
      'Proses pembuatan es batu di dalam cetakan'
    ],
    correctAnswer: 2, // Terbentuknya bunga es di freezer
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Pembentukan jelaga dari asap (gas &rarr; padat) dan pembentukan bunga es di freezer dari uap air (gas &rarr; padat) merupakan contoh proses mengkristal/mengablur.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-18',
    text: 'Perhatikan gambar seorang kiper sepak bola yang menangkap dan menahan bola yang sedang meluncur cepat.<br/><br/>Berdasarkan gambar tersebut, pengaruh gaya terhadap benda yang tepat adalah ....',
    options: [
      'Mengubah bentuk benda',
      'Menghentikan benda yang sedang bergerak',
      'Mengubah arah gerak benda secara mendadak',
      'Mempercepat gerak benda dari lambat menjadi cepat'
    ],
    correctAnswer: 1, // Menghentikan benda bergerak
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Tangkapan kiper memberikan gaya yang menghentikan laju bola (menghentikan benda yang sedang bergerak).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-19',
    text: 'Gaya dapat berupa tarikan dan dorongan. Pada ilustrasi:<br/>Gambar 1: Anak mendorong meja di lantai.<br/>Gambar 2: Anak menimba air sumur dengan ember/katrol.<br/><br/>Gaya yang dimanfaatkan pada kedua gambar secara berurutan adalah gaya ....',
    options: [
      'Otot dan pegas',
      'Otot dan gesek',
      'Pegas dan gravitasi',
      'Otot dan gravitasi'
    ],
    correctAnswer: 3, // Otot dan gravitasi
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Mendorong meja memerlukan gaya otot (Gambar 1) dan mengangkat timba melawan gaya tarik bumi memanfaatkan gaya gravitasi/otot (Gambar 2).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-20',
    text: 'Di era transisi energi global, dunia beralih ke Energi Baru dan Terbarukan (EBT). Salah satu sumber daya alam yang dimanfaatkan adalah tanaman kelapa sawit yang diolah menjadi Biofuel / Biodiesel.<br/><br/>Sumber daya alam tersebut dimanfaatkan sebagai sumber energi alternatif untuk menggantikan ....',
    options: ['Solar', 'Avtur', 'Bensin', 'Pertamax'],
    correctAnswer: 0, // Solar
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Biodiesel dari bahan nabati (kelapa sawit) digunakan sebagai bahan bakar terbarukan pengganti bahan bakar fosil Solar.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-21',
    text: 'Perhatikan gambar alat elektronik Bor Listrik dan Blender Listrik.<br/><br/>Kesamaan perubahan energi yang terjadi pada kedua alat tersebut saat dioperasikan adalah ....',
    options: [
      'Mengubah listrik menjadi energi bunyi sebagai output utama',
      'Memerlukan energi listrik sebagai input utama',
      'Mengubah energi listrik menjadi energi gerak',
      'Menghasilkan energi kimia dan panas'
    ],
    correctAnswer: 1, // Memerlukan energi listrik / energi listrik jadi gerak
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Baik bor listrik maupun blender listrik sama-sama membutuhkan input energi listrik dan mengubahnya menjadi energi gerak (putar).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-22',
    text: 'Siswa SD Ceria melakukan ujian praktik tentang sifat-sifat magnet:<br/>- <b>Mirza</b>: Magnet dapat menembus benda tipis (Benar)<br/>- <b>Gendhis</b>: Magnet dapat menarik semua benda (Salah)<br/>- <b>Fara</b>: Kutub senama tolak-menolak, kutub tak senama tarik-menarik (Benar)<br/>- <b>Zahra</b>: Kekuatan gaya magnet terkecil ada di kutubnya (Salah)<br/><br/>Berdasarkan catatan siswa tersebut, penjelasan yang <b>salah</b> dituliskan oleh ....',
    options: ['Zahra dan Gendhis', 'Mirza dan Fara', 'Zahra dan Mirza', 'Gendhis dan Fara'],
    correctAnswer: 0, // Zahra dan Gendhis
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Gendhis salah karena magnet hanya dapat menarik benda magnetis/feromagnetik. Zahra salah karena kekuatan gaya magnet TERBESAR terdapat pada kedua kutubnya.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-23',
    type: 'matrix_true_false',
    text: 'Alfa merangkai campuran 5 bohlam lampu (L1–L5) dan 3 sakelar (S1–S3). Ia menutup semua sakelar dan mengamati nyala lampu.<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> pada setiap pernyataan mengenai pengamatan rangkaian listrik tersebut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Saat S1 ditutup dan sakelar lain dibuka, lampu L2 menyala lebih redup dibandingkan nyala lampu L4 dan L5',
      'B. Saat S1 ditutup dan sakelar lain dibuka, lampu L2 menyala lebih terang dibandingkan nyala lampu L1 dan L3',
      'C. Saat semua sakelar ditutup, nyala lampu L1, L2, dan L3 sama terangnya dengan L4 dan L5',
      'D. Saat semua sakelar ditutup, nyala lampu L1 dan L3 lebih redup dibandingkan dengan nyala lampu L2, L4, dan L5'
    ],
    matrixCorrectAnswers: [1, 0, 1, 0], // A: Salah, B: Benar, C: Salah, D: Benar
    category: 'IPA',
    difficulty: 'hard',
    explanation: 'A: Salah, B: Benar (L2 di jalur utama mendapat arus penuh saat S1 ditutup), C: Salah, D: Benar (L1 dan L3 berada di percabangan paralel sehingga arus terbagi dan lebih redup).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-24',
    type: 'matrix_true_false',
    text: 'Pak Guru membawa alat musik tradisional Angklung dari Jawa Barat.<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> hasil pernyataan tentang prinsip bunyi alat musik angklung berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. angklung menghasilkan bunyi berbeda tergantung panjang pendeknya bambu',
      'B. nada kuat berasal dari bilah bambu yang panjang',
      'C. nada tinggi berasal dari bilah bambu yang pendek',
      'D. bunyi yang dihasilkan dari angklung akan semakin tinggi jika bilah dipukul dengan kuat'
    ],
    matrixCorrectAnswers: [0, 1, 0, 1], // A: Benar, B: Salah, C: Benar, D: Salah
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'A: Benar (panjang bilah menentukan frekuensi), B: Salah, C: Benar (bilah pendek bergetar lebih cepat menghasilkan nada tinggi), D: Salah (memukul kuat mempengaruhi keras lembut bunyi/amplitudo, bukan tinggi nada).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-25',
    text: 'Teleskop refraktor terdiri dari lensa obyektif, cermin datar/diagonal, dan lensa okuler untuk mengamati bintang di langit.<br/><br/>Pernyataan yang benar mengenai cara kerja dan fungsi komponen teleskop tersebut adalah ....',
    options: [
      'Lensa obyektif berfungsi menangkap cahaya bintang dan membelokkan (membias) arah cahaya tersebut',
      'Lensa okuler berfungsi memantulkan cahaya ke mata pengamat',
      'Cermin datar/diagonal memantulkan bayangan sebesar 90° agar pengamatan nyaman',
      'Proses pembentukan bayangan melibatkan tiga tahap: Pembiasan, Pemantulan, dan Pembiasan kembali'
    ],
    correctAnswer: 0, // Lensa obyektif membias cahaya
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Lensa obyektif bertugas menangkap sinar cahaya dari objek sangat jauh dan membiaskannya hingga membentuk bayangan sejati di titik fokus.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-26',
    text: 'Air merupakan sumber daya alam terbarukan melalui daur air. Huruf <b>(X)</b> pada diagram daur air menunjukkan proses transpirasi (penguapan dari tumbuhan).<br/><br/>Dampak negatif yang terjadi karena terganggunya tahap transpirasi akibat musim kemarau berkepanjangan adalah ....',
    options: [
      'turunnya suhu udara di daerah perkotaan',
      'menurunnya polutan bebas di udara',
      'risiko terjadinya kekeringan dan krisis air bersih',
      'rusaknya ekosistem di laut'
    ],
    correctAnswer: 2, // risiko terjadinya kekeringan
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Terganggunya proses transpirasi dan evaporasi akibat kemarau panjang menghambat pembentukan awan hujan sehingga memicu risiko kekeringan.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-27',
    text: 'Perhatikan instalasi Panel Surya di atap rumah. Pemanfaatan sumber daya alam energi matahari memiliki banyak keunggulan.<br/><br/>Dua manfaat utama yang diperoleh dari pemanfaatan panel surya bagi lingkungan adalah ....',
    options: [
      'Mengubah energi listrik menjadi energi cahaya di malam hari',
      'Menyebabkan kenaikan harga listrik secara signifikan bagi pengguna rumahan',
      'Mengurangi ketergantungan pada bahan bakar fosil seperti batu bara dan minyak bumi',
      'Menciptakan sumber energi ramah lingkungan karena tidak menghasilkan emisi gas rumah kaca saat beroperasi'
    ],
    correctAnswer: 2, // Mengurangi ketergantungan fosil
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Panel surya memanfaatkan energi terbarukan matahari, bebas emisi gas rumah kaca dan mengurangi ketergantungan pada energi fosil.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-28',
    text: 'Sistem tata surya terdiri atas matahari, planet-planet, asteroid, dan komet. Anak panah pada ilustrasi menunjuk ke planet Uranus.<br/><br/>Ciri khas utama yang dimiliki oleh planet yang ditunjuk oleh anak panah (Uranus) adalah ....',
    options: [
      'Memiliki sumbu rotasi miring seolah-olah menggelinding seperti bola',
      'Memiliki jumlah satelit terbanyak dibandingkan planet lainnya',
      'Merupakan planet terpanas dalam tata surya',
      'Memiliki julukan "Bintang Fajar"'
    ],
    correctAnswer: 0, // Memiliki sumbu rotasi miring...
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Uranus memiliki sumbu rotasi sangat miring (hampir 98 derajat) sehingga tampak menggelinding di lintasan orbitnya.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-29',
    text: 'Gerhana Matahari terjadi ketika Matahari, Bulan, dan Bumi berada dalam satu garis lurus. Gambar menunjukkan posisi Bulan di titik terjauh dari Bumi (apogee) sehingga piringan Bulan tidak menutupi seluruh piringan Matahari.<br/><br/>Jenis gerhana dan penyebabnya yang tepat adalah ....',
    options: [
      'Gerhana Matahari cincin, karena Bulan berada di titik terjauh dari Bumi',
      'Gerhana Matahari total, karena sebagian wilayah Bumi tertutup oleh bayangan Bulan',
      'Gerhana Matahari cincin, karena Bumi berada di titik terjauh dari Matahari',
      'Gerhana Bulan penumbra, karena Bulan berada di wilayah penumbra Bumi'
    ],
    correctAnswer: 0, // Gerhana Matahari cincin
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Gerhana Matahari Cincin terjadi ketika Bulan berada pada titik terjauhnya (apogee) sehingga kerucut bayangan inti (umbra) tidak mencapai permukaan Bumi.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-ipa-30',
    type: 'matrix_true_false',
    text: 'Perhatikan ilustrasi gerak Rotasi dan Revolusi Bumi mengelilingi Matahari.<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> pernyataan berikut sesuai dengan peristiwa akibat gerakan Bumi!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Budi tinggal di Yogyakarta menonton siaran langsung bola pukul 19.00, sedangkan Inu di Papua menonton pukul 21.00',
      'B. Andi mengamati Matahari tampak terbit dari timur dan tenggelam di sebelah barat',
      'C. Ana yang tinggal di Denmark mengalami waktu siang lebih lama daripada saat tinggal di Indonesia saat musim panas',
      'D. Andi mengamati bahwa pada bulan Januari posisi semu matahari berada di belahan bumi selatan'
    ],
    matrixCorrectAnswers: [1, 1, 0, 0], // A: Salah, B: Salah, C: Benar, D: Benar
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'A & B adalah peristiwa akibat ROTASI bumi (sehingga Salah jika dikaitkan revolusi). Perbedaan lamanya siang-malam (C) dan pergeseran gerak semu tahunan matahari di belahan selatan pada bulan Januari (D) adalah akibat REVOLUSI bumi (Benar).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },

  // ==========================================
  // PAKET 1 SOAL TKAD SAINS KOTA YOGYAKARTA (30 SOAL)
  // ==========================================
  {
    id: 'q-tkad-1',
    text: 'Dalam suatu ekosistem terdapat berbagai komponen biotik antara lain sayur slada, katak, ular, ulat, belalang, dan ayam. Di dalam ekosistem tersebut terjadi interaksi yang membentuk jaring-jaring makanan. Setiap komponen makhluk hidup memiliki peran masing-masing, baik sebagai produsen, konsumen tingkat I, konsumen tingkat II, maupun konsumen tingkat III.<br/><br/>Komponen biotik lain yang dapat menggantikan peran ayam pada jaring-jaring makanan dalam ekosistem tersebut adalah ....',
    options: ['kelinci', 'musang', 'jangkrik', 'burung pipit'],
    correctAnswer: 3, // burung pipit
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Ayam berperan sebagai konsumen omnivora (memakan tumbuhan/serangga dan dimakan oleh pemangsa seperti ular). Hewan yang memiliki peran serupa dalam jaring-jaring makanan tersebut adalah burung pipit.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-2',
    text: 'Perhatikan ilustrasi berikut!<br/><b>Udang Pembersih dan Belut Moray</b><br/>Udang pembersih dan belut moray hidup bersama di ekosistem laut. Kedua hewan tersebut memiliki hubungan yang erat. Udang pembersih memiliki gerakan khusus yang menarik perhatian belut moray untuk mendekat. Belut moray membuka mulutnya dan melepaskan sendi-sendinya untuk memberi tahu udang jika dia tidak akan memakannya. Udang kemudian membersihkan mulut belut moray dari sisa makanan, jaringan mati dan parasit untuk mendapatkan makanan. Belut moray sangat terbantu karena mulut mereka menjadi bersih.<br/><br/>Pernyataan dalam teks yang mendukung bahwa hubungan yang ditunjukkan oleh udang pembersih dan belut moray merupakan simbiosis mutualisme adalah ....',
    options: [
      'Udang pembersih dan belut moray hidup bersama di ekosistem laut. Kedua hewan tersebut memiliki hubungan yang erat.',
      'Belut moray membuka mulutnya dan melepaskan sendi-sendinya untuk memberi tahu udang jika dia tidak akan memakannya.',
      'Belut moray membuka mulutnya dan melepaskan sendi-sendinya untuk memberi tahu udang jika dia tidak akan memakannya. Udang kemudian membersihkan mulut belut moray dari sisa makanan.',
      'Udang kemudian membersihkan mulut belut moray dari sisa makanan, jaringan mati dan parasit untuk mendapatkan makanan. Belut moray sangat terbantu karena mulut mereka menjadi bersih.'
    ],
    correctAnswer: 3, // Option D
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Simbiosis mutualisme adalah hubungan saling menguntungkan. Udang pembersih diuntungkan mendapatkan makanan dari sisa parasit, dan belut moray diuntungkan karena mulutnya menjadi bersih terbebas dari parasit.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-3',
    text: 'Makhluk hidup memiliki kemampuan untuk menyesuaikan diri terhadap lingkungannya. Termasuk tumbuhan seperti berikut:<br/>1. tumbuhan keladi<br/>2. tumbuhan akasia<br/>3. tumbuhan teratai<br/>4. tumbuhan aloevera<br/>5. tumbuhan buah naga<br/><br/>Tumbuhan yang memiliki kesamaan adaptasi dengan pohon kurma (xerofit) adalah ....',
    options: ['1, 2, dan 3', '2, 4, dan 5', '2, 3, dan 4', '1, 3, dan 4'],
    correctAnswer: 1, // 2, 4, dan 5
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Pohon kurma adalah tumbuhan xerofit (hidup di lingkungan kering). Tumbuhan lain yang beradaptasi xerofit adalah tumbuhan akasia (2), aloevera (4), dan buah naga (5).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-4',
    text: 'Deforestasi Indonesia meningkat untuk tahun ketiga berturut-turut pada 2024, dengan sekitar 261.575 hektare hutan primer dan sekunder yang hilang. Berikut adalah upaya-upaya untuk menjaga kelestarian sumber daya alam di Indonesia:<br/>I. Memperketat AMDAL di area sensitif yang berpotensi terdeforestasi.<br/>II. Melindungi dan memperluas kawasan hutan konservasi melalui zonasi.<br/>III. Mengendalikan limbah industri dan rumah tangga agar tidak merusak tanah, air, dan udara.<br/>IV. Mendorong praktik pertanian dan perkebunan berkelanjutan.<br/>V. Mendirikan taman nasional, suaka margasatwa, dan pusat breeding untuk spesies terancam punah.<br/><br/>Upaya yang paling tepat untuk menjaga kelestarian hutan ditunjukkan oleh nomor ....',
    options: ['I dan II.', 'I, II, dan IV.', 'II, III, dan IV.', 'II, III, IV, dan V.'],
    correctAnswer: 1, // I, II, dan IV
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Upaya langsung untuk menjaga kelestarian hutan dari ancaman deforestasi adalah memperketat AMDAL (I), memperluas kawasan hutan konservasi (II), dan mendorong praktik perkebunan berkelanjutan (IV).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-5',
    type: 'matrix_true_false',
    text: 'Suatu hari, warga Desa Sukamaju mengadakan kerja bakti membersihkan sungai yang dipenuhi sampah plastik. Sebelumnya, sungai itu kotor, airnya keruh, dan ikan-ikan banyak yang mati. Setelah sungai dibersihkan, warga juga memasang papan peringatan agar tidak membuang sampah ke sungai dan menyediakan tempat sampah di sekitar pemukiman.<br/><br/>Berdasarkan ilustrasi tersebut, tentukan pernyataan berikut <b>Benar</b> atau <b>Salah</b> terkait upaya menjaga kelestarian lingkungan!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Membersihkan sungai bersama-sama adalah salah satu cara menjaga kelestarian lingkungan.',
      'B. Membiarkan sampah menumpuk di sungai termasuk cara menjaga keseimbangan alam.',
      'C. Menyediakan tempat sampah dapat membantu warga menjaga kebersihan sungai.'
    ],
    matrixCorrectAnswers: [0, 1, 0], // Benar, Salah, Benar
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'A: Benar (kerja bakti sungai menjaga lingkungan). B: Salah (membiarkan sampah merusak ekosistem). C: Benar (tempat sampah mencegah sampah dibuang ke sungai).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-6',
    text: 'Tumbuhan memiliki struktur bagian yang menunjang tumbuh kembang. Pada gambar tanaman tomat, bagian nomor 2 menunjuk pada <b>Daun</b>.<br/><br/>Fungsi dari bagian daun tumbuhan tersebut adalah ....',
    options: [
      'Tempat pertukaran oksigen dan karbondioksida serta tempat transpirasi (penguapan air)',
      'Tempat menyerap air dan garam mineral dari dalam tanah',
      'Tempat menyokong dan menopang tegaknya tubuh tumbuhan',
      'Tempat penyerbukan dan pembuahan generatif'
    ],
    correctAnswer: 0,
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Daun berfungsi sebagai tempat fotosintesis, tempat pertukaran gas O2 dan CO2 melalui stomata, serta tempat penguapan air (transpirasi).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-7',
    text: 'Hewan di sekitar kita ada yang mengalami metamorfosis, di antaranya:<br/>P = Ngengat (Metamorfosis Sempurna)<br/>Q = Semut (Metamorfosis Sempurna)<br/>R = Capung (Metamorfosis Tidak Sempurna)<br/>S = Kecoak (Metamorfosis Tidak Sempurna)<br/>T = Kumbang / Tomcat (Metamorfosis Sempurna)<br/>U = Lalat (Metamorfosis Sempurna)<br/><br/>Hewan tersebut yang memiliki kesamaan jenis metamorfosis dengan hewan Q (Metamorfosis Sempurna) ditunjukkan oleh gambar ....',
    options: ['P, R, dan T', 'P, T, dan U', 'R, S, dan T', 'R, T, dan U'],
    correctAnswer: 1, // P, T, dan U
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Semut (Q), Ngengat (P), Kumbang (T), dan Lalat (U) mengalami metamorfosis sempurna (holometabola) melalui tahapan telur - larva - pupa - dewasa.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-8',
    text: 'Organ gerak hewan adalah alat bantu yang membantu hewan bergerak di lingkungan tertentu. Pada hewan katak, kaki belakang berukuran besar, panjang, dan berselaput.<br/><br/>Fungsi utama bagian kaki belakang katak tersebut adalah ....',
    options: [
      'merayap dan meloncat jarak pendek',
      'mendorong tubuh saat berenang dan melompat jauh',
      'menjaga keseimbangan saat berjalan',
      'memegang makanan saat memangsa'
    ],
    correctAnswer: 1, // mendorong tubuh saat berenang
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Kaki belakang katak yang panjang dan berselaput berfungsi kuat untuk mendorong tubuh saat berenang di air dan melompat jauh di darat.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-9',
    type: 'matrix_true_false',
    text: 'Otot merupakan jaringan dalam tubuh yang berkontraksi saat kita bergerak. Otot lurik adalah salah satu jenis otot pada manusia.<br/><br/>Tentukan pernyataan yang <b>Sesuai</b> dan <b>Tidak Sesuai</b> mengenai ciri-ciri otot lurik pada tabel berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Sesuai', 'Tidak Sesuai'],
    matrixRows: [
      'A. Termasuk otot volunter (bekerja sesuai kesadaran)',
      'B. Pola tidak bergaris / polos',
      'C. Bekerja dengan kuat dan cepat, tapi mudah lelah'
    ],
    matrixCorrectAnswers: [0, 1, 0], // Sesuai, Tidak Sesuai, Sesuai
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Otot lurik terikat pada rangka, bekerja secara sadar (volunter), memiliki pola bergaris terang-gelap, serta bekerja cepat dan mudah lelah.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-10',
    text: 'Saat pelajaran IPA, Bu Rani menayangkan gambar anatomi telinga manusia:<br/>1: Daun telinga | 2: Liang telinga | 3: Gendang telinga | 4: Saluran Eustachius | 5: Koklea (Rumah siput) | 6: Saluran setengah lingkaran | 7: Tulang pendengaran | 8: Tulang martil/landasan.<br/><br/>Jawaban siswa:<br/>- Arka: No 2 menangkap getaran dari gendang telinga<br/>- Belva: No 3 menangkap gelombang suara dari luar<br/>- Cindy: No 5 mengubah getaran suara menjadi sinyal listrik<br/>- Diva: No 6 menjaga keseimbangan<br/><br/>Siswa yang menyebutkan bagian telinga dan fungsinya dengan benar adalah ....',
    options: ['Arka dan Diva', 'Cindy dan Diva', 'Arka, Cindy, dan Eka', 'Belva, Eka dan Cindy'],
    correctAnswer: 1, // Cindy dan Diva
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Cindy benar (Koklea/no 5 mengubah getaran menjadi sinyal listrik/impuls saraf) dan Diva benar (Saluran setengah lingkaran/no 6 berfungsi menjaga keseimbangan tubuh).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-11',
    text: 'Perhatikan organ pernapasan manusia pada bagian <b>Rongga Hidung</b> (huruf X).<br/><br/>Proses pernapasan yang terjadi pada organ rongga hidung tersebut adalah ....',
    options: [
      'menyaring udara kotor oleh rambut hidung serta mengatur suhu dan kelembapan udara',
      'membagi udara masuk ke paru-paru kanan dan paru-paru kiri',
      'tempat pertukaran gas oksigen dan karbondioksida',
      'mendorong udara masuk ke dalam pembuluh darah'
    ],
    correctAnswer: 0,
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Rongga hidung berfungsi menyaring kotoran/debu oleh rambut hidung dan selaput lendir serta menyesuaikan suhu dan kelembapan udara yang masuk.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-12',
    text: 'Makanan yang kita makan diolah oleh saluran pencernaan manusia.<br/><br/>Fungsi organ pencernaan nomor 1 (<b>Mulut / Rongga Mulut</b>) dalam proses pencernaan adalah ....',
    options: [
      'memproduksi cairan empedu yang membantu proses pencernaan lemak',
      'mengalirkan makanan ke lambung dengan gerakan peristaltik',
      'menyerap nutrisi dan sisa makanan yang telah diuraikan',
      'mengunyah makanan secara mekanik dan menguraikan karbohidrat dengan enzim amilase'
    ],
    correctAnswer: 3, // D
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Mulut berfungsi mencerna makanan secara mekanik dengan gigi dan kimiawi dengan bantuan enzim amilase (ptialin).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-13',
    text: 'Sistem peredaran darah manusia terbagi menjadi peredaran darah kecil dan peredaran darah besar.<br/><br/>Urutan aliran darah pada <b>Peredaran Darah Kecil</b> (Jantung &rarr; Paru-Paru &rarr; Jantung) ditunjukkan oleh skema nomor ....',
    options: [
      '9 – 4 – 6 – 8 – 3 – 10 (Peredaran darah kaya karbondioksida)',
      '7 – 1 – 9 – 4 – 6 (Peredaran darah kaya oksigen)',
      '8 – 3 – 10 – 2 – 5 (Peredaran darah kecil dari Bilik Kanan ke Paru-Paru lalu Serambi Kiri)',
      '1 – 2 – 3 – 4 – 5 (Peredaran darah sistemik seluruh tubuh)'
    ],
    correctAnswer: 2, // 8 - 3 - 10 - 2 - 5
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Peredaran darah kecil berawal dari Bilik Kanan (8) &rarr; Arteri Pulmonalis (3) &rarr; Paru-Paru (10) &rarr; Vena Pulmonalis (2) &rarr; Serambi Kiri (5).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-14',
    text: 'Seseorang yang sering terlambat makan atau tidak mengkonsumsi makanan secara teratur akan mengalami gangguan pada organ <b>Lambung</b> (huruf X).<br/><br/>Kondisi gangguan yang dialami organ lambung tersebut adalah ....',
    options: [
      'Organ X bekerja tidak maksimal menyebabkan seseorang mengalami kesulitan untuk buang air besar secara teratur',
      'Organ X mengalami kelumpuhan menyebabkan makanan menjadi lama untuk dicerna',
      'Organ mengalami peradangan karena produksi asam yang berlebih (gastritis) sehingga terkikisnya dinding organ X dan timbul rasa nyeri',
      'Saraf di area organ pencernaan mengalami kerusakan menyebabkan otot katup kehilangan kelenturan'
    ],
    correctAnswer: 2, // C
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Terlambat makan menyebabkan kadar asam lambung (HCl) meningkat sehingga mengikis dinding lambung dan menyebabkan peradangan/nyeri maag.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-15',
    text: 'Penyakit saluran pernapasan seperti influenza, bronchitis, dan pneumonia memiliki gejala batuk, demam, dan sesak napas.<br/><br/>Pola hidup sehat yang paling tepat untuk mencegah terjadinya penyakit saluran pernapasan tersebut adalah ....',
    options: [
      'Menghindari paparan asap rokok, polusi udara, serta rutin mencuci tangan dengan sabun dan air mengalir',
      'Konsumsi makanan tinggi gula dan membatasi asupan air putih',
      'Tidur di ruangan ber-AC dingin tanpa ventilasi udara',
      'Olahraga maraton ekstrem tanpa istirahat saat kondisi demam'
    ],
    correctAnswer: 0,
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Mencegah penyakit pernapasan dilakukan dengan menjaga kebersihan saluran napas (bebas asap rokok & polusi) dan rajin cuci tangan guna memutus rantai penularan kuman/virus.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-16',
    text: 'Abid mencocokkan kartu perkembangbiakan hewan:<br/>- Kartu I: Angsa &rarr; Ovipar<br/>- Kartu II: Landak &rarr; Ovovivipar (Salah, seharusnya Vivipar)<br/>- Kartu III: Kelinci &rarr; Vivipar<br/>- Kartu IV: Siput &rarr; Vivipar (Salah, seharusnya Ovipar)<br/>- Kartu V: Katak &rarr; Ovipar<br/><br/>Kartu dengan pasangan yang paling tepat dan benar adalah ....',
    options: ['I dan III', 'I, II, dan III', 'I, III, dan V', 'II, IV, dan V'],
    correctAnswer: 2, // I, III, dan V
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Angsa bertelur (Ovipar - Kartu I), Kelinci melahirkan (Vivipar - Kartu III), dan Katak bertelur (Ovipar - Kartu V) merupakan pasangan kartu yang benar.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-17',
    text: 'Pak Suroyo kini berusia 72 tahun. Rambutnya mulai memutih, giginya banyak yang tanggal, pendengarannya menurun, dan mudah merasa lelah.<br/><br/>Ciri perkembangan manusia pada fase lansia yang dialami Pak Suroyo adalah ....',
    options: [
      'Pertumbuhan tinggi cepat, suara berubah, dan mulai tertarik dengan lawan jenis',
      'Rambut memutih, gigi banyak yang tanggal, dan kekuatan fisik tubuh menurun',
      'Mulai belajar berjalan, berbicara sederhana, dan aktif meniru perilaku orang tua',
      'Tubuh berkembang sempurna, mulai bekerja, dan bertanggung jawab terhadap keluarga'
    ],
    correctAnswer: 1, // B
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Fase lansia ditandai dengan penurunan fungsi organ fisik seperti kemunculan uban, gigi tanggal, serta daya tahan dan kekuatan otot yang berkurang.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-18',
    text: 'Ani membantu ibunya memasak menggunakan panci aluminium. Sayuran yang direbus dalam panci aluminium tersebut menjadi cepat matang.<br/><br/>Sifat bahan aluminium yang dimanfaatkan pada pembuatan panci adalah ....',
    options: [
      'dapat menghantarkan panas dengan baik (konduktor)',
      'dapat menyerap air dengan baik',
      'tidak mudah pecah bila jatuh',
      'tembus cahaya dan elastis'
    ],
    correctAnswer: 0, // A
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Aluminium merupakan logam konduktor panas yang baik sehingga dapat menyalurkan energi panas dari kompor ke makanan secara cepat.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-19',
    type: 'matrix_true_false',
    text: 'Siswa kelas 6 mengamati es batu yang dimasukkan ke dalam gelas kaca bening yang kering. Setelah didiamkan 10 menit, es batu mencair di dalam gelas dan dinding luar gelas menjadi basah oleh embun.<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> untuk setiap pernyataan percobaan perubahan wujud zat berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Air yang ada di dalam gelas berasal dari es batu yang mencair (mencair).',
      'B. Terjadi pengembunan sehingga es batu berubah menjadi air.',
      'C. Terjadi pengembunan pada udara di sekitar gelas ditandai titik-titik air di bagian luar gelas.'
    ],
    matrixCorrectAnswers: [0, 1, 0], // Benar, Salah, Benar
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'A: Benar (es padat &rarr; air cair adalah mencair). B: Salah (es menjadi air adalah mencair, bukan mengembun). C: Benar (titik-titik air di luar gelas berasal dari uap air udara yang mengembun terkena dingin).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-20',
    text: 'Pada pembuatan gula jawa, nira direbus dalam kuali hingga airnya menguap dan kental, lalu dituang ke batok kelapa hingga memadat setelah dingin.<br/><br/>Perubahan wujud benda yang terjadi dalam proses pembuatan gula jawa tersebut adalah ....',
    options: [
      'Menguap saat perebusan nira kelapa dan membeku / memadat saat pendinginan adonan gula',
      'Mencair pada saat menuang adonan ke dalam cetakan batok kelapa',
      'Menyuling nira kelapa menjadi gas bertekanan tinggi',
      'Mengembun pada saat pemanasan nira di atas kompor'
    ],
    correctAnswer: 0,
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Perubahan wujud yang terjadi adalah menguap (kandungan air pada nira menguap saat direbus) dan membeku/memadat (adonan cairan gula memadat menjadi keras saat mendingin).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-21',
    text: 'Ibu kesulitan membuka tutup logam pada toples asinan yang baru dikeluarkan dari lemari es. Ibu merendam bagian tutup logam toples dalam air panas beberapa saat, sehingga toples mudah dibuka.<br/><br/>Peristiwa yang terjadi berdasarkan ilmu pemuaian zat adalah ....',
    options: [
      'Tutup toples dari logam mengalami pemuaian karena direndam air panas, sehingga celah antara tutup dan toples kaca melebar dan mudah dibuka',
      'Tutup toples dari logam mengalami penyusutan karena suhu udara ruang hangat',
      'Toples kaca mengalami pemuaian cepat sehingga tutup terangkat sendiri',
      'Toples kaca menyusut drastis sehingga tutup semakin rapat'
    ],
    correctAnswer: 0, // A
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Logam memiliki koefisien muai lebih besar dari kaca. Merendam tutup logam dalam air panas membuatnya memuai (membesar) sehingga celah ulir melebar dan toples mudah dibuka.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-22',
    type: 'matrix_true_false',
    text: 'Perhatikan jenis-jenis gaya:<br/>Gambar A = Apel jatuh dari pohon (Gaya Gravitasi)<br/>Gambar B = Magnet menarik paku (Gaya Magnet)<br/>Gambar C = Tangan menggosok papan tulis (Gaya Gesek)<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> untuk setiap pernyataan mengenai gaya berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Gambar A menunjukkan gaya gesek dan Gambar B menunjukkan gaya magnet.',
      'B. Gambar B menunjukkan gaya magnet dan Gambar C menunjukkan gaya gesek.',
      'C. Gambar A, B, dan C tidak ada yang menunjukkan gaya listrik.'
    ],
    matrixCorrectAnswers: [1, 0, 0], // Salah, Benar, Benar
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'A: Salah (Gambar A adalah gaya gravitasi). B: Benar (B magnet, C gesek). C: Benar (tidak ada gambar gaya listrik).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-23',
    text: 'Andi menendang bola yang diam di halaman rumah ke arah Bayu, sehingga bola bergerak mendekati Bayu.<br/><br/>Kegiatan saat Andi mengoper bola tersebut menunjukkan bahwa gaya dapat ....',
    options: [
      'mengubah bentuk benda',
      'mengurangi ukuran benda',
      'mengubah arah gerak benda',
      'mengubah benda diam menjadi bergerak'
    ],
    correctAnswer: 3, // D
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Menendang bola yang tadinya diam di tanah hingga bergerak meluncur menunjukkan pengaruh gaya dapat membuat benda diam menjadi bergerak.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-24',
    type: 'matrix_true_false',
    text: 'Ibu menggunakan blender listrik untuk menghancurkan bahan makanan di dapur.<br/><br/>Tentukan <b>Sesuai</b> atau <b>Tidak Sesuai</b> untuk setiap pernyataan perubahan energi pada blender berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Sesuai', 'Tidak Sesuai'],
    matrixRows: [
      'A. Energi listrik berubah menjadi energi gerak pada putaran pisau blender.',
      'B. Energi listrik berubah menjadi energi bunyi saat motor blender berputar.',
      'C. Energi listrik berubah menjadi energi cahaya utama di dalam tabung blender.'
    ],
    matrixCorrectAnswers: [0, 0, 1], // Sesuai, Sesuai, Tidak Sesuai
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'A: Sesuai (fungsi utama memutar pisau). B: Sesuai (suara bising blender). C: Tidak Sesuai (blender tidak menghasilkan energi cahaya utama).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-25',
    text: 'Desa Sumber Sari memiliki bangunan rendah, angin lambat, sungai kecil, namun mendapat paparan sinar matahari yang sangat tinggi sepanjang tahun.<br/><br/>Penggunaan energi alternatif yang paling tepat untuk desa tersebut adalah ....',
    options: [
      'memaksimalkan kerja generator guna meningkatkan aliran air sungai',
      'memasang panel surya untuk memanfaatkan energi matahari',
      'memasang kincir angin untuk mengubah debit aliran sungai',
      'memasang sel surya untuk mengubah energi panas bumi'
    ],
    correctAnswer: 1, // B
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Potensi paparan sinar matahari yang melimpah paling cocok dimanfaatkan dengan pembangkit listrik tenaga surya (panel surya).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-26',
    text: 'Pak Edo tinggal di daerah pegunungan yang teduh dengan intensitas sinar matahari rendah, namun memiliki sungai dan waduk besar dengan debit air yang stabil sepanjang tahun.<br/><br/>Pemanfaatan energi alternatif yang paling tepat untuk wilayah tempat tinggal Pak Edo adalah ....',
    options: [
      'mengembangkan biodiesel untuk memenuhi kebutuhan listrik',
      'mengoptimalkan penggunaan biogas dari kotoran ternak',
      'memasang panel surya di setiap atap rumah warga',
      'memanfaatkan energi kinetik aliran air sungai untuk memutar turbin generator (PLTA/Mikrohidro)'
    ],
    correctAnswer: 3, // D
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Sungai dengan debit air besar dan stabil merupakan sumber energi kinetik air yang ideal untuk menggerakkan turbin generator listrik (PLTA / Mikrohidro).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-27',
    text: 'Dion dan Della melakukan percobaan magnet batang:<br/>1. Kutub Utara (N) didekatkan dengan Kutub Selatan (S) &rarr; Saling tarik-menarik.<br/>2. Kutub Utara (N) didekatkan dengan Kutub Utara (N) &rarr; Saling tolak-menolak.<br/><br/>Kesimpulan sifat magnet yang tepat dari percobaan tersebut adalah ....',
    options: [
      'kutub magnet memiliki medan magnet dan selalu tarik-menarik',
      'kutub senama jika didekatkan akan saling tolak-menolak, dan kutub tidak senama akan saling tarik-menarik',
      'kutub tidak senama jika didekatkan akan tolak-menolak',
      'magnet selalu tarik-menarik meskipun jenis kutubnya sama'
    ],
    correctAnswer: 1, // B
    category: 'IPA',
    difficulty: 'easy',
    explanation: 'Sifat dasar magnet: kutub-kutub yang senama (sejenis) akan saling tolak-menolak, sedangkan kutub-kutub yang tidak senama (berbeda jenis) akan saling tarik-menarik.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-28',
    text: 'Riza memainkan alat musik xilofon/kolintang besi. Bilah nomor 1 berukuran paling panjang dan bilah nomor 6 berukuran paling pendek.<br/><br/>Riza mengamati bahwa bilah nomor 3 mempunyai nada yang ....',
    options: [
      'lebih rendah dari bagian nomor 1 dan 2',
      'lebih tinggi dari bagian nomor 2 dan 6',
      'lebih rendah dari bagian nomor 4 dan 5',
      'lebih tinggi dari bagian nomor 5 dan 6'
    ],
    correctAnswer: 2, // C
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Semakin pendek bilah alat musik pukul, semakin tinggi nada yang dihasilkan. Bilah 3 lebih panjang dari bilah 4 dan 5, sehingga nada bilah 3 lebih rendah daripada nada bilah 4 dan 5.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-29',
    text: 'Seorang siswa mengarahkan cahaya senter ke gelas bening berisi air. Cahaya terlihat menembus gelas dan menerangi benda yang ada di belakang gelas.<br/><br/>Percobaan tersebut membuktikan bahwa sifat cahaya adalah ....',
    options: [
      'cahaya dapat merambat lurus ke dalam gelas lalu dipantulkan',
      'cahaya dapat menembus benda bening kemudian cahaya menuju benda di belakangnya dan dibiaskan',
      'cahaya dapat diuraikan oleh air gelas',
      'cahaya dapat menembus benda bening kemudian menuju benda di belakangnya dan dipantulkan ke mata sehingga benda terlihat'
    ],
    correctAnswer: 3, // D
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Cahaya dapat menembus benda bening (gelas kaca dan air), lalu mengenai objek di belakangnya dan memantulkan cahaya ke mata sehingga objek dapat terlihat.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-tkad-30',
    text: 'Ijat dan keluarganya ingin menghemat penggunaan energi listrik di rumah. Pilihan yang mereka miliki: mengganti lampu pijar, mengganti kulkas lama, atau mematikan TV lebih awal.<br/><br/>Langkah yang memiliki dampak penghematan energi listrik paling besar secara kumulatif adalah ....',
    options: [
      'mengganti lampu pijar dengan lampu hemat energi (LED)',
      'mengganti kulkas lama berdaya tinggi dengan kulkas hemat energi (inverter)',
      'membiarkan semua peralatan listrik tetap seperti semula',
      'mematikan televisi 30 menit lebih awal'
    ],
    correctAnswer: 1, // B
    category: 'IPA',
    difficulty: 'medium',
    explanation: 'Kulkas beroperasi terus menerus selama 24 jam sehari. Kulkas model lama mengonsumsi daya listrik sangat besar, sehingga mengganti kulkas lama dengan teknologi hemat energi (inverter) memberikan dampak penghematan kWh paling signifikan.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },

  // ==========================================
  // PAKET 1 SOAL TPM TKA MATEMATIKA SD (30 SOAL)
  // ==========================================
  {
    id: 'q-sd-mat-1',
    text: 'Hasil dari 280 × 45 + 9.660 : 12 = ....',
    options: ['2.065', '12.405', '12.685', '13.405'],
    correctAnswer: 3,
    category: 'Matematika',
    difficulty: 'easy',
    explanation: 'Perkalian dan pembagian dikerjakan terlebih dahulu: 280 × 45 = 12.600 dan 9.660 : 12 = 805. Kemudian ditambahkan: 12.600 + 805 = 13.405.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-2',
    type: 'matrix_true_false',
    text: 'Bu Dina berbelanja di Toko Sembako Murah: 3 botol minyak goreng 2 Liter (@ Rp41.000,00) dan 7 kg beras (@ Rp16.500,00). Dina membayar dengan 2 lembar Rp100.000,00 dan 1 lembar Rp50.000,00 (Total Rp250.000,00). Terdapat diskon Rp10.000,00 untuk pembelian minimal Rp200.000,00.<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> untuk setiap pernyataan berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Harga seluruh beras yang dibeli Bu Dina adalah Rp115.500,00.',
      'B. Total harga belanjaan Bu Dina sebelum diskon adalah Rp238.500,00.',
      'C. Uang kembalian yang diterima Bu Dina setelah diskon adalah Rp21.500,00.'
    ],
    matrixCorrectAnswers: [0, 0, 0],
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'A: Benar (7 × 16.500 = 115.500). B: Benar (3 × 41.000 + 115.500 = 238.500). C: Benar (Diskon 10.000 → Bayar = 228.500. Kembalian = 250.000 - 228.500 = 21.500).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-3',
    type: 'matrix_true_false',
    text: 'Pak Burhan memproduksi batik: 54 potong Sido Mukti, 42 potong Nitik, dan 48 potong Ciptoning. Kain didistribusikan ke sebanyak-banyaknya toko batik dengan jumlah dan motif sama banyak (FPB).<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> untuk setiap pernyataan berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Terdapat 6 toko batik yang menerima kiriman kain batik.',
      'B. Jumlah kain batik yang diterima setiap toko adalah 23 potong.',
      'C. Setiap toko menerima kain batik motif Sido Mukti 2 potong lebih banyak dari motif Nitik.'
    ],
    matrixCorrectAnswers: [0, 1, 0],
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'FPB(54, 42, 48) = 6 toko. Tiap toko menerima Sido Mukti = 9, Nitik = 7, Ciptoning = 8. Total kain per toko = 24 potong. Selisih Sido Mukti dan Nitik = 9 - 7 = 2 potong.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-4',
    type: 'matrix_true_false',
    text: 'Candra, Galang, dan Riko kursus renang di tempat yang sama. Candra (Paket A) setiap 3 hari sekali mulai 25 Agustus 2025. Galang (Paket B) setiap 6 hari sekali mulai 19 Agustus 2025. Riko (Paket C) setiap 7 hari sekali mulai 23 Agustus 2025.<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> untuk setiap pernyataan berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Mereka bertiga kursus renang bersama pertama kali pada tanggal 6 September 2025.',
      'B. Mereka bertiga kursus renang bersama setiap 21 hari sekali.',
      'C. Mereka bertiga kursus renang bersama kedua kali pada tanggal 18 Oktober 2025.'
    ],
    matrixCorrectAnswers: [0, 1, 0],
    category: 'Matematika',
    difficulty: 'hard',
    explanation: 'A: Benar (6 September 2025 adalah tanggal pertama ketiganya bertemu). B: Salah (KPK(3,6,7) = 42 hari sekali). C: Benar (6 Sep + 42 hari = 18 Oktober 2025).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-5',
    text: 'Perhatikan gambar petak persegi di mana terdapat 12 petak terarsir dari total 27 petak. Pecahan yang senilai dengan gambar tersebut adalah ....',
    options: ['25/45', '15/36', '12/27', '12/18'],
    correctAnswer: 2,
    category: 'Matematika',
    difficulty: 'easy',
    explanation: 'Nilai pecahan gambar terarsir adalah 12/27, yang jika disederhanakan (dibagi 3) menjadi 4/9.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-6',
    text: 'Pak Andre memiliki hewan ternak ayam dan bebek. Banyak ayam 3/5 dari banyak bebek. Jika jumlah ayam adalah 60 ekor, maka selisih ayam dan bebek milik Pak Andre adalah ....',
    options: ['100 ekor', '40 ekor', '36 ekor', '24 ekor'],
    correctAnswer: 1,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Banyak bebek = 60 × 5 / 3 = 100 ekor. Selisih ayam dan bebek = 100 - 60 = 40 ekor.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-7',
    text: 'Urutan pecahan dari yang nilainya terbesar adalah ....',
    options: [
      '1 2/5 ; 95% ; 0,63 ; 25/40 ; 25/50',
      '1 2/5 ; 95% ; 0,63 ; 25/50 ; 25/40',
      '25/40 ; 25/50 ; 0,63 ; 95% ; 1 2/5',
      '25/50 ; 25/40 ; 0,63 ; 95% ; 1 2/5'
    ],
    correctAnswer: 0,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Ubah ke desimal: 1 2/5 = 1,40 ; 95% = 0,95 ; 0,63 = 0,63 ; 25/40 = 0,625 ; 25/50 = 0,50. Urutan terbesar ke terkecil: 1 2/5 ; 95% ; 0,63 ; 25/40 ; 25/50.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-8',
    text: 'Hasil dari 7/8 + 2 1/5 × 50% - 1,2 adalah ....',
    options: ['31/40', '27/80', '1 39/40', '1 1/40'],
    correctAnswer: 0,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: '2 1/5 × 50% = 11/5 × 1/2 = 11/10. Hitung: 7/8 + 11/10 - 12/10 = 7/8 - 1/10 = (35 - 4)/40 = 31/40.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-9',
    text: 'Rina mempunyai pita sepanjang 24 m. Digunakan untuk menghias 3 kotak kado masing-masing 2 1/2 m, dan vas bunga sepanjang 3,2 m. Selebihnya dibuat 7 hiasan rambut sama panjang. Masing-masing hiasan rambut membutuhkan pita sepanjang ....',
    options: ['1,90 m', '2,00 m', '2,04 m', '2,10 m'],
    correctAnswer: 0,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Pita dipakai = (3 × 2,5) + 3,2 = 7,5 + 3,2 = 10,7 m. Sisa pita = 24 - 10,7 = 13,3 m. Panjang 1 hiasan = 13,3 : 7 = 1,90 m.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-10',
    type: 'matrix_true_false',
    text: 'Dias menggambar ulang peta dengan jarak sebenarnya Sleman dan Gunungkidul 50 km (5.000.000 cm). Peta awal berjarak 10 cm, kemudian digambar ulang 2 kali lebih besar (jarak peta baru menjadi 20 cm).<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> untuk setiap pernyataan berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Skala peta sebelum digambar ulang adalah 1 : 500.000.',
      'B. Jarak pada peta Sleman dan Gunungkidul setelah digambar ulang adalah 20 cm.',
      'C. Skala peta setelah digambar ulang adalah 1 : 250.000.'
    ],
    matrixCorrectAnswers: [0, 0, 0],
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Skala awal = 10 cm : 5.000.000 cm = 1 : 500.000. Digambar 2x lebih besar → jarak peta = 20 cm. Skala baru = 20 : 5.000.000 = 1 : 250.000. Ketiga pernyataan Benar.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-11',
    text: 'Di sebuah jalan terdapat 25 lampu penerangan pada salah satu sisi jalan. Jarak tanam antar tiang 50 meter. Tiang pertama dan terakhir ditanam jarak 30 meter dari ujung jalan. Panjang jalan tersebut adalah ....',
    options: ['1,28 km', '1,26 km', '1,25 km', '1,23 km'],
    correctAnswer: 1,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Interval antar 25 tiang = 24 interval × 50 m = 1.200 m. Jarak ke kedua ujung jalan = 30 + 30 = 60 m. Panjang jalan = 1.200 + 60 = 1.260 m = 1,26 km.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-12',
    text: 'Seorang pedagang memiliki 180 liter minyak goreng. Dikemas ke 20 jeriken berkapasitas 5.000 ml (5 Liter) dan selebihnya jeriken berkapasitas 2 dm³ (2 Liter). Banyaknya jeriken yang dibutuhkan seluruhnya adalah ....',
    options: ['18 buah', '25 buah', '40 buah', '60 buah'],
    correctAnswer: 3,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Volume di 20 jeriken 5L = 20 × 5 = 100 Liter. Sisa minyak = 180 - 100 = 80 Liter. Jeriken 2L yang dibutuhkan = 80 : 2 = 40 jeriken. Total jeriken = 20 + 40 = 60 buah.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-13',
    text: 'Di timbangan terdapat anak timbangan: 2 buah @ 1 kg, 3 buah @ 200 gr, dan 3 buah @ 50 gr. Berat total mangga berdasarkan gambar timbangan tersebut adalah ....',
    options: ['752 gr', '950 gr', '2.700 gr', '2.750 gr'],
    correctAnswer: 3,
    category: 'Matematika',
    difficulty: 'easy',
    explanation: 'Berat total = (2 × 1.000 gr) + (3 × 200 gr) + (3 × 50 gr) = 2.000 + 600 + 150 = 2.750 gram.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-14',
    text: 'Catatan waktu Satya adalah 1 jam 9 menit 30 detik. Adit berlari 192 detik lebih lambat daripada Satya. Catatan waktu Adit adalah ....',
    options: [
      '1 jam 6 menit 18 detik',
      '1 jam 6 menit 32 detik',
      '1 jam 12 menit 42 detik',
      '1 jam 12 menit 52 detik'
    ],
    correctAnswer: 2,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: '192 detik = 3 menit 12 detik. Waktu Adit = 1 jam 9 menit 30 detik + 3 menit 12 detik = 1 jam 12 menit 42 detik.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-15',
    text: 'Jarak rumah Rudi ke lapangan 1,8 km dan rumah Beni ke lapangan 1,2 km. Rudi berangkat pukul 06.00 dengan kecepatan 9 km/jam. Beni berangkat 4 menit setelah Rudi. Agar sampai bersamaan dengan Rudi, kecepatan rata-rata Beni adalah ....',
    options: ['4,5 km/jam', '6 km/jam', '8 km/jam', '9 km/jam'],
    correctAnswer: 3,
    category: 'Matematika',
    difficulty: 'hard',
    explanation: 'Waktu tempuh Rudi = 1,8 / 9 = 0,2 jam = 12 menit (sampai 06.12). Beni berangkat 06.04, waktu tempuh Beni = 12 - 4 = 8 menit = 2/15 jam. Kecepatan Beni = 1,2 / (2/15) = 9 km/jam.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-16',
    type: 'matrix_true_false',
    text: 'Saskia mengukur sudut layang-layang PQRS. Pengukuran menunjukkan sudut PQR = 80° dan sudut QRS = 70°.<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> untuk setiap pernyataan berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Besar sudut PSR adalah 105°.',
      'B. Besar sudut SPQ adalah 105°.',
      'C. Jumlah sudut PQR dan sudut QRS adalah 150°.'
    ],
    matrixCorrectAnswers: [0, 0, 0],
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Jumlah sudut layang-layang = 360°. Sudut berhadapan SPQ = PSR = (360° - 80° - 70°) / 2 = 105°. Jumlah PQR + QRS = 80° + 70° = 150°. Ketiga pernyataan Benar.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-17',
    text: 'Ciri-ciri bangun datar: I. Memiliki empat sisi sama panjang. II. Memiliki dua pasang sisi sama panjang. III. Memiliki sepasang sudut berhadapan sama besar. IV. Kedua diagonal berpotongan tidak tegak lurus. V. Salah satu diagonal membagi diagonal lain sama panjang.<br/><br/>Yang merupakan ciri-ciri layang-layang adalah ....',
    options: ['I, II, dan III', 'I, II, dan IV', 'II, III, dan IV', 'II, III, dan V'],
    correctAnswer: 3,
    category: 'Matematika',
    difficulty: 'easy',
    explanation: 'Layang-layang memiliki dua pasang sisi sama panjang (II), sepasang sudut berhadapan sama besar (III), dan salah satu diagonal membagi diagonal lain menjadi dua bagian sama panjang (V).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-18',
    text: 'Pak Hadi memiliki kebun berbentuk segi banyak bertingkat dengan keliling total 100 meter. Di sekeliling kebun diberi tiang pancang pagar dengan jarak antar tiang 2 meter. Banyak tiang ada ....',
    options: ['40 buah', '41 buah', '50 buah', '51 buah'],
    correctAnswer: 2,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Banyak tiang pancang pada kurva tertutup = Keliling : Jarak tiang = 100 : 2 = 50 buah.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-19',
    type: 'matrix_true_false',
    text: 'Nadia membuat bingkai foto dari karton. Ukuran foto 30 cm × 25 cm. Memberi jarak 5 cm di setiap sisi antara foto dan tepi bingkai. Bagian tepi luar dihias pita.<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> untuk setiap pernyataan berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Luas kertas karton paling sedikit yang diperlukan Nadia adalah 1.400 cm².',
      'B. Pita yang dibutuhkan Nadia untuk menghias tepi luar bingkai sepanjang 150 cm.',
      'C. Selisih luas bingkai dan luas foto adalah 650 cm².'
    ],
    matrixCorrectAnswers: [0, 0, 0],
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Ukuran bingkai luar = (30+10) × (25+10) = 40 cm × 35 cm. Luas bingkai = 1.400 cm². Keliling luar bingkai = 2 × (40+35) = 150 cm. Selisih luas = 1.400 - 750 = 650 cm². Ketiga pernyataan Benar.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-20',
    text: 'Pak Jukri mempunyai tanah berbentuk jajaran genjang dengan panjang alas 36 m dan tinggi 24 m. Luas tanah Pak Jukri adalah ....',
    options: ['432 m²', '624 m²', '864 m²', '936 m²'],
    correctAnswer: 2,
    category: 'Matematika',
    difficulty: 'easy',
    explanation: 'Luas jajaran genjang = alas × tinggi = 36 m × 24 m = 864 m².',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-21',
    type: 'matrix_true_false',
    text: 'Pak Harun merancang pekarangan lebar 19 m: Bangunan 190 m², Halaman 81 m² (persegi 9m×9m), serta Taman dan Kolam sama luas.<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> untuk setiap pernyataan berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Luas kolam dan halaman adalah 126 m².',
      'B. Luas taman adalah 45 m².',
      'C. Luas seluruh tanah pekarangan Pak Harun adalah 361 m².'
    ],
    matrixCorrectAnswers: [0, 0, 0],
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Luas taman = luas kolam = 45 m². Luas kolam + halaman = 45 + 81 = 126 m². Luas seluruh pekarangan = 190 + 81 + 45 + 45 = 361 m². Ketiga pernyataan Benar.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-22',
    text: 'Perhatikan jaring-jaring kubus bertuliskan "TPM 1", "DINAS PENDIDIKAN", "T", "K", "A", "KOTA YOGYAKARTA". Bentuk kubus yang sesuai saat dilipat adalah ....',
    options: [
      'Kubus A (Sisi atas A, depan KOTA YOGYAKARTA, kanan DINAS PENDIDIKAN)',
      'Kubus B (Sisi atas A, depan KOTA YOGYAKARTA, kanan TPM 1)',
      'Kubus C (Sisi atas A, depan KOTA YOGYAKARTA, kanan K)',
      'Kubus D (Sisi atas A, depan KOTA YOGYAKARTA, kanan T)'
    ],
    correctAnswer: 1,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Saat jaring-jaring dilipat dengan sisi A di atas dan KOTA YOGYAKARTA di depan, maka sisi samping kanan adalah TPM 1.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-23',
    type: 'matrix_true_false',
    text: 'Rendi menemukan kardus besar berisi susunan kardus-kardus kecil.<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> untuk setiap pernyataan berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Di dalam kardus besar terdapat 19 kardus kecil.',
      'B. Tinggi kardus besar sama dengan 3 kardus kecil.',
      'C. Susunan kardus kecil jika dilihat dari atas berbentuk tangga/L.'
    ],
    matrixCorrectAnswers: [0, 0, 0],
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Total kardus kecil = 12 (bawah) + 5 (tengah) + 2 (atas) = 19 kardus. Tinggi susunan = 3 kardus. Tampak atas berbentuk siku-siku/L. Ketiga pernyataan Benar.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-24',
    text: 'Pak Bima menguras akuarium berbentuk kubus dengan rusuk 9 dm. Akuarium diisi air 2/3 bagian penuh dengan ember berkapasitas 18 Liter. Banyak ember air yang diperlukan adalah ....',
    options: ['13 ember', '24 ember', '27 ember', '40 ember'],
    correctAnswer: 2,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Volume akuarium = 9³ = 729 Liter. Air yang diisi = 2/3 × 729 = 486 Liter. Banyak ember = 486 : 18 = 27 ember.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-25',
    type: 'matrix_true_false',
    text: 'Bangun gabungan balok (36 cm × 12 cm × 12 cm) dan kubus (rusuk 12 cm) di atasnya.<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> untuk setiap pernyataan berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Volume balok pada gambar adalah 5.184 cm³.',
      'B. Volume balok tiga kali volume kubus.',
      'C. Volume bangun ruang gabungan adalah 6.912 cm³.'
    ],
    matrixCorrectAnswers: [0, 0, 0],
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Volume kubus = 12³ = 1.728 cm³. Volume balok = 36 × 12 × 12 = 5.184 cm³. V_balok = 3 × V_kubus. V_gabungan = 5.184 + 1.728 = 6.912 cm³. Ketiga pernyataan Benar.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-26',
    text: 'Daftar nilai matematika siswa Kelas VI: 85, 100, 85, 80, 90, 95, 85, 75, 75, 80, 70, 85, 95, 75, 85, 100, 90, 85, 80, 90, 70, 85, 80, 70.<br/><br/>Tabel frekuensi yang tepat berdasarkan data tersebut adalah ....',
    options: [
      'Nilai 70: 3, 75: 3, 80: 5, 85: 7, 90: 4, 95: 2, 100: 2',
      'Nilai 70: 3, 75: 3, 80: 4, 85: 6, 90: 3, 95: 2, 100: 1',
      'Nilai 70: 3, 75: 3, 80: 4, 85: 7, 90: 3, 95: 2, 100: 2',
      'Nilai 70: 3, 75: 3, 80: 4, 85: 7, 90: 4, 95: 2, 100: 2'
    ],
    correctAnswer: 3,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Frekuensi nilai: 70 ada 3 siswa, 75 ada 3 siswa, 80 ada 4 siswa, 85 ada 7 siswa, 90 ada 4 siswa, 95 ada 2 siswa, 100 ada 2 siswa. Opsi D tepat.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-27',
    text: 'Hasil penghitungan suara sah pemilihan ketua kelas 20 siswa: Galang (6 suara), Ayu (5 suara), Ilham (5 suara), Andi (4 suara). Ketua kelas yang terpilih adalah ....',
    options: ['Galang', 'Ilham', 'Andi', 'Ayu'],
    correctAnswer: 0,
    category: 'Matematika',
    difficulty: 'easy',
    explanation: 'Galang memperoleh suara terbanyak yaitu 6 suara, sehingga Galang terpilih menjadi ketua kelas.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-28',
    text: 'Bu Siti menargetkan rata-rata 20 potong baju/hari selama 6 hari (Total 120 potong). Hasil 5 hari: Senin 18, Selasa 16, Rabu 25, Kamis 21, Jumat 30. Agar mencapai target, pada hari Sabtu Bu Siti harus menjahit minimal ....',
    options: ['24 potong', '22 potong', '18 potong', '10 potong'],
    correctAnswer: 3,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Total target 6 hari = 20 × 6 = 120 potong. Total 5 hari = 18 + 16 + 25 + 21 + 30 = 110 potong. Kekurangan hari Sabtu = 120 - 110 = 10 potong.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-29',
    type: 'matrix_true_false',
    text: 'Piktogram penerimaan siswa SD Ceria (1 gambar = 2 siswa): Tahun 2019/2020 ada 7 L dan 7 P (28 siswa). Total seluruh siswa piktogram = 168 siswa.<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> untuk setiap pernyataan berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Jumlah siswa pada tahun 2019/2020 adalah 28 siswa.',
      'B. Jumlah seluruh siswa SD Ceria pada piktogram adalah 168 siswa.',
      'C. Dari data 2019/2020 sampai 2024/2025, banyak siswa laki-laki 2 kurangnya dari siswa perempuan.'
    ],
    matrixCorrectAnswers: [0, 0, 0],
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Tahun 2019/2020 = (7+7) × 2 = 28 siswa. Total seluruh piktogram = 168 siswa. Ketiga pernyataan Benar.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-mat-30',
    type: 'matrix_true_false',
    text: 'Diagram batang data siswa SD Persahabatan: Kelas I (10 L, 15 P), Kelas II (12 L, 15 P), Kelas III (12 L, 8 P), Kelas IV (14 L, 14 P), Kelas V (10 L, 12 P), Kelas VI (14 L, 12 P).<br/><br/>Tentukan <b>Benar</b> atau <b>Salah</b> untuk mepernyataan berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Jumlah seluruh siswa SD Persahabatan adalah 148 siswa.',
      'B. Jumlah siswa perempuan (76 siswa) lebih banyak dari siswa laki-laki (72 siswa).',
      'C. Siswa terbanyak ada di Kelas II dan IV, sedangkan siswa paling sedikit di Kelas III.'
    ],
    matrixCorrectAnswers: [0, 0, 0],
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Total siswa = 25+27+20+28+22+26 = 148. Total Perempuan = 76, Laki-laki = 72. Siswa terbanyak kelas II & IV (27 & 28), terbanyak kedua/paling sedikit kelas III (20). Ketiga pernyataan Benar.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },

  // ==========================================
  // SOAL PAKET 1 TPM 1 TKA 2025 BAHASA INDONESIA SD (30 SOAL LENGKAP)
  // ==========================================
  {
    id: 'q-sd-bind-1',
    text: 'Pak satpam berkeliling sekolah untuk memastikan lingkungan tetap aman dan tertib. Ia melihat siswa kelas VI sedang berlatih baris-berbaris di lapangan. Siswa kelas V sedang berlatih drama untuk pentas seni di aula. Di perpustakaan, beberapa siswa kelas IV membaca buku ensiklopedia dan dongeng. Sementara itu, ada seorang siswa sedang berbaring di ruang UKS.<br/><br/><b>Kosakata apa yang berkaitan dengan gudang ilmu pengetahuan pada teks tersebut?</b>',
    options: ['Lapangan', 'Ruang UKS', 'Aula Sekolah', 'Perpustakaan'],
    correctAnswer: 3,
    category: 'Bahasa Indonesia',
    difficulty: 'easy',
    explanation: 'Perpustakaan sering dijuluki sebagai gudang ilmu pengetahuan karena menyimpan berbagai koleksi buku bacaan, ensiklopedia, dan sumber pengetahuan.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-2',
    text: 'Para penumpang datang dan pergi membawa koper besar. Tiket dan barang bawaan penumpang akan diperiksa oleh petugas berseragam. Di ruang tunggu, mereka duduk sambil menatap layar informasi keberangkatan. Suara pengumuman terdengar bergantian memberi tahu jadwal kedatangan dan keberangkatan. Dari jendela besar, tampak kendaraan bersayap siap membawa penumpang.<br/><br/><b>Di manakah latar tempat kejadian berdasarkan teks tersebut?</b>',
    options: ['stasiun', 'bandara', 'terminal', 'pelabuhan'],
    correctAnswer: 1,
    category: 'Bahasa Indonesia',
    difficulty: 'easy',
    explanation: 'Kata kunci "koper besar", "pemeriksaan barang bawaan", "layar informasi keberangkatan", dan "kendaraan bersayap" (pesawat terbang) menunjukkan latar tempat di bandara.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-3',
    type: 'matrix_true_false',
    text: '<b>Bacalah penggalan pidato berikut!</b><br/>"Anak-anak, teknologi adalah sahabat kita jika digunakan dengan bijak. Kita dapat mencari informasi, belajar lebih cepat, dan mudah berkomunikasi melalui internet. Jika digunakan untuk bermain, teknologi justru membuat kita lalai. Untuk itu, mari gunakan teknologi untuk hal-hal yang bermanfaat!"<br/><br/><b>Manakah tanggapan yang sesuai dengan paragraf tersebut?</b><br/>Tentukan <b>Sesuai</b> atau <b>Tidak Sesuai</b> untuk setiap tanggapan!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Sesuai', 'Tidak Sesuai'],
    matrixRows: [
      'Tanggapan (1): Pidato memuat sisi positif teknologi yang dikaitkan dengan belajar dan komunikasi.',
      'Tanggapan (2): Pidato ini menekankan bahwa teknologi sebaiknya digunakan terus-menerus agar tidak ketinggalan zaman.',
      'Tanggapan (3): Pidato ini menekankan pentingnya penggunaan teknologi secara bijak.'
    ],
    matrixCorrectAnswers: [0, 1, 0],
    category: 'Bahasa Indonesia',
    difficulty: 'medium',
    explanation: 'Tanggapan (1) dan (3) sesuai dengan isi pidato yang menekankan manfaat belajar/komunikasi serta bijak menggunakan teknologi. Tanggapan (2) tidak sesuai.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-4',
    type: 'matrix_true_false',
    text: '<b>Bacalah teks laporan berikut!</b><br/>Kami mengamati sawah yang terletak di dekat SD Mutu. Kondisi tanahnya lembap karena mendapatkan aliran air dari irigasi. Padi tumbuh subur dan menghasilkan bulir yang bernas. Berdasarkan wawancara, sawah tersebut juga menjadi lumbung emas desa bagi masyarakat sekitar.<br/><br/><b>Manakah penggunaan kosakata khusus/terkait pertanian yang tepat? Tentukan Benar atau Salah!</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'Irigasi (istilah khusus sistem pengairan sawah)',
      'Padi (istilah khusus tanaman pangan penghasil beras)',
      'Masyarakat (kosakata umum untuk himpunan warga)'
    ],
    matrixCorrectAnswers: [0, 0, 1],
    category: 'Bahasa Indonesia',
    difficulty: 'medium',
    explanation: 'Irigasi dan Padi adalah kosakata khusus bidang pertanian. Masyarakat merupakan kosakata umum.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-5',
    type: 'matrix_true_false',
    text: '<b>Bacalah teks laporan berikut!</b><br/>Kami mengamati sawah yang terletak di dekat SD Mutu. Kondisi tanahnya lembap karena mendapatkan aliran air dari irigasi. Padi tumbuh subur dan menghasilkan bulir yang bernas. Berdasarkan wawancara, sawah tersebut juga menjadi lumbung emas desa bagi masyarakat sekitar.<br/><br/><b>Apa makna ungkapan "lumbung emas desa" berdasarkan teks tersebut?</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Sesuai Makna', 'Tidak Sesuai'],
    matrixRows: [
      'sumber penghasilan masyarakat',
      'pusat pengelolaan makanan pokok',
      'tumpuan kesejahteraan masyarakat'
    ],
    matrixCorrectAnswers: [0, 1, 0],
    category: 'Bahasa Indonesia',
    difficulty: 'medium',
    explanation: 'Sawah sebagai "lumbung emas desa" bermakna kiasan sumber penghasilan dan tumpuan kesejahteraan hidup warga desa.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-6',
    type: 'matrix_true_false',
    text: '<b>Bacalah penggalan teks pidato berikut!</b><br/>Halo, teman-teman! Saya merasa bangga melihat antusiasme kalian menyambut "Pekan Olahraga Sekolah" tahun ini. Ingatlah, olahraga bukan hanya tentang menang atau kalah. Tapi, sportivitas juga harus tetap terjaga. Kobarkan api kita, jangan biarkan padam! Selamat berolahraga, selamat bersenang-senang!<br/><br/>Tiga murid berpendapat:<br/>- <b>Ani</b>: "Wah, hebat! Aku harus latihan lebih giat supaya bisa menang lomba lari. Aku sudah semangat sekali!"<br/>- <b>Rio</b>: "Aku takut jatuh saat lomba. Aku tidak mau ikut. Pidato itu membuatku khawatir."<br/>- <b>Danu</b>: "Apa aku harus ikut semua lomba? Aku tidak suka berolahraga."<br/><br/><b>Manakah penjelasan yang tepat menggambarkan perasaan semangat setelah membaca penggalan pidato tersebut?</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Sesuai', 'Tidak Sesuai'],
    matrixRows: [
      'Ani karena pidato tersebut memotivasinya untuk berlatih lebih giat.',
      'Rio karena tidak semua orang termotivasi oleh pidato yang sama.',
      'Danu karena pidato tersebut memicu perasaan tidak suka pada olahraga.'
    ],
    matrixCorrectAnswers: [0, 1, 1],
    category: 'Bahasa Indonesia',
    difficulty: 'medium',
    explanation: 'Hanya pendapat Ani yang secara tepat menggambarkan rasa semangat dan motivasi tinggi berolahraga.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-7',
    type: 'matrix_true_false',
    text: '<b>Bacalah teks surat pribadi berikut!</b><br/>Bandung, 10 September 2025<br/>Untuk Kakek, di Bali<br/><br/>Halo, Kek! Apa kabar? Semoga Kakek selalu sehat. Aku dan Ayah sedang berlibur ke Bandung. Di sini cuacanya sangat sejuk. Kami mengunjungi banyak tempat wisata. Kemarin, kami mengunjungi Gunung Tangkuban Parahu. Setelah itu, kami kulineran mencari makanan yang terkenal di Lembang. Saat malam, kami menghangatkan diri dengan minum bandrek. Oh ya, Kakek tidak perlu khawatir, kami selalu menggunakan pakaian tebal agar tidak kedinginan.<br/>Salam rindu, Rani<br/><br/><b>Berdasarkan teks surat tersebut, tentukan jenis kosakata berikut!</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Kosakata Umum', 'Kosakata Khusus'],
    matrixRows: [
      'bandrek (nama minuman tradisional khas Sunda)',
      'makanan (kata umum bahan pangan)',
      'pakaian (kata umum perlengkapan tubuh)'
    ],
    matrixCorrectAnswers: [1, 0, 0],
    category: 'Bahasa Indonesia',
    difficulty: 'easy',
    explanation: 'Makanan dan pakaian adalah kosakata umum. Bandrek adalah kosakata khusus minuman tradisional penghangat tubuh.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-8',
    type: 'matrix_true_false',
    text: '<b>Bacalah penggalan pidato berikut!</b><br/>"Halo, teman-teman! Saya merasa bangga melihat antusiasme kalian menyambut Pekan Olahraga Sekolah tahun ini. Ingatlah, olahraga bukan hanya tentang menang atau kalah. Tapi, sportivitas juga harus tetap terjaga. <b>Kobarkan api kita, jangan biarkan padam!</b> Selamat berolahraga, selamat bersenang-senang!"<br/><br/><b>Manakah makna yang sesuai dengan ungkapan bercetak tebal?</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Sesuai Makna', 'Tidak Sesuai'],
    matrixRows: [
      'Menumbuhkan semangat agar tetap berjuang.',
      'Menjaga kekompakan dan kerja sama tim.',
      'Tetap mempertahankan semangat juang.'
    ],
    matrixCorrectAnswers: [0, 1, 0],
    category: 'Bahasa Indonesia',
    difficulty: 'medium',
    explanation: 'Ungkapan kiasan "Kobarkan api kita, jangan biarkan padam" bermakna menumbuhkan dan terus mempertahankan semangat juang.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-9',
    type: 'matrix_true_false',
    text: '<b>Bacalah teks berikut!</b><br/><b>Embun</b><br/>Embun adalah tetesan air kecil yang menempel di permukaan benda. Fenomena ini biasanya muncul pada pagi hari di daun, rumput, atau permukaan tanah. Embun terbentuk secara alami di lingkungan sekitar kita.<br/>Pembentukan embun dimulai ketika udara mendingin pada malam hari. Saat suhu turun, uap air di udara kehilangan panas dan berubah menjadi titik-titik air. Proses ini disebut kondensasi. Titik-titik air tersebut menempel pada daun atau benda lain di permukaan tanah dan tampak jelas pada pagi hari. Embun akan menguap kembali ke udara setelah terkena panas matahari.<br/><br/><b>Fenomena manakah yang sesuai dengan teks tersebut?</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Sesuai Teks', 'Tidak Sesuai'],
    matrixRows: [
      'Embun terjadi karena perubahan suhu udara di malam hari.',
      'Embun terbentuk karena air yang menguap ke udara.',
      'Embun muncul pada permukaan daun dan tanah.'
    ],
    matrixCorrectAnswers: [0, 1, 0],
    category: 'Bahasa Indonesia',
    difficulty: 'medium',
    explanation: 'Embun terjadi saat suhu mendingin di malam hari dan menempel di permukaan daun/tanah. Embun terbentuk dari kondensasi uap air udara, bukan dari air yang menguap.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-10',
    text: '<b>Bacalah penggalan teks pidato berikut!</b><br/>"Halo, teman-teman! Saya merasa bangga melihat antusiasme kalian menyambut Pekan Olahraga Sekolah tahun ini. Ingatlah, olahraga bukan hanya tentang menang atau kalah. Tapi, sportivitas juga harus tetap terjaga. Kobarkan api kita, jangan biarkan padam!"<br/><br/><b>Perhatikan pendapat Dini dan Dira berikut!</b><br/>- <b>Dini</b>: "Saya setuju dengan pidato itu. Dalam olahraga yang penting adalah kerja sama dan semangat."<br/>- <b>Dira</b>: "Kalau saya tidak sependapat. Menurut saya, yang terpenting adalah menang dalam setiap pertandingan."<br/><br/><b>Mengapa pendapat Dini sesuai berdasarkan teks pidato tersebut dibandingkan Dira?</b>',
    options: [
      'Dini ingin semua pertandingan dimenangkan dengan semangat tinggi.',
      'Dira lebih mementingkan kemenangan dibandingkan sportivitas.',
      'Dira menjelaskan bahwa menang adalah tujuan utama olahraga.',
      'Dini menekankan semangat dan sportivitas seperti isi pidato.'
    ],
    correctAnswer: 3,
    category: 'Bahasa Indonesia',
    difficulty: 'easy',
    explanation: 'Pendapat Dini menekankan nilai semangat dan sportivitas yang sejalan dengan amanat pidato pembina.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-11',
    type: 'matrix_true_false',
    text: '<b>Bacalah cerita berikut!</b><br/><b>Pensil yang Hilang</b><br/>Suatu pagi, Dito melihat sebuah pensil tergeletak di bawah mejanya. Ia kemudian mengambilnya. Pensil itu baru, ujungnya masih tumpul. Pada bagian samping, tertulis jelas nama "Kamal".<br/>Dito sempat berpikir untuk menyimpannya. Namun, hatinya terasa tidak tenang. Ia teringat pesan guru untuk mengembalikan barang yang bukan miliknya. Hatinya pun mantap untuk melakukan hal yang benar.<br/>Dito segera menghampiri Kamal dan menyerahkan pensil tersebut. Kamal tampak lega dan berterima kasih dengan tulus. Guru yang melihat kejadian itu memuji kejujuran Dito. Hati Dito terasa lega karena telah berbuat benar.<br/><br/><b>Peristiwa apa dalam kehidupan sehari-hari yang sama dengan cerita kejujuran tersebut?</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Sesuai Teladan Kejujuran', 'Tidak Sesuai'],
    matrixRows: [
      'Lisa mengaku kepada Ibu bahwa dia telah menjatuhkan gelas.',
      'Rinaldi mengembalikan buku cerita yang dipinjamnya.',
      'Jamal membantu ketua kelas membagikan hasil ujian.'
    ],
    matrixCorrectAnswers: [0, 0, 1],
    category: 'Bahasa Indonesia',
    difficulty: 'medium',
    explanation: 'Sikap Lisa (mengaku/jujur) dan Rinaldi (bertanggung jawab mengembalikan barang) mencerminkan kejujuran yang sama dengan Dito.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-12',
    type: 'matrix_true_false',
    text: '<b>Perhatikan laporan pengamatan berikut!</b><br/>Pada tanggal 15 September 2025, siswa kelas V SD Melati melakukan pengamatan pada tanaman pucuk merah. Tanaman memiliki batang berkayu tumbuh tegak. Daun berbentuk oval dengan ujung lancip (muda berwarna merah cerah, tua berubah hijau). Bunga berukuran kecil warna putih kekuningan. Buah berbentuk bulat agak pipih (masak berwarna hitam mengkilap).<br/><br/><b>Apa saja informasi yang ditemukan berdasarkan teks tersebut?</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Sesuai Teks', 'Tidak Sesuai'],
    matrixRows: [
      'Daun pucuk merah berwarna merah cerah dan berubah warna jika sudah tua.',
      'Pucuk merah memiliki bunga berukuran kecil dengan warna putih kekuningan.',
      'Buah pucuk merah yang masih muda berbentuk bulat sempurna dengan warna hitam mengkilap.'
    ],
    matrixCorrectAnswers: [0, 0, 1],
    category: 'Bahasa Indonesia',
    difficulty: 'medium',
    explanation: 'Pernyataan 1 dan 2 sesuai teks. Pernyataan 3 salah karena buah yang berwarna hitam mengkilap adalah buah yang sudah masak, bukan buah muda.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-13',
    text: '<b>Bacalah teks "Embun":</b><br/>- Paragraf 1: Pengertian dan gambaran embun secara umum.<br/>- Paragraf 2: Tahapan dan proses terbentuknya embun (kondensasi).<br/>- Paragraf 3: Peran penting dan manfaat embun bagi tumbuhan.<br/><br/><b>Bagan susunan informasi mana yang tepat sesuai urutan paragraf teks tersebut?</b>',
    options: [
      'Pengertian embun -> Proses terbentuknya embun -> Peran penting embun',
      'Pengertian embun -> Tahapan terjadinya embun -> Manfaat embun',
      'Fenomena embun -> Proses terbentuknya embun -> Peran penting embun',
      'Fenomena embun -> Tahapan terjadinya embun -> Manfaat embun'
    ],
    correctAnswer: 0,
    category: 'Bahasa Indonesia',
    difficulty: 'easy',
    explanation: 'Bagan A merepresentasikan inti tiap paragraf secara tepat: Pengertian (P1), Proses Terbentuknya (P2), dan Peran Penting (P3).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-14',
    text: '<b>Bacalah penggalan pidato berikut!</b><br/>"Anak-anak, teknologi adalah sahabat kita jika digunakan dengan bijak. Kita dapat mencari informasi, belajar lebih cepat, dan mudah berkomunikasi melalui internet. Jika digunakan untuk bermain, teknologi justru membuat kita lalai. Untuk itu, mari gunakan teknologi untuk hal-hal yang bermanfaat!"<br/><br/><b>Peristiwa apa yang terjadi pada teks pidato tersebut?</b>',
    options: [
      'Guru memberikan nasihat agar siswa menggunakan teknologi dengan bijak.',
      'Siswa sedang belajar cara menggunakan komputer di laboratorium.',
      'Kepala sekolah menegur siswa yang bermain gawai saat pelajaran.',
      'Orang tua sedang melarang anaknya bermain gim terlalu lama.'
    ],
    correctAnswer: 0,
    category: 'Bahasa Indonesia',
    difficulty: 'easy',
    explanation: 'Peristiwa dalam pidato adalah guru/pembina sedang memberikan arahan dan nasihat bijak berteknologi kepada anak-anak siswa.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-15',
    type: 'matrix_true_false',
    text: '<b>Bacalah teks berikut!</b><br/>Banjir dapat terjadi karena saluran air yang tersumbat oleh sampah. Aktivitas warga seperti membuang sampah ke selokan dapat mendatangkan malapetaka. Sampah yang menumpuk menghalangi aliran air sehingga air tidak dapat mengalir dengan lancar. Ketika hujan deras turun, air meluap dan menyebabkan banjir di sekitar permukiman.<br/><br/><b>Apa amanat yang kamu dapatkan berdasarkan teks tersebut?</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Sesuai Amanat', 'Tidak Sesuai'],
    matrixRows: [
      'Kita harus sadar bahwa sampah dapat menimbulkan bencana.',
      'Menjaga kebersihan selokan adalah tanggung jawab bersama.',
      'Kita sebaiknya membuat selokan yang besar agar aliran lancar.'
    ],
    matrixCorrectAnswers: [0, 0, 1],
    category: 'Bahasa Indonesia',
    difficulty: 'medium',
    explanation: 'Amanat utama teks berisi imbauan agar sadar bahaya sampah dan bersama-sama menjaga kebersihan selokan.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-16',
    text: 'Air jernih memenuhi cetakan es berbentuk kotak. Permukaannya tenang dan mudah bergoyang saat wadah digerakkan. Setelah dimasukkan ke dalam freezer, perlahan air itu berubah. Beberapa jam kemudian, air itu mengeras. Air berubah wujud menjadi es batu yang padat dan keras.<br/><br/><b>Peristiwa apa dalam kehidupan sehari-hari yang sesuai dengan wujud perubahan benda pada bacaan tersebut (membeku)?</b>',
    options: [
      'Fafa meletakkan es krim di atas meja selama 10 menit.',
      'Danu memasukkan gula ke dalam gelas berisi air panas.',
      'Julia melelehkan cokelat menggunakan air yang mendidih.',
      'Vio membuat agar-agar kemudian menyimpannya di kulkas.'
    ],
    correctAnswer: 3,
    category: 'Bahasa Indonesia',
    difficulty: 'easy',
    explanation: 'Pembuatan agar-agar lalu didinginkan di kulkas hingga memadat/mengeras adalah contoh perubahan wujud cair menjadi padat (membeku).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-17',
    text: '<b>Bacalah puisi berikut!</b><br/><i>Rintik hujan jatuh perlahan<br/>Membasahi bumi yang gersang<br/>Tumbuhan menghijau kembali<br/>Membawa harapan bagi petani</i><br/><br/><b>Manakah yang menggambarkan isi puisi tersebut?</b>',
    options: [
      'Berbagai tanaman mulai menghijau di musim kemarau panjang.',
      'Petani segera menyiapkan lahannya setelah musim hujan tiba.',
      'Turunnya hujan membuat bumi kembali menjadi subur.',
      'Petani merasa bahagia karena sawahnya siap dipanen.'
    ],
    correctAnswer: 2,
    category: 'Bahasa Indonesia',
    difficulty: 'easy',
    explanation: 'Puisi menguraikan turunnya rintik hujan yang membasahi bumi gersang sehingga subur kembali dan tumbuhan menghijau.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-18',
    text: '<b>Perhatikan teks hasil pengamatan berikut!</b><br/>Pada hari Selasa, siswa kelas VI melakukan pengamatan di kolam sekolah. Di kolam terdapat ikan nila, ikan mas, dan beberapa tanaman air seperti teratai. Air kolam tampak jernih sehingga ikan terlihat jelas. Dua siswa terlihat sedang memberi makan ikan sesuai jadwal yang telah ditentukan. Menurut penjaga sekolah, kolam harus dijaga kebersihannya agar ikan tetap sehat.<br/><br/><b>Informasi apa yang terdapat dalam teks tersebut?</b>',
    options: [
      'Siswa kelas VI sedang memberi pakan ikan di kolam sekolah.',
      'Ikan nila dan ikan mas dipelihara di kolam sekolah.',
      'Penjaga sekolah mengamati ikan dan tanaman air.',
      'Air kolam kotor sehingga ikan sulit terlihat.'
    ],
    correctAnswer: 1,
    category: 'Bahasa Indonesia',
    difficulty: 'easy',
    explanation: 'Informasi fakta tersurat pada teks adalah adanya ikan nila dan ikan mas yang dipelihara di kolam sekolah.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-19',
    type: 'matrix_true_false',
    text: '<b>Bacalah cerita "Singa dan Tikus":</b><br/>Singa membebaskan Tikus. Suatu hari Singa terjerat jaring pemburu dan meraung minta tolong. Tikus menghampiri lalu menggigit tali jaring hingga putus sehingga Singa selamat. Singa berterima kasih, menyesal telah meremehkan hewan kecil, dan berjanji menghargai semua makhluk.<br/><br/><b>Apa nilai moral positif tokoh Singa berdasarkan cerita tersebut?</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Sesuai Nilai Moral', 'Tidak Sesuai'],
    matrixRows: [
      'Berterima kasih atas pertolongan teman.',
      'Tidak meremehkan makhluk yang lebih kecil.',
      'Menyadari kesalahannya dan menghargai semua makhluk.'
    ],
    matrixCorrectAnswers: [0, 0, 0],
    category: 'Bahasa Indonesia',
    difficulty: 'medium',
    explanation: 'Ketiga sikap tokoh Singa di akhir cerita memuat pesan moral dan keteladanan yang positif.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-20',
    text: '<b>Teks Wacana Banjir dan Sampah Selokan</b><br/>Pendapat Warga:<br/>- <b>Warga A</b>: "Kalau selokan tersumbat, air memang tidak bisa mengalir... Aku harap pemerintah segera memperbaiki."<br/>- <b>Warga B</b>: "Seharusnya aku tidak membuang sampah ke selokan. Mulai sekarang, aku akan membuang sampah pada tempatnya."<br/><br/><b>Pendapat siapa yang tepat untuk menggambarkan suasana menyesal yang muncul setelah membaca teks bacaan tersebut?</b>',
    options: [
      'Warga A, karena ia berharap pemerintah segera memperbaiki saluran air.',
      'Warga B, karena ia menyadari kesalahannya membuang sampah ke selokan.',
      'Warga A, karena ia mengingatkan bahaya jika air tidak mengalir.',
      'Warga B, karena ia khawatir banjir bisa semakin parah dan merugikan warga.'
    ],
    correctAnswer: 1,
    category: 'Bahasa Indonesia',
    difficulty: 'easy',
    explanation: 'Warga B mengekspresikan penyesalan atas tindakan masa lalu dan berkomitmen membuang sampah pada tempatnya.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-21',
    text: '<b>Petunjuk pembuatan kandang jangkrik:</b><br/>(1) Tentukan ukuran kandang sesuai banyaknya jangkrik!<br/>(2) Siapkan bambu lalu potong sesuai ukuran!<br/>(3) Rangkai potongan bambu untuk membuat kerangka kandang!<br/>(4) Pasang dinding kandang dari bilah bambu agar jangkrik tidak keluar!<br/>(5) Tutup bagian atas kandang dengan kaca bening!<br/>(6) Kandang jangkrik siap digunakan.<br/><br/><b>Manakah pernyataan yang sesuai berdasarkan teks petunjuk tersebut?</b>',
    options: [
      'Dinding kandang dipasang setelah kaca bening dipasang.',
      'Bambu dipotong setelah dinding kandang selesai dipasang.',
      'Kandang bisa langsung digunakan setelah kerangka kandang jadi.',
      'Kaca bening dipasang setelah kerangka dan dinding kandang selesai dibuat.'
    ],
    correctAnswer: 3,
    category: 'Bahasa Indonesia',
    difficulty: 'easy',
    explanation: 'Berdasarkan langkah (3), (4), dan (5), penutupan kaca bening dilakukan setelah kerangka dan dinding kandang terpasang.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-22',
    text: 'Siswa kelas 6 mengamati pohon matoa yang tumbuh di halaman sekolah. Mereka melihat bahwa akar pohon matoa berbentuk tunggang dan kuat menancap di tanah. Batangnya besar dengan kulit berwarna cokelat keabu-abuan. Selain itu, daunnya berbentuk lonjong dengan warna hijau tua.<br/><br/><b>Manakah ringkasan yang sesuai berdasarkan teks tersebut?</b>',
    options: [
      'Akar pohon matoa tumbuh dengan kuat, berwarna cokelat keabu-abuan, dan daunnya hijau tua.',
      'Akar pohon matoa tumbuh dengan kuat, batangnya besar, dan daunnya hijau.',
      'Pohon matoa memiliki akar tunggang, batangnya besar, dan daunnya lonjong.',
      'Pohon matoa memiliki akar tunggang, batangnya berkulit cokelat, dan daunnya hijau.'
    ],
    correctAnswer: 2,
    category: 'Bahasa Indonesia',
    difficulty: 'medium',
    explanation: 'Ringkasan C memuat pokok-pokok penting ketiga ciri bagian pohon matoa (akar tunggang, batang besar, dan daun lonjong).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-23',
    type: 'matrix_true_false',
    text: '<b>Bacalah teks bacaan berikut!</b><br/>Banjir dapat terjadi karena saluran air tersumbat oleh sampah...<br/><br/><b>Peristiwa manakah yang berkaitan dengan kehidupan sehari-hari agar tidak mengalami kejadian banjir seperti pada teks tersebut?</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Sesuai Pencegahan', 'Tidak Sesuai'],
    matrixRows: [
      'Ibnu sering membuang sisa makanan ke wastafel.',
      'Kalya belajar memilah sampah.',
      'Warga bekerja bakti membersihkan sungai setiap Minggu Legi.'
    ],
    matrixCorrectAnswers: [1, 0, 0],
    category: 'Bahasa Indonesia',
    difficulty: 'medium',
    explanation: 'Memilah sampah dan kerja bakti sungai adalah upaya tepat mencegah banjir. Membuang sisa makanan di wastafel dapat menyumbat saluran.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-24',
    text: '<b>Perhatikan penggalan teks pidato berikut!</b><br/>Hari Pendidikan Nasional diperingati untuk mengenang jasa besar Ki Hajar Dewantara. Beliau adalah tokoh pendidikan yang berjuang mencerdaskan kehidupan bangsa Indonesia. Sebagai generasi muda, kita wajib menghargai jasa pahlawan pendidikan Indonesia.<br/><br/><b>Manakah pernyataan yang sesuai dengan isi teks tersebut?</b>',
    options: [
      'Ki Hajar Dewantara adalah tokoh pendidikan yang berjuang mencerdaskan bangsa.',
      'Hari Pendidikan Nasional diperingati untuk mengenang jasa pahlawan kemerdekaan.',
      'Pendidikan tidak berperan penting dalam mencerdaskan kehidupan bangsa.',
      'Generasi muda hanya perlu belajar tanpa menghargai jasa pahlawan pendidikan.'
    ],
    correctAnswer: 0,
    category: 'Bahasa Indonesia',
    difficulty: 'easy',
    explanation: 'Isi teks secara eksplisit menguraikan sosok Ki Hajar Dewantara sebagai tokoh pendidikan yang berjuang mencerdaskan bangsa.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-25',
    text: '<b>Perhatikan laporan pengamatan Pucuk Merah:</b><br/>- Paragraf 1: Tanggal, lokasi, objek, dan tujuan pengamatan.<br/>- Paragraf 2: Batang berkayu tegak dan bentuk/warna daun.<br/>- Paragraf 3: Ukuran/warna bunga serta bentuk/warna buah.<br/><br/><b>Bagan susunan laporan pengamatan yang sesuai adalah ....</b>',
    options: [
      'Kegiatan dan Tujuan – Ciri Batang dan Daun – Ciri Bunga dan Buah',
      'Kegiatan dan Tujuan – Ciri Daun dan Batang – Ciri Buah dan Bunga',
      'Kegiatan dan Tujuan – Ciri Bunga dan Buah – Ciri Batang dan Daun',
      'Kegiatan dan Tujuan – Ciri Buah dan Bunga – Ciri Daun dan Batang'
    ],
    correctAnswer: 0,
    category: 'Bahasa Indonesia',
    difficulty: 'easy',
    explanation: 'Urutan susunan paragraf teks pengamatan berturut-turut memuat Kegiatan & Tujuan (P1), Ciri Batang & Daun (P2), dan Ciri Bunga & Buah (P3).',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-26',
    text: '<b>Bacalah cerita "Pensil yang Hilang":</b><br/>Dito menemukan pensil baru bertuliskan "Kamal". Meskipun sempat tergoda ingin menyimpannya, ia teringat pesan guru untuk jujur. Dito lantas segera mengembalikan pensil tersebut kepada Kamal.<br/><br/><b>Apa yang bisa diteladani dari tokoh Dito?</b>',
    options: [
      'Mengembalikan barang yang bukan miliknya.',
      'Berterima kasih atas pertolongan orang lain.',
      'Berhati-hati dalam menggunakan pensil.',
      'Mengakui barang milik orang lain.'
    ],
    correctAnswer: 0,
    category: 'Bahasa Indonesia',
    difficulty: 'easy',
    explanation: 'Sikap terpuji Dito yang wajib diteladani adalah mengembalikan barang yang bukan hak miliknya.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-27',
    text: '<b>Tanggapan pidato Hardiknas:</b><br/>- <b>Tika</b>: "Saya setuju dengan pidato itu. Sebagai pelajar, kita harus giat belajar agar bisa membangun bangsa."<br/>- <b>Tono</b>: "Menurut saya, kita tidak perlu belajar terlalu serius. Yang penting sudah sekolah."<br/><br/><b>Mengapa tanggapan Tika lebih sesuai berdasarkan isi pidato tersebut daripada Tono?</b>',
    options: [
      'Tika menekankan semangat belajar sebagai cara menghargai jasa pahlawan pendidikan.',
      'Tono berpendapat bahwa sekolah lebih penting daripada belajar sungguh-sungguh.',
      'Tika ingin menjadi pahlawan pendidikan seperti Ki Hajar Dewantara.',
      'Tono berpendapat bahwa pendidikan bukan hal utama dalam kehidupan.'
    ],
    correctAnswer: 0,
    category: 'Bahasa Indonesia',
    difficulty: 'medium',
    explanation: 'Tanggapan Tika sejalan dengan isi pidato yang mengajak generasi muda bersemangat belajar demi menghargai jasa pahlawan pendidikan.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-28',
    type: 'matrix_true_false',
    text: '<b>Bacalah cerita "Singa dan Tikus":</b><br/>Singa terjerat jaring pemburu. Tikus yang kebetulan lewat segera menolong menggigit tali jaring sampai putus hingga Singa terbebas.<br/><br/><b>Manakah pernyataan yang sesuai berdasarkan cerita tersebut?</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Sesuai Cerita', 'Tidak Sesuai'],
    matrixRows: [
      'Jaring pemburu berhasil menjebak Tikus.',
      'Tali jaring terputus karena digigit oleh Tikus.',
      'Tikus meminta Singa untuk tidak memangsanya.'
    ],
    matrixCorrectAnswers: [1, 0, 0],
    category: 'Bahasa Indonesia',
    difficulty: 'medium',
    explanation: 'Jaring membendung Singa (bukan Tikus). Tali jaring terputus digigit Tikus dan Tikus memohon agar tidak dimangsa Singa saat awal cerita.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-29',
    type: 'matrix_true_false',
    text: '<b>Petunjuk Pembuatan Kandang Jangkrik</b><br/>(1) Ukuran, (2) Potong bambu, (3) Rangkai kerangka, (4) Pasang dinding bambu, (5) Tutup atas dengan kaca bening.<br/><br/><b>Manakah ringkasan yang tepat berdasarkan teks petunjuk tersebut?</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Ringkasan Tepat', 'Tidak Tepat'],
    matrixRows: [
      'Kandang jangkrik dibuat dengan menyiapkan bambu, merangkai kerangka, dan menutupnya dengan kaca.',
      'Kandang jangkrik dibuat dari bambu yang dirangkai dan diberi dinding.',
      'Kandang jangkrik dibuat dengan menentukan ukuran lalu memasang kaca di seluruh sisi.'
    ],
    matrixCorrectAnswers: [0, 1, 1],
    category: 'Bahasa Indonesia',
    difficulty: 'medium',
    explanation: 'Pernyataan 1 merupakan ringkasan yang padat dan runtut mewakili alur petunjuk pembuatan kandang jangkrik.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },
  {
    id: 'q-sd-bind-30',
    text: '<b>Bacalah cerita "Pensil yang Hilang":</b><br/>Dito menemukan pensil bertuliskan "Kamal" di bawah meja. Ia sempat terbersit keinginan menyimpannya, tetapi hatinya menjadi tidak tenang karena teringat pesan guru.<br/><br/><b>Apa yang menjadi awal terjadinya konflik batin pada cerita tersebut?</b>',
    options: [
      'Dito melihat pensil tergeletak di bawah mejanya.',
      'Dito menemukan nama "Kamal" tertulis pada pensil itu.',
      'Dito sempat berpikir untuk menyimpan pensil tersebut.',
      'Dito menghampiri Kamal dan mengembalikan pensilnya.'
    ],
    correctAnswer: 2,
    category: 'Bahasa Indonesia',
    difficulty: 'easy',
    explanation: 'Konflik batin Dito bermula saat pikiran untuk menyimpan pensil milik Kamal timbul di hatinya.',
    teacherId: 'u-2',
    schoolLevel: 'SD'
  },

  // ==========================================
  // SOAL PAKET 1 TPM 1 TKA MATEMATIKA SMP 2025/2026 KOTA YOGYAKARTA (30 SOAL LENGKAP)
  // ==========================================
  {
    id: 'q-smp-mat-1',
    text: 'Rita mengerjakan tes masuk Klub Olimpiade Matematika dengan total 40 butir soal. Pedoman penskoran: Benar = 4, Salah = -1, Tidak dijawab = 0. Dari 35 soal yang dijawab Rita, diketahui 30 butir soal benar. Skor yang didapat Rita dalam tes tersebut adalah ....',
    options: ['140', '130', '120', '115'],
    correctAnswer: 3,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Rita menjawab 35 soal. Benar = 30, Salah = 35 - 30 = 5, Tidak dijawab = 40 - 35 = 5.<br/>Skor = (30 × 4) + (5 × -1) + (5 × 0) = 120 - 5 + 0 = 115. Jawaban D (115).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-2',
    text: 'Resep CUPCAKE (6 porsi):<br/>- Tepung: 0,75 kg<br/>- Gula pasir: 1/2 kg (0,5 kg)<br/>- Mentega: 125 gram (0,125 kg)<br/><br/>Dini akan membuat Cupcake dengan bahan yang dibeli dari toko yaitu tepung 3 3/4 kg (3,75 kg), Gula pasir 2 kg, dan Mentega 1 kg.<br/>Banyak Cupcake yang dapat dibuat Dini adalah ....',
    options: ['24 porsi', '27 porsi', '30 porsi', '48 porsi'],
    correctAnswer: 0,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Hitung porsi maksimum dari masing-masing bahan:<br/>- Dari Tepung: (3,75 kg / 0,75 kg) × 6 = 5 × 6 = 30 porsi<br/>- Dari Gula: (2 kg / 0,5 kg) × 6 = 4 × 6 = 24 porsi<br/>- Dari Mentega: (1 kg / 0,125 kg) × 6 = 8 × 6 = 48 porsi<br/>Batas pembatas adalah stok terkecil yaitu 24 porsi dari Gula pasir. Jawaban A (24 porsi).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-3',
    text: 'Toko sirup memiliki 42 botol rasa jeruk dan 63 botol rasa stroberi. Botol-botol tersebut akan ditata ke dalam rak sehingga setiap rak berisi jumlah botol jeruk dan stroberi yang sama banyak. Maksimal banyak rak yang dapat dipergunakan adalah ....',
    options: ['7 rak', '9 rak', '14 rak', '21 rak'],
    correctAnswer: 3,
    category: 'Matematika',
    difficulty: 'easy',
    explanation: 'Maksimal banyak rak adalah FPB(42, 63).<br/>42 = 21 × 2, 63 = 21 × 3.<br/>FPB(42, 63) = 21. Jadi maksimal ada 21 rak. Jawaban D (21 rak).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-4',
    text: 'Pak Deni akan mengecat dinding berbentuk persegi panjang dengan ukuran panjang 4,6 m dan tinggi 2,8 m. Setiap kaleng cat mampu mengecat area seluas 6 3/4 m² (6,75 m²). Banyak kaleng cat minimal yang harus dibeli Pak Deni untuk menutupi seluruh dinding adalah ....',
    options: ['1 kaleng', '2 kaleng', '3 kaleng', '4 kaleng'],
    correctAnswer: 1,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Luas dinding = 4,6 m × 2,8 m = 12,88 m².<br/>Banyak cat = 12,88 m² / 6,75 m² = 1,908... kaleng.<br/>Karena dibeli dalam satuan kaleng utuh minimal, Pak Deni harus membeli 2 kaleng. Jawaban B (2 kaleng).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-5',
    type: 'matrix_true_false',
    text: '<b>Denah rumah paman dengan skala 1 : 150:</b><br/>- Halaman pada denah: panjang 4,5 cm, lebar (3,00 + 3,00) = 6,00 cm.<br/>- Garasi pada denah: panjang 4,5 cm, lebar 3,00 cm.<br/>- Ruang Tidur 1 pada denah: 3,00 cm × 3,00 cm.<br/>- Ruang Tidur 2 pada denah: 2,75 cm × 3,00 cm.<br/><br/><b>Pilihlah Benar atau Salah untuk pernyataan berikut!</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      '(1) Keliling halaman sebenarnya adalah 50,625 m',
      '(2) Keliling garasi pada denah 15 cm',
      '(3) Luas Ruang Tidur 1 sebenarnya 20,25 m²',
      '(4) Luas Ruang Tidur 2 pada denah 6,25 cm²'
    ],
    matrixCorrectAnswers: [1, 0, 0, 1],
    category: 'Matematika',
    difficulty: 'hard',
    explanation: 'Perhitungan:<br/>- Keliling garasi denah = 2 × (4,5 + 3,0) = 15 cm (Benar).<br/>- Ukuran asli Ruang Tidur 1 = 3 cm × 150 = 450 cm = 4,5 m. Luas sebenarnya = 4,5 × 4,5 = 20,25 m² (Benar).<br/>Pernyataan (2) dan (3) Benar (Kunci Paket 2 & 4 BENAR).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-6',
    text: 'Sebuah proyek diselesaikan 12 pekerja dalam 20 hari. Jika proyek ingin diselesaikan dalam 15 hari, maka banyak pekerja tambahan yang diperlukan adalah ....',
    options: ['16 orang', '9 orang', '4 orang', '3 orang'],
    correctAnswer: 2,
    category: 'Matematika',
    difficulty: 'easy',
    explanation: 'Perbandingan berbalik nilai:<br/>P2 = (12 × 20) / 15 = 240 / 15 = 16 pekerja.<br/>Pekerja tambahan = 16 - 12 = 4 orang. Jawaban C (4 orang).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-7',
    text: 'Dalam kegiatan donor darah selama 6 hari, setiap hari berhasil memperoleh 5 orang pendonor. Jika setiap orang mendonorkan 0,5 liter darah, dan setiap mililiter darah mengandung 7,5 × 10⁸ sel darah merah. Total seluruh sel darah merah yang terkumpul adalah .... (1 liter = 10³ ml)',
    options: ['3,75 × 10¹¹ sel', '1,125 × 10¹² sel', '1,875 × 10¹² sel', '1,125 × 10¹³ sel'],
    correctAnswer: 3,
    category: 'Matematika',
    difficulty: 'hard',
    explanation: 'Total pendonor = 6 × 5 = 30 orang.<br/>Total darah = 30 × 0,5 liter = 15 liter = 15.000 ml.<br/>Total sel darah merah = 15.000 × (7,5 × 10⁸) = 112.500 × 10⁸ = 1,125 × 10¹³ sel. Jawaban D.',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-8',
    type: 'matrix_true_false',
    text: 'Diketahui AF = 2√98 cm = 14√2 cm, AB = 3√18 cm = 9√2 cm, BC = 3√8 cm = 6√2 cm, EF = 2√8 cm = 4√2 cm.<br/>- Panjang DC = (AF - EF) = 14√2 - 4√2 = 10√2 cm.<br/>- Panjang ED = (AB - BC) = 9√2 - 6√2 = 3√2 cm.<br/>- Luas BCDG = BC × DC = 6√2 × 10√2 = 120 cm².<br/><br/>Tentukan Benar atau Salah untuk pernyataan berikut!',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      '1. Panjang DC = 5√2 cm',
      '2. Panjang ED = 6√2 cm',
      '3. Luas BCDG = 60 cm²'
    ],
    matrixCorrectAnswers: [0, 1, 0],
    category: 'Matematika',
    difficulty: 'hard',
    explanation: 'Sesuai Kunci Paket A No. 8 (BSB): Pernyataan 1 Benar, 2 Salah, 3 Benar.',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-9',
    type: 'matrix_true_false',
    text: '<b>Penawaran Toko Sepatu:</b><br/>- Toko A (Rp120.000, diskon 30%): Bayar = Rp84.000, Besor Diskon = Rp36.000.<br/>- Toko B (Rp125.000, cashback Rp35.000): Bayar = Rp90.000.<br/>- Toko C (Rp130.000, diskon 20%+10%): Bayar = Rp130.000 × 0,8 × 0,9 = Rp93.600.<br/>- Toko D (Rp170.000, Beli 1 Gratis 1): Bayar per pasang = Rp85.000.<br/><br/><b>Manakah pernyataan yang BENAR?</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      '(1) Diskon di toko A sebesar Rp36.000',
      '(2) Harga bayar sepatu di toko B sebesar Rp100.000',
      '(3) Harga pembayaran tertinggi di Toko D',
      '(4) Harga pembayaran terendah di Toko C'
    ],
    matrixCorrectAnswers: [0, 1, 1, 1],
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Kunci Jawaban No 9 adalah Pernyataan (1) dan (3) BENAR.',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-10',
    text: 'Hanan memiliki mobil dengan kapasitas muatan maksimal 1 ton (1.000 kg). Ia harus membawa 10 kotak buah naga (merah) seberat 25 kg per kotak. Buah jeruk ditempatkan dalam kotak biru seberat 50 kg per kotak. Banyak total kotak (buah naga dan jeruk) yang dapat dibawa Hanan dalam satu kali jalan adalah ....',
    options: ['15 kotak', '20 kotak', '25 kotak', '30 kotak'],
    correctAnswer: 2,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Sisa kapasitas = 1.000 kg - (10 × 25 kg) = 1.000 - 250 = 750 kg.<br/>Banyak kotak jeruk = 750 / 50 = 15 kotak.<br/>Banyak total kotak = 10 kotak naga + 15 kotak jeruk = 25 kotak. Jawaban C (25 kotak).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-11',
    type: 'matrix_true_false',
    text: 'Sistem Persamaan Linear:<br/>Umi membeli 2 brokok putih + 2 ikat telur = Rp34.000 -> B + T = 17.000<br/>Bibi membeli 1 brokoli putih + 2 ikat telur = Rp18.000 -> B + 2T = 18.000<br/>Eliminasi: T = 1.000 (per butir/ikat), B = 16.000 (per buah brokoli).<br/><br/><b>Pilihlah pernyataan yang BENAR!</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      '(1) Harga dua butir telur adalah Rp4.000',
      '(2) Harga sebuah Brokoli adalah Rp10.000',
      '(3) Harga total yang harus dibayar Ibu Rp44.000',
      '(4) Harga total yang dibayar Mirna adalah Rp16.000'
    ],
    matrixCorrectAnswers: [0, 1, 0, 1],
    category: 'Matematika',
    difficulty: 'hard',
    explanation: 'Kunci Jawaban No 11 adalah Pernyataan (1) dan (3) BENAR.',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-12',
    text: 'Perhatikan gambar persegi panjang berukuran luar (5x+6) cm × 4x cm, dengan potongan sudut kecil 2 cm × 3 cm.<br/>Luas daerah yang diarsir adalah ....',
    options: ['(20x² - 6) cm²', '(20x² + 6) cm²', '(20x² - 2x + 6) cm²', '(20x² + 2x - 6) cm²'],
    correctAnswer: 3,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Luas total = 4x(5x + 6) = 20x² + 24x.<br/>Dikurangi bagian putih tidak diarsir sehingga menghasilkan Luas diarsir = (20x² + 2x - 6) cm². Kunci Jawaban D.',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-13',
    type: 'matrix_true_false',
    text: 'Diketahui f(x) = px + q, f(-3) = -12 dan f(5) = 4.<br/>Sistem:<br/>-3p + q = -12<br/>5p + q = 4<br/>Kurangkan: 8p = 16 => p = 2.<br/>Substitusi: 5(2) + q = 4 => 10 + q = 4 => q = -6.<br/>f(x) = 2x - 6.<br/>f(-7) = 2(-7) - 6 = -14 - 6 = -20.<br/><br/><b>Manakah pernyataan yang BENAR?</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      '(1) Nilai p = 2',
      '(2) Nilai q = 6',
      '(3) Rumus f(x) = 2x - 6',
      '(4) Nilai f(-7) = -20'
    ],
    matrixCorrectAnswers: [0, 1, 0, 0],
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Nilai p = 2, q = -6, f(x) = 2x - 6, f(-7) = -20. Pernyataan (1), (3), dan (4) BENAR.',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-14',
    text: 'Pola persegi satuan berwarna hitam dan putih. Selisih persegi satuan berwarna hitam dan putih pada pola ke-8 adalah ....',
    options: ['19', '34', '47', '62'],
    correctAnswer: 2,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Berdasarkan pola barisan dan matriks selisih persegi pada pola ke-8 diperoleh selisih = 47. Jawaban C (47).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-15',
    text: 'Arya menabung di bank dimulai setoran pertama Agustus 2024 (Rp60.000) dan selalu bertambah Rp5.000 tiap bulan.<br/>Agustus 2024 = 60rb, Sept = 65rb, Okt = 70rb, Nov = 75rb, Des = 80rb... sampai April 2025 (9 bulan).<br/>Jumlah tabungan Arya sampai bulan April 2025 adalah ....',
    options: ['Rp580.000', 'Rp660.000', 'Rp720.000', 'Rp770.000'],
    correctAnswer: 2,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Aritmetika n = 9 bulan (Agustus 2024 - April 2025).<br/>a = 60.000, b = 5.000.<br/>U9 = 60.000 + 8(5.000) = 100.000.<br/>S9 = 9/2 × (60.000 + 100.000) = 9/2 × 160.000 = 720.000. Jawaban C (Rp720.000).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-16',
    text: 'Garis sejajar dipotong garis transversal. Diketahui besar ∠a = 32° dan ∠b = 18°, maka besar ∠c adalah ....',
    options: ['32°', '24°', '22°', '14°'],
    correctAnswer: 3,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Berdasarkan hubungan sudut dalam berseberangan dan bertolak belakang diperoleh ∠c = 32° - 18° = 14°. Kunci D (14°).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-17',
    text: 'Paman berjalan dari titik A ke titik D melalui B dan C. Diketahui lintasan AB = 200 m, BC = 240 m, dan CD = 120 m. Jarak terdekat Paman dari awal keberangkatan ke titik akhir (AD) adalah ....',
    options: ['560 meter', '400 meter', '320 meter', '240 meter'],
    correctAnswer: 1,
    category: 'Matematika',
    difficulty: 'hard',
    explanation: 'Menggunakan Pythagoras berpindah horizontal dan vertikal: AD = √((200+120)² + 240²) = √(320² + 240²) = √(102.400 + 57.600) = √160.000 = 400 meter. Jawaban B (400 m).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-18',
    type: 'matrix_true_false',
    text: 'Diketahui ΔABC kongruen dengan ΔPQR.<br/>Pada ΔABC: ∠A = 54.5°, ∠B = 81.9°, ∠C = 43.6°, AC = 6.1 cm.<br/>Pada ΔPQR: PR = 4.2 cm, QR = 5 cm, ∠Q = 43.7°.<br/><br/><b>Tentukan Benar atau Salah untuk pernyataan berikut!</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Panjang PQ adalah 6,1 cm',
      'B. Panjang BC = 4,2 cm',
      'C. Besar ∠QPR adalah 54,5°'
    ],
    matrixCorrectAnswers: [0, 1, 0],
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Sesuai Kunci Paket A No 18 (BSB): A Benar, B Salah, C Benar.',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-19',
    text: 'Lukisan ABCD ditempel pada karton PQRS berukuran 100 cm × 60 cm. Sisa karton sebelah kiri dan kanan lukisan masing-masing 10 cm. Jika lukisan ABCD dan karton PQRS sebangun, maka keliling lukisan ABCD adalah ....',
    options: ['256 cm', '266 cm', '276 cm', '280 cm'],
    correctAnswer: 0,
    category: 'Matematika',
    difficulty: 'hard',
    explanation: 'Panjang karton = 100 cm, Lebar karton = 60 cm.<br/>Panjang lukisan = 100 - 10 - 10 = 80 cm.<br/>Karena sebangun: Lebar lukisan / 60 = 80 / 100 => Lebar lukisan = 48 cm.<br/>Keliling lukisan = 2 × (80 + 48) = 2 × 128 = 256 cm. Jawaban A (256 cm).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-20',
    text: 'Adi berdiri di dekat tiang listrik. Diketahui bayangan Adi BC = 160 cm, tinggi Adi BD = 150 cm, dan jarak tiang listrik ke Adi AB = 240 cm. Ketinggian lampu tiang listrik dari tanah (AE) adalah ....',
    options: ['750 cm', '400 cm', '375 cm', '240 cm'],
    correctAnswer: 2,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Kesebangunan segitiga:<br/>AC = AB + BC = 240 + 160 = 400 cm.<br/>AE / BD = AC / BC => AE / 150 = 400 / 160 => AE / 150 = 2,5 => AE = 375 cm. Jawaban C (375 cm).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-21',
    type: 'matrix_true_false',
    text: '<b>Pernyataan Transformasi Geometri:</b><br/>(1) Titik A(-2,1) ditranslasikan oleh (3, -5) -> A\'(1, -4) dengan p+q = 1 + (-4) = -3.<br/>(2) Titik D(-3, -2) didilatasi [O, k] memiliki bayangan D\'(-12, -8) -> k = 4.<br/>(3) Titik C(2,3) direfleksi terhadap sumbu-X -> C\'(2, -3).<br/>(4) Titik A(-3,4) dirotasi 90° searah jarum jam (-90°) pusat O(0,0) -> A\'(4,3).<br/><br/><b>Manakah pernyataan yang BENAR?</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      '(1) Bayangan A\'(p,q) memiliki p+q = -3',
      '(2) Nilai k = -9',
      '(3) Bayangan C\'(-2,3)',
      '(4) Bayangan A\'(4,3)'
    ],
    matrixCorrectAnswers: [0, 1, 1, 0],
    category: 'Matematika',
    difficulty: 'hard',
    explanation: 'Pernyataan (1) dan (4) BENAR.',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-22',
    text: 'Bangun ABCDEF merupakan gabungan belah ketupat ABEF dan jajargenjang BCDE. Diketahui panjang BC = 18 cm dan CD = 13 cm. Keliling daerah diarsir (luar) adalah ....',
    options: ['75 cm', '88 cm', '101 cm', '114 cm'],
    correctAnswer: 1,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Sisi belah ketupat ABEF = 13 cm, Sisi jajargenjang BC = 18 cm, CD = 13 cm. Keliling daerah diarsir = 88 cm. Kunci B (88 cm).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-23',
    text: 'Titik O merupakan pusat lingkaran dan OABC adalah persegi berukuran 14 cm × 14 cm. Luas daerah yang diarsir adalah ....',
    options: ['234,5 cm²', '273,0 cm²', '311,5 cm²', '350,0 cm²'],
    correctAnswer: 1,
    category: 'Matematika',
    difficulty: 'hard',
    explanation: 'Luas gabungan daerah lingkaran dan persegi dikurangi irisan = 273,0 cm². Kunci B (273,0 cm²).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-24',
    type: 'matrix_true_false',
    text: '<b>Jaring-jaring bangun ruang:</b><br/>(A) Jaring-jaring kubus<br/>(B) Jaring-jaring prisma segilima<br/>(C) Jaring-jaring limas segiempat (alas segitiga pada gambar)<br/><br/><b>Tentukan Benar atau Salah untuk pernyataan berikut!</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      '(A) Jaring-jaring kubus',
      '(B) Jaring-jaring prisma segilima',
      '(C) Jaring-jaring limas segiempat'
    ],
    matrixCorrectAnswers: [0, 0, 1],
    category: 'Matematika',
    difficulty: 'easy',
    explanation: 'Kunci No 24 adalah SBB (Salah, Benar, Benar / SBB sesuai tabel).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-25',
    text: 'Bangun gabungan balok dan limas. Diketahui AB = 25 cm, AD = 10 cm, tinggi balok OK = 12 cm, dan tinggi total TK = 21 cm (tinggi limas TO = 21 - 12 = 9 cm). Volume bangun gabungan tersebut adalah ....',
    options: ['3.750 cm³', '3.850 cm³', '4.750 cm³', '6.250 cm³'],
    correctAnswer: 0,
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'V_balok = 25 × 10 × 12 = 3.000 cm³.<br/>V_limas = 1/3 × (25 × 10) × 9 = 750 cm³.<br/>V_total = 3.000 + 750 = 3.750 cm³. Jawaban A (3.750 cm³).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-26',
    text: 'Pelampung pancing terdiri atas setengah bola (r = 5 cm) dan kerucut (r = 5 cm, tinggi = 12 cm). Garis pelukis kerucut s = √(5² + 12²) = 13 cm. Luas permukaan pelampung yang dicat seluruhnya adalah ....',
    options: ['140π cm²', '135π cm²', '115π cm²', '110π cm²'],
    correctAnswer: 2,
    category: 'Matematika',
    difficulty: 'hard',
    explanation: 'Luas setengah bola = 2πr² = 2π(5²) = 50π cm².<br/>Luas selimut kerucut = πrs = π(5)(13) = 65π cm².<br/>Luas total = 50π + 65π = 115π cm². Jawaban C (115π cm²).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-27',
    text: 'Sebuah bandul besi terdiri atas setengah bola dan tabung dengan diameter 12 cm (r = 6 cm) dan tinggi total 31 cm (tinggi tabung = 31 - 6 = 25 cm). Volume bandul tersebut adalah ....',
    options: ['1.044π cm³', '1.188π cm³', '1.944π cm³', '1.988π cm³'],
    correctAnswer: 0,
    category: 'Matematika',
    difficulty: 'hard',
    explanation: 'V_1/2bola = 2/3 π r³ = 2/3 π (6³) = 144π cm³.<br/>V_tabung = π r² t = π (6²) (25) = 900π cm³.<br/>V_total = 144π + 900π = 1.044π cm³. Jawaban A (1.044π cm³).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-28',
    type: 'matrix_true_false',
    text: '<b>Diagram Penjualan Gula Toko A (Kg):</b><br/>Senin: 72, Selasa: 80, Rabu: 74, Kamis: 70, Jumat: 81, Sabtu: 100, Minggu: 90.<br/>- Jangkauan = 100 - 70 = 30.<br/>- Kenaikan tertinggi Kamis (70) ke Jumat (81) = +11.<br/>- Rata-rata = (72+80+74+70+81+100+90)/7 = 567 / 7 = 81.<br/>Di atas rata-rata (>81) yaitu Sabtu(100) & Minggu(90) -> 2 hari.<br/><br/><b>Tentukan Benar atau Salah!</b>',
    options: [],
    correctAnswer: 0,
    matrixColumns: ['Benar', 'Salah'],
    matrixRows: [
      'A. Jangkauan data tersebut adalah 30',
      'B. Kenaikan penjualan gula tertinggi hari Kamis - Jumat',
      'C. Ada dua hari yang penjualannya di atas rata-rata'
    ],
    matrixCorrectAnswers: [0, 0, 0],
    category: 'Matematika',
    difficulty: 'medium',
    explanation: 'Semua pernyataan A, B, C Benar (BSB/Semua Benar).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-29',
    text: 'Diketahui rata-rata 15 data yang telah diurutkan adalah 18 (Total = 270). Rata-rata 10 data pertama adalah 15 (Jumlah = 150) dan rata-rata 3 data selanjutnya (data ke-11, 12, 13) adalah 25 (Jumlah = 75). Jika data ke-15 nilainya sama dengan 2 kali data ke-14, maka nilai data ke-15 adalah ....',
    options: ['25', '30', '45', '60'],
    correctAnswer: 1,
    category: 'Matematika',
    difficulty: 'hard',
    explanation: 'Jumlah x14 + x15 = 270 - 150 - 75 = 45.<br/>Karena x15 = 2 × x14 => x14 + 2(x14) = 45 => 3(x14) = 45 => x14 = 15.<br/>Maka x15 = 2 × 15 = 30. Jawaban B (30).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  },
  {
    id: 'q-smp-mat-30',
    text: 'Dua buah dadu dilambungkan bersama-sama satu kali. Peluang muncul kedua mata dadu berjumlah 7 adalah ....',
    options: ['5/18', '1/6', '1/9', '1/12'],
    correctAnswer: 1,
    category: 'Matematika',
    difficulty: 'easy',
    explanation: 'Pasangan dadu berjumlah 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) -> ada 6 kejadian.<br/>Total ruang sampel = 36.<br/>Peluang = 6/36 = 1/6. Jawaban B (1/6).',
    teacherId: 'u-2',
    schoolLevel: 'SMP'
  }
];

export const MOCK_TRYOUTS: Tryout[] = [
  {
    id: 'to-tka-bind-sd-p1',
    title: 'Paket 1 TPM 1 TKA Bahasa Indonesia SD 2025',
    description: 'Paket 1 Simulasi Tes Kemampuan Akademik (TKA) TPM Bahasa Indonesia & Literasi SD Kelas 6 Tahun 2025 (30 Soal Lengkap).',
    durationMinutes: 60,
    passingGrade: 70,
    category: 'Bahasa Indonesia',
    questions: MOCK_QUESTIONS.filter(q => q.id.startsWith('q-sd-bind-')),
    startDate: '2026-08-01T08:00:00Z',
    endDate: '2026-12-31T23:59:59Z',
    createdBy: 'u-2',
    isPublished: true,
    schoolLevel: 'SD'
  },
  {
    id: 'to-tka-mat-sd-p1',
    title: 'Paket 1 Try Out TPM TKA Matematika SD',
    description: 'Paket 1 Simulasi Tes Kemampuan Akademik (TKA) Mata Pelajaran Matematika SD Kelas 6 Tahun Pelajaran 2025/2026 (30 Soal Lengkap).',
    durationMinutes: 60,
    passingGrade: 70,
    category: 'Matematika',
    questions: MOCK_QUESTIONS.filter(q => q.id.startsWith('q-sd-mat-')),
    startDate: '2026-08-01T08:00:00Z',
    endDate: '2026-12-31T23:59:59Z',
    createdBy: 'u-2',
    isPublished: true,
    schoolLevel: 'SD'
  },
  {
    id: 'to-tkad-sains-p1',
    title: 'Paket 1 Try Out TKAD Sains Kota Yogyakarta',
    description: 'Paket 1 Simulasi Tes Kemampuan Akademik Daerah (TKAD) Mata Pelajaran Sains / IPA SD Kota Yogyakarta (30 Soal Lengkap).',
    durationMinutes: 60,
    passingGrade: 70,
    category: 'IPA',
    questions: MOCK_QUESTIONS.filter(q => q.id.startsWith('q-tkad-')),
    startDate: '2026-08-01T08:00:00Z',
    endDate: '2026-12-31T23:59:59Z',
    createdBy: 'u-2',
    isPublished: true,
    schoolLevel: 'SD'
  },
  {
    id: 'to-ipa-sd',
    title: 'Try Out TKA IPA SD KKKS Jetis 1',
    description: 'Simulasi Try Out Tes Kemampuan Akademik (TKA) Mata Pelajaran IPA untuk jenjang SD tingkat kecamatan/kabupaten (30 Soal).',
    durationMinutes: 60,
    passingGrade: 70,
    category: 'IPA',
    questions: MOCK_QUESTIONS.filter(q => q.id.startsWith('q-ipa-')),
    startDate: '2026-07-01T08:00:00Z',
    endDate: '2026-12-31T23:59:59Z',
    createdBy: 'u-2',
    isPublished: true,
    schoolLevel: 'SD'
  },
  {
    id: 'to-tka-mat-smp-p1',
    title: 'Paket 1 TPM 1 TKA Matematika SMP 2025/2026',
    description: 'Persiapan Pemantapan Tes Kemampuan Akademik (TKA) Kota Yogyakarta Tahap 1 Mata Pelajaran Matematika SMP (30 Soal Lengkap).',
    durationMinutes: 90,
    passingGrade: 70,
    category: 'Matematika',
    questions: MOCK_QUESTIONS.filter(q => q.id.startsWith('q-smp-mat-')),
    startDate: '2026-08-01T08:00:00Z',
    endDate: '2026-12-31T23:59:59Z',
    createdBy: 'u-2',
    isPublished: true,
    schoolLevel: 'SMP'
  },
  {
    id: 'to-smp-1',
    title: 'Try Out Asesmen SMP Bahasa Indonesia & IPA Terpadu',
    description: 'Simulasi evaluasi standar nasional untuk tingkat SMP mencakup literasi teks Bahasa Indonesia dan IPA Terpadu.',
    durationMinutes: 45,
    passingGrade: 75,
    category: 'Bahasa Indonesia',
    questions: [MOCK_QUESTIONS[7], MOCK_QUESTIONS[8], MOCK_QUESTIONS[9]],
    startDate: '2026-08-01T08:00:00Z',
    endDate: '2026-12-31T23:59:59Z',
    createdBy: 'u-2',
    isPublished: true,
    schoolLevel: 'SMP'
  },
  {
    id: 'to-smp-2',
    title: 'Paket 1 Try Out TKA SMP Matematika & Bahasa Inggris',
    description: 'Ujian simulasi persiapan Tes Kemampuan Akademik tingkat SMP mata pelajaran Matematika dan Bahasa Inggris.',
    durationMinutes: 50,
    passingGrade: 70,
    category: 'Matematika',
    questions: [MOCK_QUESTIONS[0], MOCK_QUESTIONS[8], MOCK_QUESTIONS[9]],
    startDate: '2026-08-05T08:00:00Z',
    endDate: '2026-12-31T23:59:59Z',
    createdBy: 'u-2',
    isPublished: true,
    schoolLevel: 'SMP'
  },
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
  },
  {
    id: 'sub-5',
    studentId: 'u-4', // Siti Rahmawati
    studentName: 'Siti Rahmawati',
    studentClass: 'VI-A SD',
    tryoutId: 'to-ipa-sd',
    tryoutTitle: 'Try Out TKA IPA SD KKKS Jetis 1',
    answers: {},
    flagged: [],
    score: 93,
    correctCount: 28,
    wrongCount: 2,
    unansweredCount: 0,
    isPassed: true,
    startTime: '2026-07-20T08:00:00Z',
    submitTime: '2026-07-20T08:52:00Z',
    status: 'completed'
  },
  {
    id: 'sub-6',
    studentId: 'u-5', // Adi Wijaya
    studentName: 'Adi Wijaya',
    studentClass: 'VI-B SD',
    tryoutId: 'to-ipa-sd',
    tryoutTitle: 'Try Out TKA IPA SD KKKS Jetis 1',
    answers: {},
    flagged: [],
    score: 87,
    correctCount: 26,
    wrongCount: 4,
    unansweredCount: 0,
    isPassed: true,
    startTime: '2026-07-20T08:00:00Z',
    submitTime: '2026-07-20T08:55:00Z',
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
  // 1. TINGKAT SD
  { id: 'sb-1', name: 'Bahasa Indonesia', description: 'Tata bahasa baku, pemahaman bacaan teks, literasi membaca, dan karya sastra.', levels: ['SD', 'SMP', 'SMA'], categoryType: 'wajib' },
  { id: 'sb-2', name: 'Matematika', description: 'Berhitung, aritmetika, aljabar, geometri, kalkulus, dan logika numerik.', levels: ['SD', 'SMP', 'SMA'], categoryType: 'wajib' },
  { id: 'sb-3', name: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)', description: 'Integrasi pengamatan sains alam dan fenomena sosial lingkungan sekitar (Tingkat SD).', levels: ['SD'], categoryType: 'wajib' },

  // 2. TINGKAT SMP
  { id: 'sb-4', name: 'Bahasa Inggris', description: 'English grammar, reading comprehension, vocabulary, and dialogue.', levels: ['SMP', 'SMA'], categoryType: 'wajib' },
  { id: 'sb-5', name: 'IPA (Fisika, Kimia, Biologi)', description: 'Ilmu Pengetahuan Alam terpadu mencakup konsep Fisika, Kimia, dan Biologi (Tingkat SMP).', levels: ['SMP'], categoryType: 'wajib' },
  { id: 'sb-6', name: 'IPS (Sejarah, Geografi, Ekonomi, Sosiologi)', description: 'Ilmu Pengetahuan Sosial terpadu mencakup Sejarah, Geografi, Ekonomi, dan Sosiologi (Tingkat SMP).', levels: ['SMP'], categoryType: 'wajib' },

  // 3. TINGKAT SMA - MATA PELAJARAN WAJIB
  { id: 'sb-7', name: 'Pendidikan Pancasila', description: 'Pancasila, etika berbangsa, kewarganegaraan, undang-undang dasar, dan hukum.', levels: ['SMA'], categoryType: 'wajib' },
  { id: 'sb-8', name: 'Agama', description: 'Pendidikan Agama dan Budi Pekerti, pembentukan akhlak, etika, dan spiritualitas.', levels: ['SMA'], categoryType: 'wajib' },
  { id: 'sb-9', name: 'Sejarah', description: 'Sejarah Indonesia dan Sejarah Dunia, peristiwa penting, kronologi, dan analisis historis.', levels: ['SMA'], categoryType: 'wajib' },

  // 3. TINGKAT SMA - MATA PELAJARAN PILIHAN
  { id: 'sb-10', name: 'Fisika', description: 'Kinematika, dinamika, listrik, magnet, optik, dan termodinamika (Mata Pelajaran Pilihan/MIPA).', levels: ['SMA'], categoryType: 'pilihan' },
  { id: 'sb-11', name: 'Kimia', description: 'Reaksi zat kimia, struktur atom, tabel periodik, ikatan, dan larutan (Mata Pelajaran Pilihan/MIPA).', levels: ['SMA'], categoryType: 'pilihan' },
  { id: 'sb-12', name: 'Biologi', description: 'Studi tentang sel, keanekaragaman hayati, ekosistem, dan genetika (Mata Pelajaran Pilihan/MIPA).', levels: ['SMA'], categoryType: 'pilihan' },
  { id: 'sb-13', name: 'Ekonomi', description: 'Mekanisme pasar, keuangan, akuntansi, dan kebijakan ekonomi (Mata Pelajaran Pilihan/IPS).', levels: ['SMA'], categoryType: 'pilihan' },
  { id: 'sb-14', name: 'Sosiologi', description: 'Interaksi sosial, struktur masyarakat, norma, dan dinamika sosial (Mata Pelajaran Pilihan/IPS).', levels: ['SMA'], categoryType: 'pilihan' },
  { id: 'sb-15', name: 'Geografi', description: 'Litosfer, atmosfer, hidrosfer, pemetaan, dan dinamika kependudukan (Mata Pelajaran Pilihan/IPS).', levels: ['SMA'], categoryType: 'pilihan' },
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

  // Ensure new mock questions exist in local storage
  const existingQuestionsRaw = localStorage.getItem('to_questions');
  if (!existingQuestionsRaw) {
    localStorage.setItem('to_questions', JSON.stringify(MOCK_QUESTIONS));
  } else {
    try {
      const existingQuestions = JSON.parse(existingQuestionsRaw);
      const existingIds = new Set(existingQuestions.map((q: Question) => q.id));
      let updated = false;
      MOCK_QUESTIONS.forEach(q => {
        if (!existingIds.has(q.id)) {
          existingQuestions.push(q);
          updated = true;
        }
      });
      if (updated) {
        localStorage.setItem('to_questions', JSON.stringify(existingQuestions));
      }
    } catch {
      localStorage.setItem('to_questions', JSON.stringify(MOCK_QUESTIONS));
    }
  }

  // Ensure new tryouts exist
  const existingTryoutsRaw = localStorage.getItem('to_tryouts');
  if (!existingTryoutsRaw) {
    localStorage.setItem('to_tryouts', JSON.stringify(MOCK_TRYOUTS));
  } else {
    try {
      const existingTryouts = JSON.parse(existingTryoutsRaw);
      const existingIds = new Set(existingTryouts.map((t: Tryout) => t.id));
      let updated = false;
      MOCK_TRYOUTS.forEach(t => {
        if (!existingIds.has(t.id)) {
          existingTryouts.push(t);
          updated = true;
        }
      });
      if (updated) {
        localStorage.setItem('to_tryouts', JSON.stringify(existingTryouts));
      }
    } catch {
      localStorage.setItem('to_tryouts', JSON.stringify(MOCK_TRYOUTS));
    }
  }

  if (!localStorage.getItem('to_submissions')) {
    localStorage.setItem('to_submissions', JSON.stringify(MOCK_SUBMISSIONS));
  }
  if (!localStorage.getItem('to_settings')) {
    localStorage.setItem('to_settings', JSON.stringify(DEFAULT_SETTINGS));
  }
  if (!localStorage.getItem('to_subjects')) {
    localStorage.setItem('to_subjects', JSON.stringify(MOCK_SUBJECTS));
  } else {
    // Ensure all subjects from MOCK_SUBJECTS are synced in local storage
    try {
      const existingSubs = JSON.parse(localStorage.getItem('to_subjects') || '[]');
      const existingNames = new Set(existingSubs.map((s: Subject) => s.name.toLowerCase()));
      let updated = false;
      MOCK_SUBJECTS.forEach((sub) => {
        if (!existingNames.has(sub.name.toLowerCase())) {
          existingSubs.push(sub);
          updated = true;
        } else {
          // Update levels & categoryType
          const idx = existingSubs.findIndex((s: Subject) => s.name.toLowerCase() === sub.name.toLowerCase());
          if (idx !== -1) {
            existingSubs[idx] = {
              ...existingSubs[idx],
              levels: sub.levels,
              categoryType: sub.categoryType || existingSubs[idx].categoryType,
              description: existingSubs[idx].description || sub.description
            };
            updated = true;
          }
        }
      });
      if (updated) {
        localStorage.setItem('to_subjects', JSON.stringify(existingSubs));
      }
    } catch {
      localStorage.setItem('to_subjects', JSON.stringify(MOCK_SUBJECTS));
    }
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
