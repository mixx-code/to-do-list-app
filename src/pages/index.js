import Card from "../components/Card";
import { useState, useEffect } from "react";
import Styles from "../styles/Home.module.css";
import CardSkeleton from "@/components/CardSkeleton";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [fieldKosong, setFieldKosong] = useState(false);
  const [action, setAction] = useState("add");
  const [idEdit, setIdEdit] = useState("");
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    judul: "",
    tugas: "",
    catatan: "",
    status: "belum dikerjakan",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  //fungsi untuk melakukan fetch data dari api
  const fetchTasks = async () => {
    setIsLoading(true);
    setFieldKosong(false);
    try {
      const res = await fetch("/api/tasks");
      if (!res.status === 200) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await res.json();
      console.log(data);
      setTasks(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  //fungsi untuk melakukan tambah data
  const addTask = async () => {
    if (!task.judul || !task.tugas) return setFieldKosong(true); // cek apakah judul dan tugas tidak kosong
    setIsLoadingAdd(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          judul: task.judul,
          tugas: task.tugas,
          catatan: task.catatan === "" ? "Tidak ada catatan" : task.catatan,
          status: task.status,
        }),
      });
      //kembalikan task ke default
      setTask((prevTask) => ({
        ...prevTask,
        judul: "",
        tugas: "",
        catatan: "",
      }));
      StatusAlertService.showSuccess("Default success alert!", "success");
      setIsLoadingAdd(false);
      fetchTasks();
      if (!res.status === 200) {
        setIsLoadingAdd(false);
        throw new Error("Failed add tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setIsLoadingAdd(false);
    }
  };

  //fungsi untuk melakukan delete
  const deleteTask = async (id) => {
    window.confirm("Apakah Anda yakin ingin menghapus tugas ini?");
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      fetchTasks();
      if (!res.status === 200) {
        throw new Error("Failed to delete tasks");
      }
    } catch (error) {
      console.error("Error deleting tasks:", error);
      // Tambahkan logika penanganan error di sini, seperti menampilkan pesan error
      StatusAlertService.showError("Failed to delete tasks", "error");
    }
  };

  //fungsi untuk memasukan data ke dalam form
  const handleEditTask = async (id) => {
    setIdEdit(id);
    try {
      const res = await fetch(`/api/tasks/${id}`);
      if (!res.status === 200) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await res.json();
      console.log(data);
      //simpan data dari id yang diedit untuk di masukan ke dalam form
      setTask({
        judul: data.data.judul,
        tugas: data.data.tugas,
        catatan: data.data.catatan,
      });
      setAction("edit");
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // fungsi untuk membatalkan edit
  const handleBatalEdit = async () => {
    setIdEdit("");
    setTask({
      judul: "",
      tugas: "",
      catatan: "",
      status: "belum dikerjakan",
    });
    setAction("add");
  };
  //fungsi untuk melakukan edit
  const editTask = async () => {
    if (!task.judul || !task.tugas) return setFieldKosong(true); // cek apakah judul dan tugas tidak kosong
    setIsLoadingEdit(true);
    try {
      const res = await fetch(`/api/tasks/${idEdit}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      setIsLoadingEdit(false);
      if (!res.status === 200) {
        setIsLoadingEdit(false);
        throw new Error("Failed to edit tasks");
      }
      setTask({
        judul: "",
        tugas: "",
        catatan: "",
        status: "belum dikerjakan",
      });
      setAction("add");
      setIdEdit("");
      fetchTasks();
    } catch (error) {
      setIsLoadingEdit(false);
      console.error("Error editing tasks:", error);
    }
  };

  //fungsi untuk melakukan edit status
  const handleKerjakanTask = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "sedang dikerjakan" }),
      });
      if (!res.status === 200) {
        throw new Error("Failed to edit tasks");
      }
      fetchTasks();
    } catch (error) {
      console.error("Error editing tasks:", error);
    }
  };

  //fungsi untuk melakukan edit status
  const handleSelesaiTask = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "selesai" }),
      });
      if (!res.status === 200) {
        throw new Error("Failed to edit tasks");
      }
      fetchTasks();
    } catch (error) {
      console.error("Error editing tasks:", error);
    }
  };

  return (
    <div className={Styles.main}>
      <h1>To-Do List</h1>

      {/* Form untuk menambahkan data dan mengedit data */}
      <table className={Styles.table}>
        <tbody>
          <tr>
            <td>Judul Tugas</td>
            <td> : </td>
            <td>
              <input
                type="text"
                className={Styles.input}
                value={task.judul}
                maxLength={50}
                onChange={(e) => setTask({ ...task, judul: e.target.value })}
                placeholder="Buat judul tugas"
              />
            </td>
          </tr>
          <tr>
            <td>Tugas</td>
            <td> : </td>
            <td>
              <textarea
                value={task.tugas}
                className={Styles.input}
                maxLength={70}
                onChange={(e) => setTask({ ...task, tugas: e.target.value })}
                placeholder="buat deskripsi tugas"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>catatan</td>
            <td> : </td>
            <td>
              <input
                type="text"
                className={Styles.input}
                value={task.catatan}
                maxLength={30}
                onChange={(e) => setTask({ ...task, catatan: e.target.value })}
                placeholder="buat catatan tugas"
              />
            </td>
          </tr>
          {fieldKosong && (
            <tr>
              <td colSpan={3}>
                <p className={Styles.fieldKosong}>
                  Judul dan tugas tidak boleh kosong
                </p>
              </td>
              <td></td>
              <td></td>
            </tr>
          )}
          {action === "add" ? (
            <tr>
              <td colSpan={3}>
                <button
                  onClick={addTask}
                  className={Styles.buttonAdd}
                  disabled={isLoadingAdd}
                >
                  {isLoadingAdd ? "Loading..." : "Tambah Tugas"}
                </button>
              </td>
              <td></td>
              <td></td>
            </tr>
          ) : (
            <>
              <tr>
                <td colSpan={3}>
                  <button
                    onClick={editTask}
                    className={Styles.buttonEdit}
                    disabled={isLoadingEdit}
                  >
                    {isLoadingEdit ? "Loading..." : "Edit Tugas"}
                  </button>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={3}>
                  <button
                    onClick={handleBatalEdit}
                    className={Styles.buttonBatalEdit}
                  >
                    Batal Edit
                  </button>
                </td>
                <td></td>
                <td></td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      {/* akhir form */}

      <h1>Daftar Tugas</h1>
      {/* menampilkan data dari api */}
      <div className={Styles.container}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : tasks.length === 0 ? (
          <p className={Styles.empty}>
            Tidak ada tugas yang tersedia saat ini.
          </p>
        ) : (
          tasks.map((task) => (
            <Card
              key={task._id}
              judul={task.judul}
              tugas={task.tugas}
              catatan={task.catatan}
              status={task.status}
              id={task._id}
              handleDelete={() => deleteTask(task._id)}
              statusTugas={task.status}
              handleEdit={() => handleEditTask(task._id)}
              handleKerjakan={() => handleKerjakanTask(task._id)}
              handleSelesai={() => handleSelesaiTask(task._id)}
            />
          ))
        )}
      </div>

      {/* akhir menampilkan data dari api */}
    </div>
  );
}
