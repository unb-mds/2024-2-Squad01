import React, { useState, useEffect, useRef } from 'react';
import styles from './carrossel.module.css';

const ITEM_WIDTH = 1024; 
const GAP = 48; 
const WRAPPER_WIDTH = 1224; 

const Carousel = ({ items, interval = 3000 }) => {
    const extendedItems = [items[items.length - 1], ...items, items[0]]; 
    const [current, setCurrent] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const containerRef = useRef();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => prev + 1);
            setIsTransitioning(true);
        }, interval);
        return () => clearInterval(timer);
    }, [interval]);

    const handleTransitionEnd = () => {
        if (current === extendedItems.length - 1) {
            setIsTransitioning(false);
            setCurrent(1);
        }
        if (current === 0) {
            setIsTransitioning(false);
            setCurrent(extendedItems.length - 2);
        }
    };

    useEffect(() => {
        if (!isTransitioning) {
            requestAnimationFrame(() => {
                setIsTransitioning(true);
            });
        }
    }, [isTransitioning]);

   
    const translateX = (current * (ITEM_WIDTH + GAP)) - (WRAPPER_WIDTH / 2) + (ITEM_WIDTH / 2);

    return (
        <div className={styles.carouselWrapper}>
            <div
                className={styles.carouselContainer}
                ref={containerRef}
                style={{
                    transform: `translateX(-${translateX}px)`,
                    transition: isTransitioning ? 'transform 0.5s ease' : 'none'
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {extendedItems.map((item, index) => {
                    const isActive = index === current;
                    return (
                        <div
                            key={index}
                            className={`${styles.carouselItem} ${isActive ? styles.active : ''}`}
                            onClick={() => {
                                setCurrent(index);
                                setIsTransitioning(true);
                            }}
                        >
                            <img src={item.image} alt={item.alt || `Item ${index + 1}`} />
                        </div>
                    );
                })}
            </div>

            <div className={styles.dots}>
                {items.map((_, i) => {
                    const dotIndex = i + 1;
                    return (
                        <span
                            key={i}
                            onClick={() => {
                                setCurrent(dotIndex);
                                setIsTransitioning(true);
                            }}
                            className={`${styles.dot} ${dotIndex === current ? styles.activeDot : ''}`}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Carousel;
