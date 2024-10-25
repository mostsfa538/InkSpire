import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BookType } from "../types/data";
import { AppDispatch } from "../features/app/store";
import { useDispatch } from "react-redux";
import { api } from "../features/api/api";
import Navbar from "../components/Layout/Navbar/Navbar";

function Book() {
    const { id } = useParams<{ id: string }>();
    const [cardBackgroundColor, setCardBackgroundColor] = useState<string>('rgba(0, 0, 0, 0)');
    const [backgroundColor, setBackgroundColor] = useState<string>('rgba(0, 0, 0, 0)');
    const [data, setData] = useState<BookType | undefined>(undefined);
    const dispatch = useDispatch<AppDispatch>();

    const imgRef = useRef<HTMLImageElement>(null);

    const fetchData = async () => {
        if (!id) return;
        const res = await dispatch(api.endpoints.getBookById.initiate(id));
        if (res.error) {
            console.error('Failed to fetch book:', res.error);
            return;
        }
        const book = res.data as BookType;
        setData(book);
    };

    // function that calculates the most frequent color in an image
    const calcAvgColor = (img: HTMLImageElement) => {
        if (!img) return;

        img.crossOrigin = 'Anonymous';

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const data = imageData.data;

        const colorMap = new Map<string, number>();

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            if (a === 0) continue;

            const key = `${r},${g},${b}`;
            if (colorMap.has(key)) {
                colorMap.set(key, colorMap.get(key)! + 1);
            } else {
                colorMap.set(key, 1);
            }
        }

        let maxColor = '';
        let maxCount = 0;

        for (const [color, count] of colorMap) {
            if (count > maxCount) {
                maxCount = count;
                maxColor = color;
            }
        }

        const [r, g, b] = maxColor.split(',').map(Number);
        return `rgba(${r}, ${g}, ${b}, 1)`;
    };

    const getTextContrast = (color: string) => {
        const rgb = color.match(/\d+/g);
        if (!rgb) return 'black';
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        return brightness >= 128 ? 'black' : 'white';
    };

    useEffect(() => {
        fetchData();

        const imgElement = imgRef.current;

        const handleImageLoad = () => {
            const color = calcAvgColor(imgElement!);
            if (color) {
                setCardBackgroundColor(color);
                const bgColor = color.split(',')
                bgColor[bgColor.length - 1] = ' 0.5)'
                setBackgroundColor(bgColor.join(','));
            }
        };

        if (imgElement) {
            imgElement.addEventListener('load', handleImageLoad);
        }

        return () => {
            if (imgElement) {
                imgElement.removeEventListener('load', handleImageLoad);
            }
            setData(undefined);
        };
    }, [id]);

    return (
        <div className="flex flex-col h-full">
            <Navbar />
            <div className="p-2 h-full">
                <div className="relative h-full p-2 flex flex-col justify-center items-center rounded-xl overflow-auto" style={{ backgroundColor, color: getTextContrast(cardBackgroundColor) }}>
                    <h1 className="text-3xl text-center font-bold p-2 z-10">{data?.title}</h1>
                    <div className="flex flex-col gap-2 shadow-md rounded-lg p-4 w-2/3 max-md:h-full max-md:w-full z-10" style={{ backgroundColor: cardBackgroundColor }}>
                        <div className="flex gap-2 max-md:flex-col">
                            <img ref={imgRef} src={data?.image} alt={data?.title} className="w-60 h-80 mx-auto"/>
                            <div className="[&>*>span]:font-bold [&>*>span]:underline [&>*]:border-b-2 [&>*]:border-gray-400 [&>*]:py-2">
                                <h2><span>Author:</span> {data?.author}</h2>
                                <p><span>Description:</span> {data?.description}</p>
                                <p><span>Price:</span> {data?.price}$</p>
                                <p><span>Sold:</span> {data?.sold}</p>
                                <p><span>Available:</span> {data?.available}</p>
                                <p><span>Categories:</span> {data?.category}</p>
                            </div>
                        </div>
                    </div>
                    <img ref={imgRef} src={data?.image} alt={data?.title} className="absolute left-0 top-0 h-full mx-auto z-0 opacity-30 rotate-90 max-md:hidden" />
                </div>
            </div>
        </div>
    )
}

export default Book;
