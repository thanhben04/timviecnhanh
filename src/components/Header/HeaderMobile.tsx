import { Button, Flex, Layout } from 'antd';
import { Link } from 'react-router-dom';
import white_logo from '../../assets/images/white_logo.png';

import './Header.scss';

import { BurgerIcon } from 'assets/icons/outlined/BurgerIcon';
import { SearchIcon } from 'assets/icons/outlined/SearchIcon';
import HeaderMenu from './HeaderMenu';
import HeaderUser from './HeaderUser';
import { useCallback, useEffect, useState } from 'react';
import SearchModal from './SearchModal/SearchModal';
import SideBarMenuModal from './SideBarMenuModal/SideBarMenuModal';
import SearchBar from 'components/Search/SearchBar';
import { LeftArrowIcon } from 'assets/icons/outlined/LeftArrowIcon';

const { Header: AntHeader } = Layout;

const HeaderMobile = () => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSearchFocus = useCallback(() => {
        setIsSearchFocused(true);
    }, []);

    const handleSearchClose = useCallback(() => {
        console.log("hehe")
        setIsSearchFocused(false);
        setSearchValue('');
    }, []);

    const handleSidebarOpen = useCallback(() => {
        setIsSidebarOpen(true);
    }, []);

    const handleSidebarClose = useCallback(() => {
        setIsSidebarOpen(false);
    }, []);

    const handleSearch = useCallback((query: string) => {
        console.log('Searching for:', query);
        // Implement search logic here
        setIsSearchFocused(false);
    }, []);

    const handleSearchChange = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    useEffect(() => {
        const body = document.body;
        const html = document.documentElement;

        if (isSearchFocused || isSidebarOpen) {
            body.classList.add('no-scroll');
            html.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
            html.classList.remove('no-scroll');
        }

        return () => {
            body.classList.remove('no-scroll');
            html.classList.remove('no-scroll');
        };
    }, [isSearchFocused, isSidebarOpen]);




    useEffect(() => {
        console.log('isSidebarOpen', isSidebarOpen);
    }, [isSidebarOpen])

    return (
        <div>
            {!isSearchFocused && < HeaderMenu />}
            <AntHeader
                className="custom-header mobile"
                style={{
                    backgroundColor: isSearchFocused ? 'white' : '#d00000'
                }}
            >
                <Flex vertical gap={8} className="container">
                    <Flex gap={50} className="header-content">
                        {isSearchFocused && (
                            <Flex
                                align='center'
                                gap={16}
                                className={`search-bar-wrapper ${isSearchFocused ? 'focused' : ''}`}
                            >
                                <Button
                                    type="text"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSearchClose();
                                    }}
                                    className="close-search-btn"
                                    icon={<LeftArrowIcon stroke='#171717' />}
                                />
                                <div onClick={handleSearchFocus}>
                                    <SearchBar />
                                </div>
                            </Flex>
                        )}
                        {!isSearchFocused && (
                            <>
                                <Flex gap={12} align="center" style={{ width: '88px' }}>
                                    <Button onClick={handleSidebarOpen} icon={<BurgerIcon />} className="search-button" />
                                    <Button onClick={handleSearchFocus} icon={<SearchIcon />} className="search-button" />
                                </Flex>
                                <Link to="/" className="logo">
                                    <img src={white_logo} alt='logo' />
                                </Link>
                                <HeaderUser />
                            </>
                        )}
                    </Flex>
                </Flex>
                <SearchModal
                    isVisible={isSearchFocused}
                    onClose={handleSearchClose}
                    onSearch={handleSearch}
                    searchValue={searchValue}
                    onSearchChange={handleSearchChange}
                />
                <SideBarMenuModal
                    isVisible={isSidebarOpen}
                    onClose={handleSidebarClose}
                />
            </AntHeader>
        </div>
    );
};

export default HeaderMobile;
