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

  return (
    <motion.div
      onMouseMove={animate}
      onMouseLeave={stopAnimating}
      animate={{
        rotateY: rotations.x,
        rotateX: rotations.y,
        transformPerspective: Math.max(100, rotations.z * 100),
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformStyle: 'preserve-3d',
        transformOrigin: 'center',
      }}
    >
      {children}
    </motion.div>
  );
}
