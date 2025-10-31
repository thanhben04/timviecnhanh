import { Job } from "../../types/job";
import JobCardUrgent from "./JobCardUrgent";
import JobCard from "./JobCard";

interface Props {
  jobs: Job[];
  type: "urgent" | "instant";
}

export default function JobList({ jobs, type }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {jobs.map((job, idx) =>
        type === "urgent" ? (
          <JobCardUrgent key={idx} job={job} />
        ) : (
          <JobCard key={idx} job={job} />
        )
      )}
    </div>
  );
}
