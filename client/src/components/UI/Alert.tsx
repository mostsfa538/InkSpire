import { AlertProps } from "../../types/props";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";

function Alert({ type, message }: AlertProps) {
    const style = {
        error: "bg-red-100 border-red-400 text-red-700",
        success: "bg-green-100 border-green-400 text-green-700",
        info: "bg-blue-100 border-blue-400 text-blue-700",
    };

    return (
        <div
            className={`${style[type]} border-2 p-4 text-sm font-semibold rounded-lg flex items-center shadow-lg`}>
            {type === "error" && (
                <MdOutlineReportGmailerrorred className="mr-2 text-xl" />
            )}
            {type === "success" && (
                <IoIosCheckmarkCircleOutline className="mr-2 text-xl" />
            )}
            {type === "info" && (
                <IoMdInformationCircleOutline className="mr-2 text-xl" />
            )}
            <span className="font-sans">{message}</span>
        </div>
    );
}

export default Alert;
