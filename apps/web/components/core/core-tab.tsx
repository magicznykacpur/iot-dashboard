"use client";

import { SystemState } from "@repo/types";
import { TabsContent } from "../ui/tabs";
import CoreCard from "./core-card";

const CoreTab = ({ systemState }: { systemState: SystemState }) => (
  <TabsContent value="cores" className="flex flex-col gap-4 mt-4">
    <div className="flex flex-col">
      <span className="text-white font-semibold text-xl">
        {systemState.processorName}
      </span>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2">
      {systemState &&
        systemState.cores.length > 0 &&
        systemState.cores.map((core) => <CoreCard key={core.id} core={core} />)}
    </div>
  </TabsContent>
);

export default CoreTab;
