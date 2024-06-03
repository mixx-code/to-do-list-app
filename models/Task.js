import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: [true, "Silakan berikan judul untuk tugas ini."],
    maxlength: [50, "Judul tidak boleh lebih dari 60 karakter"],
  },
  tugas: {
    type: String,
    required: [true, "Silakan berikan deskripsi untuk tugas ini."],
    maxlength: [70, "Judul tidak boleh lebih dari 60 karakter"],
  },
  catatan: {
    type: String,
    maxlength: [30, "Catatan tidak boleh lebih dari 200 karakter"],
    default: "tidak ada catatan",
  },
  status: {
    type: String,
    enum: ["belum dikerjakan", "sedang dikerjakan", "selesai"],
    default: "belum dikerjakan",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
