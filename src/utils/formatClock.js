const pad = (n) => String(n).padStart(2, "0");

/** @param {number} seconds "mm:ss", or "h:mm:ss" from an hour up. */
export const formatClock = (seconds) => {
  const s = Math.max(0, Math.round(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return h ? `${h}:${pad(m)}:${pad(s % 60)}` : `${pad(m)}:${pad(s % 60)}`;
};
