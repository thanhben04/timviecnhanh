import { Button, Divider, Flex, Input, Select } from 'antd';
import { SearchIcon } from 'assets/icons/outlined/SearchIcon';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './SearchBar.scss'; // For custom styles

const { Option } = Select;

const SearchBar: React.FC = React.memo(() => {
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('old');

    const categories = useMemo(
        () => [
            { label: t('search_category_old'), value: 'old' },
            { label: t('search_category_new'), value: 'new' },
            { label: t('search_category_rent'), value: 'rent' },
        ],
        [t]
    );

    const onSearch = useCallback(() => {
        console.log('Searching:', { category, searchText });
    }, [category, searchText]);

    return (
        <div className="search-bar-container">
            <Flex className='search-bar' align="center">
                <Select
                    defaultValue={category}
                    onChange={setCategory}
                    style={{ width: 150 }}
                    dropdownStyle={{ width: 120 }}
                >
                    {categories.map((item) => (
                        <Option key={item.value} value={item.value}>
                            {item.label}
                        </Option>
                    ))}
                </Select>
                <Divider type="vertical" style={{ height: '24px' }} />
                <Input
                    placeholder={t('search_placeholder')}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onPressEnter={onSearch}
                />

                <Button
                    type="primary"
                    icon={<SearchIcon />}
                    onClick={onSearch}
                    style={{ backgroundColor: '#D80000', borderColor: '#D80000' }}
                />
            </Flex>
        </div>
    );
});

export default SearchBar;
