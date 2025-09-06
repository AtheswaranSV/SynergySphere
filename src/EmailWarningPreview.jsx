
import React from "react";

/**
 * UI-only preview of the warning email that would be sent to poor performers.
 * Use this in your demo instead of wiring real SMTP/Functions if short on time.
 */
export default function EmailWarningPreview({ open, onClose, name, score, pendingTasks, overdueTasks, onTimeRate }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-neutral-900 shadow-xl">
        <div className="flex items-center justify-between px-5 py-3 border-b dark:border-neutral-800">
          <h3 className="text-lg font-semibold">Email Preview</h3>
          <button onClick={onClose} className="px-3 py-1 rounded-md bg-neutral-200 dark:bg-neutral-800 hover:opacity-90">Close</button>
        </div>
        <div className="p-5 whitespace-pre-wrap text-sm leading-6">
{`Subject: Performance Alert – Immediate Improvement Required

Hi ${name || "Teammate"},

Our performance review shows your current score is **${score ?? "—"}**, which places you in the **Danger Zone** for this project.

Key issues identified:
- Pending tasks: ${pendingTasks ?? "—"}
- Overdue deadlines: ${overdueTasks ?? "—"}
- On-time completion: ${onTimeRate ?? "—"}%

To improve, please:
- Prioritize high-urgency tasks immediately.
- Communicate blockers early with your team lead.
- Break large tasks into smaller milestones.

With focus and consistency, you can recover your performance before the next review cycle.

— SynergySphere AI Insights`}
        </div>
      </div>
    </div>
  );
}
