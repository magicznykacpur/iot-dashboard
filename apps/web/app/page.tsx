"use client";

import CoreCard from "@/components/core/core-card";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
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
      className="flex flex-col gap-4 bg-black min-h-screen px-4 py-8"
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
      <TabsContent value="cores" className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col">
          <span className="text-white font-semibold text-xl">
            {systemState.processorName}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2">
          {systemState &&
            systemState.cores.length > 0 &&
            systemState.cores.map((core) => (
              <CoreCard key={core.id} core={core} />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Dashboard;
