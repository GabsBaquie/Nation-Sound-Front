export const formatTime = (timeString: string): string => {
  return new Date(`1970-01-01T${timeString}Z`).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
