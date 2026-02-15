import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  Timestamp,
  serverTimestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Task } from "@/types/task";
import { getRandomColor } from "@/lib/colors";
import { getPriorityLevel } from "@/lib/utils";

const TASKS_COLLECTION = "tasks";

export async function createTask(data: Omit<Task, "id" | "createdAt" | "updatedAt" | "color" | "priorityLevel" | "status">) {
  const priorityLevel = getPriorityLevel(data.priority);
  const color = getRandomColor(data.priority);
  
  await addDoc(collection(db, TASKS_COLLECTION), {
    ...data,
    priorityLevel,
    color,
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateTask(taskId: string, data: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>) {
  const updates: any = {
    ...data,
    updatedAt: serverTimestamp(),
  };

  // If priority changes, update priorityLevel and re-assign color
  if (data.priority) {
    updates.priorityLevel = getPriorityLevel(data.priority);
    updates.color = getRandomColor(data.priority);
  }

  const taskRef = doc(db, TASKS_COLLECTION, taskId);
  await updateDoc(taskRef, updates);
}

export async function completeTask(taskId: string) {
  const taskRef = doc(db, TASKS_COLLECTION, taskId);
  await updateDoc(taskRef, {
    status: "completed",
    updatedAt: serverTimestamp(),
  });
}

export async function deleteTask(taskId: string) {
  const taskRef = doc(db, TASKS_COLLECTION, taskId);
  await deleteDoc(taskRef);
}

export function subscribeToTasks(
  userId: string, 
  date: string, 
  callback: (tasks: Task[]) => void,
  onError?: (error: Error) => void
) {
  // Query requires composite index: userId ASC, date ASC, priorityLevel DESC, createdAt DESC
  const q = query(
    collection(db, TASKS_COLLECTION),
    where("userId", "==", userId),
    where("date", "==", date),
    orderBy("priorityLevel", "desc"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, 
    (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      callback(tasks);
    },
    (error) => {
      console.error("Firestore Error:", error);
      if (onError) onError(error);
    }
  );
}

export function subscribeToCarryForwardCount(
  userId: string,
  yesterdayDate: string,
  callback: (count: number) => void
) {
  const q = query(
    collection(db, TASKS_COLLECTION),
    where("userId", "==", userId),
    where("date", "==", yesterdayDate),
    where("status", "==", "active")
  );

  return onSnapshot(q, (snapshot) => {
    callback(snapshot.size);
  });
}
