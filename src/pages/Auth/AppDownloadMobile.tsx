import { Button, Image, Typography } from 'antd';
import React, { useMemo } from 'react';
import appMockup from '../../assets/images/app_mockup.png';
import appleIcon from '../../assets/images/apple_icon.png';
import chPlayIcon from '../../assets/images/ch_play_icon.png';


const { Title, Text } = Typography;

interface AppDownloadMobileProps { }

const AppDownloadMobile: React.FC<AppDownloadMobileProps> = React.memo(() => {
    const { downloadLink, icon } = useMemo(() => {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

        const isAndroid = /android/i.test(userAgent);
        const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;

        if (isAndroid) {
            return {
                downloadLink: 'https://play.google.com/store/apps/details?id=your.app.id',
                icon: <Image src={chPlayIcon} width={24} height={24} preview={false} />,
            };
        }

        if (isIOS) {
            return {
                downloadLink: 'https://apps.apple.com/app/idYOUR_APP_ID',
                icon: <Image src={appleIcon} width={24} height={24} preview={false} />,
            };
        }

        return {
            downloadLink: 'https://your-website.com',
            icon: '',
        };
    }, []);

    return (
        <div className="app-download-modal mobile" >
            <div className="blur-background" />

            <div className="text-wrapper">
                <Title level={5} style={{ color: '#d40000', marginBottom: 0 }}>
                    MUA BÁN DỄ DÀNG HƠN
                </Title>
                <Text style={{ color: '#4a4a4a' }}>CHỈ VỚI MỘT CHẠM!</Text>
            </div>

            <Image src={appMockup} width={283} preview={false} />

            <Button
                type="primary"
                shape="round"
                size="large"
                className="floating-download-btn"
                href={downloadLink}
                target="_blank"
            >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {icon}
                    <span>Tải ứng dụng xuống</span>
                </span>
            </Button>
        </div>
    );
});

export default AppDownloadMobile;
