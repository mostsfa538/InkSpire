function Hero({ image, children }: { image: string, children: React.ReactNode }) {
    return (
        <div className={`w-full h-full ${image} bg-cover max-lg:hidden`}>
            {children}
        </div>
    )
}

export default Hero