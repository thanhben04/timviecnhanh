import { BagIcon } from 'assets/icons/outlined/BagIcon';
import { SmartPhoneIcon } from 'assets/icons/outlined/SmartPhoneIcon';
import { HeadphoneIcon } from 'assets/icons/outlined/HeadphoneIcon';
import { WatchIcon } from 'assets/icons/outlined/WatchIcon';
import { ShoeIcon } from 'assets/icons/outlined/ShoeIcon';
import { TShirtIcon } from 'assets/icons/outlined/TShirtIcon';
import { PantsIcon } from 'assets/icons/outlined/PantsIcon';
import { BackpackIcon } from 'assets/icons/outlined/BackpackIcon';
import { CarIcon } from 'assets/icons/outlined/CarIcon';
import { LaptopIcon } from 'assets/icons/outlined/LaptopIcon';

export interface Category {
    id: string;
    label: string;
    icon: React.ReactNode;
    subCategories?: string[];
    megaMenuColumns?: {
        title: string;
        items: string[];
    }[];
}

// Function to get categories data with translations
export const getCategoriesData = (t: (key: string) => string): Category[] => [
    {
        id: 'bags',
        label: t('category_bags'),
        icon: <BagIcon />,
        megaMenuColumns: [
            {
                title: t('bag_types'),
                items: [
                    'Túi đeo chéo',
                    'Túi xách tay',
                    'Túi đeo vai',
                    'Túi clutch',
                    'Túi bucket',
                    'Túi tote',
                    'Túi mini'
                ]
            },
            {
                title: t('materials'),
                items: [
                    'Da thật',
                    'Da PU',
                    'Canvas',
                    'Vải dù',
                    'Nhựa PVC'
                ]
            },
            {
                title: t('brands'),
                items: [
                    'Charles & Keith',
                    'Gucci',
                    'Louis Vuitton',
                    'Tory Burch',
                    'Hermès',
                    'Coach'
                ]
            }
        ]
    },
    {
        id: 'phones',
        label: t('category_phones'),
        icon: <SmartPhoneIcon />,
        megaMenuColumns: [
            {
                title: t('phone_brands'),
                items: [
                    'iPhone',
                    'Samsung',
                    'Xiaomi',
                    'OPPO',
                    'realme',
                    'TECNO',
                    'vivo',
                    'Nokia',
                    'Asus',
                    'Nothing Phone',
                    'Masstel',
                    'Sony',
                    'Motorola'
                ]
            },
            {
                title: t('phone_price_range'),
                items: [
                    'Dưới 2 triệu',
                    'Từ 2 - 4 triệu',
                    'Từ 4 - 7 triệu',
                    'Từ 7 - 10 triệu',
                    'Từ 10 - 13 triệu',
                    'Từ 13 - 20 triệu',
                    'Trên 20 triệu'
                ]
            },
            {
                title: t('phone_by_needs'),
                items: [
                    'Chụp ảnh đẹp',
                    'Hiệu năng mạnh',
                    'Pin trâu',
                    'Sạc siêu nhanh',
                    'Thiết kế đẹp',
                    'Chơi game tốt',
                    'Học tập và làm việc'
                ]
            },
            {
                title: t('hot_phones'),
                items: [
                    'Samsung Galaxy S24',
                    'iPhone 15 Pro Max',
                    'Xiaomi 14',
                    'OPPO Find X7 Ultra',
                    'realme GT 6',
                    'Nothing Phone 2a',
                    'vivo X100 Pro'
                ]
            }
        ]
    },
    {
        id: 'laptops',
        label: t('category_laptops'),
        icon: <LaptopIcon />,
        megaMenuColumns: [
            {
                title: t('popular_brands'),
                items: [
                    'MacBook',
                    'Dell',
                    'HP',
                    'ASUS',
                    'Acer',
                    'Lenovo',
                    'MSI',
                    'Gigabyte'
                ]
            },
            {
                title: t('usage_needs'),
                items: [
                    'Học tập - Văn phòng',
                    'Đồ họa - Kỹ thuật',
                    'Gaming',
                    'Mỏng nhẹ - Thời trang',
                    'Doanh nhân - Bảo mật'
                ]
            },
            {
                title: t('price_range'),
                items: [
                    'Dưới 10 triệu',
                    'Từ 10 - 15 triệu',
                    'Từ 15 - 25 triệu',
                    'Trên 25 triệu'
                ]
            }
        ]
    },
    {
        id: 'headphones',
        label: t('category_headphones'),
        icon: <HeadphoneIcon />,
        megaMenuColumns: [
            {
                title: t('headphone_types'),
                items: [
                    'Bluetooth',
                    'Có dây',
                    'Gaming',
                    'Chống ồn',
                    'Chụp tai',
                    'Nhét tai'
                ]
            },
            {
                title: t('popular_brands'),
                items: [
                    'Sony',
                    'JBL',
                    'Apple',
                    'Samsung',
                    'SoundPeats',
                    'Bose'
                ]
            },
            {
                title: t('price_levels'),
                items: [
                    'Dưới 500k',
                    '500k - 1 triệu',
                    '1 - 2 triệu',
                    'Trên 2 triệu'
                ]
            }
        ]
    },
    {
        id: 'watches',
        label: t('category_watches'),
        icon: <WatchIcon />,
        megaMenuColumns: [
            {
                title: t('watch_types'),
                items: [
                    'Thông minh',
                    'Kim',
                    'Điện tử',
                    'Cặp đôi',
                    'Thời trang'
                ]
            },
            {
                title: t('brands'),
                items: [
                    'Apple Watch',
                    'Samsung Watch',
                    'Casio',
                    'Fossil',
                    'Garmin',
                    'Xiaomi'
                ]
            },
            {
                title: t('strap_materials'),
                items: [
                    'Dây da',
                    'Dây thép',
                    'Dây cao su',
                    'Dây vải'
                ]
            }
        ]
    },
    {
        id: 'shoes',
        label: t('category_shoes'),
        icon: <ShoeIcon />,
        megaMenuColumns: [
            {
                title: t('shoe_types'),
                items: [
                    'Sneakers',
                    'Giày tây',
                    'Giày lười',
                    'Giày thể thao',
                    'Giày sandal',
                    'Giày boots'
                ]
            },
            {
                title: t('for_whom'),
                items: [
                    'Nam',
                    'Nữ',
                    'Trẻ em',
                    'Unisex'
                ]
            },
            {
                title: t('brands'),
                items: [
                    'Nike',
                    'Adidas',
                    'Converse',
                    'Vans',
                    'Bitis',
                    'Puma'
                ]
            }
        ]
    },
    {
        id: 'shirts',
        label: t('category_shirts'),
        icon: <TShirtIcon />,
        megaMenuColumns: [
            {
                title: t('shirt_types'),
                items: [
                    'Áo thun',
                    'Áo sơ mi',
                    'Áo khoác',
                    'Áo hoodie',
                    'Áo len',
                    'Áo polo'
                ]
            },
            {
                title: t('materials'),
                items: [
                    'Cotton',
                    'Polyester',
                    'Linen',
                    'Jean',
                    'Nỉ'
                ]
            },
            {
                title: t('styles'),
                items: [
                    'Công sở',
                    'Thể thao',
                    'Dạo phố',
                    'Thời trang Hàn'
                ]
            }
        ]
    },
    {
        id: 'pants',
        label: t('category_pants'),
        icon: <PantsIcon />,
        megaMenuColumns: [
            {
                title: t('pants_types'),
                items: [
                    'Jean',
                    'Kaki',
                    'Jogger',
                    'Shorts',
                    'Quần âu',
                    'Leggings'
                ]
            },
            {
                title: t('styles'),
                items: [
                    'Công sở',
                    'Thể thao',
                    'Dạo phố',
                    'Form rộng',
                    'Skinny'
                ]
            },
            {
                title: t('materials'),
                items: [
                    'Jean',
                    'Cotton',
                    'Thun',
                    'Lụa',
                    'Linen'
                ]
            }
        ]
    },
    {
        id: 'backpacks',
        label: t('category_backpacks'),
        icon: <BackpackIcon />,
        megaMenuColumns: [
            {
                title: t('backpack_types'),
                items: [
                    'Balo laptop',
                    'Balo học sinh',
                    'Balo thời trang',
                    'Balo du lịch',
                    'Balo chống trộm',
                    'Balo mini'
                ]
            },
            {
                title: t('materials'),
                items: [
                    'Canvas',
                    'Da PU',
                    'Vải dù',
                    'Nhựa chống nước'
                ]
            },
            {
                title: t('brands'),
                items: [
                    'SimpleCarry',
                    'Mikkor',
                    'Adidas',
                    'Tigernu',
                    'Bange',
                    'Tomtoc'
                ]
            }
        ]
    },
    {
        id: 'vehicles',
        label: t('category_vehicles'),
        icon: <CarIcon />,
        megaMenuColumns: [
            {
                title: t('vehicle_types'),
                items: [
                    'Xe máy',
                    'Xe tay ga',
                    'Xe số',
                    'Xe điện',
                    'Xe côn tay',
                    'Ô tô cũ',
                    'Ô tô mới'
                ]
            },
            {
                title: t('popular_brands'),
                items: [
                    'Honda',
                    'Yamaha',
                    'VinFast',
                    'Toyota',
                    'Kia',
                    'Mazda',
                    'Ford',
                    'Hyundai'
                ]
            },
            {
                title: t('notable_features'),
                items: [
                    'Tiết kiệm xăng',
                    'Gầm cao',
                    'Xe gia đình',
                    'Xe thể thao',
                    'Xe 7 chỗ',
                    'Xe điện'
                ]
            }
        ]
    }
];

// Keep the original static export for backward compatibility
export const categoriesData: Category[] = getCategoriesData((key: string) => key);
