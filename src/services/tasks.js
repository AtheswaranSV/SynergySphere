
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

const COL = "tasks";

export async function addTask(projectId, data) {
  const ref = await addDoc(collection(db, COL), {
    projectId,
    title: data.title || "Untitled Task",
    description: data.description || "",
    assignee: data.assignee || null,  // user UID
    status: data.status || "To-Do",   // To-Do | In Progress | Done
    deadline: data.deadline || null,  // ISO string or date
    completedOn: null,
    createdAt: serverTimestamp(),
    commentsCount: 0,
  });
  return ref.id;
}

export async function listTasksByProject(projectId) {
  const q = query(collection(db, COL), where("projectId", "==", projectId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function updateTask(taskId, patch) {
  await updateDoc(doc(db, COL, taskId), patch);
}

export async function deleteTask(taskId) {
  await deleteDoc(doc(db, COL, taskId));
}

export async function markTaskDone(taskId) {
  await updateDoc(doc(db, COL, taskId), {
    status: "Done",
    completedOn: Date.now(),
  });
}
