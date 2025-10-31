// API Types
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website?: string;
    address: Address;
    company?: Company;
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export interface Geo {
    lat: string;
    lng: string;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export interface Comment {
    id: number;
    name: string;
    email: string;
    body: string;
    postId: number;
}

// Auth Types
export interface PhoneVerificationRequest {
    mobile: string;
    key: string;
}

export interface OTPVerificationRequest {
    phone: string;
    code: string;
}

export interface AuthUser {
    id: number;
    nick_name: string;
    phone: string;
    email?: string;
    token: string;
    is_ban?: boolean;
    gender?: number;
    loginMethod?: string;
    avatar?: string;
    province?: string;
    district?: string;
    ward?: string;
    city?: string;
    birthday?: string;
}

// Legacy types for backward compatibility
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// API Response Types
export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}

export interface ApiError {
    message: string;
    status: number;
    data?: any;
}

// Form Types
export interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// Ant Design Component Props Types
export interface AntButtonProps {
    children: React.ReactNode;
    type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
    size?: 'small' | 'middle' | 'large';
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    onClick?: () => void;
    htmlType?: 'button' | 'submit' | 'reset';
    href?: string;
    target?: string;
    icon?: React.ReactNode;
    shape?: 'default' | 'circle' | 'round';
    block?: boolean;
    danger?: boolean;
    ghost?: boolean;
}

export interface AntCardProps {
    children: React.ReactNode;
    className?: string;
    title?: React.ReactNode;
    extra?: React.ReactNode;
    cover?: React.ReactNode;
    actions?: React.ReactNode[];
    bordered?: boolean;
    hoverable?: boolean;
    loading?: boolean;
    size?: 'default' | 'small';
    bodyStyle?: React.CSSProperties;
    headStyle?: React.CSSProperties;
}

// Legacy Component Props Types (for backward compatibility)
export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    as?: React.ElementType;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    message?: string;
}

// Hook Types
export interface UseApiResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export interface UseLocalStorageResult<T> {
    0: T;
    1: (value: T | ((prevValue: T) => T)) => void;
    2: () => void;
}
