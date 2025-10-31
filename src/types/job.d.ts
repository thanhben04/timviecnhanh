export interface Job {
  title: string;
  company: string;
  salary: string;
  location: string;
  logo: string;
  url: string;
  deadline: string;
  fastResponse?: string; // chỉ có trong job đi làm ngay
  noCV?: boolean;       // chỉ có trong job đi làm ngay
}
