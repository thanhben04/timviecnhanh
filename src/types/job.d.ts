export interface JobType {
  title: string;
  companyName: string;
  minSalary: number;
  maxSalary: number;
  location: string;
  logo: string;
  url: string;
  jobType: "VIEC_DI_LAM_NGAY" | "VIEC_LAM_TUYEN_GAP";
  deadline?: string;
  fastResponse?: string;
  noCV?: boolean;
  province?: {
    name: string;
  };
  expirationDate?: string;
  companyLogo?: string;
}
