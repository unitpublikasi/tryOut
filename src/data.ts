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
  }
];

export const MOCK_TRYOUTS: Tryout[] = [
  {
    id: 'to-ipa-sd',
    title: 'Try Out TKA IPA SD KKKS Jetis 1',
    description: 'Simulasi Try Out Tes Kemampuan Akademik (TKA) Mata Pelajaran IPA untuk jenjang SD tingkat kecamatan/kabupaten.',
    durationMinutes: 60,
    passingGrade: 70,
    category: 'IPA',
    questions: MOCK_QUESTIONS.filter(q => q.category === 'IPA'),
    startDate: '2026-07-01T08:00:00Z',
    endDate: '2026-12-31T23:59:59Z',
    createdBy: 'u-2',
    isPublished: true,
    schoolLevel: 'SD'
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
  { id: 'sb-1', name: 'Matematika', description: 'Mata pelajaran hitung, aljabar, kalkulus, dan logika numerik.', levels: ['SD', 'SMP', 'SMA'] },
  { id: 'sb-2', name: 'Fisika', description: 'Studi kinematika, dinamika, listrik, magnet, dan termodinamika.', levels: ['SMP', 'SMA'] },
  { id: 'sb-3', name: 'Biologi', description: 'Studi tentang struktur sel, keanekaragaman hayati, ekologi, dan genetika.', levels: ['SMP', 'SMA'] },
  { id: 'sb-4', name: 'Kimia', description: 'Studi reaksi zat kimia, tabel periodik, stoikiometri, dan larutan.', levels: ['SMA'] },
  { id: 'sb-5', name: 'Bahasa Indonesia', description: 'Tata bahasa baku, pemahaman bacaan teks, dan karya sastra.', levels: ['SD', 'SMP', 'SMA'] },
  { id: 'sb-6', name: 'Bahasa Inggris', description: 'English grammar, reading comprehension, vocabulary, and dialogue.', levels: ['SD', 'SMP', 'SMA'] },
  { id: 'sb-7', name: 'IPA', description: 'Ilmu Pengetahuan Alam terpadu (Fisika, Biologi, Kimia, Bumi & Antariksa).', levels: ['SD', 'SMP'] },
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
    // Add IPA if missing
    try {
      const subs = JSON.parse(localStorage.getItem('to_subjects') || '[]');
      if (!subs.some((s: Subject) => s.name === 'IPA')) {
        subs.push({ id: 'sb-7', name: 'IPA', description: 'Ilmu Pengetahuan Alam terpadu (Fisika, Biologi, Kimia, Bumi & Antariksa).', levels: ['SD', 'SMP'] });
        localStorage.setItem('to_subjects', JSON.stringify(subs));
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
