import { JobType } from "../../types/job";

interface Props {
    job: JobType;
    children?: React.ReactNode; // cho phép inject badge thêm
}

export default function JobCardBase({ job, children }: Props) {
    return (
        <a
            href={job.url}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col rounded-lg bg-white border hover:border-[#2C95FF] transition p-3"
        >
            <div className="flex gap-3">
                <img src={job.companyLogo} className="w-14 h-14 object-contain" />
                <div className="flex flex-col overflow-hidden">
                    <h3 className="text-base font-medium line-clamp-1">{job.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{job.companyName}</p>

                    <div className="text-[#2C95FF] text-sm">{job.minSalary} - {job.maxSalary} triệu</div>
                    <div className="text-sm text-gray-600">{job.province?.name}</div>
                </div>
            </div>

            {/* phần thay đổi tuỳ loại card */}
            {children}

            <div className="flex justify-end text-sm text-gray-500 mt-2">
                ⏰ {job.expirationDate}
            </div>
        </a>
    );
}
