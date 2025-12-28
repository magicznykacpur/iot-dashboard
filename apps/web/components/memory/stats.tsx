"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SystemState } from "@repo/types";

type Stats = {
  total: number;
  used: number;
  free: number;
  usedPercent: string;
  freePercent: string;
};

const Stats = ({ systemState }: { systemState: SystemState }) => {
  const [stats, setStats] = useState<Stats>();
  
  useEffect(() => {
    setStats({
      total: systemState.memory.total,
      used: systemState.memory.used,
      free: systemState.memory.free,
      usedPercent: (
        (systemState.memory.used / systemState.memory.total) *
        100
      ).toFixed(1),
      freePercent: (
        (systemState.memory.free / systemState.memory.total) *
        100
      ).toFixed(1),
    });
  }, [systemState.memory]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats && (
        <>
          <Card className="gap-0">
            <CardHeader>
              <CardTitle>Total</CardTitle>
            </CardHeader>
            <CardContent>
              <span>{stats.total} GB</span>
            </CardContent>
          </Card>
          <Card className="gap-0">
            <CardHeader>
              <CardTitle>Used</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <span>{stats.used} GB</span>
              <span className="text-sm text-muted-foreground">
                {stats.usedPercent}%
              </span>
            </CardContent>
          </Card>
          <Card className="gap-0">
            <CardHeader>
              <CardTitle>Free</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <span>{stats.free} GB</span>
              <span className="text-sm text-muted-foreground">
                {stats.freePercent}%
              </span>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Stats;
