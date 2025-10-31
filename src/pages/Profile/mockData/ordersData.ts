import { OrderItem } from '../types';

export const mockOrdersData: OrderItem[] = [
    {
        id: 'ORD-001',
        product: {
            name: 'iPhone 13 Pro Max - 128GB - Xám Graphite',
            image: '/static/media/apple_icon.049012dd464076679252.png',
            sku: '#RM-HCM-240710-002',
            verifiedPrice: 12500000,
            price: 12500000,
            condition: 'Tấy nhe mặt lưng, có sạc, không hộp',
            tags: ['128GB', '91%-100% pin', 'Bán rời đã'],
        },
        seller: {
            id: 'SELLER-001',
            name: 'Cửa hàng thanh lý điện thoại',
            avatar: '/static/media/apple_icon.049012dd464076679252.png',
            rating: 4.8,
        },
        total: 12500000,
        status: 'completed',
        orderDate: '2024-07-20T10:30:00Z',
        deliveryDate: '2024-07-22T14:00:00Z',
        shippingAddress: {
            name: 'Huynh Mai An Phu',
            phone: '+84987654321',
            address:
                '2A Điện Biên Phủ, Phường 25, Quận Bình Thạnh, TP. Hồ Chí Minh',
        },
        paymentMethod: 'COD',
        trackingNumber: 'VN240720001',
        type: 0,
    },
    {
        id: 'ORD-002',
        product: {
            name: 'Samsung Galaxy S23 Ultra - 256GB - Phantom Black',
            image: '/static/media/app_mockup.46c9e5feaa973c817820.png',
            sku: '#SM-SGN-240715-001',
            verifiedPrice: 12500000,
            price: 18900000,
            condition: 'Tấy nhe mặt lưng, có sạc, không hộp',
            tags: ['128GB', '91%-100% pin', 'Bán rời đã'],
        },
        seller: {
            id: 'SELLER-002',
            name: 'Tech Mobile Store',
            avatar: '/static/media/apple_icon.049012dd464076679252.png',
            rating: 4.9,
        },
        total: 18900000,
        status: 'processing',
        orderDate: '2024-07-23T15:45:00Z',
        shippingAddress: {
            name: 'Huynh Mai An Phu',
            phone: '+84987654321',
            address:
                '2A Điện Biên Phủ, Phường 25, Quận Bình Thạnh, TP. Hồ Chí Minh',
        },
        paymentMethod: 'Bank Transfer',
        trackingNumber: 'VN240723002',
        type: 1,
    },
    {
        id: 'ORD-003',
        product: {
            name: 'MacBook Air M2 - 13 inch - 256GB',
            image: '/static/media/apple_icon.049012dd464076679252.png',
            sku: '#MB-HCM-240710-003',
            verifiedPrice: 12500000,
            price: 25500000,
            condition: 'Tấy nhe mặt lưng, có sạc, không hộp',
            tags: ['128GB', '91%-100% pin', 'Bán rời đã'],
        },
        seller: {
            id: 'SELLER-003',
            name: 'Laptop Second Hand',
            avatar: '/static/media/apple_icon.049012dd464076679252.png',
            rating: 4.7,
        },
        total: 25500000,
        status: 'processing',
        orderDate: '2024-07-22T09:20:00Z',
        shippingAddress: {
            name: 'Huynh Mai An Phu',
            phone: '+84987654321',
            address:
                '2A Điện Biên Phủ, Phường 25, Quận Bình Thạnh, TP. Hồ Chí Minh',
        },
        paymentMethod: 'COD',
        trackingNumber: 'VN240722003',
        type: 0,
    },
];
