"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      );
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          transform: `translate(${position.x - 2.5}px, ${position.y - 2.5}px) scale(${isClicking ? 0.8 : 1})`,
          transition: "transform 0.1s ease",
        }}
      />
      <div
        className="cursor-outline"
        style={{
          transform: `translate(${position.x - 15}px, ${position.y - 15}px) scale(${isPointer ? 1.5 : 1}) rotate(${isPointer ? 45 : 0}deg)`,
          backgroundColor: isPointer ? "rgba(128, 90, 213, 0.1)" : "transparent",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          clipPath: isPointer ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" : "circle(50% at 50% 50%)",
          border: isPointer ? "2px solid rgba(128, 90, 213, 0.5)" : "2px solid #805AD5",
        }}
      />
      {isPointer && (
        <div
          className="cursor-trail"
          style={{
            position: "fixed",
            width: "8px",
            height: "8px",
            backgroundColor: "rgba(128, 90, 213, 0.3)",
            borderRadius: "50%",
            pointerEvents: "none",
            transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
            transition: "all 0.1s ease",
            zIndex: 9997,
          }}
        />
      )}
    </>
  );
} 