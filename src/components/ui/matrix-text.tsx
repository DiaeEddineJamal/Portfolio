"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LetterState {
    char: string;
    isMatrix: boolean;
    isSpace: boolean;
}

interface MatrixTextProps {
    text?: string;
    className?: string;
    initialDelay?: number;
    letterAnimationDuration?: number;
    letterInterval?: number;
    scrollTriggered?: boolean;
    matrixColor?: string;
}

export const MatrixText = ({
    text = "HelloWorld!",
    className,
    initialDelay = 200,
    letterAnimationDuration = 500,
    letterInterval = 100,
    scrollTriggered = false,
    matrixColor = "rgb(198, 128, 255)",
}: MatrixTextProps) => {
    const [letters, setLetters] = useState<LetterState[]>(() =>
        text.split("").map((char) => ({
            char,
            isMatrix: false,
            isSpace: char === " ",
        }))
    );
    const [isAnimating, setIsAnimating] = useState(false);
    const [isVisible, setIsVisible] = useState(!scrollTriggered);
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const getRandomChar = useCallback(
        () => (Math.random() > 0.5 ? "1" : "0"),
        []
    );

    const animateLetter = useCallback(
        (index: number) => {
            if (index >= text.length) return;

            requestAnimationFrame(() => {
                setLetters((prev) => {
                    const newLetters = [...prev];
                    if (!newLetters[index].isSpace) {
                        newLetters[index] = {
                            ...newLetters[index],
                            char: getRandomChar(),
                            isMatrix: true,
                        };
                    }
                    return newLetters;
                });

                setTimeout(() => {
                    setLetters((prev) => {
                        const newLetters = [...prev];
                        newLetters[index] = {
                            ...newLetters[index],
                            char: text[index],
                            isMatrix: false,
                        };
                        return newLetters;
                    });
                }, letterAnimationDuration);
            });
        },
        [getRandomChar, text, letterAnimationDuration]
    );

    const startAnimation = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);
        let currentIndex = 0;

        const animate = () => {
            if (currentIndex >= text.length) {
                setIsAnimating(false);
                return;
            }

            animateLetter(currentIndex);
            currentIndex++;
            setTimeout(animate, letterInterval);
        };

        animate();
    }, [animateLetter, text, isAnimating, letterInterval]);

    useEffect(() => {
        if (scrollTriggered && containerRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !hasAnimated) {
                            setIsVisible(true);
                            setHasAnimated(true);
                        } else if (!entry.isIntersecting && hasAnimated) {
                            // Reset animation when scrolling back up
                            setIsVisible(false);
                            setHasAnimated(false);
                            setLetters(text.split("").map((char) => ({
                                char,
                                isMatrix: false,
                                isSpace: char === " ",
                            })));
                        }
                    });
                },
                {
                    threshold: 0.3,
                    rootMargin: "-10% 0px -10% 0px"
                }
            );

            observer.observe(containerRef.current);
            return () => observer.disconnect();
        } else if (!scrollTriggered) {
            const timer = setTimeout(startAnimation, initialDelay);
            return () => clearTimeout(timer);
        }
    }, [scrollTriggered, hasAnimated, text]);

    useEffect(() => {
        if (scrollTriggered && isVisible && !isAnimating) {
            const timer = setTimeout(startAnimation, initialDelay);
            return () => clearTimeout(timer);
        }
    }, [isVisible, scrollTriggered]);

    const motionVariants = useMemo(
        () => ({
            matrix: {
                color: matrixColor,
                textShadow: `0 2px 4px ${matrixColor}80`,
            },
        }),
        [matrixColor]
    );

    return (
        <div
            ref={containerRef}
            className={cn(
                "flex items-center text-black dark:text-white",
                className?.includes('justify-start') ? 'justify-start' : 'justify-center',
                className
            )}
            aria-label="Matrix text animation"
        >
            <div className={cn(
                "flex items-center",
                className?.includes('justify-start') ? 'justify-start' : 'justify-center'
            )}>
                <div className={cn(
                    "flex flex-wrap items-center",
                    className?.includes('justify-start') ? 'justify-start' : 'justify-center'
                )}>
                    {letters.map((letter, index) => (
                        <motion.div
                            key={`${index}-${letter.char}`}
                            className="font-mono w-[1ch] text-center overflow-hidden"
                            initial="initial"
                            animate={letter.isMatrix ? "matrix" : "normal"}
                            variants={motionVariants}
                            transition={{
                                duration: 0.1,
                                ease: "easeInOut",
                            }}
                            style={{
                                display: "inline-block",
                                fontVariantNumeric: "tabular-nums",
                            }}
                        >
                            {letter.isSpace ? "\u00A0" : letter.char}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};