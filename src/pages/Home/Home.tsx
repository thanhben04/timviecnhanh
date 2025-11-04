import { Flex, Input, Select, Tag } from 'antd';
import { useIsMobile } from 'hooks/useIsMobile';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import banner7 from '../../assets/images/Banners/Banner7.png';
import './Home.scss';
import { SearchIcon } from 'assets/icons/outlined/SearchIcon';
import { BookFilled, LeftOutlined, RightOutlined, SignalFilled, ThunderboltFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { HotJobIcon } from 'assets/icons/HotJobIcon';
import JobList from 'components/Job/JobList';
import HotJobSection from './Job/HotJobSection';
import InstantJobSection from './Job/InstantJobSection';
import { JobType } from 'types/job';
import axios from 'axios';

const suggestions = [
    "Nhân viên bán hàng",
    "Thu ngân",
    "Quản lý cửa hàng",
    "Nhân viên kho",
];

const Home: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);


    const [searchText, setSearchText] = useState("");
    const [openDropdown, setOpenDropdown] = useState(false);

    const [fetchedJobs, setFetchedJobs] = useState<JobType[]>([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/jobs`);
                const items = response?.data?.data?.content;
                setFetchedJobs(Array.isArray(items) ? (items as JobType[]) : []);
            } catch (error) {
                setFetchedJobs([]);
            }
        };
        fetchJobs();
    }, []);

    const urgentJobs = [
        {
            title: "Kỹ Sư Điện - Điện Tự Động Hóa",
            company: "Công Ty CP Dịch Vụ Thương Mại Công Nghiệp Tàu Thủy Vũng Tàu",
            salary: "10 - 20 triệu",
            location: "Bà Rịa - Vũng Tàu",
            logo: "https://cdn1.vieclam24h.vn/images/employer_avatar/2025/10/07/1578021573_logo_175980440438.png",
            url: "#",
            deadline: "Còn 3 ngày",
        },
        {
            title: "Nhân Viên Kinh Doanh",
            company: "Manulife Việt Nam",
            salary: "20 - 35 triệu",
            location: "TP.HCM",
            logo: "https://cdn1.vieclam24h.vn/images/employer_avatar/2024/03/22/22032833_59434663_logo_175980086.png",
            url: "#",
            deadline: "Còn 6 ngày",
        },
        {
            title: "Kỹ Sư Cơ Khí Thiết Bị Khoan",
            company: "Công Ty CP DV Thương Mại Công Nghiệp ShinTraCo",
            salary: "10 - 20 triệu",
            location: "Bà Rịa - Vũng Tàu",
            logo: "https://cdn1.vieclam24h.vn/images/employer_avatar/2022/11/03/135376546_logo.png",
            url: "#",
            deadline: "Còn 3 ngày",
        },
        {
            title: "Nhân Viên Bảo Trì Cơ Khí",
            company: "Công Ty TNHH Cheng Loong Bình Dương",
            salary: "9.5 - 12 triệu",
            location: "Bình Dương",
            logo: "https://cdn1.vieclam24h.vn/images/employer_avatar/2022/05/13/456537_logo.png",
            url: "#",
            deadline: "Còn 3 ngày",
        },
        {
            title: "Kế Toán Tổng Hợp",
            company: "Công Ty HCP Pumps Việt Nam",
            salary: "13 - 15 triệu",
            location: "Long An",
            logo: "https://cdn1.vieclam24h.vn/images/employer_avatar/2023/02/06/879986_logo.png",
            url: "#",
            deadline: "Còn 2 ngày",
        },
        {
            title: "Nhân Viên Chăm Sóc Khách Hàng",
            company: "FPT Telecom",
            salary: "8 - 12 triệu",
            location: "TP.HCM",
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/FPT_Telecom_logo.svg",
            url: "#",
            deadline: "Còn 4 ngày",
        },
        {
            title: "Quản Lý Cửa Hàng Thời Trang",
            company: "IVY Moda",
            salary: "12 - 18 triệu",
            location: "Hà Nội",
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/25/Ivy_Moda_Logo.png",
            url: "#",
            deadline: "Còn 5 ngày",
        },
        {
            title: "Nhân Viên Thu Ngân",
            company: "WinMart+",
            salary: "7 - 9 triệu",
            location: "Hà Nội",
            logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Winmart_logo.png",
            url: "#",
            deadline: "Còn 2 ngày",
        },
        {
            title: "Nhân Viên Kho",
            company: "Thế Giới Di Động",
            salary: "8 - 10 triệu",
            location: "Bình Dương",
            logo: "https://upload.wikimedia.org/wikipedia/commons/0/00/Thegioididong_logo.png",
            url: "#",
            deadline: "Còn 6 ngày",
        },
        {
            title: "Nhân Viên Giao Hàng",
            company: "J&T Express",
            salary: "9 - 12 triệu",
            location: "Hà Nội",
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/J%26T_Express_logo.svg",
            url: "#",
            deadline: "Còn 1 ngày",
        },
        {
            title: "Nhân Viên Pha Chế",
            company: "Highlands Coffee",
            salary: "6 - 8 triệu",
            location: "TP.HCM",
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/Highlands_Coffee_logo.svg",
            url: "#",
            deadline: "Còn 7 ngày",
        },
        {
            title: "Nhân Viên Sales Bất Động Sản",
            company: "Đất Xanh Group",
            salary: "15 - 40 triệu",
            location: "TP.HCM",
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Dat_Xanh_logo.png",
            url: "#",
            deadline: "Còn 10 ngày",
        },
        {
            title: "Chuyên Viên Tư Vấn Tài Chính",
            company: "Prudential Việt Nam",
            salary: "12 - 25 triệu",
            location: "Đà Nẵng",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Prudential_logo.svg",
            url: "#",
            deadline: "Còn 8 ngày",
        },
        {
            title: "Nhân Viên CSKH Ngân Hàng",
            company: "Vietcombank",
            salary: "9 - 14 triệu",
            location: "Hà Nội",
            logo: "https://upload.wikimedia.org/wikipedia/commons/5/55/Vietcombank_logo.svg",
            url: "#",
            deadline: "Còn 5 ngày",
        },
        {
            title: "Nhân Viên Kỹ Thuật IT Support",
            company: "FPT Software",
            salary: "12 - 18 triệu",
            location: "Cần Thơ",
            logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/FPT_Software_logo.svg",
            url: "#",
            deadline: "Còn 7 ngày",
        },
        {
            title: "Nhân Viên Chốt Đơn Online",
            company: "Shopee Express",
            salary: "9 - 15 triệu",
            location: "TP.HCM",
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Shopee_logo.svg",
            url: "#",
            deadline: "Còn 3 ngày",
        },
        {
            title: "Nhân Viên Bán Hàng Siêu Thị",
            company: "Bách Hóa Xanh",
            salary: "7 - 9 triệu",
            location: "Đồng Nai",
            logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Bachhoaxanh_logo.png",
            url: "#",
            deadline: "Còn 2 ngày",
        },
        {
            title: "Nhân Viên Kiểm Hàng Kho",
            company: "Lazada Logistics",
            salary: "8 - 12 triệu",
            location: "Bình Dương",
            logo: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Lazada_%282019%29.svg",
            url: "#",
            deadline: "Còn 9 ngày",
        },
        {
            title: "Chuyên Viên Marketing",
            company: "VNG Corporation",
            salary: "15 - 25 triệu",
            location: "TP.HCM",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/VNG_Corporation_logo.png",
            url: "#",
            deadline: "Còn 6 ngày",
        },
        {
            title: "Quản Lý Nhà Hàng",
            company: "The Coffee House",
            salary: "12 - 18 triệu",
            location: "Hà Nội",
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/The_Coffee_House_logo.svg",
            url: "#",
            deadline: "Còn 4 ngày",
        },
    ];


    const instantJobs = [
        {
            title: "Nhân Viên Kỹ Thuật Lắp Đặt Nội Thất",
            company: "Công Ty TNHH Sanko Việt Nam",
            salary: "10 - 15 triệu",
            location: "TP.HCM",
            logo: "https://cdn1.vieclam24h.vn/images/employer_avatar/2025/05/08/logo-mau-01_174668913330.w-128.h-128.png?v=220513",
            url: "#",
            fastResponse: "1 giờ",
            noCV: true,
            deadline: "Còn 1 ngày"
        },
        // ...
    ];

    const jobItems = [
        {
            to: "/",
            label: "Bán sỉ - Bán lẻ - Quản lý cửa hàng",
            icon: <SearchIcon />
        },
        {
            to: "/ke-toan",
            label: "Kế toán - Thu ngân",
            icon: <SearchIcon />
        },
        {
            to: "/sales",
            label: "Nhân viên kinh doanh",
            icon: <SearchIcon />
        },
        {
            to: "/nhan-su",
            label: "Nhân sự - Hành chính",
            icon: <SearchIcon />
        },
        {
            to: "/lap-trinh-vien",
            label: "IT - Phần cứng - Phần mềm",
            icon: <SearchIcon />
        }
    ];

    const hotJobTags = [
        { label: "Việc làm Hà Nội", icon: <SignalFilled /> },
        { label: "Việc làm Hồ Chí Minh", icon: <SignalFilled /> },
        { label: "Việc làm Đà Nẵng", icon: <SignalFilled /> },
        { label: "Việc làm Bình Dương", icon: <SignalFilled /> },
    ];

    const provinces = [
        "Tất cả",
        "TP.HCM",
        "An Giang",
        "Bà Rịa - Vũng Tàu",
        "Bạc Liêu",
        "Bến Tre",
        "Bình Dương",
        "Bình Phước",
        "Bình Thuận",
        "Bình Định",
        "Cà Mau",
        "Cần Thơ",
        "Gia Lai",
        "Hậu Giang",
        "Khánh Hòa",
        "Kiên Giang",
        "Kon Tum",
        "Lâm Đồng",
        "Long An",
        "Ninh Thuận",
        "Phú Yên",
        "Quảng Nam",
        "Quảng Ngãi",
        "Sóc Trăng",
        "Tây Ninh",
        "Tiền Giang",
        "Trà Vinh",
        "Vĩnh Long",
        "Đà Nẵng",
        "Đắk Lắk",
        "Đắk Nông",
        "Đồng Nai",
        "Đồng Tháp",
    ];



    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };


    return (
        <Flex vertical gap={32} className="bg-[#f6f9ff]">
            <div className="bg-[#e7f7ff]">
                <div className="container">
                    <div className="flex justify-between items-center bg-white rounded-[20px] mt-5">
                        <div className="flex-1 py-2 relative">
                            <Input
                                variant="borderless"
                                className="focus:outline-none focus:border-none"
                                size="large"
                                prefix={<SearchIcon />}
                                placeholder="Nhập vị trí muốn ứng tuyển"
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
                                    <p className='px-3 mt-2 text-[16px] text-[#1c6fc3] font-bold'>Từ khóa phổ biến</p>
                                    {suggestions
                                        .filter((item) => item.toLowerCase().includes(searchText.toLowerCase()))
                                        .map((item, index) => (
                                            <div
                                                key={index}
                                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
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

                        <div className="border-l border-gray-300 dark:border-gray-700" style={{ height: '32px' }} ></div>

                        <div className="flex-1">
                            <Input variant='borderless' style={{ border: 'none' }} size='large' placeholder='Tất cả nghề nghiệp' />
                        </div>
                        <div className="border-l border-gray-300 dark:border-gray-700" style={{ height: '32px' }}>

                        </div>

                        <div className="flex-1">
                            <Input variant='borderless' style={{ border: 'none' }} size='large' placeholder='Tất cả thành phố' />
                        </div>
                    </div>

                    <div className="flex gap-4 my-7">
                        <div className="flex flex-col gap-5 bg-white rounded-[12px] min-w-[310px] p-4">
                            {jobItems.map((item, index) => (
                                <Link key={index} to={item.to}>
                                    <div className="flex gap-2 mt-1 items-center hover:text-[#d00000] transition-colors">
                                        {item.icon}
                                        <span className='text-[16px]'>{item.label}</span>
                                    </div>
                                </Link>
                            ))}

                            <div className="flex-1 flex items-center justify-center pt-[10px] border-t border-dashed border-[#E7E7E8] cursor-pointer" ><div className="text-14 font-normal leading-6 text-se-neutral-84 text-se-accent-100" >Tất cả các ngành</div></div>
                        </div>

                        {/* Right */}
                        <div className="flex flex-col justify-between">
                            {/* SECTION 1 */}
                            <div className="flex gap-2 ">
                                {hotJobTags.map((item, key) => (
                                    <div
                                        key={key}
                                        className="inline-flex gap-2 bg-white text-xs px-2 py-1 rounded-[10px]">
                                        {item.icon}
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                            {/* SECTION 2 */}
                            <div className="flex items-center gap-4 w-full sm_cv:gap-2 sm_cv:px-3 my-3">
                                <div className="flex-1 flex items-center gap-2 justify-center w-full h-[56px] max-w-[50%] bg-white rounded-[12px] px-2 py-1 shadow-sd-17 transition-all hover:bg-[#FFF7ED]">
                                    <ThunderboltFilled style={{ color: 'red', fontSize: '26px' }} />
                                    <span className='text-[#f87316] font-bold'>Việc đi làm ngay</span>
                                    <Tag color="#f50">Mới</Tag>

                                </div>
                                <div className="flex-1 flex items-center gap-2 justify-center w-full h-[56px] max-w-[50%] bg-white rounded-[12px] px-2 py-1 shadow-sd-17 transition-all hover:bg-[#FFF7ED]">
                                    <BookFilled style={{ color: '#1c6fc3', fontSize: '26px' }} />
                                    <span className='text-[#1c6fc3] font-bold'>Việc không cần CV</span>
                                    <Tag color="#f50">Mới</Tag>

                                </div>
                            </div>
                            {/* SECTION 3 */}
                            <div className="rounded-[12px]">
                                <img className='rounded-[12px]' src={banner7} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <HotJobSection
                title="Việc làm tuyển gấp"
                jobs={fetchedJobs.filter((job: JobType) => job.jobType === "VIEC_LAM_TUYEN_GAP")}
                provinces={provinces}
                type="VIEC_LAM_TUYEN_GAP"
            />

            <InstantJobSection
                title="Việc đi làm ngay"
                jobs={fetchedJobs.filter((job: JobType) => job.jobType === "VIEC_DI_LAM_NGAY")}
                provinces={provinces}
                type="VIEC_DI_LAM_NGAY"
            />


        </Flex>
    );
};

export default Home;
