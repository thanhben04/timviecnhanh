import bag from '../../../assets/images/NewItems/bag.png';
import headphone from '../../../assets/images/NewItems/headphone.png';
import phone from '../../../assets/images/NewItems/phone.png';
import car from '../../../assets/images/NewItems/car.png';
import clothes from '../../../assets/images/NewItems/clothes.png';
import vacuum from '../../../assets/images/NewItems/vacuum.png';

export const getSampleNewItems = (t: (key: string) => string) => [
    {
        id: '1',
        brand: 'Hermès',
        title: t('sample_item_hermes_title'),
        price: '26999000',
        image: bag,
        link: '',
        bgColor: '#EFEAE1',
    },
    {
        id: '2',
        brand: 'Sony',
        title: t('sample_item_sony_headphone_title'),
        price: '2999000',
        image: headphone,
        category: 'Electronics',
        link: '',
        bgColor: '#E4E1EF',
    },
    {
        id: '3',
        brand: 'Apple',
        title: t('sample_item_iphone_title'),
        price: '28999000',
        image: phone,
        link: '',
        bgColor: '#E1EFE3',
    },
    {
        id: '4',
        brand: 'Mercedes-Benz',
        title: t('sample_item_mercedes_title'),
        price: '2499000000',
        image: car,
        link: '',
        bgColor: '#F4F4F4',
    },
    {
        id: '5',
        brand: 'Chanel',
        title: t('sample_item_chanel_title'),
        price: '1500000',
        image: clothes,
        link: '',
        bgColor: '#FBE8E8',
    },
    {
        id: '6',
        brand: 'Dreame',
        title: t('sample_item_dreame_title'),
        price: '28999000',
        image: vacuum,
        link: '',
        bgColor: '#E8F3FB',
    },
];

// Keep the original static export for backward compatibility
export const sampleNewItems = getSampleNewItems((key: string) => key);

export default sampleNewItems;
