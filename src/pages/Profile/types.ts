import { AuthUser } from '../../types';

// Use the existing AuthUser interface from the main types
export type User = AuthUser;

export interface ProfileHeaderProps {
    user: User | null;
    onEditToggle: () => void;
    isEditing: boolean;
}

export interface ProfileSidebarProps {
    user: User | null;
    selectedKey: string;
    isEditing: boolean;
    onMenuClick: (key: string) => void;
    onEditToggle: () => void;
    onLogout: () => void;
}

export interface ProfileContentProps {
    selectedKey: string;
    user: User | null;
    isEditing: boolean;
    onSave: (values: any) => void;
}

export interface Address {
    id?: string;
    name: string;
    phone_number: string;
    city: string; // This will store province code
    cityName?: string; // For display purposes
    ward: string; // This will store ward code
    wardName?: string; // For display purposes
    address: string;
    isDefault: boolean;
}

export interface AddressFormData {
    name: string;
    phone_number: string;
    city: string; // province code
    ward: string; // ward code
    address: string;
    isDefault: boolean;
}

export interface AddressModalProps {
    visible: boolean;
    address?: Address;
    onCancel: () => void;
    onSubmit: (values: AddressFormData) => void;
    isEditing?: boolean;
}

export interface AddressManagementProps {
    addresses: Address[];
    onAddAddress: (address: AddressFormData) => void;
    onEditAddress: (id: string, address: AddressFormData) => void;
    onDeleteAddress: (id: string) => void;
    onSetDefaultAddress: (id: string) => void;
}

export interface NotificationSubSetting {
    key: string;
    label: string;
    description: string;
    enabled: boolean;
}

export interface NotificationCategory {
    key: string;
    label: string;
    description: string;
    enabled: boolean;
    subSettings: NotificationSubSetting[];
}

export interface NotificationSettings {
    email: NotificationCategory;
    sms: NotificationCategory;
    zalo: NotificationCategory;
}

export type ProfileMenuKey =
    | 'personal'
    | 'notifications'
    | 'orders'
    | 'favorites'
    | 'settings';

// Order-related types
export type OrderStatus = 'completed' | 'processing' | 'canceled';
export type OrderTabKey = 'all' | OrderStatus;

export interface OrderProduct {
    name: string;
    image: string;
    sku: string;
    verifiedPrice: number;
    price: number;
    condition: string;
    tags: string[];
}

export interface OrderSeller {
    id: string;
    name: string;
    avatar: string;
    rating: number;
}

export interface OrderShippingAddress {
    name: string;
    phone: string;
    address: string;
}

export interface OrderItem {
    id: string;
    product: OrderProduct;
    seller: OrderSeller;
    total: number;
    status: OrderStatus;
    orderDate: string;
    deliveryDate?: string;
    cancelDate?: string;
    cancelReason?: string;
    shippingAddress: OrderShippingAddress;
    paymentMethod: string;
    trackingNumber?: string;
    type?: number; // 0 for normal, 1 for credit
}
