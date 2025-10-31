
import { Button, Flex, Layout } from 'antd';
import { FacebookIcon } from 'assets/icons/FacebookIcon';
import { GetFromAppStoreIcon } from 'assets/icons/GetFromAppStoreIcon';
import { GetFromCHPlayIcon } from 'assets/icons/GetFromCHPlayIcon';
import { LinkedinIcon } from 'assets/icons/LinkedinIcon';
import { MailIcon } from 'assets/icons/solid/MailIcon';
import { PhoneIcon } from 'assets/icons/solid/PhoneIcon';
import { RightArrowIcon } from 'assets/icons/outlined/RightArrowIcon';
import { YoutubeIcon } from 'assets/icons/YoutubeIcon';
import { useIsMobile } from 'hooks/useIsMobile';
import React from 'react';
import { Link } from 'react-router-dom';
import white_logo from '../../assets/images/white_logo.png';
import './Footer.scss';
import FooterMobile from './FooterMobile';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return <FooterMobile />;
    }

    return (
        <AntFooter className="custom-footer">
            <div className="footer-content">
                <div className="container">
                    <div className="footer-sections">
                        {/* Company Info */}
                        <Flex vertical gap={32} className="footer-section">
                            <Flex vertical gap={16}>
                                <Link to="/" className="logo">
                                    <img src={white_logo} alt='logo' />
                                </Link>
                                <p className="footer-description">
                                    Chúng tôi mang đến trải nghiệm mua bán minh bạch, hiện đại và bền vững với đa dạng sản phẩm từ công nghệ đến hàng xa xỉ.
                                </p>
                                <Button type="primary" className="contribute-button">
                                    <span>Đóng góp ý kiến</span>
                                    <RightArrowIcon />
                                </Button>
                            </Flex>
                            <Flex vertical gap={12} className='download-app'>
                                <span>Tải ứng dụng của 2hand</span>
                                <Flex className='download-app-btns' gap={8}>
                                    <GetFromAppStoreIcon />
                                    <GetFromCHPlayIcon />
                                </Flex>
                            </Flex>
                        </Flex>

                        {/* Quick Links */}
                        <div className="footer-section">
                            <h4 className="section-title">Về 2hand</h4>
                            <ul className="footer-links">
                                <li><Link to="/">Về chúng tôi</Link></li>
                                <li><Link to="/posts">Quy chế hoạt động sàn</Link></li>
                                <li><Link to="/users">Giải quyết tranh chấp</Link></li>
                                <li><Link to="/about">Truyền thông</Link></li>
                                <li><Link to="/contact">Blog</Link></li>
                            </ul>
                        </div>

                        {/* Categories */}
                        <div className="footer-section">
                            <h4 className="section-title">Chính sách</h4>
                            <ul className="footer-links">
                                <li><Link to="/">Chính sách bảo mật</Link></li>
                                <li><Link to="/">Chính sách giao hàng</Link></li>
                                <li><Link to="/">Chính sách đổi trả</Link></li>
                                <li><Link to="/">Chính sách khuyến mãi</Link></li>
                            </ul>
                        </div>

                        {/* Categories */}
                        <div className="footer-section">
                            <h4 className="section-title">Hỗ trợ khách hàng</h4>
                            <ul className="footer-links">
                                <li><Link to="/">Trung tâm trợ giúp</Link></li>
                                <li><Link to="/">Liên hệ hỗ trợ</Link></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer-section">
                            <h4 className="section-title">Mạng xã hội</h4>
                            <Flex gap={12}>
                                <FacebookIcon />
                                <YoutubeIcon />
                                <LinkedinIcon />
                            </Flex>
                            <Flex gap={8} className="contact-info">
                                <PhoneIcon />
                                <Flex vertical>
                                    <span className='contact-info-title'>Hotline</span>
                                    <span className='contact-info-desc'>0123456789</span>
                                </Flex>
                            </Flex>
                            <Flex gap={8} className="contact-info">
                                <MailIcon />
                                <Flex vertical>
                                    <span className='contact-info-title'>Email</span>
                                    <span className='contact-info-desc'>2hand@gmail.com</span>
                                </Flex>
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>
        </AntFooter >
    );
};

export default Footer;
