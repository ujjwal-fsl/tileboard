export function getGreeting(displayName?: string): { line1: string; line2: string } {
  const hour = new Date().getHours();
  const name = displayName ? `, ${displayName}` : "";

  let line1 = "";
  let line2 = "";

  if (hour >= 5 && hour < 12) {
    line1 = `Good morning${name}.`;
    line2 = "Let’s begin gently.";
  } else if (hour >= 12 && hour < 17) {
    line1 = `Good afternoon${name}.`;
    line2 = "Keep moving forward.";
  } else if (hour >= 17 && hour < 22) {
    line1 = `Good evening${name}.`;
    line2 = "You’ve done enough.";
  } else {
    // 22 to 4
    line1 = `Late night${name}.`;
    line2 = "Rest is part of progress.";
  }

  // Fallback cleanup if name was expected but logic meant to handle it inside string
  // actually my code handles name existence. 
  // If fallback is needed (user is null/undefined in caller):
  // Caller passes undefined -> name="" -> "Good morning."
  // Logic seems correct per strict prompt requirements.

  return { line1, line2 };
}
