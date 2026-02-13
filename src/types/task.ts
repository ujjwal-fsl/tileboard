import { Timestamp } from 'firebase/firestore';

export interface Task {
  id: string;
  userId: string;
  title: string;           // max 60 chars
  priority: "small" | "medium" | "big";
  priorityLevel: number;   // small=1, medium=2, big=3 (for Firestore ordering)
  note: string;            // max 500 chars, optional
  category: string;        // max 30 chars, optional
  status: "active" | "completed";
  date: string;            // YYYY-MM-DD, always formatted via utility
  color: string;           // hex code, assigned at creation
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
