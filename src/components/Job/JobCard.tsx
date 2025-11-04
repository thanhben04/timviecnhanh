import JobCardBase from "./JobCardBase";
import { JobType } from "../../types/job";

export default function JobCard({ job }: { job: JobType }) {
  return (
    <JobCardBase job={job}>
      <div className="flex gap-2 mt-2 text-xs flex-wrap">
        {job.fastResponse && (
          <span className="px-2 py-1 rounded bg-orange-100 text-orange-600">
            Phản hồi trong {job.fastResponse}
          </span>
        )}

        {job.noCV && (
          <span className="px-2 py-1 rounded bg-blue-100 text-blue-600">
            Không cần CV
          </span>
        )}
      </div>
    </JobCardBase>
  );
}
