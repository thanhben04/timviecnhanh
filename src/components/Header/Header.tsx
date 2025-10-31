import { Button, Dropdown, Flex, Layout } from 'antd';
import { Link } from 'react-router-dom';
import white_logo from '../../assets/images/white_logo.png';
import { useTranslation } from 'react-i18next';

import { ChevronDown } from 'assets/icons/outlined/ChevronDown';
import { EditIcon } from 'assets/icons/outlined/EditIcon';
import SearchBar from 'components/Search/SearchBar';
import './Header.scss';

import { LeftArrowIcon } from 'assets/icons/outlined/LeftArrowIcon';
import { useIsMobile } from 'hooks/useIsMobile';
import { useCallback, useEffect, useMemo, useState } from 'react';
import HeaderMenu from './HeaderMenu';
import HeaderMobile from './HeaderMobile';
import HeaderUser from './HeaderUser';
import SearchModal from './SearchModal/SearchModal';

const { Header: AntHeader } = Layout;

const Header = () => {
    const isMobile = useIsMobile();
    const { t } = useTranslation();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const categoryItems = useMemo(() => [
        {
            key: 'electronics',
            label: <Link to="/category/electronics">{t('electronics')}</Link>,
        },
        {
            key: 'fashion',
            label: <Link to="/category/fashion">{t('fashion')}</Link>,
        },
        {
            key: 'home',
            label: <Link to="/category/home">{t('home_appliances')}</Link>,
        },
        {
            key: 'books',
            label: <Link to="/category/books">{t('books')}</Link>,
        },
    ], [t]);

    const handleSearchFocus = useCallback(() => {
        setIsSearchFocused(true);
    }, []);

    const handleSearchClose = useCallback(() => {
        setIsSearchFocused(false);
        setSearchValue('');
    }, []);

    const handleSearch = useCallback((query: string) => {
        console.log('Searching for:', query);
        // Implement search logic here
        setIsSearchFocused(false);
    }, []);

    const handleSearchChange = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    // Disable body scroll when search is focused
    useEffect(() => {
        if (isSearchFocused) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to restore scroll when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isSearchFocused]);

    if (isMobile) {
        return <HeaderMobile />;
    }

    return (
        <>
            <AntHeader className={`custom-header`}>
                <Flex vertical gap={8} className="container">
                    <HeaderMenu />
                    {/* <Flex gap={50} className="header-content">
                        {!isSearchFocused && (
                            <>
                                <Link to="/" className="logo">
                                    <img src={white_logo} alt='logo' />
                                </Link>
                                <Dropdown menu={{ items: categoryItems }} trigger={['click']}>
                                    <div className="nav-link category-dropdown">
                                        <span>{t('categories')}</span>
                                        <ChevronDown />
                                    </div>
                                </Dropdown>
                            </>
                        )}
                        {isSearchFocused && (
                            <Button
                                type="text"
                                onClick={handleSearchClose}
                                className="close-search-btn"
                                icon={<LeftArrowIcon />}
                            />
                        )}
                        <div
                            onClick={handleSearchFocus}
                            className={`search-bar-wrapper ${isSearchFocused ? 'focused' : ''}`}
                        >
                            <SearchBar />
                        </div>
                        {!isSearchFocused && (
                            <>
                                <HeaderUser />
                                <Button icon={<EditIcon />} className="post-ad-button">
                                    {!isMobile && t('post_ad')}
                                </Button>
                            </>
                        )}

                    </Flex> */}
                </Flex>
            </AntHeader>
            {/* <SearchModal
                isVisible={isSearchFocused}
                onClose={handleSearchClose}
                onSearch={handleSearch}
                searchValue={searchValue}
                onSearchChange={handleSearchChange}
            /> */}
        </>
    );
};

export default Header;
