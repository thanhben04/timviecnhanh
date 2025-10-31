import { Flex, Select, Dropdown, Space, Avatar } from 'antd';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguageUrl } from 'hooks/useLanguageUrl';
import './Header.scss';
import { CodeSandboxOutlined, DownOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Logo } from 'assets/icons/Logo';
import { NotificationIcon } from 'assets/icons/solid/NotificationIcon';


const HeaderMenu = () => {
    const { t } = useTranslation();
    const { currentLanguage, changeLanguage } = useLanguageUrl();
    const [currentRegion, changeCurrentRegion] = useState('mn');

    const leftOptions = useMemo(() => [
        {
            label: 'Việc làm',
            isDropdown: true,
            link: ''
        },
        {
            label: 'Công cụ',
            isDropdown: false,
            link: ''
        },
        {
            label: 'Cẩm nang nghề nghiệp',
            isDropdown: false,
            link: ''
        }
    ], [t])

    const itemAccounts: MenuProps['items'] = [
        {
            key: '1',
            label: 'My Account',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: 'Profile',
            extra: '⌘P',
        },
        {
            key: '3',
            label: 'Billing',
            extra: '⌘B',
        },
        {
            key: '4',
            label: 'Settings',
            icon: <SettingOutlined />,
            extra: '⌘S',
        },
    ];

    const handleChangeLanguage = (value: string) => {
        changeLanguage(value);
    };
    const items: MenuProps['items'] = [
        {
            key: '1',
            type: 'group',
            label: 'Group title',
            children: [
                {
                    key: '1-1',
                    label: '1st menu item',
                },
                {
                    key: '1-2',
                    label: '2nd menu item',
                },
            ],
        },
        {
            key: '2',
            label: 'sub menu',
            children: [
                {
                    key: '2-1',
                    label: '3rd menu item',
                },
                {
                    key: '2-2',
                    label: '4th menu item',
                },
            ],
        },
        {
            key: '3',
            label: 'disabled sub menu',
            disabled: true,
            children: [
                {
                    key: '3-1',
                    label: '5d menu item',
                },
                {
                    key: '3-2',
                    label: '6th menu item',
                },
            ],
        },
    ];


    return (
        <Flex className=''>
            <Flex justify="space-between" className={`header-menu`} style={{ width: '100%' }}>
                <Flex gap={24}>
                    <Logo />
                    {leftOptions.map((option, index) => {
                        if (option.isDropdown) {
                            return (
                                <Dropdown key={index} menu={{ items }}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space className='header-menu-item'>
                                            {option.label}
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            );
                        }

                        return (
                            <Link
                                key={index}
                                to={option.link}
                                className="header-menu-item"
                            >
                                {option.label}
                            </Link>
                        );
                    })}

                </Flex>
                <Flex gap={24} align="center">

                    <Select
                        value={currentRegion}
                        options={[
                            { value: 'mn', label: 'Miền Nam' },
                            { value: 'mb', label: 'Miền Bắc' },
                            { value: 'mt', label: 'Miền Trung' },
                        ]}
                        size="small"
                        className="language-select"
                        bordered={false}
                        dropdownStyle={{ width: 120 }} // Adjust dropdown width if needed
                    />

                    <Flex className="cursor-pointer">
                        <NotificationIcon width={24} height={24} />
                    </Flex>

                    <div className="flex items-center cursor-pointer gap-2">
                        <Avatar
                            size={32}
                            src="https://i.pinimg.com/736x/6b/d8/28/6bd828068a62aab41e75ebf829e2fc5d.jpg"
                        />
                        <Dropdown menu={{ items: itemAccounts }}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    Bền
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>

                    </div>
                    <div className="flex items-center cursor-pointer gap-2">
                        <CodeSandboxOutlined style={{ fontSize: '24px' }} />
                        <div className="flex flex-col">
                            <span className='text-xs'>Dành cho</span>
                            <span className='text-sm'>Nhà tuyển dụng</span>
                        </div>
                    </div>
                    <div className="">
                        <Select
                            value={currentLanguage}
                            onChange={handleChangeLanguage}
                            options={[
                                { value: 'vi', label: 'Tiếng Việt' },
                                { value: 'en', label: 'English' },
                                { value: 'zh', label: '简体中文' },
                            ]}
                            size="small"
                            className="language-select"
                            bordered={false}
                            dropdownStyle={{ width: 120 }} // Adjust dropdown width if needed
                        />
                    </div>

                </Flex>
            </Flex>
        </Flex>
    );
};

export default HeaderMenu;
