import React, { useState, useMemo } from 'react';
import { Card, Tabs, Tag, Button, Typography, Divider, Flex, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { OrderItem, OrderStatus, OrderTabKey } from '../types';
import { mockOrdersData } from '../mockData';
import product from 'assets/images/Products/Product2.png'
import { Buy2hand } from 'assets/icons/outlined/Buy2hand';
import { useIsMobile } from 'hooks/useIsMobile';

const { Text } = Typography;

const Orders: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<OrderTabKey>('all');
    const isMobile = useIsMobile();
    const getStatusText = (status: OrderStatus): string => {
        switch (status) {
            case 'completed':
                return t('order_status_completed');
            case 'processing':
                return t('order_status_processing');
            case 'canceled':
                return t('order_status_canceled');
            default:
                return status;
        }
    };

    const filteredOrders = useMemo(() => {
        if (activeTab === 'all') {
            return mockOrdersData;
        }
        return mockOrdersData.filter((order: OrderItem) => order.status === activeTab);
    }, [activeTab]);

    const tabItems = [
        {
            key: 'all',
            label: `${t('order_tab_all')} (${mockOrdersData.length})`,
        },
        {
            key: 'completed',
            label: `${t('order_tab_completed')} (${mockOrdersData.filter((o: OrderItem) => o.status === 'completed').length})`,
        },
        {
            key: 'processing',
            label: `${t('order_tab_processing')} (${mockOrdersData.filter((o: OrderItem) => o.status === 'processing').length})`,
        },
        {
            key: 'canceled',
            label: `${t('order_tab_canceled')} (${mockOrdersData.filter((o: OrderItem) => o.status === 'canceled').length})`,
        },
    ];

    const renderOrderItem = (order: OrderItem) => {
        return (
            <div key={order.id} className="order-item">
                <Flex justify='space-between' align='center' className="order-header">
                    <Flex align='center' gap={12} className="store-info">
                        <div className='order-type'>
                            <Buy2hand />
                            2hand thu mua
                        </div>
                        <Text strong className="store-name">{order.seller.name}</Text>
                    </Flex>
                    <Tag className="order-status-tag">
                        {getStatusText(order.status)}
                    </Tag>
                </Flex>

                <Divider type="horizontal" className="order-divider" />

                <div className="order-content">
                    <Flex gap={24} className="product-section">
                        <Image src={product} alt={order.product.name} className="product-image" />
                        <div className="product-details">
                            <Text strong className="product-name">{order.product.name}</Text>
                            <div className="product-info">
                                {
                                    order.product.tags.map((tag: string) => {
                                        return (
                                            <Tag key={tag} color="red" className="product-tag">
                                                {tag}
                                            </Tag>
                                        );
                                    })
                                }
                            </div>
                            <Text type="secondary" className="product-condition">
                                Trạng thái: {order.product.condition}
                            </Text>
                        </div>
                    </Flex>

                    <Divider type="horizontal" className="order-divider" />


                    <Flex vertical={isMobile} justify='space-between' align='center' className="order-info">
                        <Flex vertical={isMobile} gap={isMobile ? 12 : 64} className="order-details">
                            <Flex vertical className="order-info-row">
                                <Text type="secondary" className="label">{t('order_code')}:</Text>
                                <Text className="value">{order.product.sku}</Text>
                            </Flex>
                            <Flex vertical className="order-info-row">
                                <Text type="secondary" className="label">{t('order_original_price')}:</Text>
                                <Text className="value">đ {order.product.price.toLocaleString()}</Text>
                            </Flex>
                            <Flex vertical className="order-info-row">
                                <Text type="secondary" className="label">{t('order_verified_price')}:</Text>
                                <Text className="value">-</Text>
                            </Flex>
                        </Flex>

                        <Flex gap={8} className="order-actions">
                            <Button
                                type="default"
                                className="action-btn contact-btn"
                                onClick={() => handleContactSeller(order.seller.id)}
                            >
                                {t('order_contact')}
                            </Button>
                            <Button
                                type="default"
                                className="action-btn details-btn"
                                onClick={() => handleViewOrder(order.id)}
                            >
                                {t('order_view_details')}
                            </Button>
                            <Button
                                type="primary"
                                className="action-btn send-btn"
                                onClick={() => handleSendOrder(order.id)}
                            >
                                {t('order_send')}
                            </Button>
                        </Flex>
                    </Flex>
                </div>
            </div>
        );
    };

    const handleSendOrder = (orderId: string) => {
        console.log('Send order:', orderId);
        // Implement send order functionality
    };

    const handleViewOrder = (orderId: string) => {
        console.log('View order:', orderId);
        // Implement navigation to order details
    };

    const handleContactSeller = (sellerId: string) => {
        console.log('Contact seller:', sellerId);
        // Implement contact seller functionality
    };

    return (
        <Card title={t('profile_my_orders')} className="orders-container">
            <Tabs
                activeKey={activeTab}
                onChange={(key) => setActiveTab(key as OrderTabKey)}
                items={tabItems}
                className="orders-tabs"
            />

            <Flex vertical gap={16} className="orders-list">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => renderOrderItem(order))
                ) : (
                    <div className="empty-state">
                        <Text type="secondary">{t('order_empty_text')}</Text>
                    </div>
                )}
            </Flex>
        </Card>
    );
};

export default Orders;
