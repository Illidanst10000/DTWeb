import React, { FC, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AttackType } from "../models/characters/Character";

export interface AnimationProps {
    sourceRect: DOMRect;
    targetRect: DOMRect;
    containerRect: DOMRect;
    attackType: AttackType;
    onComplete: () => void;
}

export const ProjectileAnimation: FC<AnimationProps> = ({ sourceRect, targetRect, containerRect, attackType, onComplete }) => {
    const PROJECTILE_OFFSET = 25;
    const initialPosition = {
        x: Math.round(sourceRect.left - containerRect.left + sourceRect.width / 2 - PROJECTILE_OFFSET),
        y: Math.round(sourceRect.top - containerRect.top + sourceRect.height / 2 - PROJECTILE_OFFSET),
    };

    const finalPosition = {
        x: Math.round(targetRect.left - containerRect.left + targetRect.width / 2 - PROJECTILE_OFFSET),
        y: Math.round(targetRect.top - containerRect.top + targetRect.height / 2 - PROJECTILE_OFFSET),
    };

    return (
        <motion.div
            initial={{ opacity: 1, x: initialPosition.x, y: initialPosition.y }}
            animate={{
                x: finalPosition.x,
                y: finalPosition.y,
                transition: { duration: 0.5 },
            }}
            onAnimationComplete={onComplete}
            className={`projectile projectile-${attackType}`}
        />
    );
};

export interface BloodSplashAnimationProps {
    position: { x: number; y: number };
    attackType: AttackType;
    onComplete: () => void;
}

export const BloodSplashAnimation: FC<BloodSplashAnimationProps> = ({ position, onComplete, attackType }) => {
    const BLOOD_SPLASH_PARTICLES = 100;
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 300);

        if (containerRef.current) {
            const particles = containerRef.current.querySelectorAll('.blood-splash');

            particles.forEach(particle => {
                const particleElement = particle as HTMLElement;
                const angle = Math.random() * 2 * Math.PI;
                const radius = Math.random() * 100 + 5;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                particleElement.style.setProperty('--x', `${x}px`);
                particleElement.style.setProperty('--y', `${y}px`);
                particleElement.style.animationDelay = `${Math.random() * 0.05}s`;
            });
        }

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div ref={containerRef} className="blood-splash-container" style={{ top: position.y, left: position.x }}>
            {[...Array(BLOOD_SPLASH_PARTICLES)].map((_, index) => (
                <div key={index} className={`blood-splash ${attackType}`} />
            ))}
        </div>
    );
};
