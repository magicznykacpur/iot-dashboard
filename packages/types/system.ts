export type CoreData = {
  id: number;
  usage: number;
}

export type SystemState = {
  processorName: string;
  cores: CoreData[];
  memory: {
    total: number;
    used: number;
    free: number;
  };
  timestamp: number;
}
