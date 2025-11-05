import { Pagination, Select } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { ThunderboltFilled } from "@ant-design/icons";
import JobList from "components/Job/JobList";
import { JobType } from "types/job";
import { Province } from "services/addressService";
import axios from "axios";


interface Props {
    title: string;
    jobs: JobType[];
    provinces: Province[];
    type?: "VIEC_DI_LAM_NGAY" | "VIEC_LAM_TUYEN_GAP";
}

export default function InstantJobSection({
    title,
    jobs: initialJobs,
    provinces,
    type = "VIEC_DI_LAM_NGAY"
}: Props) {

    const scrollRef = useRef<HTMLDivElement>(null);

    const [selectedProvince, setSelectedProvince] = useState("Tất cả");
    const [page, setPage] = useState(1);

    const PAGE_SIZE = 10;

    const [jobs, setJobs] = useState<JobType[]>(initialJobs);
    const [loading, setLoading] = useState(false);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const params: any = {
                    jobType: type,
                    page: page - 1,
                    size: PAGE_SIZE,
                };

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
        <div className="bg-[#FFF5EC] py-6">
            <div className="container flex flex-col gap-6">

                {/* HEADER */}
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FFE8DA]">
                            <ThunderboltFilled style={{ color: "#FF7A00", fontSize: 18 }} />
                        </div>
                        <h2 className="text-[24px] font-bold text-[#FF7A00]">{title}</h2>
                    </div>

                    <button className="text-[#FF7A00] hover:underline text-sm">
                        Xem tất cả →
                    </button>
                </div>

                {/* FILTER */}
                <div className="flex items-center gap-4 w-full">

                    <Select size="large" placeholder="Lọc theo: Địa điểm" style={{ width: 200 }} />

                    <div className="flex items-center w-full gap-2 max-w-[800px]">

                        <button onClick={scrollLeft} className="p-3 rounded-full bg-white border hover:bg-[#FFEFE5]">
                            <LeftOutlined />
                        </button>

                        <div ref={scrollRef} className="flex gap-3 overflow-x-hidden py-2 no-scrollbar">
                            {provinces.map((province, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setSelectedProvince(province.provinceCode); setPage(1); }}
                                    className={`px-4 py-2 rounded-full flex-shrink-0 border text-sm ${selectedProvince === province.provinceCode
                                        ? "bg-[#FF7A00] text-white border-[#FF7A00]"
                                        : "bg-white hover:border-[#FF7A00]"
                                        }`}
                                >
                                    {province.name}
                                </button>
                            ))}
                        </div>

                        <button onClick={scrollRight} className="p-3 rounded-full bg-white border hover:bg-[#FFEFE5]">
                            <RightOutlined />
                        </button>
                    </div>
                </div>

                {/* JOB LIST */}
                <JobList jobs={jobs} type={type} />

                {/* PAGINATION */}
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
