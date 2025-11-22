import parallaxImage from "@/assets/images/poker-table.jpg";

function ImageSection() {
    return (
        <div className="fixed bottom-0 left-0 w-full h-[800px] -z-10 overflow-hidden">
            <img
                src={parallaxImage}
                alt="Background"
                className="w-full h-full object-cover"
            />
        </div>
    );
}

export default ImageSection;
