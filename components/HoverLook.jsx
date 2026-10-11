"use client";

// A list item that tells the avatar to look at it while hovered.
// The avatar listens for the "avatar:look" event (see VoxelAvatar.jsx).
export default function HoverLook({ children, className, style }) {
  const look = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    window.dispatchEvent(new CustomEvent("avatar:look", { detail: { x: r.left + r.width / 2, y: r.top + r.height / 2 } }));
  };
  const stop = () => window.dispatchEvent(new CustomEvent("avatar:look", { detail: null }));

  return (
    <li
      className={className}
      style={style}
      onPointerEnter={(e) => e.pointerType === "mouse" && look(e)}
      onPointerLeave={stop}
    >
      {children}
    </li>
  );
}
