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
import { getPriorityLevel } from "@/lib/utils";

const TASKS_COLLECTION = "tasks";

export async function createTask(data: Omit<Task, "id" | "createdAt" | "updatedAt" | "color" | "priorityLevel" | "status">) {
  const priorityLevel = getPriorityLevel(data.priority);
  
  await addDoc(collection(db, TASKS_COLLECTION), {
    ...data,
    priorityLevel,
    color: "",
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

  // If priority changes, update priorityLevel
  if (data.priority) {
    updates.priorityLevel = getPriorityLevel(data.priority);
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

export function subscribeToCarryForwardTasks(
  userId: string,
  todayDate: string,
  callback: (tasks: Task[]) => void
) {
  // Query: userId == current, status == active, date < today
  // Requires index: userId ASC, status ASC, date ASC
  const q = query(
    collection(db, TASKS_COLLECTION),
    where("userId", "==", userId),
    where("status", "==", "active"),
    where("date", "<", todayDate),
    orderBy("date", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      isCarriedForward: true,
    })) as Task[];
    
    callback(tasks);
  });
}
