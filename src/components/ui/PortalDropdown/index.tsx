'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface IPortalDropdownProps {
  anchorRef: React.RefObject<HTMLElement | null>;
  isOpen: boolean;
  children: React.ReactNode;
}

interface IRect {
  top: number;
  left: number;
  width: number;
}

const PortalDropdown = ({ anchorRef, isOpen, children }: IPortalDropdownProps) => {
  const [rect, setRect] = useState<IRect | null>(null);
  const frameRef = useRef<number>(0);

  useLayoutEffect(() => {
    if (!isOpen) {
      setRect(null);
      return;
    }

    const measure = () => {
      if (!anchorRef.current) return;
      const r = anchorRef.current.getBoundingClientRect();
      setRect({ top: r.bottom + 4, left: r.left, width: r.width });
    };

    measure();

    // Re-measure on scroll / resize so position stays in sync
    const onUpdate = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onUpdate, true);
    window.addEventListener('resize', onUpdate);

    return () => {
      window.removeEventListener('scroll', onUpdate, true);
      window.removeEventListener('resize', onUpdate);
      cancelAnimationFrame(frameRef.current);
    };
  }, [isOpen, anchorRef]);

  if (!isOpen || !rect || typeof window === 'undefined') return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      }}
    >
      {children}
    </div>,
    document.body,
  );
};

export default PortalDropdown;
