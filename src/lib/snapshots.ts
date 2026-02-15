import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { Task } from "@/types/task";

export const updateDailySnapshot = async (
  userId: string,
  date: string,
  tasks: Task[]
) => {
  try {
    const totalCount = tasks.length;
    const completedCount = tasks.filter((t) => t.status === "completed").length;
    const snapshotId = `${userId}_${date}`;

    const snapshotRef = doc(db, "dailySnapshots", snapshotId);
    
    // Optimization: Check if update is needed
    const snapshotSnap = await getDoc(snapshotRef);
    
    if (snapshotSnap.exists()) {
      const data = snapshotSnap.data();
      if (
        data.totalCount === totalCount &&
        data.completedCount === completedCount
      ) {
        // No changes needed
        return;
      }
    }

    await setDoc(
      snapshotRef,
      {
        userId,
        date,
        totalCount,
        completedCount,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating daily snapshot:", error);
    // Silent failure as requested
  }
};

export const getSnapshot = async (userId: string, date: string) => {
  try {
    const snapshotId = `${userId}_${date}`;
    const snapshotRef = doc(db, "dailySnapshots", snapshotId);
    const snapshotSnap = await getDoc(snapshotRef);

    if (snapshotSnap.exists()) {
      return snapshotSnap.data() as {
        totalCount: number;
        completedCount: number;
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching daily snapshot:", error);
    return null;
  }
};
