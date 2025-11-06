import { Flex, Input, Tag } from 'antd';
import { useIsMobile } from 'hooks/useIsMobile';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import banner7 from '../../assets/images/Banners/Banner7.png';
import './Home.scss';
import { SearchIcon } from 'assets/icons/outlined/SearchIcon';
import { BookFilled, SignalFilled, ThunderboltFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import HotJobSection from './Job/HotJobSection';
import InstantJobSection from './Job/InstantJobSection';
import { JobType } from 'types/job';
import axios from 'axios';
import { Province } from 'services/addressService';
import HotCompany from 'components/Company/HotCompany';
import SuggestJob from './Job/SuggestJob';
import BlogSection from './Job/BlogSection';

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

    // fetch province from api
    const [provinces, setProvinces] = useState<Province[]>([]);
    useEffect(() => {
        const fetchProvinces = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/provinces`);
            setProvinces(response.data.data.content);
        };
        fetchProvinces();
    }, []);

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

            <HotCompany />

            <SuggestJob
                title="Việc làm gợi ý"
                jobs={fetchedJobs}
                provinces={provinces}
                type="VIEC_LAM_TUYEN_GAP"
            />

            <BlogSection />
        </Flex>
    );
};

export default Home;
