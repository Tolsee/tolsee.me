"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as three from "three";
import { random } from "maath";

import styles from "./Stars.module.css";

const StarsObjects = () => {
    const ref = useRef<three.Points>(null);
    const [sphere] = useState(() =>
        random.inSphere(new Float32Array(3000), { radius: 5 }) as Float32Array
    );

    useFrame((_state, delta) => {
        if (!ref.current) return;

        ref.current.rotation.x -= delta / 20;
        ref.current.rotation.y -= delta / 25;
    });

    return (
        <group rotation={[0, 0, Math.PI / 8]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled>
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={0.01}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const Stars = () => {
    return (
        <div className={styles.canvasContainer}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Suspense fallback={null}>
                    <StarsObjects />
                </Suspense>

                <Preload all />
            </Canvas>
        </div>
    );
};

export default Stars;
