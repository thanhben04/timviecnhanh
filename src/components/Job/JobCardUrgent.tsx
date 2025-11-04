import JobCardBase from "./JobCardBase";
import { JobType } from "../../types/job";

export default function JobCardUrgent({ job }: { job: JobType }) {
    return (
        <JobCardBase job={job}>
            {/* Không cần thêm badge gì */}
        </JobCardBase>
    );
}
