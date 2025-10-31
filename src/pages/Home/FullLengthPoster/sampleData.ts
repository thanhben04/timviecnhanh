import bag from '../../../assets/images/Products/BagPoster.png';
import electronics from '../../../assets/images/Products/Electronics.png';
import clothes from '../../../assets/images/Products/Clothes.png';
import phone from '../../../assets/images/Products/Phones.png';

export const getSampleFullLengthPosters = (t: (key: string) => string) => [
    {
        id: '1',
        title: t('poster_luxury_bags_title'),
        desc: t('poster_luxury_bags_desc'),
        image: bag,
        link: '',
        bgColor: '#F5F5F5',
    },
    {
        id: '2',
        title: t('poster_smart_appliances_title'),
        desc: t('poster_smart_appliances_desc'),
        image: electronics,
        link: '',
        bgColor: '#E1EFE3',
    },
    {
        id: '3',
        title: t('poster_fashion_title'),
        desc: t('poster_fashion_desc'),
        image: clothes,
        link: '',
        bgColor: '#EFECE1',
    },
    {
        id: '4',
        title: t('poster_smartphone_title'),
        desc: t('poster_smartphone_desc'),
        image: phone,
        link: '',
        bgColor: '#E8F3FB',
    },
];

// Keep the original static export for backward compatibility
export const sampleFullLengthPosters = getSampleFullLengthPosters(
    (key: string) => key
);

export default sampleFullLengthPosters;
