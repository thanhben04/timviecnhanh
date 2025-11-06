import { Flex, Layout, Row, Col, Divider } from 'antd';
import { FacebookIcon } from 'assets/icons/FacebookIcon';
import { GetFromAppStoreIcon } from 'assets/icons/GetFromAppStoreIcon';
import { GetFromCHPlayIcon } from 'assets/icons/GetFromCHPlayIcon';
import { LinkedinIcon } from 'assets/icons/LinkedinIcon';
import { YoutubeIcon } from 'assets/icons/YoutubeIcon';
import { ZaloIcon } from 'assets/icons/ZaloIcon';
import { TikTokIcon } from 'assets/icons/TikTokIcon';
import { InstagramIcon } from 'assets/icons/InstagramIcon';
import { useIsMobile } from 'hooks/useIsMobile';
import React from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../../assets/images/placeholder.png';
import './Footer.scss';
import FooterMobile from './FooterMobile';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
    return (
        <AntFooter className="custom-footer">
            <div className="footer-content">
                <div className="container">
                    <Row gutter={[32, 32]} className="footer-sections">
                        {/* Column 1: Về chúng tôi */}
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="footer-section">
                                <h4 className="section-title">Về chúng tôi</h4>
                                <div className="company-info">
                                    <p className="company-name">Vieclam24h.vn - Công Ty Cổ Phần Việc Làm 24h</p>
                                    <p className="company-address">
                                        Phòng 102, Tòa nhà 20-20B Trần Cao Vân, Phường Sài Gòn, Thành phố Hồ Chí Minh
                                    </p>
                                    <p className="company-address">
                                        Chi nhánh: Tầng 16, Tòa nhà TTC, Số 19 Phố Duy Tân, Phường Cầu Giấy, Hà Nội, Việt Nam
                                    </p>
                                    <p className="company-license">
                                        Giấy phép hoạt động dịch vụ việc làm số: 28937/2024/58/SLĐTBXH-VLATLĐ do Sở Lao Động Thương Binh và Xã Hội cấp ngày 18/11/2024
                                    </p>
                                    <p className="company-contact">
                                        Điện thoại: (028) 7108 2424 | (024) 7308 2424
                                    </p>
                                    <p className="company-contact">
                                        Email hỗ trợ người tìm việc: ntv@vieclam24h.vn
                                    </p>
                                    <p className="company-contact">
                                        Email hỗ trợ nhà tuyển dụng: ntd@vieclam24h.vn
                                    </p>
                                </div>
                            </div>
                        </Col>

                        {/* Column 2: Thông tin */}
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="footer-section">
                                <h4 className="section-title">Thông tin</h4>
                                <ul className="footer-links">
                                    <li><Link to="/">Cẩm nang nghề nghiệp</Link></li>
                                    <li><Link to="/">Báo giá dịch vụ</Link></li>
                                    <li><Link to="/">Điều khoản sử dụng</Link></li>
                                    <li><Link to="/">Quy định bảo mật</Link></li>
                                    <li><Link to="/">Sơ đồ trang web</Link></li>
                                    <li><Link to="/">Chính sách dữ liệu cá nhân</Link></li>
                                    <li><Link to="/">Tuân thủ và sự đồng ý của Khách Hàng</Link></li>
                                </ul>
                            </div>
                        </Col>

                        {/* Column 3: Kết nối với chúng tôi & Tải ứng dụng */}
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="footer-section">
                                <div className="social-section">
                                    <h4 className="section-title">Kết nối với chúng tôi</h4>
                                    <Flex gap={12} className="social-icons">
                                        <FacebookIcon />
                                        <TikTokIcon />
                                        <ZaloIcon />
                                        <InstagramIcon />
                                        <YoutubeIcon />
                                        <LinkedinIcon />
                                    </Flex>
                                </div>
                                <div className="download-app-section">
                                    <h4 className="section-title">Tải ứng dụng trên điện thoại</h4>
                                    <Flex gap={16} align="flex-start">
                                        <div className="qr-code-wrapper">
                                            <img src={placeholder} alt="QR Code" className="qr-code" />
                                        </div>
                                        <Flex vertical gap={8} className="app-store-badges">
                                            <GetFromCHPlayIcon />
                                            <GetFromAppStoreIcon />
                                        </Flex>
                                    </Flex>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Footer Bottom: Copyright */}
            <Divider className="footer-divider" />
            <div className="footer-bottom">
                <div className="container">
                    <Flex justify="space-between" align="center" className="footer-bottom-content">
                        <div className="sieu-viet-logo">
                            <span className="sieu-viet-text">S</span>
                            <span className="sieu-viet-label">SieuViet</span>
                        </div>
                        <p className="copyright-text">© 2025 - Bản quyền thuộc về SieuViet Group</p>
                    </Flex>
                </div>
            </div>
        </AntFooter>
    );
};

export default Footer;
