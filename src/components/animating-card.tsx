import { distance2D, motion } from 'framer-motion';
import { MouseEventHandler, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export function AnimatingCard({ children }: Props) {
  const [rotations, setRotations] = useState({ x: 0, y: 0, z: 0 });
  const [isAnimating, setAnimating] = useState(false);
  const isAnimatingReference = useRef(isAnimating);

  const animate: MouseEventHandler<HTMLDivElement> = (event) => {
    setAnimating(true);

    const rect = event.currentTarget.getBoundingClientRect();

    const absolute = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    const percent = {
      x: Math.round((100 / rect.width) * absolute.x),
      y: Math.round((100 / rect.height) * absolute.y),
    };

    const center = {
      x: percent.x - 50,
      y: percent.y - 50,
    };

    const distance = distance2D(
      { x: percent.x, y: percent.y },
      { x: 50, y: 50 },
    );

    const rotateX = Math.round(((center.x > 50 ? 1 : -1) * center.x) / 12);
    const rotateY = Math.round(center.y / 16);
    setRotations({
      x: rotateX,
      y: rotateY,
      z: Math.round(distance / 20),
    });
  };

  const stopAnimating = () => {
    setAnimating(false);

    setTimeout(() => {
      if (isAnimatingReference.current) return;

      setRotations({ x: 0, y: 0, z: 2 });
    }, 100);
  };

  // Pointer handlers live on a STATIC wrapper, not the tilted element.
  // Tilting the card itself moved its hit-area at the edges, so the pointer
  // flickered in/out and the tilt juddered. The wrapper never transforms, so
  // mouseleave only fires when you actually leave the card — no jitter.
  return (
    <div
      onMouseMove={animate}
      onMouseLeave={stopAnimating}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        animate={{
          rotateY: rotations.x,
          rotateX: rotations.y,
          transformPerspective: Math.max(100, rotations.z * 100),
        }}
        style={{
          width: '100%',
          transformStyle: 'preserve-3d',
          transformOrigin: 'center',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
