import { Breadcrumb, Button, Card, Col, Flex, Input, Layout, Pagination, Row, Select } from 'antd';
import { SearchIcon } from 'assets/icons/outlined/SearchIcon';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './SearchJob.scss';
import { FileOutlined, FilterOutlined, HeartFilled, HeartOutlined, HeatMapOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { ClockCircleOutlined } from '@ant-design/icons';
import { RemoveIcon } from 'assets/icons/outlined/RemoveIcon';
import { JobType } from 'types/job';
import { FavoriteIcon } from 'assets/icons/solid/FavoriteIcon';

const SearchJob: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [openDropdown, setOpenDropdown] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalJobs, setTotalJobs] = useState(0);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/suggestions`);
                setSuggestions(response.data.data.content as string[]);
            } catch (error) {
                setSuggestions([
                    "Việc làm IT",
                    "Việc làm Kế toán",
                    "Việc làm Marketing",
                    "Việc làm Sales",
                    "Việc làm HR",
                    "Việc làm Finance",
                    "Việc làm Legal",
                    "Việc làm IT",
                    "Việc làm Kế toán",
                    "Việc làm Marketing",

                ]);
            }
        };
        fetchSuggestions();
    }, []);

    // fetch jobs
    const [jobs, setJobs] = useState<JobType[]>([]);
    useEffect(() => {
        const fetchJobs = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/jobs`, {
                params: {
                    page: page - 1,
                    size: pageSize,
                    sortBy: "createdAt"
                },
            });
            setJobs(response.data.data.content);
            setTotalJobs(response.data.data.totalElements);
        };
        fetchJobs();
    }, [page, pageSize]);

    // no-op
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    return (
        <Flex vertical gap={32} >
            <div className="bg-[#fafaff] mt-2">
                {/* SECTION 1 */}
                <div className="py-3 container">
                    <div className="flex flex-col gap-2 bg-[#451da0] p-4 rounded-t-lg text-white">
                        <span className='text-[20px] font-bold'>Việc làm</span>
                        <span className='text-[34px] font-bold'>Bán sỉ - Bán lẻ - Quản lý cửa hàng</span>

                        {/* WRAP ALL INPUT */}
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <Input
                                    variant="borderless"
                                    className="focus:outline-none focus:border-none text-red bg-white"
                                    size="middle"
                                    prefix={<SearchIcon />}
                                    placeholder="Tìm kiếm cơ hội việc làm"
                                    value={searchText}
                                    onFocus={() => setOpenDropdown(true)}
                                    onBlur={() => setOpenDropdown(false)}
                                    onChange={(e) => {
                                        setSearchText(e.target.value);
                                        setOpenDropdown(e.target.value.trim() !== "");
                                    }}
                                />
                                {/* DROPDOWN SUGGEST LIST */}
                                {openDropdown && (
                                    <div className="absolute left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-20">
                                        <p className='px-3 mt-2 text-[16px] text-[#1c6fc3] font-bold'>Từ khóa gần đây</p>
                                        {/* Từ khóa gần đây */}
                                        <div className="">
                                            <div className="flex items-baseline gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-400">
                                                <ClockCircleOutlined />
                                                <span>Việc làm</span>
                                            </div>
                                            <div className="flex items-baseline gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-400">
                                                <ClockCircleOutlined />
                                                <span>Việc làm</span>
                                            </div>
                                        </div>
                                        <p className='px-3 mt-2 text-[16px] text-[#1c6fc3] font-bold'>Từ khóa phổ biến</p>
                                        {suggestions
                                            .filter((item) => item.toLowerCase().includes(searchText.toLowerCase()))
                                            .map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-400"
                                                    onClick={() => {
                                                        setSearchText(item);
                                                        setOpenDropdown(false);
                                                    }}
                                                >
                                                    {item}
                                                </div>
                                            ))}

                                        {/* Nếu không có kết quả */}
                                        {suggestions.filter((item) =>
                                            item.toLowerCase().includes(searchText.toLowerCase())
                                        ).length === 0 && (
                                                <div className="px-3 py-2 text-gray-400 select-none">
                                                    Không tìm thấy kết quả
                                                </div>
                                            )}
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Select
                                    placeholder="Lọc theo nghề nghiệp"
                                    className="select-truncate"
                                    style={{ width: 220 }}
                                    optionLabelProp="label"
                                    options={[
                                        { value: 'jack', label: 'Jack' },
                                        { value: 'lucy', label: 'Lucy' },
                                        { value: 'Yiminghe', label: 'Một nhãn rất rất dài để kiểm tra hiển thị khi vượt quá chiều rộng đã đặt' },
                                        { value: 'disabled', label: 'Disabled', disabled: true },
                                    ]}
                                />
                                <div className="flex no-radius ">
                                    <Select
                                        placeholder="Lọc theo tỉnh thành"
                                        options={[
                                            { value: 'jack', label: 'Jack' },
                                            { value: 'lucy', label: 'Lucy' },
                                            { value: 'Yiminghe', label: 'yiminghe' },
                                            { value: 'disabled', label: 'Disabled', disabled: true },
                                        ]}
                                    />
                                    <Input
                                        variant="borderless"
                                        className="focus:outline-none focus:border-none text custom-input"
                                        size="middle"
                                        prefix={<SearchIcon />}
                                        placeholder="Tìm việc làm gần tôi"
                                    />
                                </div>
                                <Button
                                    type="primary"
                                    className="bg-[#2c95ff]"
                                >
                                    Tìm việc
                                </Button>

                                <Button
                                    type="primary"
                                    className="bg-[#f5f5f5] text-[#000]"
                                    icon={<FilterOutlined />}
                                >
                                    Bộ lọc
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex items-center gap-2 bg-white shadow-sm p-4 rounded-b-lg">
                            <div className="flex items-center gap-2 border border-[#e3eefb] rounded-lg p-2 h-[40px]">
                                <ThunderboltOutlined />
                                <span>Tuyển nhanh</span>
                            </div>
                            <div className="flex items-center gap-2 border border-[#e3eefb] rounded-lg p-2 h-[40px]">
                                <FileOutlined />
                                <span>Việc không cần CV</span>
                            </div>
                            <div className="flex items-center gap-2 border border-[#e3eefb] rounded-lg p-2 h-[40px]">
                                <Select
                                    variant='borderless'
                                    className="focus:outline-none focus:border-none text custom-input w-full"
                                    placeholder="Tất cả kinh nghiệm"
                                    options={[
                                        { value: 'Fresher', label: 'Fresher' },
                                        { value: '1-3 years', label: '1-3 years' },
                                        { value: '3-5 years', label: '3-5 years' },
                                        { value: '5+ years', label: '5+ years' },
                                    ]}
                                />
                            </div>
                            <div className="flex items-center gap-2 border border-[#e3eefb] rounded-lg p-2 h-[40px]">
                                <Select
                                    variant='borderless'
                                    className="focus:outline-none focus:border-none text custom-input w-full"
                                    placeholder="Tất cả mức lương"
                                    options={[
                                        { value: '1-3 triệu', label: '1-3 triệu' },
                                        { value: '3-5 triệu', label: '3-5 triệu' },
                                        { value: '5-10 triệu', label: '5-10 triệu' },
                                        { value: '10-20 triệu', label: '10-20 triệu' },
                                        { value: '20-50 triệu', label: '20-50 triệu' },
                                        { value: '50-100 triệu', label: '50-100 triệu' },
                                        { value: '100-200 triệu', label: '100-200 triệu' },
                                        { value: '200-500 triệu', label: '200-500 triệu' },
                                    ]}
                                />
                            </div>
                            <div className="flex items-center gap-2 border border-[#e3eefb] rounded-lg p-2 h-[40px]">
                                <Select
                                    variant='borderless'
                                    className="focus:outline-none focus:border-none text custom-input w-full"
                                    placeholder="Tất cả cấp bậc"
                                    options={[
                                        { value: 'Cấp bậc 1', label: 'Cấp bậc 1' },
                                        { value: 'Cấp bậc 2', label: 'Cấp bậc 2' },
                                        { value: 'Cấp bậc 3', label: 'Cấp bậc 3' },
                                        { value: 'Cấp bậc 4', label: 'Cấp bậc 4' },
                                        { value: 'Cấp bậc 5', label: 'Cấp bậc 5' },
                                        { value: 'Cấp bậc 6', label: 'Cấp bậc 6' },
                                        { value: 'Cấp bậc 7', label: 'Cấp bậc 7' },
                                        { value: 'Cấp bậc 8', label: 'Cấp bậc 8' },
                                        { value: 'Cấp bậc 9', label: 'Cấp bậc 9' },
                                        { value: 'Cấp bậc 10', label: 'Cấp bậc 10' },
                                    ]}
                                />
                            </div>
                            <div className="flex items-center gap-2 border border-[#e3eefb] rounded-lg p-2 h-[40px]">
                                <Select
                                    variant='borderless'
                                    className="focus:outline-none focus:border-none text custom-input w-full"
                                    placeholder="Tất cả trình độ"
                                    options={[
                                        { value: 'Trung cấp', label: 'Trung cấp' },
                                        { value: 'Cao đẳng', label: 'Cao đẳng' },
                                        { value: 'Đại học', label: 'Đại học' },
                                        { value: 'Thạc sĩ', label: 'Thạc sĩ' },
                                        { value: 'Tiến sĩ', label: 'Tiến sĩ' },
                                    ]}
                                />
                            </div>

                            <div className="flex items-center gap-2 border border-[#e3eefb] rounded-lg p-2 h-[40px]">
                                <Button
                                    icon={<RemoveIcon />}
                                    type="text"
                                    className="text-[#1c6fc3] hover:text-[#1c6fc3] hover:bg-transparent"
                                >
                                    Xóa lọc
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="container">
                    <div className="flex flex-col gap-2 bg-white p-4 rounded-lg">
                        <Breadcrumb
                            items={[
                                {
                                    title: 'Trang chủ',
                                },
                                {
                                    title: <a href="">Việc làm</a>,
                                },
                                {
                                    title: <a href="">Bán sỉ - Bán lẻ - Quản lý cửa hàng</a>,
                                }
                            ]}
                        />
                    </div>

                    <Row gutter={24}>
                        {/* Cột trái: Danh sách job */}
                        <Col span={16}>
                            <h2 style={{ fontSize: 26, fontWeight: 600 }}>
                                Tuyển dụng <strong>2,195</strong> việc làm <strong>Bán sĩ - Bán lẻ - Quản lý cửa hàng</strong> mới nhất tháng 11/2025
                            </h2>

                            <Row justify="end" style={{ margin: "16px 0" }}>
                                <Select
                                    defaultValue="Phù hợp nhất"
                                    style={{ width: 180 }}
                                    options={[
                                        { value: "match", label: "Phù hợp nhất" },
                                        { value: "newest", label: "Mới nhất" },
                                    ]}
                                />
                            </Row>
                            {jobs.map((item) => (
                                <Card
                                    className='cursor-pointer hover:border-[#2C95FF] transition'
                                    key={item.id}
                                    style={{ marginBottom: 16, borderRadius: 8 }}
                                    bodyStyle={{ display: "flex", alignItems: "flex-start", gap: 16 }}
                                >
                                    {/* Logo */}
                                    <img
                                        src="https://via.placeholder.com/60"
                                        alt="logo"
                                        style={{ width: 60, height: 60, borderRadius: 8 }}
                                    />

                                    {/* Nội dung job */}
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
                                            {item.title}
                                        </h3>
                                        <p style={{ margin: 0, color: "#888" }}>{item.companyName}</p>

                                        <div className="flex items-center gap-4 mt-2 justify-between">
                                            <div className="flex items-center gap-2">
                                                <span>{item.minSalary} - {item.maxSalary} triệu</span>
                                                <span>
                                                    {/* Biểu tượng map location */}
                                                    <HeatMapOutlined />
                                                    <span>{item.province?.name}</span>
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <ClockCircleOutlined />
                                                <span>{item.expirationDate}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Icon lưu */}
                                    <Button type="text">{item.isFavorite ? <FavoriteIcon /> : <HeartOutlined />}</Button>
                                </Card>
                            ))}
                            {/* Pagination */}
                            <div className="flex justify-center">
                                <Pagination 
                                current={page}
                                pageSize={pageSize}
                                total={totalJobs}
                                onChange={(newPage, newPageSize) => {
                                    setPage(newPage);
                                    setPageSize(newPageSize);
                                }}
                                showSizeChanger={true}
                                pageSizeOptions={['10', '20', '50', '100']}
                                className="flex justify-center py-4 custom-pagination" 
                                />
                            </div>
                        </Col>

                        {/* Cột phải: Trạng thái tìm việc */}
                        <Col span={8}>
                            <Card title="Trạng thái tìm việc hiện tại của bạn?" bordered={false} style={{ borderRadius: 8 }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    <Button block type="primary">⚡ Sẵn sàng đi làm ngay</Button>
                                    <Button block>👀 Đang xem xét cơ hội mới</Button>
                                    <Button block>🌙 Chưa định chuyển việc</Button>
                                </div>
                                <p style={{ fontSize: 12, marginTop: 12, color: "#888" }}>
                                    Lựa chọn trạng thái tìm việc để tăng khả năng nhận phản hồi từ NTD và các thông báo công việc mới nhất cho bạn.
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>



        </Flex>
    );
};

export default SearchJob;