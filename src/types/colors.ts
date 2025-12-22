const COLORS = [
  "#49C4E5", // blue
  "#8471F2", // purple
  "#67E2AE", // green
  "#F4A261", // orange
  "#E76F51", // red
  "#F2C94C", // yellow
];

export function getColumnColor(name: string) {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return COLORS[Math.abs(hash) % COLORS.length];
}
