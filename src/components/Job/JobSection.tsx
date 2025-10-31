import JobList from "./JobList";
import { Job } from "../../types/job";

interface Props {
    title: string;
    jobs: Job[];
    type: "urgent" | "instant";
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
