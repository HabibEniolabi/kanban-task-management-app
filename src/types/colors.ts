const COLORS = [
  "#49C4E5", // blue
  "#8471F2", // purple
  "#67E2AE", // green
  "#F4A261", // orange
  "#E76F51", // red
  "#F2C94C", // yellow

  // NEW COLORS
  "#6FCF97", // mint green
  "#56CCF2", // sky blue
  "#BB6BD9", // lavender
  "#EB5757", // coral red
  "#F2994A", // amber
  "#2D9CDB", // deep blue
  "#9B51E0", // rich purple
  "#27AE60", // emerald
  "#F2A1C2", // soft pink
  "#BDBDBD", // neutral gray
];

export function getColumnColor(name: string) {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 15) - hash);
  }

  return COLORS[Math.abs(hash) % COLORS.length];
}
