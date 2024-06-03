import React from "react";
import styles from "./styles/card.module.css";

// pembuatan component Card dengan props judul, tugas, catatan, handleDelete, handleEdit, statusTugas, handleKerjakan, handleSelesai
// untuk menampilkan data yang di dapat dari api
export default function Card({
  judul,
  tugas,
  catatan,
  handleDelete,
  handleEdit,
  statusTugas,
  handleKerjakan,
  handleSelesai,
}) {
  return (
    <div
      className={
        statusTugas === "belum dikerjakan"
          ? styles.card
          : statusTugas === "sedang dikerjakan"
          ? styles.cardProgress
          : styles.cardSelesai
      }
    >
      <h1 className={styles.title}>{judul}</h1>
      <hr className={styles.garis} />
      <h5 className={styles.label}>Tugas</h5>
      <p className={styles.tugas}>{tugas}</p>

      <h5 className={styles.label}>Catatan</h5>
      <p className={styles.catatan}>{catatan}</p>
      <div className={styles.container}>
        <div className={styles.progressContainer}>
          <h5 className={styles.label}>Status</h5>
          <p className={styles.progress}>{statusTugas}</p>
        </div>
        <div className={styles.buttonContainer}>
          {statusTugas === "belum dikerjakan" ? (
            <button className={styles.toggleKerjakan} onClick={handleKerjakan}>
              Kerjakan
            </button>
          ) : statusTugas === "sedang dikerjakan" ? (
            <button className={styles.toggleSelesai} onClick={handleSelesai}>
              Selesai
            </button>
          ) : null}
          <button className={styles.buttonEdit} onClick={handleEdit}>
            Edit
          </button>
          <button className={styles.buttonDelete} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
