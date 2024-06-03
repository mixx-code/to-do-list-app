import React from "react";
import styles from "./styles/cardSkeleton.module.css";

//pembuatan component cardSkeleton untuk di tampilkan saat loading
export default function CardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.flash}></div>
      <h1 className={styles.title}></h1>
      <hr className={styles.garis} />
      <h5 className={styles.label}></h5>
      <p className={styles.tugas}></p>

      <h5 className={styles.label}></h5>
      <p className={styles.catatan}></p>
      <div className={styles.container}>
        <div className={styles.progressContainer}>
          <h5 className={styles.label}></h5>
          <p className={styles.progress}></p>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.toggleKerjakan}></button>
          <button className={styles.buttonEdit}></button>
          <button className={styles.buttonDelete}></button>
        </div>
      </div>
    </div>
  );
}
