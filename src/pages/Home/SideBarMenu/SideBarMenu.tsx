import { ChevronRight } from 'assets/icons/outlined/ChevronRight';
import { getCategoriesData } from 'constants/SidebarCategories';
import { Popover } from 'antd';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './SidebarMenu.scss';


const SidebarMenu: React.FC = React.memo(() => {
    const { t } = useTranslation();
    const categoriesData = getCategoriesData(t);

    const renderedCategories = useMemo(() => (
        categoriesData.map(cat => {
            const categoryContent = (
                <div className="icon-label">
                    {cat.icon}
                    <span>{cat.label}</span>
                </div>
            );

            if (cat.megaMenuColumns && cat.megaMenuColumns.length > 0) {
                const popoverContent = (
                    <div className="mega-menu-popover">
                        <div className="popover-columns">
                            {cat.megaMenuColumns.map((column, colIndex) => (
                                <div key={colIndex} className="popover-column">
                                    <h4 className="column-title">{column.title}</h4>
                                    <div className="column-items">
                                        {column.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="popover-subcategory">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

                return (
                    <div key={cat.id} className="sidebar-item">
                        <Popover
                            content={popoverContent}
                            placement="rightTop"
                            trigger="hover"
                            overlayClassName="sidebar-popover"
                        >
                            <div className="category">
                                {categoryContent}
                                <ChevronRight />
                            </div>
                        </Popover>
                    </div>
                );
            }

            return (
                <div key={cat.id} className="sidebar-item">
                    <div className="category">
                        {categoryContent}
                        <ChevronRight className="hidden-chevron" />
                    </div>
                </div>
            );
        })
    ), [categoriesData]);

    return (
        <div className="sidebar-menu">
            {renderedCategories}
        </div>
    );
});

export default SidebarMenu;
