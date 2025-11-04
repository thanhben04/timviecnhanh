import { JobType } from "../../types/job";
import JobCardUrgent from "./JobCardUrgent";
import JobCard from "./JobCard";

interface Props {
  jobs: JobType[];
  type: "VIEC_LAM_TUYEN_GAP" | "VIEC_DI_LAM_NGAY";
}

export default function JobList({ jobs, type }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {jobs.map((job, idx) =>
        type === "VIEC_LAM_TUYEN_GAP" ? (
          <JobCardUrgent key={idx} job={job} />
        ) : (
          <JobCard key={idx} job={job} />
        )
      )}
    </div>
  );
}
