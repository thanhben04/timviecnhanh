import JobList from "./JobList";
import { JobType } from "../../types/job";

interface Props {
    title: string;
    jobs: JobType[];
    type: "VIEC_LAM_TUYEN_GAP" | "VIEC_DI_LAM_NGAY";
}

export default function JobSection({ title, jobs, type }: Props) {
    return (
        <section className="py-6">
            <h2 className="text-xl font-semibold mb-3">{title}</h2>

            {/* filter tỉnh */}
            {/* pagination */}
            {/* nút xem tất cả */}

            <JobList jobs={jobs} type={type} />
        </section>
    );
}
