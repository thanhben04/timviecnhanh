import React, { memo, useState, useCallback } from 'react';
import { Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './SearchModal.scss';

interface SearchModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSearch: (value: string) => void;
    searchValue: string;
    onSearchChange: (value: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = memo(({
    isVisible,
    onClose,
    onSearch,
    searchValue,
    onSearchChange
}) => {
    const { t } = useTranslation();
    const [recentSearches] = useState([
        'Xiaomi 15 Ultra',
        'Huawei Mate 40 Pro 5G',
        'iPhone 16',
        'Xiaomi 15 Ultra',
        'ESO R50'
    ]);

    const [suggestions] = useState([
        {
            label: 'Dầu gội SELSUN - mua dần bệ vào',
            isHot: true
        },
        {
            label: 'SamSung',
            isHot: false
        },
        {
            label: 'Phone 13 Pro',
            isHot: false
        },
        {
            label: 'Xiaomi 15 Ultra',
            isHot: false
        },
        {
            label: 'MacBook M4',
            isHot: true
        },
        {
            label: 'Hàng ra đi - tốt giá bèo',
            isHot: false
        }
    ]);

    const [trendingSearches] = useState([
        { text: 'Xiaomi 15 Ultra - màu trắng đá ngọc', isHot: true },
        { text: 'Switch thế hệ 2, thiết kế mới', isNew: true },
        { text: 'Máy dán hàng hiệu, giá giảm 50%', isHot: true },
        { text: 'Switch hầu OLED thăng gánh thiềm' },
        { text: 'Túi xách COACH giữa giá bao sần' },
        { text: 'Bàng xảo hàng máy chơi game chất 15 triệu' },
        { text: 'Máu Pro 2024, sáng lim thông giao hệm' },
        { text: 'Đã mệnh MacBook Pro M3' },
        { text: 'iPhone 14 Pro bánh chưng Dynamic Island sốt bột' }
    ]);

    const handleTagClick = useCallback((text: string) => {
        onSearchChange(text);
        onSearch(text);
    }, [onSearchChange, onSearch]);

    const handleClearHistory = useCallback(() => {
        // Clear search history logic
        console.log('Clear search history');
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <div className="search-modal-overlay" onClick={onClose} />
            <div className="search-modal">
                <div className="search-modal-content">
                    {/* Recent Searches */}
                    <div className="search-section recent-searches">
                        <div className="section-header">
                            <span>{t('recent_searches')}</span>
                            <button className="clear-history-btn" onClick={handleClearHistory}>
                                <DeleteOutlined />
                            </button>
                        </div>
                        <div className="tags">
                            {recentSearches.map((search, index) => (
                                <Tag
                                    key={index}
                                    className="tag"
                                    onClick={() => handleTagClick(search)}
                                >
                                    {search}
                                </Tag>
                            ))}
                        </div>
                    </div>

                    {/* Search Suggestions */}
                    <div className="search-section">
                        <div className="section-header">
                            <span>{t('search_suggestions')}</span>
                        </div>
                        <div className="tags">
                            {suggestions.map((search, index) => (
                                <Tag
                                    key={index}
                                    className={`tag ${search.isHot ? 'hot' : ''}`}
                                    onClick={() => handleTagClick(search.label)}
                                >
                                    {search.isHot && <div className='tag-hot'>Hot</div>}
                                    {search.label}
                                </Tag>
                            ))}
                        </div>
                    </div>

                    {/* Trending Searches */}
                    <div className="search-section trending">
                        <div className="trending-title section-header">
                            <span>{t('trending_searches')}</span>
                        </div>
                        <div className="trending-list">
                            {trendingSearches.map((trend, index) => (
                                <div
                                    key={index}
                                    className="trending-item"
                                    onClick={() => handleTagClick(trend.text)}
                                >
                                    <span className="trending-number">{index + 1}.</span>
                                    <span className="trending-text">{trend.text}</span>
                                    <div className="trending-badges tags">
                                        {trend.isHot && <div className='tag-hot'>Hot</div>}
                                        {trend.isNew && <div className='tag-hot'>Hot</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='description'>{t('ranking_description')}</div>
                </div>
            </div>
        </>
    );
});

SearchModal.displayName = 'SearchModal';

export default SearchModal;
