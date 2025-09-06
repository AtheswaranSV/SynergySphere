
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
import { auth } from "../firebase";

const COL = "projects";

export async function createProject(data) {
  const ref = await addDoc(collection(db, COL), {
    title: data.title || "Untitled",
    description: data.description || "",
    createdBy: auth.currentUser ? auth.currentUser.uid : null,
    createdAt: serverTimestamp(),
    members: data.members || [], // array of user UIDs
  });
  return ref.id;
}

export async function listProjects() {
  const q = query(collection(db, COL));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function listMyProjects() {
  const uid = auth.currentUser?.uid;
  if (!uid) return [];
  const q = query(collection(db, COL), where("members", "array-contains", uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function updateProject(id, patch) {
  await updateDoc(doc(db, COL, id), patch);
}

export async function deleteProject(id) {
  await deleteDoc(doc(db, COL, id));
}
