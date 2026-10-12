/* =========================================================
   BINGOLAH · BANK SOAL
   ---------------------------------------------------------
   Setiap mapel punya 7 topik (kolom) x 5 tingkat (baris):
   0 Mudah, 1 Sedang, 2 Sulit, 3 Sulit 2x, 4 Sulit 3x.

   Satu tingkat bisa berisi:
   - Daftar soal pilihan ganda. Setiap soal ditulis
       ["Pertanyaan", "Jawaban benar", "Salah 1", "Salah 2", "Salah 3"]
     Jawaban benar SELALU ditulis pertama; urutannya diacak saat main.
   - Atau fungsi pembuat soal hitungan (gen), yang mengembalikan
       { text, answer, unit, hint }
     Angkanya diacak setiap kali soal dibuka.

   Menambah soal: cukup tambahkan baris baru di daftar tingkat yang sama.
   ========================================================= */
window.BINGOLAH_SUBJECTS = (() => {
  'use strict';

  /* ---------- helper ---------- */
  const ri = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const rnd = (x, dp = 3) => Math.round(x * 10 ** dp) / 10 ** dp;
  // angka dengan koma desimal ala Indonesia: 0.5 -> "0,5"
  const id = (n) => String(rnd(n, 4)).replace('.', ',').replace('-', '−');
  const q = (text, answer, unit = '', hint = '') => ({ text, answer: rnd(answer, 4), unit, hint });

  /* ===================================================== */
  /*  SEJARAH · Kelas 12 SMA, Kurikulum Merdeka            */
  /* ===================================================== */
  const sejarah = {
    id: 'sej', label: 'Sejarah', emoji: '📜', accent: '#C2410C',
    desc: 'Kelas 12 · Kurikulum Merdeka',
    topics: [
      { id: 'awal', label: 'Awal Kemerdekaan', name: 'Awal Kemer­dekaan', emoji: '🇮🇩', accent: '#E11D48', levels: [
        [
          ['Teks Proklamasi Kemerdekaan Indonesia dibacakan pada tanggal...', '17 Agustus 1945', '16 Agustus 1945', '18 Agustus 1945', '22 Agustus 1945'],
          ['Lembaga yang mengesahkan UUD 1945 pada 18 Agustus 1945 adalah...', 'PPKI', 'BPUPKI', 'KNIP', 'MPRS'],
        ],
        [
          ['Presiden dan wakil presiden pertama RI dipilih oleh PPKI dalam sidang tanggal...', '18 Agustus 1945', '17 Agustus 1945', '22 Agustus 1945', '1 Oktober 1945'],
          ['Badan Keamanan Rakyat (BKR) dibentuk pada tanggal...', '22 Agustus 1945', '5 Oktober 1945', '17 Agustus 1945', '3 November 1945'],
        ],
        [
          ['Tentara Keamanan Rakyat (TKR) dibentuk pada 5 Oktober 1945. Tanggal ini sekarang diperingati sebagai...', 'Hari TNI', 'Hari Pahlawan', 'Hari Kebangkitan Nasional', 'Hari Bela Negara'],
          ['Dalam sidang 22 Agustus 1945, PPKI memutuskan untuk membentuk...', 'Komite Nasional, Partai Nasional Indonesia, dan BKR', 'BPUPKI, KNIP, dan TKR', 'Kabinet parlementer, MPR, dan DPR', 'Konstituante, DPA, dan TNI'],
        ],
        [
          ['Maklumat Wakil Presiden No. X (16 Oktober 1945) mengubah peran KNIP, yaitu...', 'diberi kekuasaan legislatif', 'menjadi tentara nasional', 'hanya menjadi pembantu presiden', 'dibubarkan dan diganti DPR'],
          ['Maklumat 3 November 1945 yang ditandatangani Wakil Presiden Hatta berisi anjuran untuk...', 'mendirikan partai-partai politik', 'membentuk tentara nasional', 'memindahkan ibu kota ke Yogyakarta', 'membubarkan KNIP'],
        ],
        [
          ['Maklumat Pemerintah 14 November 1945 mengubah sistem kabinet menjadi parlementer. Perdana menteri pertama RI adalah...', 'Sutan Sjahrir', 'Amir Sjarifuddin', 'Mohammad Hatta', 'Ali Sastroamidjojo'],
          ['Pada Januari 1946, karena Jakarta tidak aman, ibu kota RI dipindahkan ke...', 'Yogyakarta', 'Bukittinggi', 'Surakarta', 'Bandung'],
        ],
      ] },
      { id: 'tempur', label: 'Pertempuran', name: 'Pertem­puran', emoji: '⚔️', accent: '#B91C1C', levels: [
        [
          ['Pertempuran 10 November 1945 terjadi di kota...', 'Surabaya', 'Semarang', 'Medan', 'Ambarawa'],
          ['Peristiwa Bandung Lautan Api terjadi karena para pejuang...', 'membakar kota agar tidak dipakai Sekutu', 'menyerang markas Jepang', 'merebut Hotel Yamato', 'menolak Perjanjian Renville'],
        ],
        [
          ['Tanggal 10 November sekarang diperingati sebagai...', 'Hari Pahlawan', 'Hari TNI', 'Hari Santri', 'Hari Bela Negara'],
          ['Puputan Margarana di Bali dipimpin oleh...', 'I Gusti Ngurah Rai', 'Bung Tomo', 'Soedirman', 'Robert Wolter Monginsidi'],
        ],
        [
          ['Palagan Ambarawa yang berakhir 15 Desember 1945 dipimpin oleh...', 'Kolonel Soedirman', 'Bung Tomo', 'Ahmad Yani', 'Gatot Subroto'],
          ['Resolusi Jihad yang menggerakkan para santri melawan Sekutu dikeluarkan K.H. Hasyim Asy’ari pada...', '22 Oktober 1945', '10 November 1945', '17 Agustus 1945', '5 Oktober 1945'],
        ],
        [
          ['Tewasnya perwira Sekutu yang memicu ultimatum dan Pertempuran Surabaya adalah...', 'Brigjen A.W.S. Mallaby', 'Jenderal Spoor', 'Letjen Christison', 'Van Mook'],
          ['Dalam Pertempuran Lima Hari di Semarang (15–19 Oktober 1945), pejuang Indonesia melawan...', 'tentara Jepang', 'tentara Sekutu (Inggris)', 'tentara Belanda (NICA)', 'pasukan Gurkha'],
        ],
        [
          ['Pertempuran Medan Area (Oktober 1945) dipicu oleh...', 'insiden di sebuah hotel ketika lencana merah putih diinjak-injak', 'ultimatum Brigjen Mallaby', 'pembakaran kota oleh pejuang', 'Agresi Militer Belanda I'],
          ['Arti kata "puputan" dalam Puputan Margarana adalah...', 'perang habis-habisan sampai titik darah penghabisan', 'gencatan senjata', 'perang gerilya', 'serangan fajar'],
        ],
      ] },
      { id: 'diplo', label: 'Diplomasi', name: 'Diplo­masi', emoji: '🤝', accent: '#0F766E', levels: [
        [
          ['Perundingan yang menghasilkan pengakuan kedaulatan Indonesia oleh Belanda pada akhir 1949 adalah...', 'Konferensi Meja Bundar (KMB)', 'Perjanjian Linggarjati', 'Perjanjian Renville', 'Perjanjian Roem-Royen'],
          ['Perjanjian Renville ditandatangani di atas...', 'kapal perang Amerika Serikat', 'kapal perang Belanda', 'Gedung Merdeka', 'Istana Bogor'],
        ],
        [
          ['Dalam Perjanjian Linggarjati (1946), Belanda mengakui kekuasaan de facto RI atas...', 'Jawa, Sumatra, dan Madura', 'Jawa dan Bali', 'seluruh bekas Hindia Belanda', 'Sumatra dan Kalimantan'],
          ['Agresi Militer Belanda I (21 Juli 1947) dilancarkan dengan melanggar...', 'Perjanjian Linggarjati', 'Perjanjian Renville', 'Konferensi Meja Bundar', 'Perjanjian Roem-Royen'],
        ],
        [
          ['Komisi PBB yang dibentuk untuk membantu penyelesaian sengketa Indonesia–Belanda setelah Agresi Militer I adalah...', 'Komisi Tiga Negara (KTN)', 'UNCI', 'UNTEA', 'ASEAN'],
          ['Anggota Komisi Tiga Negara adalah...', 'Australia, Belgia, dan Amerika Serikat', 'Inggris, Prancis, dan Belanda', 'India, Pakistan, dan Australia', 'Amerika Serikat, Uni Soviet, dan Inggris'],
        ],
        [
          ['Saat Agresi Militer Belanda II (Desember 1948), Pemerintah Darurat RI (PDRI) di Sumatra Barat dipimpin oleh...', 'Sjafruddin Prawiranegara', 'Sutan Sjahrir', 'Mohammad Natsir', 'Amir Sjarifuddin'],
          ['Serangan Umum 1 Maret 1949 di Yogyakarta bertujuan untuk...', 'menunjukkan kepada dunia bahwa TNI masih ada', 'merebut kembali Jakarta', 'membebaskan Irian Barat', 'membubarkan RIS'],
        ],
        [
          ['Mosi Integral yang mendorong kembalinya RIS menjadi negara kesatuan diajukan oleh...', 'Mohammad Natsir', 'Mohammad Hatta', 'Soepomo', 'Sjafruddin Prawiranegara'],
          ['RIS resmi kembali menjadi Negara Kesatuan Republik Indonesia pada...', '17 Agustus 1950', '27 Desember 1949', '3 April 1950', '17 Agustus 1949'],
        ],
      ] },
      { id: 'liberal', label: 'Demokrasi Liberal', name: 'Demo­krasi Liberal', emoji: '🗳️', accent: '#1D4ED8', levels: [
        [
          ['Pemilu pertama di Indonesia diselenggarakan pada tahun...', '1955', '1950', '1959', '1971'],
          ['Pada masa Demokrasi Liberal, kabinet dipimpin oleh...', 'perdana menteri', 'presiden', 'wakil presiden', 'ketua MPRS'],
        ],
        [
          ['Konferensi Asia Afrika tahun 1955 diselenggarakan di kota...', 'Bandung', 'Jakarta', 'Bogor', 'Yogyakarta'],
          ['Pemilu 1955 diadakan untuk memilih anggota DPR dan anggota...', 'Konstituante', 'MPRS', 'DPD', 'presiden'],
        ],
        [
          ['Empat partai dengan suara terbanyak pada Pemilu 1955 adalah...', 'PNI, Masyumi, NU, dan PKI', 'PNI, Golkar, PPP, dan PDI', 'Masyumi, PSI, Murba, dan NU', 'PKI, PSI, Parkindo, dan Partai Katolik'],
          ['Gerakan DI/TII di Jawa Barat dipimpin oleh...', 'S.M. Kartosoewirjo', 'Kahar Muzakkar', 'Daud Beureueh', 'Ibnu Hadjar'],
        ],
        [
          ['Gerakan PRRI (1958) dideklarasikan di wilayah...', 'Sumatra Barat', 'Sulawesi Utara', 'Jawa Barat', 'Aceh'],
          ['Gerakan Permesta berpusat di wilayah...', 'Sulawesi', 'Sumatra Barat', 'Kalimantan Selatan', 'Maluku'],
        ],
        [
          ['Kabinet pertama setelah Indonesia kembali menjadi negara kesatuan (1950–1951) adalah Kabinet...', 'Natsir', 'Ali Sastroamidjojo I', 'Djuanda', 'Burhanuddin Harahap'],
          ['Salah satu penyebab kabinet sering jatuh bangun pada masa Demokrasi Liberal adalah...', 'mosi tidak percaya dari parlemen', 'presiden membubarkan kabinet setiap tahun', 'partai politik dilarang', 'pemilu diadakan setiap tahun'],
        ],
      ] },
      { id: 'terpimpin', label: 'Demokrasi Terpimpin', name: 'Demo­krasi Terpimpin', emoji: '🎯', accent: '#7C3AED', levels: [
        [
          ['Masa Demokrasi Terpimpin dimulai dengan dikeluarkannya...', 'Dekrit Presiden 5 Juli 1959', 'Supersemar', 'Maklumat X', 'Mosi Integral'],
          ['Salah satu isi Dekrit Presiden 5 Juli 1959 adalah...', 'kembali ke UUD 1945', 'kembali ke UUDS 1950', 'membentuk RIS', 'mengadakan pemilu tahun 1960'],
        ],
        [
          ['Asian Games ke-4 tahun 1962 diselenggarakan di...', 'Jakarta', 'Bandung', 'Manila', 'Tokyo'],
          ['Nasakom, konsep politik masa Sukarno, adalah singkatan dari...', 'Nasionalis, Agama, Komunis', 'Nasional, Sosial, Komunis', 'Nasionalis, Agama, Kerakyatan', 'Nasional, Asia, Komunitas'],
        ],
        [
          ['GANEFO (1963) adalah...', 'pesta olahraga negara-negara kekuatan baru (New Emerging Forces)', 'konferensi negara-negara Asia Afrika', 'Gerakan Non-Blok', 'organisasi ekonomi Asia Tenggara'],
          ['Operasi Trikora (1961) dicanangkan untuk...', 'membebaskan Irian Barat', 'menumpas PRRI', 'berkonfrontasi dengan Malaysia', 'membangun Monas'],
        ],
        [
          ['Proyek mercusuar masa Sukarno, seperti Hotel Indonesia, sebagian didanai dari...', 'dana pampasan perang Jepang', 'pinjaman IMF', 'hasil ekspor minyak tahun 1970-an', 'dana Marshall Plan'],
          ['Kebijakan sanering Desember 1965 berarti...', 'nilai uang dipotong, Rp1.000 lama menjadi Rp1 baru', 'gaji pegawai dinaikkan dua kali lipat', 'uang dicetak tanpa batas', 'semua pajak dihapus'],
        ],
        [
          ['Dwikora (1964) dikumandangkan dalam rangka...', 'konfrontasi dengan Malaysia', 'pembebasan Irian Barat', 'penumpasan DI/TII', 'kembali ke UUD 1945'],
          ['Peristiwa yang menjadi pemicu runtuhnya Demokrasi Terpimpin adalah...', 'Gerakan 30 September 1965', 'Pemilu 1955', 'Peristiwa Malari', 'Dekrit 5 Juli 1959'],
        ],
      ] },
      { id: 'orba', label: 'Orde Baru', name: 'Orde Baru', emoji: '🌾', accent: '#A16207', levels: [
        [
          ['Presiden Indonesia pada masa Orde Baru adalah...', 'Soeharto', 'Sukarno', 'B.J. Habibie', 'Abdurrahman Wahid'],
          ['Surat perintah yang menjadi awal peralihan kekuasaan kepada Soeharto dikenal dengan nama...', 'Supersemar', 'Dekrit Presiden', 'Tritura', 'Mosi Integral'],
        ],
        [
          ['Tritura (1966) berisi tuntutan: bubarkan PKI, rombak Kabinet Dwikora, dan...', 'turunkan harga', 'adakan pemilu', 'kembali ke UUD 1945', 'bebaskan Irian Barat'],
          ['ASEAN didirikan pada 8 Agustus 1967 melalui Deklarasi...', 'Bangkok', 'Bandung', 'Jakarta', 'Manila'],
        ],
        [
          ['Pada 1973, partai politik disederhanakan (fusi) sehingga kontestan pemilu menjadi...', 'PPP, Golkar, dan PDI', 'PNI, Masyumi, dan PKI', 'Golkar dan PDI saja', 'lima partai'],
          ['Program pembangunan lima tahunan pada masa Orde Baru disebut...', 'Repelita', 'Trikora', 'Nawacita', 'Tritura'],
        ],
        [
          ['Pada 1984 Indonesia mencapai keberhasilan yang kemudian mendapat penghargaan FAO, yaitu...', 'swasembada beras', 'menurunkan inflasi di bawah 1%', 'bebas buta huruf', 'menjadi tuan rumah KAA'],
          ['Peristiwa Malari (1974) adalah demonstrasi mahasiswa yang antara lain menentang...', 'dominasi modal asing, terutama Jepang', 'Dekrit Presiden', 'Perjanjian Renville', 'pembubaran PKI'],
        ],
        [
          ['Soeharto menyatakan berhenti dari jabatan presiden pada...', '21 Mei 1998', '12 Mei 1998', '11 Maret 1966', '20 Oktober 1999'],
          ['Saat krisis moneter 1997–1998, pemerintah Orde Baru meminta bantuan kepada...', 'IMF', 'ASEAN', 'Gerakan Non-Blok', 'OPEC'],
        ],
      ] },
      { id: 'reformasi', label: 'Reformasi', name: 'Refor­masi', emoji: '📣', accent: '#DB2777', levels: [
        [
          ['Presiden yang menggantikan Soeharto pada 1998 adalah...', 'B.J. Habibie', 'Abdurrahman Wahid', 'Megawati Soekarnoputri', 'Susilo Bambang Yudhoyono'],
          ['Pada Pemilu 2004, untuk pertama kalinya rakyat Indonesia memilih presiden secara...', 'langsung', 'melalui MPR', 'melalui DPR', 'melalui referendum'],
        ],
        [
          ['Tragedi yang menewaskan empat mahasiswa pada 12 Mei 1998 dikenal sebagai Tragedi...', 'Trisakti', 'Semanggi I', 'Malari', 'Tanjung Priok'],
          ['Kebijakan yang memberi daerah kewenangan lebih besar untuk mengatur urusannya sendiri disebut...', 'otonomi daerah', 'sentralisasi', 'dwifungsi', 'transmigrasi'],
        ],
        [
          ['Gempa dan tsunami besar melanda Aceh pada...', '26 Desember 2004', '27 Mei 2006', '28 September 2018', '17 Juli 2006'],
          ['Fenomena tanah yang "mencair" saat gempa Palu 2018 disebut...', 'likuefaksi', 'erupsi', 'abrasi', 'sedimentasi'],
        ],
        [
          ['Pada masa Presiden B.J. Habibie, wilayah yang lepas dari Indonesia melalui jajak pendapat 1999 adalah...', 'Timor Timur', 'Aceh', 'Papua', 'Maluku'],
          ['Salah satu tuntutan Reformasi terkait militer adalah penghapusan...', 'dwifungsi ABRI', 'otonomi daerah', 'pemilu langsung', 'kebebasan pers'],
        ],
        [
          ['Pada Januari 1998, nilai rupiah anjlok dari sekitar Rp2.500 menjadi sekitar ... per dolar AS.', 'Rp11.700', 'Rp5.000', 'Rp25.000', 'Rp3.500'],
          ['Pada masa Reformasi, UUD 1945 diamandemen sebanyak...', '4 kali (1999–2002)', '2 kali', '1 kali', '6 kali'],
        ],
      ] },
    ],
  };

  /* ===================================================== */
  /*  BIOLOGI · Kelas 12 SMA, Kurikulum Merdeka            */
  /* ===================================================== */
  const L = 'ABCDEGHKMPRT'; // huruf untuk nama gen
  const biologi = {
    id: 'bio', label: 'Biologi', emoji: '🧬', accent: '#15803D',
    desc: 'Kelas 12 · Kurikulum Merdeka',
    topics: [
      { id: 'enzim', label: 'Enzim', name: 'Enzim', emoji: '🧪', accent: '#16A34A', levels: [
        [
          ['Enzim berfungsi sebagai...', 'biokatalisator (mempercepat reaksi)', 'sumber energi utama sel', 'hormon pertumbuhan', 'penyimpan informasi genetik'],
          ['Sebagian besar enzim tersusun atas...', 'protein', 'lemak', 'karbohidrat', 'asam nukleat'],
        ],
        [
          ['Zat yang dikenai kerja enzim disebut...', 'substrat', 'produk', 'kofaktor', 'inhibitor'],
          ['Enzim di mulut yang memecah amilum adalah...', 'amilase (ptialin)', 'pepsin', 'lipase', 'tripsin'],
        ],
        [
          ['Bagian enzim tempat substrat berikatan disebut...', 'sisi aktif', 'apoenzim', 'gugus prostetik', 'koenzim'],
          ['Teori kerja enzim yang menyatakan sisi aktif dapat menyesuaikan bentuk dengan substrat adalah teori...', 'induced fit (kecocokan terinduksi)', 'lock and key (gembok-kunci)', 'katalis tetap', 'evolusi enzim'],
        ],
        [
          ['Suhu yang sangat tinggi membuat enzim berhenti bekerja karena enzim mengalami...', 'denaturasi', 'aktivasi', 'hidrolisis', 'fotolisis'],
          ['Inhibitor yang bersaing dengan substrat untuk menempati sisi aktif disebut inhibitor...', 'kompetitif', 'nonkompetitif', 'alosterik positif', 'kofaktor'],
        ],
        [
          ['Bagian enzim yang tersusun dari protein dan tidak tahan panas disebut...', 'apoenzim', 'holoenzim', 'koenzim', 'gugus prostetik'],
          ['Enzim katalase di hati menguraikan H₂O₂ (racun) menjadi...', 'H₂O dan O₂', 'H₂ dan O₂', 'CO₂ dan H₂O', 'glukosa dan O₂'],
        ],
      ] },
      { id: 'meta', label: 'Metabolisme', name: 'Metabo­lisme', emoji: '🔋', accent: '#CA8A04', levels: [
        [
          ['Fotosintesis terjadi di organel...', 'kloroplas', 'mitokondria', 'ribosom', 'lisosom'],
          ['Respirasi seluler menghasilkan energi dalam bentuk...', 'ATP', 'DNA', 'klorofil', 'glukosa'],
        ],
        [
          ['Tahap pertama respirasi seluler yang terjadi di sitoplasma adalah...', 'glikolisis', 'siklus Krebs', 'transpor elektron', 'dekarboksilasi oksidatif'],
          ['Reaksi terang fotosintesis menghasilkan ATP, NADPH, dan...', 'O₂', 'CO₂', 'glukosa', 'air'],
        ],
        [
          ['Siklus Calvin (reaksi gelap) berlangsung di bagian kloroplas yang disebut...', 'stroma', 'tilakoid', 'matriks', 'krista'],
          ['Fermentasi alkohol oleh ragi menghasilkan etanol dan...', 'CO₂', 'O₂', 'asam laktat', 'H₂O'],
        ],
        [
          ['Otot terasa pegal setelah olahraga berat karena penumpukan...', 'asam laktat', 'etanol', 'asam piruvat', 'urea'],
          ['Pada glikolisis, satu molekul glukosa dipecah menjadi ... molekul asam piruvat.', '2', '1', '4', '6'],
        ],
        [
          ['Tahap respirasi aerob yang menghasilkan ATP paling banyak adalah...', 'transpor elektron', 'glikolisis', 'siklus Krebs', 'dekarboksilasi oksidatif'],
          ['Pembentukan glukosa dari senyawa bukan karbohidrat (misalnya asam laktat) disebut...', 'glukoneogenesis', 'glikogenolisis', 'glikolisis', 'kemosintesis'],
        ],
      ] },
      { id: 'dna', label: 'DNA & Sintesis Protein', name: 'DNA & Protein', emoji: '🧬', accent: '#0891B2', levels: [
        [
          ['Pada DNA, basa adenin berpasangan dengan...', 'timin', 'guanin', 'sitosin', 'urasil'],
          ['Model DNA berbentuk tangga berpilin (double helix) dikemukakan oleh...', 'Watson dan Crick', 'Gregor Mendel', 'Charles Darwin', 'Thomas Morgan'],
        ],
        [
          ['Basa nitrogen yang dimiliki RNA tetapi tidak dimiliki DNA adalah...', 'urasil', 'timin', 'adenin', 'guanin'],
          ['Gula penyusun nukleotida DNA adalah...', 'deoksiribosa', 'ribosa', 'glukosa', 'fruktosa'],
        ],
        [
          ['Proses pembentukan mRNA dari DNA disebut...', 'transkripsi', 'translasi', 'replikasi', 'mutasi'],
          ['Translasi (penerjemahan kode mRNA menjadi protein) terjadi di...', 'ribosom', 'nukleus', 'mitokondria', 'badan Golgi'],
        ],
        [
          ['Tiga basa berurutan pada mRNA yang mengode satu asam amino disebut...', 'kodon', 'antikodon', 'gen', 'intron'],
          ['Jika triplet DNA cetakan adalah TAC, kodon mRNA yang terbentuk adalah...', 'AUG', 'ATG', 'UAC', 'TAC'],
        ],
        [
          ['Jika satu rantai DNA berurutan ATG–CAT, urutan basa pada rantai pasangannya adalah...', 'TAC–GTA', 'ATG–CAT', 'UAC–GUA', 'GCA–TGC'],
          ['Sebuah protein tersusun atas 100 asam amino. Jumlah basa minimal pada mRNA pengodenya (tanpa kodon stop) adalah...', '300', '100', '200', '600'],
        ],
      ] },
      { id: 'sel', label: 'Pembelahan Sel', name: 'Pembe­lahan Sel', emoji: '🔬', accent: '#9333EA', levels: [
        [
          ['Pembelahan sel yang menghasilkan sel anak dengan jumlah kromosom sama dengan induknya adalah...', 'mitosis', 'meiosis', 'gametogenesis', 'fertilisasi'],
          ['Meiosis menghasilkan sel...', 'gamet (sel kelamin)', 'kulit', 'darah merah', 'otot'],
        ],
        [
          ['Pada tahap metafase, kromosom berjajar di...', 'bidang ekuator', 'kutub sel', 'membran inti', 'tepi sitoplasma'],
          ['Satu kali mitosis menghasilkan ... sel anak.', '2', '4', '1', '8'],
        ],
        [
          ['Pindah silang (crossing over) terjadi pada tahap...', 'profase I meiosis', 'metafase mitosis', 'anafase II meiosis', 'telofase I meiosis'],
          ['Meiosis menghasilkan ... sel anak yang haploid.', '4', '2', '1', '8'],
        ],
        [
          ['Sel tubuh manusia memiliki 46 kromosom. Jumlah kromosom pada sel sperma adalah...', '23', '46', '92', '22'],
          ['Peristiwa yang terjadi pada tahap anafase adalah...', 'kromatid saudara berpisah menuju kutub yang berlawanan', 'kromosom berjajar di bidang ekuator', 'membran inti terbentuk kembali', 'benang kromatin mulai memadat'],
        ],
        [
          ['Spermatogenesis dari satu spermatosit primer menghasilkan...', '4 sperma fungsional', '1 sperma dan 3 badan polar', '2 sperma', '8 sperma'],
          ['Oogenesis dari satu oosit primer menghasilkan...', '1 ovum dan 3 badan polar', '4 ovum', '2 ovum dan 2 badan polar', '1 ovum dan 1 badan polar'],
        ],
      ] },
      { id: 'waris', label: 'Pewarisan Sifat', name: 'Pewa­risan Sifat', emoji: '🌱', accent: '#65A30D', levels: [
        [
          ['Bapak genetika yang melakukan percobaan pada kacang ercis adalah...', 'Gregor Mendel', 'Charles Darwin', 'Thomas Morgan', 'Robert Hooke'],
          ['Individu dengan genotipe Bb disebut...', 'heterozigot', 'homozigot dominan', 'homozigot resesif', 'hemizigot'],
        ],
        () => { // monohibrid, jawaban dalam persen
          const a = pick(L), A = a, x = a.toLowerCase();
          const cases = [
            [`${A}${x} × ${A}${x}`, `${x}${x}`, 25], [`${A}${x} × ${A}${x}`, `${A}${x}`, 50], [`${A}${x} × ${A}${x}`, `${A}${A}`, 25],
            [`${A}${x} × ${x}${x}`, `${x}${x}`, 50], [`${A}${A} × ${x}${x}`, `${A}${x}`, 100], [`${A}${x} × ${A}${A}`, `${A}${A}`, 50],
          ];
          const [cross, g, ans] = pick(cases);
          return q(`Persilangan ${cross}. Berapa persen keturunan yang bergenotipe ${g}?`, ans, '%', 'Buat papan Punnett 2 × 2.');
        },
        () => { // jumlah macam gamet
          const n = ri(3, 4), letters = L.split('').sort(() => Math.random() - 0.5).slice(0, n);
          let het = 0, geno = '';
          letters.forEach((c) => {
            const t = ri(0, 2);
            if (t === 0) { geno += c + c.toLowerCase(); het++; } else if (t === 1) geno += c + c; else geno += c.toLowerCase() + c.toLowerCase();
          });
          if (het === 0) { geno = letters[0] + letters[0].toLowerCase() + geno.slice(2); het = 1; }
          return q(`Berapa macam gamet yang dapat dibentuk oleh individu bergenotipe ${geno}?`, 2 ** het, 'macam', 'Rumus: 2ⁿ, n = jumlah pasangan gen heterozigot.');
        },
        () => { // F2 dihibrid
          const total = 16 * ri(5, 25);
          const [ratio, label] = pick([[9, 'bulat-kuning (dominan-dominan)'], [3, 'bulat-hijau (dominan-resesif)'], [1, 'keriput-hijau (resesif-resesif)']]);
          return q(`Persilangan dihibrid BbKk × BbKk menghasilkan ${total} tanaman F2. Berapa tanaman yang berfenotipe ${label}?`, total * ratio / 16, 'tanaman', 'Rasio fenotipe F2 dihibrid = 9 : 3 : 3 : 1.');
        },
        () => pick([
          q('Ayah bergolongan darah A heterozigot (IAi) dan ibu bergolongan darah B heterozigot (IBi). Berapa persen kemungkinan anaknya bergolongan darah O?', 25, '%'),
          q('Ayah bergolongan darah A heterozigot (IAi) dan ibu bergolongan darah B heterozigot (IBi). Berapa persen kemungkinan anaknya bergolongan darah AB?', 25, '%'),
          q('Ayah bergolongan darah AB dan ibu bergolongan darah O. Berapa persen kemungkinan anaknya bergolongan darah O?', 0, '%'),
          q('Ayah bergolongan darah AB dan ibu bergolongan darah O. Berapa persen kemungkinan anaknya bergolongan darah A?', 50, '%'),
          q('Ayah normal dan ibu pembawa (carrier) buta warna. Berapa persen kemungkinan anak laki-laki mereka buta warna?', 50, '%', 'Buta warna terpaut kromosom X.'),
          q('Ayah normal dan ibu pembawa (carrier) buta warna. Berapa persen dari seluruh anak mereka yang buta warna?', 25, '%', 'Buta warna terpaut kromosom X.'),
          q('Ayah buta warna dan ibu normal homozigot. Berapa persen kemungkinan anak perempuan mereka menjadi carrier?', 100, '%', 'Buta warna terpaut kromosom X.'),
        ]),
      ] },
      { id: 'evo', label: 'Evolusi', name: 'Evolusi', emoji: '🦒', accent: '#EA580C', levels: [
        [
          ['Teori evolusi melalui seleksi alam dikemukakan oleh...', 'Charles Darwin', 'Jean-Baptiste Lamarck', 'Gregor Mendel', 'August Weismann'],
          ['Sisa atau jejak makhluk hidup purba yang membatu disebut...', 'fosil', 'artefak', 'mutan', 'spora'],
        ],
        [
          ['Menurut Lamarck, jerapah berleher panjang karena...', 'lehernya sering dipakai sehingga memanjang dan diwariskan', 'seleksi alam memilih jerapah berleher panjang', 'terjadi mutasi acak', 'hasil persilangan dengan hewan lain'],
          ['Kepulauan yang dikunjungi Darwin dan menginspirasi pengamatannya tentang burung finch adalah...', 'Galápagos', 'Hawaii', 'Maluku', 'Madagaskar'],
        ],
        [
          ['Organ dengan asal-usul sama tetapi fungsi berbeda, misalnya sayap kelelawar dan tangan manusia, disebut organ...', 'homolog', 'analog', 'vestigial', 'rudimenter'],
          ['Perubahan warna populasi ngengat Biston betularia di Inggris saat Revolusi Industri adalah contoh...', 'seleksi alam', 'teori Lamarck', 'mutasi buatan', 'rekayasa genetika'],
        ],
        [
          ['Sayap burung dan sayap kupu-kupu berfungsi sama tetapi asal-usulnya berbeda. Keduanya disebut organ...', 'analog', 'homolog', 'vestigial', 'atavisme'],
          ['Hukum Hardy-Weinberg berlaku jika...', 'populasi besar dan perkawinan terjadi secara acak', 'terjadi seleksi alam', 'banyak terjadi migrasi', 'sering terjadi mutasi'],
        ],
        () => { // Hardy-Weinberg
          const qa = pick([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7]);
          if (Math.random() < 0.5) {
            return q(`Dalam suatu populasi, frekuensi alel resesif (q) adalah ${id(qa)}. Berapa persen individu yang bergenotipe heterozigot?`, 2 * qa * (1 - qa) * 100, '%', 'p + q = 1, heterozigot = 2pq.');
          }
          return q(`Dalam suatu populasi, ${id(qa * qa * 100)}% individu bergenotipe homozigot resesif (aa). Berapa persen individu yang heterozigot?`, 2 * qa * (1 - qa) * 100, '%', 'q² = frekuensi aa, p + q = 1, heterozigot = 2pq.');
        },
      ] },
      { id: 'biotek', label: 'Bioteknologi', name: 'Biotek­nologi', emoji: '🧫', accent: '#DB2777', levels: [
        [
          ['Contoh bioteknologi konvensional adalah pembuatan...', 'tempe', 'insulin rekombinan', 'tanaman transgenik', 'domba kloning'],
          ['Mikroorganisme yang digunakan dalam pembuatan tempe adalah...', 'Rhizopus oryzae', 'Lactobacillus bulgaricus', 'Saccharomyces cerevisiae', 'Acetobacter xylinum'],
        ],
        [
          ['Nata de coco dibuat dengan bantuan bakteri...', 'Acetobacter xylinum', 'Rhizopus oryzae', 'Aspergillus wentii', 'Lactobacillus casei'],
          ['Yoghurt dibuat dari susu dengan bantuan bakteri...', 'Lactobacillus bulgaricus', 'Acetobacter xylinum', 'Rhizopus oligosporus', 'Penicillium notatum'],
        ],
        [
          ['Teknik memindahkan gen dari satu organisme ke organisme lain sehingga terbentuk DNA rekombinan disebut...', 'rekayasa genetika', 'kultur jaringan', 'fermentasi', 'hibridisasi konvensional'],
          ['Perbanyakan tanaman dari sel atau jaringan di media steril disebut...', 'kultur jaringan', 'cangkok', 'stek', 'hidroponik'],
        ],
        [
          ['Dalam produksi insulin rekombinan, gen insulin manusia disisipkan ke dalam ... bakteri.', 'plasmid', 'ribosom', 'dinding sel', 'flagel'],
          ['Enzim yang "memotong" DNA pada urutan tertentu dalam rekayasa genetika adalah...', 'enzim restriksi (endonuklease)', 'DNA ligase', 'amilase', 'pepsin'],
        ],
        [
          ['Domba Dolly (1996) adalah hasil kloning dengan teknik...', 'transplantasi inti sel somatik', 'kultur jaringan', 'fertilisasi in vitro', 'teknologi hibridoma'],
          ['Penggabungan sel limfosit B dengan sel kanker untuk menghasilkan antibodi monoklonal disebut teknologi...', 'hibridoma', 'kloning', 'PCR', 'totipotensi'],
        ],
      ] },
    ],
  };

  /* ===================================================== */
  /*  FISIKA · Kelas 12 SMA, Kurikulum Merdeka             */
  /* ===================================================== */
  const PAIRS = [[3, 6, 2], [4, 12, 3], [6, 12, 4], [10, 15, 6], [12, 24, 8], [20, 30, 12], [6, 6, 3], [8, 8, 4], [12, 6, 4], [30, 60, 20]]; // a, b, a×b/(a+b)
  const fisika = {
    id: 'fis', label: 'Fisika', emoji: '⚛️', accent: '#2563EB',
    desc: 'Kelas 12 · Kurikulum Merdeka',
    topics: [
      { id: 'statis', label: 'Listrik Statis', name: 'Listrik Statis', emoji: '⚡', accent: '#EAB308', levels: [
        [
          ['Dua muatan listrik sejenis akan...', 'tolak-menolak', 'tarik-menarik', 'tidak saling memengaruhi', 'saling menetralkan'],
          ['Satuan muatan listrik adalah...', 'coulomb (C)', 'volt (V)', 'farad (F)', 'ampere (A)'],
        ],
        () => {
          const a = ri(1, 9), b = ri(1, 9);
          return q(`Dua muatan q₁ = ${a} μC dan q₂ = ${b} μC terpisah sejauh 3 cm. Berapa besar gaya Coulomb di antara keduanya?`, 10 * a * b, 'N', 'F = k q₁ q₂ / r², k = 9 × 10⁹ N·m²/C², 1 μC = 10⁻⁶ C.');
        },
        () => {
          const [a, b, s] = pick(PAIRS);
          if (Math.random() < 0.5) return q(`Kapasitor ${a} μF dan ${b} μF dirangkai seri. Berapa kapasitas penggantinya?`, s, 'μF', 'Seri: 1/C = 1/C₁ + 1/C₂.');
          return q(`Kapasitor ${a} μF dan ${b} μF dirangkai paralel. Berapa kapasitas penggantinya?`, a + b, 'μF', 'Paralel: C = C₁ + C₂.');
        },
        () => {
          const C = pick([2, 4, 6, 8, 10]), V = pick([10, 20, 30, 50, 100]);
          return q(`Kapasitor ${C} μF diberi tegangan ${V} V. Berapa energi yang tersimpan?`, 0.5 * C * V * V, 'μJ', 'W = ½ C V² (pakai C dalam μF, hasilnya dalam μJ).');
        },
        () => {
          let a = ri(1, 9), c = ri(1, 9); if (a === c) c = a === 9 ? 1 : a + 1;
          return q(`Muatan A = ${a} μC, B = 1 μC, dan C = ${c} μC (semua positif) terletak segaris dengan B tepat di tengah. Jarak A–B dan B–C masing-masing 3 cm. Berapa besar gaya total pada muatan B?`, 10 * Math.abs(a - c), 'N', 'Gaya dari A dan dari C berlawanan arah. k = 9 × 10⁹ N·m²/C².');
        },
      ] },
      { id: 'searah', label: 'Listrik Searah', name: 'Listrik Searah', emoji: '🔋', accent: '#16A34A', levels: [
        [
          ['Satuan hambatan listrik adalah...', 'ohm (Ω)', 'volt (V)', 'ampere (A)', 'watt (W)'],
          ['Alat untuk mengukur kuat arus listrik adalah...', 'amperemeter', 'voltmeter', 'ohmmeter', 'termometer'],
        ],
        () => {
          const R = pick([2, 4, 5, 6, 8, 10, 12, 15, 20, 25, 50]), I = ri(1, 10);
          if (Math.random() < 0.5) return q(`Resistor ${R} Ω dialiri arus ${I} A. Berapa beda potensial di ujung-ujungnya?`, R * I, 'V', 'Hukum Ohm: V = I R.');
          return q(`Resistor ${R} Ω dipasang pada tegangan ${R * I} V. Berapa kuat arus yang mengalir?`, I, 'A', 'Hukum Ohm: I = V / R.');
        },
        () => {
          const [a, b, p] = pick(PAIRS), R1 = ri(1, 20);
          return q(`Resistor ${R1} Ω dirangkai seri dengan rangkaian paralel ${a} Ω dan ${b} Ω. Berapa hambatan totalnya?`, R1 + p, 'Ω', 'Paralel: 1/R = 1/R₁ + 1/R₂, lalu tambahkan yang seri.');
        },
        () => {
          const P = pick([20, 40, 50, 100, 200, 250, 500, 1000]), h = pick([2, 4, 5, 6, 8, 10]), d = pick([10, 20, 30]);
          return q(`Alat listrik ${P} W menyala ${h} jam setiap hari selama ${d} hari. Berapa energi yang terpakai?`, P * h * d / 1000, 'kWh', 'W = P × t, lalu ubah Wh ke kWh (bagi 1000).');
        },
        () => {
          const I = ri(1, 5), R = ri(2, 20), r = pick([0.5, 1, 2]);
          return q(`Baterai dengan GGL ${id(I * (R + r))} V dan hambatan dalam ${id(r)} Ω dihubungkan ke resistor ${R} Ω. Berapa tegangan jepitnya (tegangan pada resistor)?`, I * R, 'V', 'I = ε / (R + r), lalu V = I R.');
        },
      ] },
      { id: 'magnet', label: 'Kemagnetan', name: 'Kemag­netan', emoji: '🧲', accent: '#DC2626', levels: [
        [
          ['Kutub magnet yang sejenis akan...', 'tolak-menolak', 'tarik-menarik', 'saling menetralkan', 'tidak berinteraksi'],
          ['Alat yang mengubah energi gerak menjadi energi listrik adalah...', 'generator', 'motor listrik', 'transformator', 'kapasitor'],
        ],
        [
          ['Alat yang mengubah energi listrik menjadi energi gerak memakai gaya magnet adalah...', 'motor listrik', 'generator', 'transformator', 'kapasitor'],
          ['Transformator hanya dapat bekerja pada arus...', 'bolak-balik (AC)', 'searah (DC)', 'baterai', 'statis'],
        ],
        () => {
          const B = pick([0.2, 0.4, 0.5, 1, 2]), I = pick([2, 4, 5, 10]), Lw = pick([0.5, 1, 2]);
          return q(`Kawat sepanjang ${id(Lw)} m berarus ${I} A berada tegak lurus dalam medan magnet ${id(B)} T. Berapa gaya Lorentz pada kawat?`, B * I * Lw, 'N', 'F = B I L.');
        },
        () => {
          const [Np, Ns] = pick([[200, 100], [400, 100], [1000, 100], [2000, 100], [1000, 200], [100, 200], [500, 100]]);
          return q(`Transformator ideal memiliki ${Np} lilitan primer dan ${Ns} lilitan sekunder. Jika tegangan primernya 220 V, berapa tegangan sekundernya?`, 220 * Ns / Np, 'V', 'Vs / Vp = Ns / Np.');
        },
        () => {
          let N, dF, dt, e;
          do { N = pick([50, 100, 200, 500]); dF = pick([0.01, 0.02, 0.05, 0.1]); dt = pick([0.1, 0.2, 0.5, 1]); e = N * dF / dt; } while (Math.abs(e * 100 - Math.round(e * 100)) > 1e-6);
          return q(`Kumparan ${N} lilitan mengalami perubahan fluks magnet ${id(dF)} Wb dalam ${id(dt)} sekon. Berapa besar GGL induksi yang timbul?`, e, 'V', 'ε = N ΔΦ / Δt.');
        },
      ] },
      { id: 'ac', label: 'Arus Bolak-Balik', name: 'Arus Bolak-Balik', emoji: '〰️', accent: '#7C3AED', levels: [
        [
          ['Listrik PLN di rumah merupakan arus...', 'bolak-balik (AC)', 'searah (DC)', 'statis', 'induksi magnet'],
          ['Komponen yang menghambat arus bolak-balik dengan reaktansi induktif adalah...', 'induktor', 'resistor', 'kapasitor', 'dioda'],
        ],
        [
          ['Frekuensi listrik PLN di Indonesia adalah...', '50 Hz', '60 Hz', '100 Hz', '220 Hz'],
          ['Alat untuk melihat bentuk gelombang tegangan AC adalah...', 'osiloskop', 'amperemeter', 'galvanometer', 'termometer'],
        ],
        () => {
          const k = pick([10, 20, 50, 100, 110, 220]);
          return q(`Tegangan maksimum sebuah sumber AC adalah ${k}√2 V. Berapa tegangan efektifnya?`, k, 'V', 'V_ef = V_max / √2.');
        },
        () => {
          if (Math.random() < 0.5) {
            const w = pick([100, 200, 500, 1000]), Lh = pick([0.1, 0.2, 0.5, 1]);
            return q(`Induktor ${id(Lh)} H dipasang pada sumber AC dengan frekuensi sudut ${w} rad/s. Berapa reaktansi induktifnya?`, w * Lh, 'Ω', 'X_L = ω L.');
          }
          const w = pick([100, 200, 500, 1000]), C = pick([10, 20, 50, 100]);
          return q(`Kapasitor ${C} μF dipasang pada sumber AC dengan frekuensi sudut ${w} rad/s. Berapa reaktansi kapasitifnya?`, 1e6 / (w * C), 'Ω', 'X_C = 1 / (ω C), 1 μF = 10⁻⁶ F.');
        },
        () => {
          const [a, b, c] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]), k = pick([1, 2, 5, 10]);
          const R = a * k, X = b * k, XC = pick([10, 20, 30, 40, 50]), XL = XC + X;
          return q(`Rangkaian RLC seri memiliki R = ${R} Ω, X_L = ${XL} Ω, dan X_C = ${XC} Ω. Berapa impedansinya?`, c * k, 'Ω', 'Z = √(R² + (X_L − X_C)²).');
        },
      ] },
      { id: 'gem', label: 'Gelombang Elektromagnetik', name: 'Gelombang EM', emoji: '🌈', accent: '#0EA5E9', levels: [
        [
          ['Gelombang elektromagnetik dapat merambat...', 'tanpa medium (bahkan di ruang hampa)', 'hanya di dalam air', 'hanya di udara', 'hanya di logam'],
          ['Cepat rambat gelombang elektromagnetik di ruang hampa adalah...', '3 × 10⁸ m/s', '340 m/s', '3 × 10⁵ m/s', '1.500 m/s'],
        ],
        [
          ['Gelombang elektromagnetik yang dipakai untuk foto rontgen adalah...', 'sinar-X', 'gelombang radio', 'inframerah', 'cahaya tampak'],
          ['Remote TV dan kamera termal memanfaatkan gelombang...', 'inframerah', 'ultraviolet', 'sinar gamma', 'gelombang mikro'],
        ],
        [
          ['Urutan gelombang elektromagnetik dari frekuensi terbesar ke terkecil yang benar adalah...', 'sinar gamma, sinar-X, ultraviolet', 'gelombang radio, inframerah, ultraviolet', 'cahaya tampak, sinar-X, sinar gamma', 'inframerah, sinar gamma, gelombang radio'],
          ['Gelombang elektromagnetik yang dipakai oven microwave dan radar adalah...', 'gelombang mikro', 'sinar gamma', 'ultraviolet', 'sinar-X'],
        ],
        () => {
          const f = pick([50, 60, 75, 100, 150, 300]);
          return q(`Gelombang radio FM berfrekuensi ${f} MHz. Berapa panjang gelombangnya?`, 300 / f, 'm', 'λ = c / f, c = 3 × 10⁸ m/s, 1 MHz = 10⁶ Hz.');
        },
        () => {
          const f = pick([0.5, 0.6, 0.75, 1, 1.2, 1.5, 3]);
          return q(`Stasiun radio AM memancar pada frekuensi ${id(f)} MHz. Berapa panjang gelombangnya?`, 300 / f, 'm', 'λ = c / f, c = 3 × 10⁸ m/s.');
        },
      ] },
      { id: 'elek', label: 'Elektronika', name: 'Elek­tronika', emoji: '💡', accent: '#F59E0B', levels: [
        [
          ['Komponen semikonduktor yang memancarkan cahaya saat dialiri arus adalah...', 'LED', 'resistor', 'kapasitor', 'transformator'],
          ['Transistor dapat berfungsi sebagai...', 'penguat dan saklar', 'sumber tegangan', 'penyimpan muatan saja', 'pengukur arus'],
        ],
        () => gate(1),
        () => gate(2),
        () => gate(3),
        () => gate(4),
      ] },
      { id: 'modern', label: 'Fisika Modern & Inti', name: 'Fisika Modern', emoji: '🚀', accent: '#4F46E5', levels: [
        [
          ['Teori relativitas khusus dikemukakan oleh...', 'Albert Einstein', 'Max Planck', 'Isaac Newton', 'Niels Bohr'],
          ['Inti atom tersusun atas...', 'proton dan neutron', 'elektron dan proton', 'elektron saja', 'foton dan elektron'],
        ],
        [
          ['Peristiwa lepasnya elektron dari permukaan logam saat disinari cahaya disebut...', 'efek fotolistrik', 'efek Compton', 'radiasi benda hitam', 'peluruhan beta'],
          ['Reaksi inti yang terjadi di Matahari, yaitu penggabungan inti ringan, disebut reaksi...', 'fusi', 'fisi', 'peluruhan alfa', 'ionisasi'],
        ],
        () => {
          const T = pick([2, 3, 5, 10]), n = ri(1, 4), N0 = pick([16, 32, 64, 80, 96, 128, 160, 200, 400]);
          return q(`Zat radioaktif ${N0} gram memiliki waktu paruh ${T} hari. Berapa gram yang tersisa setelah ${T * n} hari?`, N0 / 2 ** n, 'gram', 'N = N₀ × (½)^(t/T).');
        },
        () => {
          if (Math.random() < 0.5) { const t0 = pick([4, 8, 12, 20, 40]); return q(`Sebuah pesawat bergerak dengan kecepatan 0,6c. Menurut astronaut, perjalanan berlangsung ${t0} tahun. Berapa lama menurut pengamat di Bumi?`, t0 * 1.25, 'tahun', 'Δt = γ Δt₀; untuk v = 0,6c, γ = 1,25.'); }
          const t0 = pick([3, 6, 9, 12, 30]);
          return q(`Sebuah pesawat bergerak dengan kecepatan 0,8c. Menurut astronaut, perjalanan berlangsung ${t0} tahun. Berapa lama menurut pengamat di Bumi?`, t0 * 5 / 3, 'tahun', 'Δt = γ Δt₀; untuk v = 0,8c, γ = 5/3.');
        },
        () => {
          const L0 = pick([10, 20, 50, 100, 200]);
          if (Math.random() < 0.5) return q(`Sebuah benda panjangnya ${L0} m saat diam. Berapa panjangnya menurut pengamat jika benda bergerak dengan kecepatan 0,6c?`, L0 * 0.8, 'm', 'L = L₀ √(1 − v²/c²).');
          return q(`Sebuah benda panjangnya ${L0} m saat diam. Berapa panjangnya menurut pengamat jika benda bergerak dengan kecepatan 0,8c?`, L0 * 0.6, 'm', 'L = L₀ √(1 − v²/c²).');
        },
      ] },
    ],
  };

  // Gerbang logika: jawaban 0 atau 1
  function gate(level) {
    const AND = (a, b) => a & b, OR = (a, b) => a | b, XOR = (a, b) => a ^ b;
    const NAND = (a, b) => 1 - (a & b), NOR = (a, b) => 1 - (a | b);
    const A = ri(0, 1), B = ri(0, 1), C = ri(0, 1);
    const hint = 'Jawab dengan 0 atau 1.';
    if (level === 1) {
      const [n, f] = pick([['AND', AND], ['OR', OR]]);
      return q(`Gerbang ${n} mendapat input A = ${A} dan B = ${B}. Berapa outputnya?`, f(A, B), '', hint);
    }
    if (level === 2) {
      const [n, f] = pick([['NAND', NAND], ['NOR', NOR], ['XOR', XOR]]);
      return q(`Gerbang ${n} mendapat input A = ${A} dan B = ${B}. Berapa outputnya?`, f(A, B), '', hint);
    }
    if (level === 3) {
      const [expr, val] = pick([
        ['(A AND B) OR C', OR(AND(A, B), C)], ['(A OR B) AND C', AND(OR(A, B), C)],
        ['NOT A AND B', AND(1 - A, B)], ['(A XOR B) OR C', OR(XOR(A, B), C)], ['(A NAND B) AND C', AND(NAND(A, B), C)],
      ]);
      return q(`Jika A = ${A}, B = ${B}, dan C = ${C}, berapa output Y = ${expr}?`, val, '', hint);
    }
    const [expr, val] = pick([
      ['NOT((A OR B) AND C)', 1 - AND(OR(A, B), C)], ['(A NAND B) XOR (B NOR C)', XOR(NAND(A, B), NOR(B, C))],
      ['(A XOR B) AND (B OR C)', AND(XOR(A, B), OR(B, C))], ['NOT(A AND B) OR (B XOR C)', OR(1 - AND(A, B), XOR(B, C))],
    ]);
    return q(`Jika A = ${A}, B = ${B}, dan C = ${C}, berapa output Y = ${expr}?`, val, '', hint);
  }

  /* ===================================================== */
  /*  KIMIA · Kelas 12 SMA, Kurikulum Merdeka              */
  /* ===================================================== */
  const DEC = ['', '0,1', '0,01', '0,001', '0,0001'];
  const E0 = { Mg: -2.37, Al: -1.66, Zn: -0.76, Fe: -0.44, Ni: -0.25, Pb: -0.13, Cu: 0.34, Ag: 0.8 };
  const kimia = {
    id: 'kim', label: 'Kimia', emoji: '⚗️', accent: '#9333EA',
    desc: 'Kelas 12 · Kurikulum Merdeka',
    topics: [
      { id: 'asam', label: 'Asam Basa & pH', name: 'Asam Basa & pH', emoji: '🧪', accent: '#E11D48', levels: [
        [
          ['Menurut Arrhenius, asam adalah zat yang di dalam air melepaskan ion...', 'H⁺', 'OH⁻', 'Na⁺', 'Cl⁻'],
          ['Kertas lakmus merah akan berubah menjadi biru jika dicelupkan ke larutan...', 'basa', 'asam', 'netral', 'garam dapur'],
        ],
        [
          ['Larutan dengan pH 3 bersifat...', 'asam', 'basa', 'netral', 'amfoter'],
          ['Menurut Brønsted-Lowry, basa adalah zat yang...', 'menerima proton (H⁺)', 'memberi proton (H⁺)', 'menerima pasangan elektron', 'melepas ion OH⁻ saja'],
        ],
        () => {
          const n = ri(1, 4);
          if (Math.random() < 0.6) { const a = pick(['HCl', 'HNO₃', 'HBr']); return q(`Berapa pH larutan ${a} ${DEC[n]} M?`, n, '', 'Asam kuat: [H⁺] = M × valensi, pH = −log[H⁺].'); }
          const c = ['', '0,05', '0,005', '0,0005', '0,00005'][n];
          return q(`Berapa pH larutan H₂SO₄ ${c} M?`, n, '', 'H₂SO₄ melepas 2 ion H⁺: [H⁺] = 2 × M.');
        },
        () => {
          const n = ri(1, 4);
          if (Math.random() < 0.6) { const b = pick(['NaOH', 'KOH']); return q(`Berapa pH larutan ${b} ${DEC[n]} M?`, 14 - n, '', 'pOH = −log[OH⁻], pH = 14 − pOH.'); }
          const c = ['', '0,05', '0,005', '0,0005', '0,00005'][n];
          return q(`Berapa pH larutan Ba(OH)₂ ${c} M?`, 14 - n, '', 'Ba(OH)₂ melepas 2 ion OH⁻: [OH⁻] = 2 × M.');
        },
        () => {
          const a = ri(1, 2), b = ri(1, 2), V1 = pick([10, 20, 50, 100]), V2 = V1 * 10 ** b;
          return q(`Sebanyak ${V1} mL HCl ${DEC[a]} M diencerkan dengan air hingga volumenya ${V2} mL. Berapa pH larutan sekarang?`, a + b, '', 'M₁V₁ = M₂V₂.');
        },
      ] },
      { id: 'setimbang', label: 'Kesetimbangan Larutan', name: 'Kese­timbangan Larutan', emoji: '⚖️', accent: '#0D9488', levels: [
        [
          ['Larutan penyangga (buffer) berfungsi untuk...', 'mempertahankan pH saat ditambah sedikit asam atau basa', 'menaikkan pH secara drastis', 'menetralkan semua asam', 'mempercepat reaksi'],
          ['Larutan yang mengandung asam lemah dan basa konjugasinya disebut...', 'larutan penyangga', 'larutan jenuh', 'larutan elektrolit kuat', 'koloid'],
        ],
        [
          ['Garam NaCl (dari asam kuat dan basa kuat) dalam air bersifat...', 'netral (tidak terhidrolisis)', 'asam', 'basa', 'amfoter'],
          ['Garam NH₄Cl (dari basa lemah dan asam kuat) dalam air bersifat...', 'asam', 'basa', 'netral', 'tidak larut'],
        ],
        [
          ['Garam CH₃COONa (dari asam lemah dan basa kuat) dalam air bersifat...', 'basa', 'asam', 'netral', 'tidak larut'],
          ['Endapan akan terbentuk jika hasil kali konsentrasi ion (Qsp)...', 'lebih besar dari Ksp', 'lebih kecil dari Ksp', 'sama dengan nol', 'sama dengan pH'],
        ],
        [
          ['Pasangan penyangga yang menjaga pH darah manusia adalah...', 'H₂CO₃ dan HCO₃⁻', 'HCl dan NaCl', 'NaOH dan NaCl', 'H₂SO₄ dan Na₂SO₄'],
          ['Pada titrasi asam basa, titik saat mol asam tepat sama dengan mol basa disebut...', 'titik ekuivalen', 'titik didih', 'titik beku', 'titik leleh'],
        ],
        () => {
          let Mb, Vb, Va, Ma;
          do { Mb = pick([0.1, 0.2]); Vb = pick([10, 15, 20, 25, 30, 40]); Va = pick([10, 20, 25, 50]); Ma = Mb * Vb / Va; } while (Math.abs(Ma * 1000 - Math.round(Ma * 1000)) > 1e-6);
          return q(`Sebanyak ${Va} mL larutan HCl dititrasi dengan NaOH ${id(Mb)} M. Titik ekuivalen tercapai setelah ${Vb} mL NaOH. Berapa molaritas HCl?`, Ma, 'M', 'Ma × Va = Mb × Vb (keduanya bervalensi 1).');
        },
      ] },
      { id: 'koligatif', label: 'Sifat Koligatif', name: 'Sifat Koligatif', emoji: '❄️', accent: '#0284C7', levels: [
        [
          ['Sifat koligatif larutan bergantung pada...', 'jumlah partikel zat terlarut', 'jenis zat terlarut', 'warna larutan', 'bentuk wadah'],
          ['Larutan gula mendidih pada suhu ... air murni.', 'lebih tinggi daripada', 'lebih rendah daripada', 'sama dengan', 'setengah dari'],
        ],
        [
          ['Menaburkan garam di jalan bersalju memanfaatkan sifat koligatif...', 'penurunan titik beku', 'kenaikan titik didih', 'tekanan osmosis', 'penurunan tekanan uap'],
          ['Cairan infus harus memiliki tekanan osmosis yang sama dengan cairan sel darah, yang disebut...', 'isotonik', 'hipotonik', 'hipertonik', 'isotop'],
        ],
        () => {
          const [name, Mr] = pick([['urea', 60], ['glukosa', 180]]), n = pick([0.1, 0.2, 0.25, 0.5]), p = pick([250, 500, 1000]);
          return q(`Sebanyak ${id(n * Mr)} gram ${name} (Mr = ${Mr}) dilarutkan dalam ${p} gram air. Berapa molalitas larutan?`, n * 1000 / p, 'm', 'm = (massa / Mr) × (1000 / massa pelarut).');
        },
        () => {
          const m = pick([0.5, 1, 1.5, 2]);
          if (Math.random() < 0.5) return q(`Larutan urea ${id(m)} molal dalam air. Berapa titik beku larutan? (Kf air = 1,86 °C/m)`, -1.86 * m, '°C', 'ΔTf = m × Kf, titik beku air murni 0 °C. Jangan lupa tanda minus (±).');
          return q(`Larutan glukosa ${id(m)} molal dalam air. Berapa titik didih larutan? (Kb air = 0,52 °C/m)`, 100 + 0.52 * m, '°C', 'ΔTb = m × Kb, titik didih air murni 100 °C.');
        },
        () => {
          const [s, i] = pick([['NaCl', 2], ['KCl', 2], ['MgSO₄', 2], ['CaCl₂', 3], ['Na₂SO₄', 3]]), m = pick([0.1, 0.2, 0.5]);
          return q(`Larutan ${s} ${id(m)} molal terionisasi sempurna dalam air. Berapa titik beku larutan? (Kf air = 1,86 °C/m)`, -1.86 * m * i, '°C', 'Elektrolit: ΔTf = m × Kf × i, i = jumlah ion. Jangan lupa tanda minus (±).');
        },
      ] },
      { id: 'koloid', label: 'Koloid', name: 'Koloid', emoji: '🌫️', accent: '#64748B', levels: [
        [
          ['Campuran dengan ukuran partikel di antara larutan sejati dan suspensi disebut...', 'koloid', 'larutan', 'suspensi', 'senyawa'],
          ['Susu termasuk koloid jenis...', 'emulsi', 'buih', 'aerosol', 'sol'],
        ],
        [
          ['Efek Tyndall adalah...', 'penghamburan cahaya oleh partikel koloid', 'gerak acak partikel koloid', 'penyerapan ion oleh koloid', 'penggumpalan koloid'],
          ['Gerak zig-zag partikel koloid disebut...', 'gerak Brown', 'efek Tyndall', 'elektroforesis', 'koagulasi'],
        ],
        [
          ['Asap termasuk aerosol padat, yaitu koloid dengan fase terdispersi ... dalam medium ...', 'padat, gas', 'cair, gas', 'gas, cair', 'padat, cair'],
          ['Penjernihan air dengan tawas memanfaatkan sifat koloid...', 'koagulasi', 'efek Tyndall', 'gerak Brown', 'dialisis'],
        ],
        [
          ['Pembuatan koloid dengan memecah partikel besar menjadi ukuran koloid disebut cara...', 'dispersi', 'kondensasi', 'dialisis', 'koagulasi'],
          ['Cuci darah pada pasien gagal ginjal memanfaatkan prinsip...', 'dialisis', 'adsorpsi', 'efek Tyndall', 'elektroforesis'],
        ],
        [
          ['Koloid yang fase terdispersinya menarik medium pendispersi, misalnya agar-agar dan gelatin, disebut koloid...', 'liofil', 'liofob', 'aerosol', 'buih'],
          ['Pada mayones, kuning telur berperan sebagai...', 'pengemulsi (emulgator)', 'koagulan', 'pelarut', 'katalis'],
        ],
      ] },
      { id: 'elkim', label: 'Redoks & Elektrokimia', name: 'Redoks & Elektro­kimia', emoji: '🔌', accent: '#CA8A04', levels: [
        [
          ['Oksidasi adalah peristiwa...', 'pelepasan elektron', 'penangkapan elektron', 'penurunan bilangan oksidasi', 'penangkapan hidrogen'],
          ['Sel elektrokimia yang mengubah energi kimia menjadi energi listrik disebut...', 'sel volta', 'sel elektrolisis', 'sel surya', 'sel saraf'],
        ],
        [
          ['Pada sel volta, oksidasi terjadi di...', 'anode', 'katode', 'jembatan garam', 'voltmeter'],
          ['Pelapisan sendok besi dengan perak (penyepuhan) memanfaatkan sel...', 'elektrolisis', 'volta', 'bahan bakar', 'surya'],
        ],
        () => {
          const [s, el, b] = pick([['KMnO₄', 'Mn', 7], ['K₂Cr₂O₇', 'Cr', 6], ['H₂SO₄', 'S', 6], ['HNO₃', 'N', 5], ['NH₃', 'N', -3], ['Fe₂O₃', 'Fe', 3], ['SO₂', 'S', 4], ['H₃PO₄', 'P', 5], ['NaClO₃', 'Cl', 5], ['CO₂', 'C', 4], ['H₂S', 'S', -2]]);
          return q(`Berapa bilangan oksidasi ${el} dalam ${s}?`, b, '', 'Biloks O = −2, H = +1, logam golongan IA = +1. Jumlah biloks senyawa = 0.');
        },
        () => {
          const keys = Object.keys(E0);
          let a, c; do { a = pick(keys); c = pick(keys); } while (E0[c] <= E0[a]);
          return q(`Sel volta tersusun dari elektrode ${a} (E° = ${id(E0[a])} V) dan ${c} (E° = ${id(E0[c])} V). Berapa potensial sel standarnya?`, E0[c] - E0[a], 'V', 'E°sel = E° katode − E° anode. Katode = E° lebih besar.');
        },
        () => {
          const f = pick([0.1, 0.2, 0.5]), t = Math.round(f * 10000);
          const [ion, Ar, n] = pick([['AgNO₃', 108, 1], ['CuSO₄', 64, 2]]), metal = ion === 'AgNO₃' ? 'perak (Ar = 108)' : 'tembaga (Ar = 64)';
          return q(`Arus 9,65 A dialirkan ke larutan ${ion} selama ${t} sekon. Berapa gram ${metal} yang mengendap?`, Ar / n * f, 'gram', 'm = (Ar / n) × (I × t / 96.500).');
        },
      ] },
      { id: 'karbon', label: 'Gugus Fungsi Senyawa Karbon', name: 'Senyawa Karbon', emoji: '🧴', accent: '#059669', levels: [
        [
          ['Contoh senyawa dengan gugus fungsi –OH (alkohol) adalah...', 'etanol', 'etanal', 'asam asetat', 'aseton'],
          ['Gugus fungsi –COOH dimiliki oleh golongan...', 'asam karboksilat', 'alkohol', 'ester', 'eter'],
        ],
        [
          ['Aseton (pembersih kuteks) termasuk golongan...', 'keton', 'aldehida', 'alkohol', 'ester'],
          ['Formalin adalah larutan dari...', 'metanal (formaldehida)', 'metanol', 'etanol', 'asam formiat'],
        ],
        [
          ['Senyawa beraroma buah-buahan yang dibuat dari asam karboksilat dan alkohol adalah...', 'ester', 'eter', 'keton', 'alkana'],
          ['Nama IUPAC senyawa CH₃–CH₂–OH adalah...', 'etanol', 'metanol', 'propanol', 'etanal'],
        ],
        [
          ['Reaksi asam karboksilat dengan alkohol yang menghasilkan ester disebut...', 'esterifikasi', 'saponifikasi', 'adisi', 'eliminasi'],
          ['Pereaksi Fehling dapat digunakan untuk membedakan...', 'aldehida dan keton', 'alkohol dan eter', 'alkana dan alkena', 'ester dan asam karboksilat'],
        ],
        [
          ['Reaksi lemak (ester) dengan basa kuat yang menghasilkan sabun disebut...', 'saponifikasi', 'esterifikasi', 'hidrogenasi', 'polimerisasi'],
          ['Alkohol dan eter saling berisomer fungsi karena memiliki rumus umum yang sama, yaitu...', 'CₙH₂ₙ₊₂O', 'CₙH₂ₙO', 'CₙH₂ₙO₂', 'CₙH₂ₙ₊₂'],
        ],
      ] },
      { id: 'polimer', label: 'Polimer & Biomolekul', name: 'Polimer', emoji: '🧶', accent: '#BE185D', levels: [
        [
          ['Polimer tersusun atas unit-unit kecil berulang yang disebut...', 'monomer', 'isomer', 'katalis', 'ion'],
          ['Contoh polimer alam adalah...', 'protein', 'PVC', 'polietilena', 'nilon'],
        ],
        [
          ['Plastik kantong (polietilena) tersusun dari monomer...', 'etena', 'propena', 'vinil klorida', 'stirena'],
          ['Monomer penyusun protein adalah...', 'asam amino', 'glukosa', 'nukleotida', 'asam lemak'],
        ],
        [
          ['Polimerisasi yang melepaskan molekul kecil seperti H₂O disebut polimerisasi...', 'kondensasi', 'adisi', 'substitusi', 'eliminasi'],
          ['Pipa paralon dibuat dari polimer...', 'PVC (polivinil klorida)', 'teflon', 'nilon', 'karet alam'],
        ],
        [
          ['Uji biuret digunakan untuk mengenali adanya...', 'protein (ikatan peptida)', 'amilum', 'glukosa', 'lemak'],
          ['Larutan iodin berubah menjadi biru tua jika diteteskan pada...', 'amilum', 'glukosa', 'protein', 'lemak'],
        ],
        [
          ['Uji Benedict menghasilkan endapan merah bata pada...', 'gula pereduksi seperti glukosa', 'sukrosa', 'protein', 'lemak'],
          ['Polimer termoset berbeda dengan termoplas karena termoset...', 'tidak dapat dilunakkan kembali saat dipanaskan', 'dapat didaur ulang dengan dilelehkan', 'hanya tersusun dari satu jenis monomer', 'larut dalam air'],
        ],
      ] },
    ],
  };

  /* ===================================================== */
  /*  AI                                                   */
  /* ===================================================== */
  const ai = {
    id: 'ai', label: 'AI', emoji: '🤖', accent: '#0F766E',
    desc: 'Kecerdasan Artifisial',
    topics: [
      { id: 'dasar', label: 'Dasar AI', name: 'Dasar AI', emoji: '🤖', accent: '#0D9488', levels: [
        [
          ['AI adalah singkatan dari...', 'Artificial Intelligence', 'Automatic Internet', 'Advanced Interface', 'Artificial Internet'],
          ['Contoh penerapan AI dalam kehidupan sehari-hari adalah...', 'rekomendasi video di YouTube', 'kalkulator saku biasa', 'lampu senter', 'jam dinding'],
        ],
        [
          ['Tes untuk menilai apakah mesin dapat bercakap seperti manusia diusulkan oleh...', 'Alan Turing', 'Bill Gates', 'Elon Musk', 'Charles Babbage'],
          ['AI yang hanya mampu mengerjakan satu jenis tugas (misalnya bermain catur) disebut...', 'narrow AI (AI sempit)', 'general AI', 'super AI', 'robot humanoid'],
        ],
        [
          ['Istilah "Artificial Intelligence" pertama kali diperkenalkan pada konferensi Dartmouth tahun...', '1956', '1945', '1980', '2001'],
          ['Komputer IBM yang mengalahkan juara dunia catur Garry Kasparov pada 1997 bernama...', 'Deep Blue', 'Watson', 'AlphaGo', 'ELIZA'],
        ],
        [
          ['AlphaGo, yang mengalahkan pemain Go profesional Lee Sedol pada 2016, dikembangkan oleh...', 'DeepMind', 'IBM', 'Microsoft', 'OpenAI'],
          ['Hubungan yang benar antara AI, machine learning (ML), dan deep learning (DL) adalah...', 'DL bagian dari ML, dan ML bagian dari AI', 'AI bagian dari ML, dan ML bagian dari DL', 'ML bagian dari DL, dan DL bagian dari AI', 'ketiganya tidak berhubungan'],
        ],
        [
          ['Chatbot pertama di dunia (1966) yang meniru percakapan psikoterapis bernama...', 'ELIZA', 'Siri', 'Watson', 'Alexa'],
          ['Sistem AI berbasis aturan "jika–maka" yang meniru keahlian seorang pakar disebut...', 'sistem pakar (expert system)', 'jaringan saraf tiruan', 'algoritma genetika', 'clustering'],
        ],
      ] },
      { id: 'ml', label: 'Machine Learning', name: 'Machine Learning', emoji: '📈', accent: '#2563EB', levels: [
        [
          ['Machine learning adalah cara membuat komputer...', 'belajar dari data', 'bekerja tanpa listrik', 'hanya mengikuti perintah tetap', 'menyimpan file lebih cepat'],
          ['Data yang dipakai untuk melatih model disebut data...', 'latih (training)', 'uji (testing)', 'cadangan', 'sampah'],
        ],
        [
          ['Supervised learning menggunakan data yang...', 'sudah berlabel', 'tidak berlabel', 'berupa hadiah dan hukuman', 'hanya berupa gambar'],
          ['Mengelompokkan pelanggan tanpa label berdasarkan kemiripannya disebut...', 'clustering', 'klasifikasi', 'regresi', 'labeling'],
        ],
        [
          ['Memprediksi harga rumah (berupa angka kontinu) adalah contoh tugas...', 'regresi', 'klasifikasi', 'clustering', 'reinforcement learning'],
          ['Belajar dari hadiah (reward) dan hukuman, seperti AI pemain game, disebut...', 'reinforcement learning', 'supervised learning', 'unsupervised learning', 'transfer learning'],
        ],
        [
          ['Model yang sangat bagus di data latih tetapi buruk di data baru mengalami...', 'overfitting', 'underfitting', 'normalisasi', 'augmentasi'],
          ['Algoritma k-Nearest Neighbors (k-NN) menentukan kelas data baru berdasarkan...', 'kelas mayoritas dari tetangga terdekatnya', 'rata-rata seluruh data', 'urutan abjad', 'data yang paling lama'],
        ],
        [
          ['Teknik membagi data menjadi k bagian lalu bergantian menjadikan satu bagian sebagai data uji disebut...', 'k-fold cross validation', 'gradient descent', 'dropout', 'one-hot encoding'],
          ['Gradient descent digunakan untuk...', 'meminimalkan fungsi loss dengan memperbarui parameter model', 'menambah jumlah data latih', 'mengompresi gambar', 'mengenkripsi data'],
        ],
      ] },
      { id: 'nn', label: 'Neural Network', name: 'Neural Network', emoji: '🧠', accent: '#DB2777', levels: [
        [
          ['Neural network (jaringan saraf tiruan) terinspirasi dari...', 'otak manusia', 'jaringan internet', 'sistem tata surya', 'sel tumbuhan'],
          ['Unit pemroses terkecil dalam neural network disebut...', 'neuron (perseptron)', 'piksel', 'bit', 'router'],
        ],
        [
          ['Lapisan neural network yang pertama kali menerima data disebut...', 'input layer', 'output layer', 'hidden layer', 'loss layer'],
          ['Deep learning disebut "deep" karena...', 'memiliki banyak hidden layer', 'datanya disimpan di laut dalam', 'prosesnya sangat lambat', 'hanya memakai satu neuron'],
        ],
        () => {
          const w1 = ri(-3, 4), w2 = ri(-3, 4), b = ri(-5, 5), x1 = ri(1, 6), x2 = ri(1, 6);
          return q(`Sebuah neuron memiliki bobot w₁ = ${w1}, w₂ = ${w2}, dan bias b = ${b}. Inputnya x₁ = ${x1} dan x₂ = ${x2}. Berapa nilai z = w₁x₁ + w₂x₂ + b?`, w1 * x1 + w2 * x2 + b, '', 'Kalikan setiap input dengan bobotnya, jumlahkan, lalu tambah bias.');
        },
        () => {
          const w1 = ri(-4, 3), w2 = ri(-4, 3), b = ri(-6, 4), x1 = ri(1, 5), x2 = ri(1, 5), z = w1 * x1 + w2 * x2 + b;
          return q(`Neuron dengan w₁ = ${w1}, w₂ = ${w2}, b = ${b} menerima x₁ = ${x1} dan x₂ = ${x2}. Fungsi aktivasinya ReLU(z) = max(0, z). Berapa outputnya?`, Math.max(0, z), '', 'Hitung z = w₁x₁ + w₂x₂ + b dulu. ReLU mengubah angka negatif menjadi 0.');
        },
        [
          ['Jenis neural network yang paling umum dipakai untuk mengolah gambar adalah...', 'CNN (Convolutional Neural Network)', 'RNN (Recurrent Neural Network)', 'decision tree', 'k-means'],
          ['Arsitektur yang menjadi dasar model bahasa besar seperti GPT dan Claude adalah...', 'Transformer', 'CNN', 'perseptron satu lapis', 'k-means'],
        ],
      ] },
      { id: 'data', label: 'Data & Evaluasi', name: 'Data & Evaluasi', emoji: '📊', accent: '#CA8A04', levels: [
        [
          ['Proses membersihkan data dari nilai kosong dan duplikat disebut...', 'data cleaning', 'data mining', 'overfitting', 'deployment'],
          ['Kumpulan data yang dipakai untuk melatih dan menguji model AI disebut...', 'dataset', 'database server', 'prompt', 'firmware'],
        ],
        () => {
          const n = pick([20, 40, 50, 80, 100, 200]), pct = pick([60, 70, 75, 80, 85, 90, 95]);
          return q(`Model AI menebak benar ${n * pct / 100} dari ${n} gambar uji. Berapa akurasinya?`, pct, '%', 'Akurasi = benar / total × 100%.');
        },
        () => {
          const n = pick([500, 1000, 1200, 2000, 5000]), test = pick([10, 20, 25, 30]);
          return q(`Dataset berisi ${n} data dibagi menjadi ${100 - test}% data latih dan ${test}% data uji. Berapa banyak data uji?`, n * test / 100, 'data', 'Data uji = total × persentase uji.');
        },
        () => {
          const [tp, fp] = pick([[40, 10], [45, 5], [30, 10], [60, 15], [80, 20], [18, 2], [70, 30], [27, 3]]), fn = ri(3, 20);
          return q(`Model pendeteksi spam menghasilkan TP = ${tp}, FP = ${fp}, FN = ${fn}. Berapa precision model (dalam persen)?`, tp / (tp + fp) * 100, '%', 'Precision = TP / (TP + FP) × 100%.');
        },
        () => {
          const [tp, fn] = pick([[40, 10], [45, 5], [30, 10], [60, 15], [80, 20], [18, 2], [70, 30], [27, 3]]), fp = ri(3, 20);
          return q(`Model pendeteksi penyakit menghasilkan TP = ${tp}, FP = ${fp}, FN = ${fn}. Berapa recall model (dalam persen)?`, tp / (tp + fn) * 100, '%', 'Recall = TP / (TP + FN) × 100%.');
        },
      ] },
      { id: 'llm', label: 'LLM & Prompt', name: 'LLM & Prompt', emoji: '💬', accent: '#7C3AED', levels: [
        [
          ['ChatGPT, Gemini, dan Claude adalah contoh...', 'large language model (LLM)', 'sistem operasi', 'mesin pencari offline', 'antivirus'],
          ['Perintah atau pertanyaan yang kita tulis untuk chatbot AI disebut...', 'prompt', 'output', 'dataset', 'firmware'],
        ],
        [
          ['Ketika AI membuat informasi yang terdengar meyakinkan tetapi salah, itu disebut...', 'halusinasi', 'overfitting', 'enkripsi', 'latensi'],
          ['LLM menghasilkan teks dengan cara...', 'memprediksi token berikutnya berdasarkan konteks', 'menyalin jawaban dari satu situs', 'mencari kata di kamus', 'mengacak kata-kata'],
        ],
        [
          ['Potongan teks (kata atau bagian kata) yang diproses LLM disebut...', 'token', 'piksel', 'byte code', 'prompt'],
          ['Memberi beberapa contoh soal dan jawaban di dalam prompt agar AI meniru polanya disebut...', 'few-shot prompting', 'zero-shot prompting', 'fine-tuning', 'pretraining'],
        ],
        [
          ['Meminta model menguraikan langkah berpikirnya sebelum menjawab dikenal sebagai teknik...', 'chain-of-thought', 'prompt injection', 'jailbreak', 'tokenisasi'],
          ['Melatih ulang model yang sudah jadi dengan data khusus agar ahli di satu tugas disebut...', 'fine-tuning', 'pretraining', 'prompting', 'inference'],
        ],
        [
          ['Teknik RAG (Retrieval-Augmented Generation) membuat LLM menjawab dengan cara...', 'mengambil dokumen yang relevan dulu, lalu menyusun jawaban', 'menghapus memorinya setiap pertanyaan', 'melatih ulang model setiap kali ditanya', 'menebak secara acak'],
          ['Serangan yang menyisipkan instruksi tersembunyi agar AI melanggar perintah aslinya disebut...', 'prompt injection', 'phishing', 'DDoS', 'brute force'],
        ],
      ] },
      { id: 'cv', label: 'Vision & Suara', name: 'Vision & Suara', emoji: '👁️', accent: '#0284C7', levels: [
        [
          ['Membuka kunci HP dengan wajah memakai teknologi AI...', 'pengenalan wajah (face recognition)', 'pengenalan suara', 'penerjemah bahasa', 'sistem rekomendasi'],
          ['Mengubah ucapan menjadi tulisan disebut...', 'speech-to-text', 'text-to-speech', 'OCR', 'text-to-image'],
        ],
        [
          ['Teknologi yang membaca tulisan dari foto dokumen disebut...', 'OCR (Optical Character Recognition)', 'QR code', 'GPS', 'NFC'],
          ['Gambar digital tersusun dari titik-titik kecil yang disebut...', 'piksel', 'token', 'neuron', 'byte'],
        ],
        [
          ['Tugas AI menemukan letak dan jenis setiap objek dalam gambar (misalnya kotak di sekitar mobil) disebut...', 'object detection', 'image classification', 'OCR', 'speech recognition'],
          ['Bidang AI yang membuat komputer memahami bahasa manusia disebut...', 'NLP (Natural Language Processing)', 'computer vision', 'robotika', 'Internet of Things'],
        ],
        () => {
          const w = pick([10, 20, 28, 32, 50, 64, 100]), h = pick([10, 20, 28, 32, 50, 64, 100]);
          return q(`Gambar berwarna RGB berukuran ${w} × ${h} piksel. Setiap piksel menyimpan 3 angka (merah, hijau, biru). Berapa total angka yang disimpan?`, w * h * 3, 'angka', 'Total = lebar × tinggi × 3.');
        },
        [
          ['Model AI yang membuat gambar dari deskripsi teks disebut model...', 'text-to-image', 'image-to-text', 'speech-to-text', 'OCR'],
          ['Deepfake adalah...', 'video atau gambar palsu buatan AI yang meniru wajah atau suara seseorang', 'filter foto biasa', 'virus komputer', 'jaringan internet super cepat'],
        ],
      ] },
      { id: 'etika', label: 'Etika AI', name: 'Etika AI', emoji: '⚖️', accent: '#B45309', levels: [
        [
          ['Sebelum menyebarkan informasi dari AI, sebaiknya kita...', 'memeriksa kebenarannya dari sumber tepercaya', 'langsung membagikannya', 'menghapus sumbernya', 'mengubah isinya'],
          ['Mengerjakan tugas sepenuhnya dengan AI lalu mengakuinya sebagai karya sendiri termasuk...', 'plagiarisme', 'kolaborasi', 'riset', 'kreativitas'],
        ],
        [
          ['Bias pada AI bisa muncul karena...', 'data latih yang tidak seimbang', 'komputer terlalu cepat', 'layar terlalu terang', 'koneksi internet lambat'],
          ['Data pribadi seperti NIK sebaiknya...', 'tidak dimasukkan ke chatbot AI publik', 'dibagikan agar AI lebih pintar', 'ditulis di setiap prompt', 'diunggah ke media sosial'],
        ],
        [
          ['Undang-undang Indonesia yang khusus mengatur pelindungan data pribadi adalah...', 'UU No. 27 Tahun 2022 (UU PDP)', 'UU Cipta Kerja', 'UU Sisdiknas', 'UU Penyiaran'],
          ['Prinsip agar alasan di balik keputusan AI dapat dijelaskan disebut...', 'explainability (keterjelasan)', 'scalability', 'latency', 'bandwidth'],
        ],
        [
          ['Contoh dampak bias AI dalam rekrutmen kerja adalah...', 'AI menolak pelamar dari kelompok tertentu karena data historis yang timpang', 'AI menulis surat lamaran', 'AI mempercepat pengiriman email', 'AI menyalakan komputer'],
          ['Tanda air (watermark) pada konten buatan AI bertujuan untuk...', 'menandai bahwa konten dibuat oleh AI', 'membuat gambar lebih tajam', 'mempercepat unduhan', 'menghapus hak cipta'],
        ],
        [
          ['Regulasi AI menyeluruh yang disahkan Uni Eropa pada 2024 dikenal sebagai...', 'EU AI Act', 'GDPR', 'DMCA', 'Paris Agreement'],
          ['Konsep "human in the loop" berarti...', 'manusia tetap mengawasi dan dapat mengoreksi keputusan AI', 'AI menggantikan semua pekerjaan manusia', 'AI hanya bekerja pada malam hari', 'manusia dilarang memakai AI'],
        ],
      ] },
    ],
  };

  /* ===================================================== */
  /*  IT                                                   */
  /* ===================================================== */
  const toBin = (n) => n.toString(2);
  const it = {
    id: 'it', label: 'IT', emoji: '💻', accent: '#334155',
    desc: 'Teknologi Informasi',
    topics: [
      { id: 'hw', label: 'Perangkat Keras', name: 'Perangkat Keras', emoji: '🖥️', accent: '#475569', levels: [
        [
          ['Komponen yang menjadi "otak" komputer dan memproses instruksi adalah...', 'CPU', 'RAM', 'monitor', 'keyboard'],
          ['Contoh perangkat input adalah...', 'keyboard', 'monitor', 'speaker', 'printer'],
        ],
        [
          ['Memori sementara yang isinya hilang saat komputer dimatikan adalah...', 'RAM', 'ROM', 'SSD', 'flashdisk'],
          ['1 byte terdiri atas ... bit.', '8', '4', '16', '10'],
        ],
        [
          ['Kepanjangan GPU adalah...', 'Graphics Processing Unit', 'General Processing Unit', 'Graphic Power Unit', 'Global Processing Utility'],
          ['Media penyimpanan tanpa piringan berputar yang lebih cepat dari HDD adalah...', 'SSD', 'CD-ROM', 'RAM', 'disket'],
        ],
        () => {
          const n = ri(2, 16);
          if (Math.random() < 0.5) return q(`Berapa MB dalam ${n} GB? (1 GB = 1024 MB)`, n * 1024, 'MB');
          return q(`Berapa KB dalam ${n} MB? (1 MB = 1024 KB)`, n * 1024, 'KB');
        },
        () => {
          if (Math.random() < 0.5) { const n = ri(1, 9); return q(`File video berukuran ${n * 512} MB. Berapa GB ukurannya? (1 GB = 1024 MB)`, n / 2, 'GB'); }
          const s = pick([2, 4, 5, 8, 10, 20]), t = pick([30, 60, 90, 120, 300]);
          return q(`File ${s * t} MB diunduh dengan kecepatan stabil ${s} MB/s. Berapa detik waktu unduhnya?`, t, 'detik', 'Waktu = ukuran / kecepatan.');
        },
      ] },
      { id: 'bil', label: 'Sistem Bilangan', name: 'Sistem Bilangan', emoji: '🔢', accent: '#2563EB', levels: [
        () => { const n = ri(2, 15); return q(`Ubah bilangan biner ${toBin(n)}₂ ke desimal.`, n, '', 'Nilai tempat biner: 8, 4, 2, 1.'); },
        () => { const n = ri(5, 31); return q(`Ubah bilangan desimal ${n} ke biner. (Tulis dengan angka 0 dan 1)`, Number(toBin(n)), '', 'Bagi 2 berulang-ulang, baca sisanya dari bawah.'); },
        () => { const n = ri(64, 255); return q(`Ubah bilangan biner ${toBin(n)}₂ ke desimal.`, n, '', 'Nilai tempat 8 bit: 128, 64, 32, 16, 8, 4, 2, 1.'); },
        () => { const n = ri(26, 255); return q(`Ubah bilangan heksadesimal ${n.toString(16).toUpperCase()}₁₆ ke desimal.`, n, '', 'A = 10, B = 11, ..., F = 15. Nilai tempat: 16 dan 1.'); },
        () => {
          const a = ri(5, 31), b = ri(5, 31);
          return q(`Hitung ${toBin(a)}₂ + ${toBin(b)}₂. Tulis hasilnya dalam biner.`, Number(toBin(a + b)), '', '1 + 1 = 10 (tulis 0, simpan 1).');
        },
      ] },
      { id: 'net', label: 'Jaringan', name: 'Jaringan', emoji: '🌐', accent: '#0891B2', levels: [
        [
          ['Jaringan komputer dalam satu gedung atau sekolah disebut...', 'LAN', 'WAN', 'MAN', 'internet'],
          ['Alamat unik setiap perangkat di jaringan disebut...', 'IP address', 'URL', 'email', 'password'],
        ],
        [
          ['Perangkat yang menghubungkan jaringan berbeda dan menentukan jalur data adalah...', 'router', 'switch', 'hub', 'repeater'],
          ['Topologi jaringan dengan semua perangkat terhubung ke satu titik pusat disebut topologi...', 'star', 'bus', 'ring', 'mesh'],
        ],
        [
          ['Layanan yang menerjemahkan nama domain (misalnya google.com) menjadi alamat IP adalah...', 'DNS', 'DHCP', 'FTP', 'SMTP'],
          ['Alamat IPv4 terdiri atas ... bit.', '32', '64', '128', '16'],
        ],
        () => {
          const n = ri(24, 29);
          return q(`Sebuah jaringan memakai prefix /${n}. Berapa jumlah host yang dapat dipakai?`, 2 ** (32 - n) - 2, 'host', 'Host = 2^(32 − prefix) − 2.');
        },
        () => {
          const n = ri(25, 30);
          return q(`Subnet mask /${n} ditulis 255.255.255.x. Berapa nilai x?`, 256 - 2 ** (32 - n), '', 'x = 256 − 2^(32 − prefix).');
        },
      ] },
      { id: 'algo', label: 'Algoritma', name: 'Algoritma', emoji: '🧮', accent: '#7C3AED', levels: [
        [
          ['Urutan langkah logis untuk menyelesaikan suatu masalah disebut...', 'algoritma', 'hardware', 'browser', 'database'],
          ['Algoritma yang ditulis dengan bahasa mirip kode tetapi bukan bahasa pemrograman sungguhan disebut...', 'pseudocode', 'flowchart', 'compiler', 'bytecode'],
        ],
        [
          ['Simbol flowchart berbentuk belah ketupat dipakai untuk...', 'percabangan (keputusan)', 'input/output', 'proses', 'mulai/selesai'],
          ['Struktur yang mengulang langkah selama syarat terpenuhi disebut...', 'perulangan (loop)', 'percabangan', 'variabel', 'komentar'],
        ],
        () => {
          const a = ri(1, 20), b = ri(1, 10), c = ri(2, 5), d = ri(1, 9);
          return q(`x = ${a}; x = x + ${b}; x = x × ${c}; x = x − ${d}. Berapa nilai akhir x?`, (a + b) * c - d, '', 'Jalankan baris demi baris, dari kiri ke kanan.');
        },
        () => {
          const n = ri(5, 20);
          if (Math.random() < 0.5) return q(`total = 0; untuk i = 1 sampai ${n}: total = total + i. Berapa nilai total di akhir?`, n * (n + 1) / 2, '', '1 + 2 + ... + n = n(n + 1) / 2.');
          return q(`hitung = 0; untuk i = 1 sampai ${n * 2}: jika i habis dibagi 2, hitung = hitung + 1. Berapa nilai hitung di akhir?`, n, '');
        },
        () => {
          const a = ri(3, 9), b = ri(3, 9);
          if (Math.random() < 0.5) return q(`c = 0; untuk i = 1 sampai ${a}: untuk j = 1 sampai ${b}: c = c + 1. Berapa nilai c di akhir?`, a * b, '', 'Perulangan bersarang: luar × dalam.');
          return q(`c = 0; untuk i = 1 sampai ${a}: untuk j = 1 sampai i: c = c + 1. Berapa nilai c di akhir?`, a * (a + 1) / 2, '', 'Untuk i = 1 ada 1 putaran, i = 2 ada 2, dan seterusnya.');
        },
      ] },
      { id: 'db', label: 'Basis Data', name: 'Basis Data', emoji: '🗄️', accent: '#059669', levels: [
        [
          ['Kumpulan data yang tersusun rapi dan saling berhubungan disebut...', 'basis data (database)', 'sistem operasi', 'browser', 'jaringan'],
          ['Satu baris data dalam tabel database disebut...', 'record', 'field', 'query', 'server'],
        ],
        [
          ['Kolom dalam tabel database disebut...', 'field (atribut)', 'record', 'file', 'index'],
          ['Bahasa standar untuk mengelola database relasional adalah...', 'SQL', 'HTML', 'CSS', 'Python'],
        ],
        [
          ['Perintah SQL untuk mengambil (menampilkan) data dari tabel adalah...', 'SELECT', 'INSERT', 'DELETE', 'UPDATE'],
          ['Field yang nilainya unik dan menjadi identitas setiap record disebut...', 'primary key', 'foreign key', 'index', 'null'],
        ],
        [
          ['Perintah SQL "DELETE FROM siswa WHERE kelas = \'XII\'" akan...', 'menghapus semua data siswa kelas XII', 'menghapus seluruh tabel siswa', 'menampilkan siswa kelas XII', 'mengubah kelas semua siswa menjadi XII'],
          ['Field di suatu tabel yang merujuk ke primary key tabel lain disebut...', 'foreign key', 'candidate key', 'super key', 'composite index'],
        ],
        [
          ['Fungsi SQL untuk menghitung jumlah baris adalah...', 'COUNT()', 'SUM()', 'AVG()', 'MAX()'],
          ['Perintah JOIN pada SQL digunakan untuk...', 'menggabungkan data dari dua tabel atau lebih berdasarkan kolom yang berhubungan', 'menghapus tabel', 'membuat database baru', 'mengurutkan data'],
        ],
      ] },
      { id: 'sec', label: 'Keamanan Siber', name: 'Keamanan Siber', emoji: '🔐', accent: '#DC2626', levels: [
        [
          ['Password yang paling kuat adalah...', 'Kc8#pL2!vQ', '12345678', 'password', 'namaku2008'],
          ['Program jahat yang dapat merusak atau mencuri data disebut...', 'malware', 'firmware', 'freeware', 'shareware'],
        ],
        [
          ['Penipuan lewat pesan atau email palsu untuk mencuri data login disebut...', 'phishing', 'spamming', 'backup', 'streaming'],
          ['Fitur keamanan yang meminta kode tambahan (misalnya OTP) selain password disebut...', 'autentikasi dua faktor (2FA)', 'enkripsi', 'firewall', 'VPN'],
        ],
        [
          ['Malware yang mengunci file lalu meminta tebusan disebut...', 'ransomware', 'adware', 'spyware', 'worm'],
          ['Sistem yang menyaring lalu lintas jaringan berdasarkan aturan keamanan disebut...', 'firewall', 'DNS', 'DHCP', 'modem'],
        ],
        [
          ['Mengubah data menjadi bentuk yang tidak terbaca tanpa kunci disebut...', 'enkripsi', 'kompresi', 'dekripsi', 'indexing'],
          ['Serangan yang membanjiri server dengan lalu lintas palsu dari banyak perangkat disebut...', 'DDoS', 'phishing', 'brute force', 'spoofing'],
        ],
        () => {
          if (Math.random() < 0.5) { const n = ri(3, 6); return q(`PIN terdiri atas ${n} digit angka (0–9). Berapa banyak kemungkinan kombinasi PIN?`, 10 ** n, 'kombinasi', 'Setiap digit punya 10 pilihan.'); }
          const n = ri(2, 4); return q(`Kata sandi terdiri atas ${n} huruf kecil (a–z, 26 huruf). Berapa banyak kemungkinan kombinasinya?`, 26 ** n, 'kombinasi', 'Setiap posisi punya 26 pilihan.');
        },
      ] },
      { id: 'web', label: 'Web & Internet', name: 'Web & Internet', emoji: '🕸️', accent: '#EA580C', levels: [
        [
          ['Bahasa untuk membuat struktur halaman web adalah...', 'HTML', 'SQL', 'C', 'Excel'],
          ['Aplikasi untuk membuka situs web disebut...', 'browser', 'server', 'compiler', 'antivirus'],
        ],
        [
          ['Bahasa yang mengatur tampilan (warna, tata letak) halaman web adalah...', 'CSS', 'HTML', 'PHP', 'SQL'],
          ['Huruf "S" pada HTTPS menandakan...', 'koneksi yang aman (terenkripsi)', 'situs sekolah', 'server super cepat', 'situs gratis'],
        ],
        [
          ['Tag HTML untuk membuat tautan (link) adalah...', '<a>', '<p>', '<img>', '<div>'],
          ['Kode status HTTP 404 berarti...', 'halaman tidak ditemukan', 'berhasil', 'server sedang error', 'halaman dialihkan'],
        ],
        [
          ['Bahasa yang membuat halaman web interaktif di browser adalah...', 'JavaScript', 'HTML', 'CSS', 'SQL'],
          ['Layanan penyimpanan file situs agar dapat diakses secara online disebut...', 'hosting', 'domain', 'browser', 'cache'],
        ],
        [
          ['Desain web yang tampilannya menyesuaikan ukuran layar HP maupun laptop disebut...', 'responsive design', 'static design', 'flat design', 'dark mode'],
          ['Metode HTTP yang umum dipakai untuk mengirim data formulir ke server adalah...', 'POST', 'HEAD', 'OPTIONS', 'TRACE'],
        ],
      ] },
    ],
  };

  return [sejarah, biologi, fisika, kimia, ai, it];
})();
