// Utility function for random coordinates (assuming a 10x10 grid)
export function getRandomCoordinates() {
  const x = Math.floor(Math.random() * 10); // Random x-coordinate between 0 and 9
  const y = Math.floor(Math.random() * 10); // Random y-coordinate between 0 and 9
  return { x, y };
}
