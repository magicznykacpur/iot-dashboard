"use client";

import { useEffect, useState } from "react";
import { SystemState } from "@repo/types";

const Dashboard = () => {
  const [systemState, setSystemState] = useState<SystemState | null>(null);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      setSystemState(JSON.parse(event.data));
    };
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(systemState, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
