import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";

import { db } from "./firebase";
import { Task } from "@/types/task";


/**
 * SAFELY gets current authenticated UID directly from Firebase Auth
 */
function getCurrentUID(): string | null {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.warn("Snapshot aborted: Auth user not ready");
    return null;
  }

  return user.uid;
}


/**
 * Bulletproof snapshot writer
 */
export const updateDailySnapshot = async (
  userId: string,
  date: string,
  tasks: Task[]
) => {

  try {

    // CRITICAL FIX: Verify real auth user
    const realUID = getCurrentUID();

    if (!realUID) {
      return;
    }

    if (realUID !== userId) {
      console.warn("Snapshot aborted: UID mismatch");
      return;
    }

    const snapshotId = `${realUID}_${date}`;

    const snapshotRef = doc(db, "dailySnapshots", snapshotId);

    const totalCount = tasks.length;

    const completedCount =
      tasks.filter(t => t.status === "completed").length;


    await setDoc(
      snapshotRef,
      {
        userId: realUID,
        date,
        totalCount,
        completedCount,
        updatedAt: serverTimestamp(),
      },
      {
        merge: true,
      }
    );

    console.log("Snapshot write success:", snapshotId);

  }
  catch (error) {

    console.error("Snapshot write failed:", error);

  }

};



/**
 * Bulletproof snapshot reader
 */
export const getSnapshot = async (
  userId: string,
  date: string
) => {

  try {

    const realUID = getCurrentUID();

    if (!realUID) {
      return null;
    }

    if (realUID !== userId) {
      return null;
    }

    const snapshotId = `${realUID}_${date}`;

    const snapshotRef =
      doc(db, "dailySnapshots", snapshotId);

    const snap = await getDoc(snapshotRef);

    if (!snap.exists()) {
      return null;
    }

    return snap.data() as {
      totalCount: number;
      completedCount: number;
    };

  }
  catch (error) {

    console.error("Snapshot read failed:", error);

    return null;
  }

};
