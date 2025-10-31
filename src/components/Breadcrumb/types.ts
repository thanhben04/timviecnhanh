export interface BreadcrumbItem {
    key: string;
    title: string;
    href?: string;
    icon?: React.ReactNode;
}

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    className?: string;
}
