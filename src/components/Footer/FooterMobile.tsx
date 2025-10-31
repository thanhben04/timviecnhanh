import React, { useState, useCallback, useMemo } from 'react';
import { Button, Divider, Flex, Layout } from 'antd';
import { Link } from 'react-router-dom';

import { FacebookIcon } from 'assets/icons/FacebookIcon';
import { GetFromAppStoreIcon } from 'assets/icons/GetFromAppStoreIcon';
import { GetFromCHPlayIcon } from 'assets/icons/GetFromCHPlayIcon';
import { LinkedinIcon } from 'assets/icons/LinkedinIcon';
import { MailIcon } from 'assets/icons/solid/MailIcon';
import { PhoneIcon } from 'assets/icons/solid/PhoneIcon';
import { RightArrowIcon } from 'assets/icons/outlined/RightArrowIcon';
import { YoutubeIcon } from 'assets/icons/YoutubeIcon';

import white_logo from '../../assets/images/white_logo.png';
import './Footer.scss';
import { ChevronUp } from 'assets/icons/outlined/ChevronUp';
import { ChevronDown } from 'assets/icons/outlined/ChevronDown';

const { Footer: AntFooter } = Layout;

// Reusable Dropdown Section inside same file
const FooterDropdownSection: React.FC<{
    title: string;
    links: { label: string; to: string }[];
}> = React.memo(({ title, links }) => {
    const [open, setOpen] = useState(false);

    const toggleDropdown = useCallback(() => {
        setOpen(prev => !prev);
    }, []);

    const linkItems = useMemo(() => (
        links.map((link, index) => (
            <li key={index}>
                <Link to={link.to}>{link.label}</Link>
            </li>
        ))
    ), [links]);

    return (
        <div className="footer-section dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
                <h4 className="section-title">{title}</h4>
                {open ? <ChevronUp /> : <ChevronDown width={24} height={24} stroke="white" />}
            </div>
            {open && <ul className="footer-links">{linkItems}</ul>}
        </div>
    );
});

const FooterMobile: React.FC = () => {
    return (
        <AntFooter className="custom-footer mobile">
            <div className="footer-content">
                <div className="container">
                    <div className="footer-sections">
                        {/* Company Info */}
                        <Flex vertical gap={32} className="footer-section">
                            <Flex vertical gap={16} align="start">
                                <Link to="/" className="logo">
                                    <img src={white_logo} alt="logo" />
                                </Link>
                                <p className="footer-description">
                                    Chúng tôi mang đến trải nghiệm mua bán minh bạch, hiện đại và bền vững với đa dạng sản phẩm từ công nghệ đến hàng xa xỉ.
                                </p>
                                <Button type="primary" className="contribute-button">
                                    <span>Đóng góp ý kiến</span>
                                    <RightArrowIcon />
                                </Button>
                            </Flex>
                        </Flex>

                        <Divider dashed type="horizontal" className="footer-divider" />

                        {/* Contact Info & Social */}
                        <Flex justify="space-between" className="footer-section">
                            <Flex gap={12} vertical>
                                <Flex gap={8} className="contact-info">
                                    <PhoneIcon />
                                    <Flex vertical>
                                        <span className="contact-info-title">Hotline</span>
                                        <span className="contact-info-desc">0123456789</span>
                                    </Flex>
                                </Flex>
                                <Flex gap={8} className="contact-info">
                                    <MailIcon />
                                    <Flex vertical>
                                        <span className="contact-info-title">Email</span>
                                        <span className="contact-info-desc">2hand@gmail.com</span>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex vertical>
                                <h4 className="section-title">Mạng xã hội</h4>
                                <Flex gap={12}>
                                    <FacebookIcon />
                                    <YoutubeIcon />
                                    <LinkedinIcon />
                                </Flex>
                            </Flex>
                        </Flex>

                        <Divider dashed type="horizontal" className="footer-divider" />

                        {/* Collapsible Sections */}
                        <FooterDropdownSection
                            title="Về 2hand"
                            links={[
                                { label: 'Về chúng tôi', to: '/' },
                                { label: 'Quy chế hoạt động sàn', to: '/posts' },
                                { label: 'Giải quyết tranh chấp', to: '/users' },
                                { label: 'Truyền thông', to: '/about' },
                                { label: 'Blog', to: '/contact' },
                            ]}
                        />

                        <FooterDropdownSection
                            title="Chính sách"
                            links={[
                                { label: 'Chính sách bảo mật', to: '/' },
                                { label: 'Chính sách giao hàng', to: '/' },
                                { label: 'Chính sách đổi trả', to: '/' },
                                { label: 'Chính sách khuyến mãi', to: '/' },
                            ]}
                        />

                        <FooterDropdownSection
                            title="Hỗ trợ khách hàng"
                            links={[
                                { label: 'Trung tâm trợ giúp', to: '/' },
                                { label: 'Liên hệ hỗ trợ', to: '/' },
                            ]}
                        />

                        <Divider dashed type="horizontal" className="footer-divider" />

                        {/* Download App */}
                        <Flex vertical gap={12} className="footer-section download-app">
                            <h4 className="section-title">Tải ứng dụng của 2hand</h4>
                            <Flex className="download-app-btns" gap={8}>
                                <GetFromAppStoreIcon />
                                <GetFromCHPlayIcon />
                            </Flex>
                        </Flex>
                    </div>
                </div>
            </div>
        </AntFooter>
    );
};

export default FooterMobile;
