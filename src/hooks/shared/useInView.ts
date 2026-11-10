import { RefObject, useEffect, useState } from 'react';

interface IUseInViewOptions extends IntersectionObserverInit {
  once?: boolean;
};

const useInView = <T extends HTMLElement | null>(
  ref: RefObject<T>,
  { once = true, root = null, rootMargin = '200px', threshold = 0 }: IUseInViewOptions = {},
) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);

        if (once) {
          observer.disconnect();
        }
      } else if (!once) {
        setIsInView(false);
      }
    }, { root, rootMargin, threshold });

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, once, root, rootMargin, threshold]);

  return isInView;
};

export default useInView;
