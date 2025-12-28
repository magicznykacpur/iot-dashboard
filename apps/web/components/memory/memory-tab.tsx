"use client";

import { SystemState } from "@repo/types";
import { useEffect, useState } from "react";
import { TabsContent } from "../ui/tabs";
import Chart from "./chart";
import Stats from "./stats";

type MemHistory = {
  timestamp: number;
  memory: {
    total: number;
    used: number;
    free: number;
  };
}[];

const MemoryTab = ({ systemState }: { systemState: SystemState }) => {
  const [memHistory, setMemHistory] = useState<MemHistory>([]);

  useEffect(() => {
    setMemHistory([
      ...memHistory,
      { timestamp: systemState.timestamp, memory: systemState.memory },
    ]);
  }, [systemState.memory]);

  return (
    <TabsContent value="memory" className="flex flex-col gap-4 mt-4">
      <div className="space-y-6">
        <Stats systemState={systemState} />
        <Chart systemState={systemState} />
      </div>
    </TabsContent>
  );
};

export default MemoryTab;
