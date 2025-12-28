const formatTimeStampShort = (timestamp: number) => {
  return new Date(timestamp).toISOString().slice(11, 19);
};

export { formatTimeStampShort };
