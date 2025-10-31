import React, { useState } from 'react';
import { Button } from 'antd';
import ContentModal from './ContentModal';

const ContentModalExample: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sampleSections = [
        {
            id: 1,
            title: "Lorem Ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            id: 2,
            title: "Lorem Ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            id: 3,
            title: "Lorem Ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
    ];

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Button type="primary" onClick={handleOpenModal}>
                Open Content Modal
            </Button>

            <ContentModal
                open={isModalOpen}
                onClose={handleCloseModal}
                title="Chia sẻ dữ liệu với bên thứ ba"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                sections={sampleSections}
                closeButtonText="Đóng"
            />
        </div>
    );
};

export default ContentModalExample;
