import connectToDatabase from "../../../../lib/mongodb"; // Mengimpor fungsi untuk menghubungkan ke database MongoDB dari lib/mongodb.js
import Task from "../../../../models/Task"; // Mengimpor model Task yang mewakili skema Task yang akan digunakan

// Fungsi handler utama untuk menangani permintaan API
export default async function handler(req, res) {
  const { method } = req; // Mendapatkan metode HTTP (GET, POST) dari objek request

  await connectToDatabase(); // Menghubungkan ke database MongoDB

  await Task.createCollection(); // Membuat koleksi Task jika belum ada

  // Menggunakan switch untuk menangani metode HTTP yang berbeda
  switch (method) {
    // Menangani permintaan GET untuk mendapatkan semua tasks
    case "GET":
      try {
        const tasks = await Task.find({}); // Mencari semua tasks dalam koleksi
        res.status(200).json({ success: true, data: tasks }); // Mengirim semua tasks yang ditemukan dengan status 200
      } catch (error) {
        res.status(400).json({ success: false }); // Menangani error dengan mengirim status 400
      }
      break;

    // Menangani permintaan POST untuk membuat task baru
    case "POST":
      try {
        const task = await Task.create(req.body); // Membuat task baru dengan data dari body request
        res.status(201).json({ success: true, data: task }); // Mengirim task yang dibuat dengan status 201
      } catch (error) {
        res.status(400).json({ success: false }); // Menangani error dengan mengirim status 400
      }
      break;

    // Default handler untuk metode HTTP yang tidak didukung
    default:
      res.status(400).json({ success: false }); // Mengirim status 400 untuk metode yang tidak didukung
      break;
  }
}
