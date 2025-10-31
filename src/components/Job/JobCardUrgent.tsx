import JobCardBase from "./JobCardBase";
import { Job } from "../../types/job";

export default function JobCardUrgent({ job }: { job: Job }) {
    return (
        <JobCardBase job={job}>
            {/* Không cần thêm badge gì */}
        </JobCardBase>
    );
}
