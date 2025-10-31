import { useEffect, useState } from 'react';
const widthMobile = 768;
export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= widthMobile);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= widthMobile);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};
