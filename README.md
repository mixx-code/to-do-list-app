Ini adalah proyek to-do list yang dibuat dengan nextjs

## INSTALLASI

```bash
npx create-next-app@latest
```

ikuti langkah yang tersaji di terminal
serperti :

```bash
-memasukan nama aplikasi
-pilih bahasa (typescript / javascript)
-eslint yes
-tailwint css no
-"src/" directory yes
-app router no (karena saya pakai yang pages router)
```

## Memulai

Pertama, jalankan server pengembangan di local:

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
```

Buka [http://localhost:3000] di browser Anda untuk melihat hasil web yang dibuat.

Anda dapat mulai mengedit halaman dengan memodifikasi `pages/index.js` atau membuat file baru. Halaman akan otomatis diperbarui saat Anda mengedit file tersebut.

[API routes] dapat diakses pada [http://localhost:3000/api/nama folder atau nama file.js]. buat Endpoint baru `pages/api/tasks/`.

Direktori `pages/api` dipetakan ke `/api/*`. File-file dalam direktori ini dianggap sebagai [API routes] bukan halaman React.

## deploy

saya mendeploy aplikasi nextjs saya di vercel

saat melakukan deploy harus menyesuaikan env yang di buat di lokal ke hosting, agar web berjalan dengan baik

## link aplikasi yang sudah di deploy

link : ( https://to-do-list-app-lzpw.vercel.app/ )
