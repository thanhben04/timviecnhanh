import React from 'react';
import { Link as RouterLink, LinkProps, useSearchParams } from 'react-router-dom';

interface LanguageLinkProps extends LinkProps {
    to: string;
    children: React.ReactNode;
}

export const LanguageLink: React.FC<LanguageLinkProps> = ({ to, children, ...props }) => {
    const [searchParams] = useSearchParams();
    const currentLang = searchParams.get('lng');

    // Preserve language parameter if it exists
    const linkTo = React.useMemo(() => {
        if (currentLang && ['en', 'zh'].includes(currentLang)) {
            const separator = to.includes('?') ? '&' : '?';
            return `${to}${separator}lng=${currentLang}`;
        }
        return to;
    }, [to, currentLang]);

    return (
        <RouterLink to={linkTo} {...props}>
            {children}
        </RouterLink>
    );
};
