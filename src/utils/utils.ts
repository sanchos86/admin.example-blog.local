export const addExpiresInToCurrentDate = (seconds: number) => (seconds * 1000 + Date.now());

export default {
  addExpiresInToCurrentDate,
};
