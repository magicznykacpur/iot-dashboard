"use client";

import { SystemState } from "@repo/types";
import { useEffect, useState } from "react";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { formatTimeStampShort } from "@/lib/time-utils";

type MemHistory = {
  timestamp: number;
  memory: {
    total: number;
    used: number;
    free: number;
  };
}[];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2dd17f",
  },
  mobile: {
    label: "Mobile",
    color: "#2dd17f",
  },
} satisfies ChartConfig;

const Chart = ({ systemState }: { systemState: SystemState }) => {
  const [memHistory, setMemHistory] = useState<MemHistory>([]);

  useEffect(() => {
    
    setMemHistory([
      ...memHistory,
      { timestamp: systemState.timestamp, memory: systemState.memory },
    ]);
  }, [systemState.memory]);

  return (
    <ChartContainer config={chartConfig} className="max-h-180 min-w-full">
      <LineChart data={memHistory} >
        <XAxis dataKey="timestamp" tickFormatter={(value) => formatTimeStampShort(value)} tickCount={5} />
        <YAxis dataKey="memory.used" tickCount={10} />
        <CartesianGrid strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="memory.used"
          stroke={chartConfig.desktop.color}
        />
        
      </LineChart>
    </ChartContainer>
  );
};

export default Chart;
