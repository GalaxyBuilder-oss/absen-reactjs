const WindowFixed =({children})=> {

    return (
        <div className="w-full h-full block fixed z-10 top-0 left-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm">
            {children}
        </div>
    )
}

export default WindowFixed