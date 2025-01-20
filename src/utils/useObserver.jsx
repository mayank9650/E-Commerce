import { useState, useEffect } from "react";

const OPTIONS = {
  root: null,
  rootMargin: "0px",
  threshold: [0.5, 1, 0],
};

/**
 * Custom hook to find the intersection observer
 * @param {} elementRef 
 * @returns 
 */
const useObserver = (elementRef) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (elementRef) {
      setIsVisible(false);
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.5) {
            observer.unobserve(elementRef);
            setIsVisible(true);
          }
        });
      }, OPTIONS);
      observer.observe(elementRef);
    }
  }, [elementRef]);

  return isVisible;
};

export default useObserver;
