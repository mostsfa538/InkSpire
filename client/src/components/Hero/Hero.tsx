import { useSelector } from "react-redux";
import { RootState } from "../../features/app/store";

function Hero({ image, children }: { image: string, children: React.ReactNode }) {
    const { initialSignUp } = useSelector((state: RootState) => state.UI);
    return (
        <div className={`h-full ${image} ${initialSignUp ? 'w-0' : 'w-full max-w-full'} overflow-hidden transition-all ease-in-out duration-500 bg-cover max-lg:hidden`}>
            {children}
        </div>
    )
}

export default Hero