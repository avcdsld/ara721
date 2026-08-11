import { useEffect, useLayoutEffect, useState } from 'react';

// useLayoutEffect warns when it runs during server rendering, where there is no
// layout to measure. Fall back to useEffect there instead of mutating React.
const useIsomorphicLayoutEffect =
  typeof document === 'undefined' ? useEffect : useLayoutEffect;

const useWindowSize = (): number[] => {
  const [size, setSize] = useState([0, 0]);

  useIsomorphicLayoutEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};

export default useWindowSize;
