import { Button, Typography } from "antd";
import React, { useState } from "react";
import small_logo from '../../assets/images/2hand_small_logo.png';
import AppDownloadModal from "./AppDownloadModal";
import { useIsMobile } from "hooks/useIsMobile";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const { Text } = Typography;

export const AppDownload = React.memo(() => {
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const isMobile = useIsMobile();

    return (
        <div className="app-download-container">
            <div className="app-download">
                <img src={small_logo} alt="2hand" />
                <div className="app-info">
                    <Text strong>{t('app_name')}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        {t('shopping_description')}
                    </Text>
                </div>
                {!isMobile && (
                    <>
                        <Button onClick={() => setModalOpen(true)} size="small" className="download-button">
                            {t('download_application')}
                        </Button>
                        <AppDownloadModal open={modalOpen} onClose={() => setModalOpen(false)} />
                    </>
                )}
                {isMobile && (
                    <Link to="/app-download">
                        <Button size="small" className="download-button">
                            {t('download_application')}
                        </Button>
                    </Link>
                )}
            </div>

        </div >
    )
});