import React, { memo, useState, useCallback } from 'react';
import './SideBarMenuModal.scss';
import { Button, Flex } from 'antd';
import logo from 'assets/images/2hand_logo.png';
import { CloseIcon } from 'assets/icons/outlined/CloseIcon';
import { getCategoriesData } from 'constants/SidebarCategories';
import { useTranslation } from 'react-i18next';

interface SideBarMenuModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const SideBarMenuModal: React.FC<SideBarMenuModalProps> = memo(({
    isVisible,
    onClose
}) => {
    const { t } = useTranslation();
    const categoriesData = getCategoriesData(t);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categoriesData[0].id);

    const handleCategoryClick = useCallback((id: string) => {
        setSelectedCategoryId(id);
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <div className="sidebar-modal-overlay" onClick={onClose} />
            <div className="sidebar-menu-modal">
                <Flex justify='space-between' align='center' className="sidebar-header">
                    <img src={logo} alt="2hand" />
                    <Button className="close-button" onClick={onClose} icon={<CloseIcon />} />
                </Flex>
                <div className="sidebar-menu-content">
                    <div className="sidebar-menu-left">
                        {categoriesData.map((category) => (
                            <div
                                key={category.id}
                                className={`sidebar-category-item ${selectedCategoryId === category.id ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(category.id)}
                            >
                                <span className="icon">{category.icon}</span>
                                <span className="label">{category.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="sidebar-menu-right">
                        {categoriesData
                            .find((cat) => cat.id === selectedCategoryId)
                            ?.megaMenuColumns?.map((column, index) => (
                                <div className="sidebar-subcategory-group" key={index}>
                                    <div className="subcategory-title">{column.title}</div>
                                    <div className="subcategory-items">
                                        {column.items.map((item, idx) => (
                                            <span className="subcategory-item" key={idx}>
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

            </div >
        </>
    );
});

SideBarMenuModal.displayName = 'SideBarMenuModal';

export default SideBarMenuModal;
