
/**
 * Performance helpers for SynergySphere
 */

export function memberMetrics(tasks, userId) {
  const assigned = tasks.filter(t => t.assignee === userId);
  const completed = assigned.filter(t => t.status === "Done");
  const now = new Date();

  const overdue = assigned.filter(t => {
    if (t.status === "Done") return false;
    if (!t.deadline) return false;
    return new Date(t.deadline) < now;
  });

  const onTimeCompleted = completed.filter(t => {
    if (!t.deadline || !t.completedOn) return false;
    return new Date(t.completedOn) <= new Date(t.deadline);
  });

  const assignedCount = assigned.length;
  const completedCount = completed.length;
  const overdueCount = overdue.length;
  const onTimeRate = (onTimeCompleted.length / (completedCount || 1)) * 100;

  // Simple engagement proxy — if you track commentsCount per task, sum it.
  const engagement = assigned.reduce((sum, t) => sum + (t.commentsCount || 0), 0);

  // Performance score (0..100)
  const completionRate = (completedCount / (assignedCount || 1)) * 100;
  const overdueRate = (overdueCount / (assignedCount || 1)) * 100;
  const score =
    (completionRate * 0.4) +
    (onTimeRate * 0.3) +
    ((100 - overdueRate) * 0.2) +
    (Math.min(engagement, 20) * 0.1); // cap engagement at 20

  return {
    assigned: assignedCount,
    completed: completedCount,
    overdue: overdueCount,
    onTimeRate: +onTimeRate.toFixed(1),
    completionRate: +completionRate.toFixed(1),
    engagement,
    score: Math.max(0, Math.min(100, +score.toFixed(1))),
  };
}

export function teamMetrics(tasks, members) {
  const perMember = members.map(m => ({
    userId: m.id || m.uid || m.userId,
    name: m.name || m.displayName || m.email || "Member",
    ...memberMetrics(tasks, m.id || m.uid || m.userId),
  }));

  const totals = perMember.reduce(
    (acc, m) => {
      acc.assigned += m.assigned;
      acc.completed += m.completed;
      acc.overdue += m.overdue;
      return acc;
    },
    { assigned: 0, completed: 0, overdue: 0 }
  );

  const completionPct = (totals.completed / (totals.assigned || 1)) * 100;

  // Best & low performers
  const sorted = [...perMember].sort((a, b) => b.score - a.score);
  const best = sorted[0] || null;
  const low = sorted[sorted.length - 1] || null;

  return {
    totals,
    completionPct: +completionPct.toFixed(1),
    perMember,
    leaderboard: sorted,
    best,
    low,
  };
}
