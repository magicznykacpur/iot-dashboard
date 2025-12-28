import { SystemState } from "@repo/types";
import systeminformation from "systeminformation";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log("WebSocket server is running on port 8080");

setInterval(async () => {
  const load = await systeminformation.currentLoad();
  const cpu = await systeminformation.cpu();
  const mem = await systeminformation.mem();  
  
  const stats: SystemState = {
    processorName: cpu.manufacturer + " " + cpu.brand,
    cores: load.cpus.map((cpu, index) => ({
      id: index,
      usage: cpu.load,
    })),
    memory: {
      total: Math.round(mem.total / 1024 / 1024 / 1024),
      used: Math.round(mem.used / 1024 / 1024 / 1024),
      free: Math.round(mem.free / 1024 / 1024 / 1024),
    },
    timestamp: Date.now(),
  };

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(stats));
    }
  });
}, 1000);
