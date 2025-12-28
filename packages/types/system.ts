export type CoreData = {
  id: number;
  usage: number;
}

export type SystemState = {
  cores: CoreData[];
  memory: {
    total: number;
    used: number;
    free: number;
  };
  timestamp: number;
}
