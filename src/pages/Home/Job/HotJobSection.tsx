import { Pagination, Select } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { HotJobIcon } from "assets/icons/HotJobIcon";
import JobList from "components/Job/JobList";
import { JobType } from "types/job";



interface Props {
    title: string;
    jobs: JobType[];
    provinces: string[];
    type?: "VIEC_LAM_TUYEN_GAP" | "VIEC_DI_LAM_NGAY";
    typeFilterItems?: any[];
}

export default function HotJobSection({
    title,
    jobs,
    provinces,
    type = "VIEC_LAM_TUYEN_GAP",
    typeFilterItems = [],
}: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const [selectedProvince, setSelectedProvince] = useState("Tất cả");
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 9;

    const filteredJobs = selectedProvince === "Tất cả"
        ? jobs
        : jobs.filter((job) => job.location === selectedProvince);

    const pageCount = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
    const paginatedJobs = filteredJobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
                            {provinces.map((province, index) => (
                                <button
                                    key={index}
                                    onClick={() => { setSelectedProvince(province); setPage(1); }}
                                    className={`px-4 py-2 h-10 rounded-full flex-shrink-0 border transition-colors ${province === selectedProvince ? "bg-[#8B5CF6] text-white border-[#8B5CF6]" : "bg-white text-gray-700 hover:border-[#8B5CF6]"
                                        }`}
                                    style={{ scrollSnapAlign: "start" }}
                                >
                                    {province}
                                </button>
                            ))}
                        </div>

                        <button onClick={scrollRight} className="flex justify-center items-center p-3 rounded-full bg-white border hover:bg-[#F5F3FF] transition cursor-pointer">
                            <RightOutlined />
                        </button>
                    </div>
                </div>

                {/* Job List */}
                <JobList jobs={paginatedJobs} type={type} />

                {/* Pagination */}
                <div className="flex items-center justify-center gap-3 py-4">
                    <Pagination
                        current={page}
                        pageSize={PAGE_SIZE}
                        total={filteredJobs.length}
                        onChange={(page) => setPage(page)}
                        showSizeChanger={false}
                        className="flex justify-center py-4"
                    />
                </div>

            </div>
        </div>
    );
}
