import { Pagination, Select } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { HotJobIcon } from "assets/icons/HotJobIcon";
import JobList from "components/Job/JobList";
import { JobType } from "types/job";
import { Province } from "services/addressService";
import axios from "axios";



interface Props {
    title: string;
    jobs: JobType[];
    provinces: Province[];
    type?: "VIEC_LAM_TUYEN_GAP" | "VIEC_DI_LAM_NGAY";
    typeFilterItems?: any[];
}

export default function HotJobSection({
    title,
    jobs: initialJobs,
    provinces,
    type = "VIEC_LAM_TUYEN_GAP",
    typeFilterItems = [],
}: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const [selectedProvince, setSelectedProvince] = useState("Tất cả");
    const [page, setPage] = useState(1);
    const [jobs, setJobs] = useState<JobType[]>(initialJobs);
    const [loading, setLoading] = useState(false);
    const [totalElements, setTotalElements] = useState(0);
    const PAGE_SIZE = 9;

    // Fetch jobs khi selectedProvince hoặc page thay đổi
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const params: any = {
                    jobType: type,
                    page: page - 1, // API dùng 0-based page, convert từ 1-based
                    size: PAGE_SIZE,
                };

                // Nếu không phải "Tất cả", thêm provinceCode vào params
                if (selectedProvince !== "Tất cả") {
                    params.provinceCode = selectedProvince;
                }

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/jobs`, { params });
                const data = response?.data?.data;
                const items = data?.content;
                setJobs(Array.isArray(items) ? (items as JobType[]) : []);
                setTotalElements(data?.totalElements || 0);
            } catch (error) {
                console.error("Error fetching jobs:", error);
                setJobs([]);
                setTotalElements(0);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [selectedProvince, type, page]);

    const scrollLeft = () => scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
    const scrollRight = () => scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });

    return (
        <div className="bg-[#f6f9ff]">
            <div className="container flex flex-col w-full gap-6">

                {/* Header */}
                <div className="flex justify-between items-center gap-4 w-full">
                    <div className="flex items-center gap-2 min-w-max">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FFF7ED]">
                            <HotJobIcon />
                        </div>

                        <h2 className="text-[24px] font-bold leading-10 bg-gradient-to-r from-[#F7393C] to-[#FF9152] bg-clip-text text-transparent truncate">
                            {title}
                        </h2>
                    </div>
                </div>

                {/* Select + Province Filter */}
                <div className="flex items-center justify-between gap-4 w-full">
                    <div className="relative flex-1 ">
                        <Select
                            showSearch size="large" style={{ width: 200 }}
                            placeholder="Lọc theo"
                            optionFilterProp="label"
                            options={typeFilterItems}
                        />
                    </div>

                    {/* Scroll provinces */}
                    <div className="flex items-center w-full gap-2 max-w-[800px]">

                        <button onClick={scrollLeft} className="flex justify-center items-center p-3 rounded-full bg-[#F6F6F6] hover:bg-[#EDEDED] transition cursor-pointer">
                            <LeftOutlined />
                        </button>

                        <div ref={scrollRef} className="flex gap-3 overflow-x-hidden py-2 no-scrollbar" style={{ scrollSnapType: "x mandatory" }}>
                            {/* Button "Tất cả" */}
                            <button
                                onClick={() => { setSelectedProvince("Tất cả"); setPage(1); }}
                                className={`px-4 py-2 h-10 rounded-full flex-shrink-0 border transition-colors ${selectedProvince === "Tất cả" ? "bg-[#8B5CF6] text-white border-[#8B5CF6]" : "bg-white text-gray-700 hover:border-[#8B5CF6]"
                                    }`}
                                style={{ scrollSnapAlign: "start" }}
                            >
                                Tất cả
                            </button>

                            {provinces.map((province, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelectedProvince(province.provinceCode);
                                        setPage(1); // Reset về trang 1 khi province thay đổi
                                    }}
                                    className={`px-4 py-2 h-10 rounded-full flex-shrink-0 border transition-colors ${province.provinceCode === selectedProvince ? "bg-[#8B5CF6] text-white border-[#8B5CF6]" : "bg-white text-gray-700 hover:border-[#8B5CF6]"
                                        }`}
                                    style={{ scrollSnapAlign: "start" }}
                                >
                                    {province.name}
                                </button>
                            ))}
                        </div>

                        <button onClick={scrollRight} className="flex justify-center items-center p-3 rounded-full bg-white border hover:bg-[#F5F3FF] transition cursor-pointer">
                            <RightOutlined />
                        </button>
                    </div>
                </div>

                {/* Job List */}
                <JobList jobs={jobs} type={type} />

                {/* Pagination */}
                <div className="flex items-center justify-center gap-3 py-4">
                    <Pagination
                        current={page}
                        pageSize={PAGE_SIZE}
                        total={totalElements}
                        onChange={(newPage) => setPage(newPage)}
                        showSizeChanger={false}
                        className="flex justify-center py-4"
                    />
                </div>

            </div>
        </div>
    );
}
