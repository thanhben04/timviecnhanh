import { Card, Button, Divider } from "antd";
import { EnvironmentOutlined, TeamOutlined, ArrowRightOutlined } from "@ant-design/icons";

export default function JobSidebar({ company, relatedJobs }: { company: any, relatedJobs: any }) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[391px]">

      {/* COMPANY CARD */}
      <Card className="rounded-xl shadow-sm">
        <div className="flex flex-col items-center gap-3 text-center">
          <img
            src={company.logo}
            alt={company.name}
            className="w-16 h-16 object-contain border rounded-lg"
          />
          <h3 className="text-lg font-semibold">{company.name}</h3>

          <div className="flex items-start gap-2 text-gray-700 text-sm">
            <EnvironmentOutlined />
            <span><strong>Địa chỉ:</strong> {company.address}</span>
          </div>

          <div className="flex items-start gap-2 text-gray-700 text-sm">
            <TeamOutlined />
            <span><strong>Quy mô:</strong> {company.size}</span>
          </div>

          <Button
            type="link"
            href={company.link}
            className="text-purple-600 font-medium flex items-center gap-1"
          >
            Xem trang công ty <ArrowRightOutlined />
          </Button>
        </div>
      </Card>

      {/* RELATED JOBS */}
      <Card className="rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-center mb-4">Việc làm tương tự cho bạn</h3>

        <div className="flex flex-col gap-3">
          {relatedJobs.map((job: any) => (
            <a
              key={job.id}
              href={`/jobs/${job.id}`}
              className="border rounded-lg p-3 flex gap-3 hover:shadow-md hover:border-purple-500 transition"
            >
              <img
                src={job.logo}
                alt={job.company}
                className="w-16 h-16 object-contain rounded-md bg-white"
              />

              <div className="flex flex-col flex-1">
                <h4 className="font-medium text-gray-800 line-clamp-2 text-sm">{job.title}</h4>
                <span className="text-xs text-gray-500">{job.company}</span>
                <span className="text-purple-600 text-sm font-medium">{job.salary}</span>
                <span className="text-gray-600 text-xs">{job.location}</span>
                <span className="text-gray-500 text-xs">{job.remainDays}</span>
              </div>
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
}
