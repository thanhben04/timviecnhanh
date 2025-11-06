import {
    EnvironmentOutlined,
    HeartOutlined,
    SendOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Col, Divider, Row, Tag } from "antd";
import JobSidebar from "./JobSidebar";
import { useState } from "react";
import ApplyJobModal from "../../components/Modal/ApplyJobModal";

const JobDetail = () => {
    const job = {
        title: "Trưởng Nhóm Thiết Kế Ý Tưởng (Concept Leader)",
        salary: "20 - 30 triệu",
        location: "Hà Nội",
        experience: "1 năm",
        deadline: "12/11/2025",
        description: "<p>• Đề xuất ý tưởng ...</p>",
        requirements: "<p>• Tuổi: Nam, 28-40...</p>",
        benefits: "<p>• Lương tháng 13...</p>",
        info: {
            postedDate: "09/10/2025",
            level: "Trưởng nhóm",
            gender: "Nam",
            quantity: 2,
            workForm: "Toàn thời gian cố định",
            age: "28 - 40 tuổi",
            experience: "1 năm",
            fields: ["Kiến trúc - Nội thất", "Xây dựng"],
        },
        workAddress: "Tầng 8, Tòa nhà Báo Tiền Phong, ... Hai Bà Trưng, Hà Nội",
        tags: [
            "thiết kế ý tưởng",
            "Trưởng Nhóm",
            "Kiến trúc - Thiết kế nội ngoại thất",
            "Việc làm Hà Nội",
        ],
    };

    const company = {
        name: "Công Ty CP Kiến Trúc Highend",
        logo: "https://cdn1.vieclam24h.vn/upload/files_cua_nguoi_dung/logo/2018/12/06/1544071799_Logo_Hig.._2.w-128.h-128.png",
        address:
            "Tầng 8, Tòa nhà Báo Tiền Phong, Số 15 Hồ Xuân Hương - Hai Bà Trưng - Hà Nội",
        size: "10 - 150 nhân viên",
        link: "/company/highend",
    };

    const relatedJobs = [
        {
            id: 1,
            title: "Nhân Viên Thiết Kế Concept",
            company: "Công Ty Cổ Phần Kiến Trúc Xanh Greenmore Việt Nam",
            logo: "https://cdn1.vieclam24h.vn/images/employer_avatar/2021/04/08/images/161785034398.w-128.h-128.jpeg?v=220513",
            salary: "10 - 18 triệu",
            location: "Hà Nội",
            remainDays: "Còn 24 ngày",
        },
        // ... tiếp tục thêm dữ liệu
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container">
            <Row>
                <Col>
                    <div className="my-4">
                        <Breadcrumb
                            items={[
                                {
                                    title: "Trang chủ",
                                    href: "/",
                                },
                                {
                                    title: "Việc làm",
                                    href: "/job",
                                },
                                {
                                    title: "Kiến trúc - Thiết kế nội ngoại thất",
                                    href: "/job/:id",
                                },
                            ]}
                        />
                    </div>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={16}>
                    <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 shadow-md flex flex-col gap-8">
                        {/* HEADER */}
                        <div className="flex flex-col gap-4">
                            <h1 className="text-2xl font-bold leading-8">
                                {job.title}
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-[14px] text-gray-700">
                                <div className="flex items-center gap-2">
                                    <div className="text-lg">💰</div>
                                    <div>
                                        <div className="text-xs text-gray-500">
                                            Mức lương
                                        </div>
                                        <div className="font-medium text-purple2">
                                            20 - 30 triệu
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-lg">📍</div>
                                    <div className="">
                                        <div>
                                            <div className="text-xs text-gray-500">
                                                Khu vực tuyển
                                            </div>
                                        </div>
                                        <div className="font-medium">
                                            Hà Nội
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-lg">💼</div>
                                    <div className="">
                                        <div>
                                            <div className="text-xs text-gray-500">
                                                Kinh nghiệm
                                            </div>
                                        </div>
                                        <div className="font-medium">1 năm</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-lg">🎓</div>
                                    <div className="">
                                        <div>
                                            <div className="text-xs text-gray-500">
                                                Trình độ
                                            </div>
                                        </div>
                                        <div className="font-medium">Trung cấp</div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600 flex items-center gap-2">
                                Hạn nộp hồ sơ:{" "}
                                <span className="font-bold">
                                    {job.deadline}
                                </span>
                                <span>Hãy là người đầu tiên nộp hồ sơ</span>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-4 flex-wrap">
                            <Button
                                type="primary"
                                size="large"
                                className="h-11 px-8 flex-1"
                                icon={<SendOutlined />}
                                onClick={() => setIsModalOpen(true)}
                            >
                                Ứng tuyển ngay
                            </Button>

                            <Button
                                icon={<HeartOutlined />}
                                className="h-11 px-6"
                            >
                                Lưu công việc
                            </Button>
                        </div>

                        <Divider />

                        {/* DESCRIPTION */}
                        <JobSection
                            title="Mô tả công việc"
                            html={job.description}
                        />
                        <JobSection
                            title="Yêu cầu công việc"
                            html={job.requirements}
                        />
                        <JobSection title="Quyền lợi" html={job.benefits} />

                        <Divider />

                        {/* GENERAL INFO */}
                        <JobInfoTable info={job.info} />

                        <Divider />

                        {/* LOCATION */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">
                                Địa điểm làm việc
                            </h3>
                            <div className="flex items-start gap-2 text-gray-700">
                                <EnvironmentOutlined className="text-[16px] text-purple-600" />
                                <span className="text-purple2">Hà Nội: </span>
                                <span>{job.workAddress}</span>
                            </div>
                        </div>

                        <Divider />

                        {/* TAGS */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">
                                Từ khoá
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {job.tags.map((tag, i) => (
                                    <Tag key={i} color="purple">
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div>
                        <JobSidebar
                            company={company}
                            relatedJobs={relatedJobs}
                        />
                    </div>
                </Col>
            </Row>
            <ApplyJobModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
        </div>
    );
};

// Sub Components
function JobInfo({
    icon,
    label,
    value,
}: {
    icon: string;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-2">
            <div className="text-lg">{icon}</div>
            <div>
                <div className="text-xs text-gray-500">{label}</div>
                <div className="font-medium text-purple-600">{value}</div>
            </div>
        </div>
    );
}

function JobSection({ title, html }: { title: string; html: string }) {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div
                className="text-gray-700 leading-6"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}

function JobInfoTable({ info }: { info: any }) {
    const rows = [
        ["Ngày đăng", info.postedDate],
        ["Cấp bậc", info.level],
        ["Yêu cầu giới tính", info.gender],
        ["Số lượng tuyển", info.quantity],
        ["Hình thức làm việc", info.workForm],
        ["Độ tuổi", info.age],
        ["Yêu cầu kinh nghiệm", info.experience],
        ["Ngành nghề", info.fields.join(", ")],
    ];

    return (
        <div className="bg-gray-50 flex flex-col gap-2 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Thông tin chung</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3">
                {rows.map((r, i) => (
                    <div key={i}>
                        <div className="text-xs text-gray-500">{r[0]}</div>
                        <div className="text-sm text-gray-700">{r[1]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JobDetail;
