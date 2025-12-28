"use client";

import CoreTab from "@/components/core/core-tab";
import MemoryTab from "@/components/memory/memory-tab";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatTimeStampShort } from "@/lib/time-utils";
import { SystemState } from "@repo/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [systemState, setSystemState] = useState<SystemState | null>(null);

  const [activeTab, setActiveTab] = useState<string>("cores");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      setSystemState(JSON.parse(event.data));
    };
  }, []);

  if (!systemState)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black gap-4">
        <Loader2 className="w-14 h-14 animate-spin text-white" />
      </div>
    );

  return (
    <Tabs
      onValueChange={(value) => setActiveTab(value)}
      value={activeTab}
      className="relative flex flex-col gap-4 bg-black min-h-screen px-4 py-8"
    >
      <TabsList className="gap-x-4 py-6">
        <TabsTrigger value="cores" className="p-4 bg-gray-200 rounded-lg">
          Cores
        </TabsTrigger>
        <TabsTrigger value="memory" className="p-4 bg-gray-200 rounded-lg">
          Memory
        </TabsTrigger>
        <TabsTrigger value="network" className="p-4 bg-gray-200 rounded-lg">
          Network
        </TabsTrigger>
        <TabsTrigger value="storage" className="p-4 bg-gray-200 rounded-lg">
          Storage
        </TabsTrigger>
      </TabsList>
      
      <CoreTab systemState={systemState} />
      <MemoryTab systemState={systemState} />

      <span className="absolute top-12 right-4 text-white">
        {formatTimeStampShort(systemState.timestamp)}
      </span>
    </Tabs>
  );
};

export default Dashboard;
