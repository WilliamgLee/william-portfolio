// Small pixel icons drawn from text grids ("#" = a filled pixel).
// They're simple, original shapes (not brand logos), drawn with crisp edges.
const ICONS = {
  camera: [
    "..........",
    "...###....",
    ".########.",
    ".#......#.",
    ".#..##..#.",
    ".#.#..#.#.",
    ".#.#..#.#.",
    ".#..##..#.",
    ".########.",
    "..........",
  ],
  terminal: [
    "..........",
    ".########.",
    ".#......#.",
    ".#.#....#.",
    ".#..#...#.",
    ".#.#....#.",
    ".#...##.#.",
    ".#......#.",
    ".########.",
    "..........",
  ],
  robot: [
    "....##....",
    "....##....",
    ".########.",
    ".#......#.",
    ".#.#..#.#.",
    ".#......#.",
    ".#.####.#.",
    ".#......#.",
    ".########.",
    "..........",
  ],
  briefcase: [
    "..........",
    "...####...",
    "...#..#...",
    ".########.",
    ".#......#.",
    ".########.",
    ".#......#.",
    ".#......#.",
    ".########.",
    "..........",
  ],
  envelope: [
    "..........",
    "..........",
    ".########.",
    ".##....##.",
    ".#.#..#.#.",
    ".#..##..#.",
    ".#......#.",
    ".########.",
    "..........",
    "..........",
  ],
};

export default function PixelIcon({ name, className = "" }) {
  const grid = ICONS[name];
  if (!grid) return null;
  const rects = [];
  grid.forEach((row, y) => [...row].forEach((c, x) => c === "#" && rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />)));
  return (
    <svg viewBox="0 0 10 10" className={className} fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
      {rects}
    </svg>
  );
}
