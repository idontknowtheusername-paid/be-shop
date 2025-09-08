'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { RefreshCw, ArrowDown } from 'lucide-react';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
  className?: string;
  disabled?: boolean;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  threshold = 80,
  className = '',
  disabled = false
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const y = useMotionValue(0);
  const rotate = useTransform(y, [0, threshold], [0, 180]);
  const scale = useTransform(y, [0, threshold], [0.8, 1.2]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (container.scrollTop === 0) {
        startY = e.touches[0].clientY;
        isDragging = true;
        setIsPulling(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || container.scrollTop > 0) return;
      
      currentY = e.touches[0].clientY;
      const distance = Math.max(0, currentY - startY);
      
      if (distance > 0) {
        e.preventDefault();
        setPullDistance(distance);
        y.set(distance);
      }
    };

    const handleTouchEnd = async () => {
      if (!isDragging) return;
      
      isDragging = false;
      setIsPulling(false);
      
      if (pullDistance >= threshold) {
        setIsRefreshing(true);
        y.set(0);
        setPullDistance(0);
        
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
        }
      } else {
        y.set(0);
        setPullDistance(0);
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance, threshold, onRefresh, disabled, y]);

  const getRefreshText = () => {
    if (isRefreshing) return 'Actualisation...';
    if (pullDistance >= threshold) return 'Relâchez pour actualiser';
    return 'Tirez vers le bas pour actualiser';
  };

  return (
    <div ref={containerRef} className={`relative overflow-auto ${className}`}>
      {/* Pull to Refresh Indicator */}
      <AnimatePresence>
        {(isPulling || isRefreshing) && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center py-4"
            style={{ transform: `translateY(${Math.min(pullDistance, threshold)}px)` }}
          >
            <div className="bg-white rounded-full shadow-lg p-3 flex items-center space-x-2">
              <motion.div
                style={{ rotate, scale }}
                animate={isRefreshing ? { rotate: 360 } : {}}
                transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
              >
                {isRefreshing ? (
                  <RefreshCw className="h-5 w-5 text-[#1E40AF]" />
                ) : (
                  <ArrowDown className="h-5 w-5 text-[#1E40AF]" />
                )}
              </motion.div>
              <span className="text-sm font-medium text-gray-700">
                {getRefreshText()}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.div
        style={{ y: isPulling ? Math.min(pullDistance * 0.5, threshold * 0.5) : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PullToRefresh;

