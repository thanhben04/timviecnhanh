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

export default function SuggestJob({
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
    const PAGE_SIZE = 6;

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

    return (
        <div className="bg-white my-6">
            <div className="container flex flex-col w-full gap-6">

                {/* Header */}
                <div className="flex justify-between items-center gap-4 w-full">
                    <div className="flex items-center gap-2 min-w-max">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FFF7ED]">
                            <HotJobIcon />
                        </div>

                        <h2 className="py-4 text-[24px] font-bold leading-10 bg-gradient-to-r from-[#F7393C] to-[#FF9152] bg-clip-text text-transparent truncate">
                            {title}
                        </h2>
                    </div>
                </div>

                {/* Job List */}
                <JobList jobs={jobs} type={type} />

            </div>
        </div>
    );
}
