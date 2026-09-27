import { useState, useEffect, useRef } from "react";

export interface TaskPollerResult<T> {
  status: "IDLE" | "PENDING" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED";
  progress: number;
  data: T | null;
  error: string | null;
}

export function useTaskPoller<T = any>(taskId: string | null, pollUrl: string): TaskPollerResult<T> {
  const [status, setStatus] = useState<"IDLE" | "PENDING" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED">("IDLE");
  const [progress, setProgress] = useState<number>(0);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isPollingRef = useRef<boolean>(false);

  useEffect(() => {
    if (!taskId || !pollUrl) {
      setStatus("IDLE");
      setProgress(0);
      setData(null);
      setError(null);
      return;
    }

    setStatus("PENDING");
    setProgress(0);
    setError(null);
    setData(null);
    isPollingRef.current = true;

    const endpoint = pollUrl.includes(":taskId")
      ? pollUrl.replace(":taskId", taskId)
      : `${pollUrl.replace(/\/$/, "")}/${taskId}`;

    let isMounted = true;

    const checkTask = async () => {
      if (!isMounted || !isPollingRef.current) return;

      try {
        const res = await fetch(endpoint);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Polling failed: ${res.status}`);
        }

        const taskData = await res.json();
        if (!isMounted) return;

        setData(taskData);
        setProgress(taskData.progress || 0);

        if (taskData.status === "SUCCEEDED") {
          setStatus("SUCCEEDED");
          setProgress(100);
          isPollingRef.current = false;
        } else if (taskData.status === "FAILED") {
          setStatus("FAILED");
          setError(taskData.task_error?.message || taskData.error?.message || "Task failed");
          isPollingRef.current = false;
        } else {
          setStatus(taskData.status || "IN_PROGRESS");
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : "Error polling task";
        console.error("Task polling error:", err);
        setError(msg);
        setStatus("FAILED");
        isPollingRef.current = false;
      }
    };

    // Immediate first check
    checkTask();

    // Poll every 3000ms until status is SUCCEEDED or FAILED
    const interval = setInterval(() => {
      if (isPollingRef.current) {
        checkTask();
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => {
      isMounted = false;
      isPollingRef.current = false;
      clearInterval(interval);
    };
  }, [taskId, pollUrl]);

  return { status, progress, data, error };
}
