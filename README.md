# William Lee — Portfolio

Next.js (App Router) + Tailwind CSS. Avatar voxel 3D digambar pakai renderer canvas buatan sendiri (`lib/voxel.js`), jadi tidak perlu library 3D.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

`npm run dev` cuma bisa dibuka dari laptop ini sendiri. Kalau mau mengetes dari HP lewat Wi-Fi yang sama, pakai `npm run dev:lan`, tapi sebaiknya hanya di jaringan rumah, jangan di Wi-Fi umum atau kampus.

## Yang bisa kamu ubah

| Mau ganti apa | File |
| --- | --- |
| Semua teks, project, email, link sosial | `data/site.js` |
| Tampilan avatar (kulit, rambut, baju, kacamata) | `lib/avatar-config.js` |
| Warna situs (light & dark) | `app/globals.css`, bagian `:root` dan `[data-theme="dark"]` |
| Foto project | `public/img/foto1.jpg` (dan seterusnya) |
| Foto profil (belum dipakai di situs) | `public/img/fotoprofil.jpg` |
| Musik intro (tempo, akor, drum) | `lib/intro-music.js` |
| Game Bingo Math | `public/projects/bingo-math.html` |
| Badge "Open to internships" | `status` di `data/site.js` (isi `""` untuk menyembunyikan) |
| Gambar preview saat link dibagikan | `app/opengraph-image.png` dan `app/twitter-image.png` (1200×630) |

Kalau foto kamu bukan `.jpg`, ganti juga ekstensinya di `data/site.js`.

## Menambah project

1. Taruh gambar preview di `public/img/`, misalnya `foto2.jpg` (ukuran 16:10, contohnya 1600×1000).
2. Di `data/site.js`, salin blok project Bingo Math dan isi `title`, `hook`, `pitch`, `description`, `image`, `url`.
3. Kalau project-nya berupa file HTML seperti Bingo Math, taruh di `public/projects/` lalu isi `url` dengan `/projects/nama-file.html`.

Intro dan halaman Work menyesuaikan sendiri dengan jumlah project. Di intro, satu project dapat 2 bar musik (6 detik), dua project masing-masing 1,5 bar (4,5 detik), dan tiga project atau lebih masing-masing 1 bar (3 detik). Musiknya ikut memanjang. Karena waktunya pendek, buat `pitch` tetap singkat (sekitar 130 karakter) supaya sempat terbaca.

## Avatar

| Kalau pengunjung... | Avatar... |
| --- | --- |
| Membuka halaman | Menyapa lewat balon ucapan piksel, beda di tiap halaman |
| Tap atau klik avatar | Loncat senang, dengan bunyi "boing" |
| Tap 4 kali dengan cepat | Kesal, geleng-geleng sambil melipat tangan, dengan bunyi menggerutu |
| Diam 15 detik | Ketiduran, muncul "zZz" |
| Bergerak lagi setelah itu | Kaget, lalu bangun |
| Pindah halaman lewat menu | Terbang salto ke posisi avatar di halaman baru, lalu mendarat |
| Hover project di halaman Work | Nengok ke project itu dengan muka antusias, sambil nyeletuk |
| Ganti ke dark mode | Menguap, lalu pakai topi tidur selama dark mode |
| Ganti ke light mode | Silau, menutup mata pakai tangan |
| Meng-copy teks di halaman | Nyeletuk "Copying my homework?" |
| Klik "Copy email" (Contact) | Kasih jempol sambil kedip |
| Hover tombol email atau sosmed (Contact) | Nengok ke tombolnya sambil nyeletuk. Kalimatnya diatur di `line` pada `socials` di `data/site.js` |
| Klik email atau "Copy email" (Contact) | Surat pixel terbang ke kotak pos di sebelah avatar, benderanya naik, ada bunyi "ding-dong" |
| Buka Contact saat malam di Jakarta (22.00–07.00 WIB) | Tidur dengan "zZz". Tap untuk membangunkan sebentar |
| Scroll halaman yang panjang | Versi mini-nya jalan di progress bar di atas layar |
| Nyasar ke halaman yang tidak ada (404) | Garuk-garuk kepala kebingungan |

### Kata rahasia

Ketik di mana saja (tanpa perlu klik kolom apa pun):

| Ketik | Hasilnya |
| --- | --- |
| `hi`, `hello`, `halo` | Melambai dan membalas sapaan |
| `william` | Loncat: "That's me!" |
| `dance` atau `joget` | Joget 12 detik diiringi musik chiptune |
| `sleep` atau `tidur` | Langsung ketiduran |

Ekspresi dan pose ada di `lib/voxel.js` (`buildFace` dan `getPose`), reaksi dan kalimatnya di `components/VoxelAvatar.jsx` (`LINES` dan `REACTIONS`), kata rahasia di `components/AvatarExtras.jsx`, animasi terbang antar halaman di `lib/avatar-travel.js`, dan bunyi saat avatar di-tap di `lib/sfx.js`.

Bagian lain situs bisa memicu reaksi avatar dengan event:

```js
window.dispatchEvent(new CustomEvent("avatar:react", { detail: { reaction: "hop", line: "Hey!" } }));
```

## Struktur

```
app/                  halaman (satu folder = satu halaman)
  page.jsx            Home + intro
  about/ skill/ work/ contact/
components/           Nav, Footer, Intro, VoxelAvatar, SpeechBubble, ScrollBuddy, dll.
lib/voxel.js          renderer avatar, ekspresi wajah, dan pose
lib/avatar-travel.js  animasi avatar terbang antar halaman
lib/intro-music.js    musik intro (Web Audio)
data/site.js          semua konten
public/projects/      project yang di-host di situs ini (Bingo Math)
```

## Catatan

- Intro dimulai setelah pengunjung menekan tombol apa saja (di HP: tap layar). Browser melarang suara diputar otomatis, jadi layar start inilah yang bikin musiknya bisa jalan.
- Musik intro dibuat langsung di browser (Web Audio), tanpa file audio. Semua scene intro diatur dalam hitungan beat (80 BPM) di `components/Intro.jsx`, jadi kalau tempo diubah, animasinya ikut menyesuaikan.
- Intro diputar sekali per sesi browser, hanya saat pertama kali membuka Home. Untuk melihatnya lagi, buka tab baru atau hapus `introSeen` di sessionStorage.
- Kalau perangkat mengaktifkan "reduce motion", intro dilewati dan avatar diam (tanpa reaksi gerak, animasi terbang, dan teman scroll). Balon ucapan tetap muncul.
- Tombol "Replay intro" di footer memutar intro lagi kapan saja.
- Gambar preview link (`app/opengraph-image.png`) adalah gambar biasa. Kalau nama atau tagline berubah, gambarnya perlu dibuat ulang.
- Setelah situs online, isi `url` di `data/site.js` dengan alamat situsmu supaya preview link di WhatsApp, LinkedIn, dan X bisa menemukan gambarnya.

## Keamanan

Yang sudah dipasang:

- **Next.js versi yang sudah ditambal** (`~15.5.26` di `package.json`). Versi lama (15.5.4) kena celah remote code execution CVE-2025-66478.
- **Security headers** di `next.config.mjs`: Content-Security-Policy, larangan situs dibungkus iframe situs lain, `nosniff`, `Referrer-Policy`, HSTS, dan `Permissions-Policy` yang mematikan kamera, mikrofon, dan lokasi. Header `X-Powered-By: Next.js` juga dimatikan.
- **`.gitignore`** menolak file `.env*` dan `*.pem`, jadi API key atau password tidak ikut ke GitHub.
- **Email tidak ada di HTML.** Alamatnya baru ditaruh oleh browser setelah halaman terbuka, supaya tidak gampang dipanen bot spam.
- **Dev server hanya di localhost** (lihat bagian Menjalankan).

Kebiasaan yang perlu dijaga:

1. **Update Next.js secara rutin.** Pantau [nextjs.org/blog](https://nextjs.org/blog). Begitu ada rilis keamanan, jalankan `npm update next`, lalu restart. Ada update keamanan yang dijadwalkan Rabu, 14 Oktober 2026.
2. **Sebelum deploy**, jalankan `npm run build` (memastikan tidak ada error) dan `npm audit` (mengecek paket yang rentan).
3. **Jangan taruh API key di kode yang jalan di browser**, termasuk variabel berawalan `NEXT_PUBLIC_`. Simpan di `.env.local` dan pakai hanya di server.
4. **Kalau menambah fitur yang memanggil API** (misalnya "Ask my avatar" dengan AI), wajib ada rate limit, batas biaya, dan proteksi prompt injection, dan API key hanya di server.
5. **Kalau menambah script atau font dari situs lain** (misalnya analytics), domainnya perlu ditambahkan ke Content-Security-Policy di `next.config.mjs`. Kalau tidak, browser akan memblokirnya.
