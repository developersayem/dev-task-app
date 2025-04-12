"use client";

import { useEffect, useRef } from "react";

export function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const circles: Circle[] = [];
    const colors = [
      "rgba(99, 102, 241, 0.15)",
      "rgba(139, 92, 246, 0.15)",
      "rgba(236, 72, 153, 0.15)",
    ];

    class Circle {
      x: number;
      y: number;
      radius: number;
      color: string;
      dx: number;
      dy: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 100 + 50;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.dx = (Math.random() - 0.5) * 0.5;
        this.dy = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x + this.radius > width || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.radius > height || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      }
    }

    for (let i = 0; i < 5; i++) {
      circles.push(new Circle());
    }

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);

      circles.forEach((circle) => {
        circle.update();
      });
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 w-full h-full opacity-50"
    />
  );
}
