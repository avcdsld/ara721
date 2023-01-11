import React, { useState } from 'react';

const useWindowSize = (): number[] => {
    const [size, setSize] = useState([0, 0]);

    if (typeof document === 'undefined') {
        React.useLayoutEffect = React.useEffect;
    }

    React.useLayoutEffect(() => {
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
