import { AlertProps } from "../../types/props"

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";


function Alert({ type, message }: AlertProps) {
    const style = {
        error: 'bg-error-background border-error-border text-error-text',
        success: 'bg-success-background border-success-border text-success-text',
        info: 'bg-info-background border-info-border text-info-text'
    }

    return <div className={`${style[type]} border-2 p-4 text-sm font-bold rounded-md max-md:text-xs flex items-center justify-center`}>
        {type === 'error' && <MdOutlineReportGmailerrorred className="mr-2" />}
        {type === 'success' && <IoIosCheckmarkCircleOutline className="mr-2" />}
        {type === 'info' && <IoMdInformationCircleOutline className="mr-2" />}
        {message}
    </div>

}

export default Alert