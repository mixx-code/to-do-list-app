import connectToDatabase from "../../../../lib/mongodb"; // Mengimpor fungsi untuk menghubungkan ke database MongoDB
import Task from "../../../../models/Task"; // Mengimpor model Task

// Fungsi handler utama untuk menangani permintaan API
export default async function handler(req, res) {
  const {
    query: { id }, // Mendapatkan ID dari query parameter
    method, // Mendapatkan metode HTTP (GET, PUT, DELETE)
  } = req;

  // Menghubungkan ke database MongoDB
  await connectToDatabase();

  // Menggunakan switch untuk menangani metode HTTP yang berbeda
  switch (method) {
    // Menangani permintaan GET untuk mendapatkan task berdasarkan ID
    case "GET":
      try {
        const task = await Task.findById(id); // Mencari task berdasarkan ID
        if (!task) {
          return res.status(404).json({ success: false }); // Jika task tidak ditemukan, kirim status 404
        }
        res.status(200).json({ success: true, data: task }); // Mengirim task yang ditemukan dengan status 200
      } catch (error) {
        res.status(400).json({ success: false }); // Menangani error dengan mengirim status 400
      }
      break;

    // Menangani permintaan PUT untuk memperbarui task berdasarkan ID
    case "PUT":
      try {
        const task = await Task.findByIdAndUpdate(id, req.body, {
          new: true, // Mengembalikan dokumen yang telah diperbarui
          runValidators: true, // Menjalankan validator pada data yang diperbarui
        });
        if (!task) {
          return res.status(404).json({ success: false }); // Jika task tidak ditemukan, kirim status 404
        }
        res.status(200).json({ success: true, data: task }); // Mengirim task yang diperbarui dengan status 200
      } catch (error) {
        res.status(400).json({ success: false }); // Menangani error dengan mengirim status 400
      }
      break;

    // Menangani permintaan DELETE untuk menghapus task berdasarkan ID
    case "DELETE":
      try {
        const deletedTask = await Task.deleteOne({ _id: id }); // Menghapus task berdasarkan ID
        if (!deletedTask) {
          return res.status(404).json({ success: false }); // Jika task tidak ditemukan, kirim status 404
        }
        res.status(200).json({ success: true, data: {} }); // Mengirim respons sukses dengan status 200
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
