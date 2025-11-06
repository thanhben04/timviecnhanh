import { MetalIcon } from "assets/icons/MetalIcon";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import '../../pages/Home/Home.scss';

const HotCompany: React.FC = () => {

    // demo company data
    const companies = [
        {
            name: "Công ty A",
            logo: "https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Ftvn%2Fimages%2Fold_employer_avatar%2Fimages%2Fbc5ddb0ec144952db46eee92d32c25fc_5f83f577b9037_1602483575.w-150.h-150.png&w=64&q=75",
            jobCount: 12
        },

        {
            name: "Công ty B",
            logo: "https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fimages%2Femployer_avatar%2F2025%2F03%2F21%2Ffpt_174252953638.w-150.h-150.png&w=64&q=75",
            jobCount: 15
        },

        {
            name: "Công ty C",
            logo: "https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fimages%2Femployer_avatar%2F2023%2F09%2F25%2FLogo_169561462958.w-150.h-150.png&w=64&q=75",
            jobCount: 10
        },

        {
            name: "Công ty D",
            logo: "https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fimages%2Femployer_avatar%2F2024%2F09%2F30%2Fz5880845407758_1be30b734c676adb4297ca80ded6c5a2_172766243724.w-150.h-150.jpg&w=64&q=75",
            jobCount: 8
        },

        {
            name: "Công ty E",
            logo: "https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fupload%2Ffiles_cua_nguoi_dung%2Flogo%2F2019%2F05%2F31%2Flogo%20eupf.w-150.h-150.jpg&w=64&q=75",
            jobCount: 6
        }
    ];

    return (
        <div className="container py-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Biểu tượng company */}
                    <MetalIcon />
                    <span className='text-[24px] font-bold text-[#004F9F]'>Công ty nổi bật</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button type="text">
                        <span>Xem tất cả</span>
                        <ArrowRightOutlined />
                    </Button>
                </div>
            </div>
            <div className="flex justify-between gap-2 py-6">
                {companies.map((company, index) => (
                    <div key={index} className="flex justify-between gap-2">
                        <div className="flex flex-col gap-2 px-3 py-2 justify-between cursor-pointer hover:border-[#2C95FF] transition">
                            <div className="flex items-center justify-center">
                                <img src={company.logo} alt={company.name} />
                            </div>
                            <div className="">

                                <span>{company.jobCount} vị trí đang tuyển dụng</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotCompany;