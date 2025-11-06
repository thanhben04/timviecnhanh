import { Col, Divider, Flex, Input, Modal, Radio, Row } from "antd";

const ApplyJobModal = ({
    isModalOpen,
    handleOk,
    handleCancel,
}: {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}) => {
    return (
        <Modal
            title="Ứng tuyển vào vị trí"
            closable={true}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div className="flex items-center gap-2">
                <img
                    src="https://cdn1.vieclam24h.vn/images/default/2023/05/08/t%E1%BA%A3i%20xu%E1%BB%91ng_168353304560.w-96.h-96.png"
                    alt=""
                    className="w-16 h-16 object-contain rounded-lg"
                />
                <div className="flex flex-col">
                    <span>Trưởng Nhóm Thiết Kế Ý Tưởng (Concept Leader)</span>
                    <span className="text-gray-500 text-sm">
                        Công Ty CP Kiến Trúc Highend
                    </span>
                </div>
            </div>
            <Divider />
            <div className="">
                <div className="my-4 font-bold">Thông tin ứng tuyển</div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 ">
                        <div className="text-sm text-gray-500 w-[120px]">
                            Họ và tên:
                        </div>
                        <Input placeholder="Nhập họ và tên" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-500 w-[120px]">
                            Email:
                        </div>
                        <Input placeholder="Nhập họ và tên" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-500 w-[120px]">
                            Số điện thoại:
                        </div>
                        <Input placeholder="Nhập họ và tên" />
                    </div>
                </div>
                <div className="my-4 font-bold">CV ứng tuyển</div>
                <div className="">
                    <div className="flex flex-col gap-2">
                        <Radio className="flex items-center gap-2 bg-purple-50 p-2 border border-purple-300 rounded-lg">
                            <div className="flex flex-col gap-1">
                                <div className="text-sm font-semibold">BACKEND DEVELOPER</div>
                                <span className="text-gray-500 text-xs">Đã tải lên 09/10/2025 • 22:31:10</span>
                                <span className="text-blue1">Xem hồ sơ</span>
                            </div>
                        </Radio>
                        <Radio className="flex items-center gap-2 bg-purple-50 p-2 border border-purple-300 rounded-lg">
                            <div className="flex flex-col gap-1">
                                <div className="text-sm font-semibold">BACKEND DEVELOPER</div>
                                <span className="text-gray-500 text-xs">Đã tải lên 09/10/2025 • 22:31:10</span>
                                <span className="text-blue1">Xem hồ sơ</span>
                            </div>
                        </Radio>
                        <Radio className="flex items-center gap-2 bg-purple-50 p-2 border border-purple-300 rounded-lg">
                            <div className="flex flex-col gap-1">
                                <div className="text-sm font-semibold">BACKEND DEVELOPER</div>
                                <span className="text-gray-500 text-xs">Đã tải lên 09/10/2025 • 22:31:10</span>
                                <span className="text-blue1">Xem hồ sơ</span>
                            </div>
                        </Radio>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ApplyJobModal;
