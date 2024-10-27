import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BookType, ReviewType } from "../types/data";
import { AppDispatch } from "../features/app/store";
import { useDispatch } from "react-redux";
import { api } from "../features/api/api";
import Navbar from "../components/Layout/Navbar/Navbar";
import { calcAvgColor, getTextContrast } from "../utils/styling";
import { deleteReview, getReviewsByBookId } from "../features/reviews/reviews";
import useAuth from "../hooks/useAuth";
import { TbPencil, TbTrash } from "react-icons/tb";
import AddReview from "../components/Forms/AddReview";

function Book() {
    const { user } = useAuth();
    const { id } = useParams<{ id: string }>();
    const [update, setUpdate] = useState<boolean>(false);
    const [userReview, setUserReview] = useState<ReviewType | undefined>(undefined);
    const [newReview, setNewReview] = useState<string>('');
    const [newRating, setNewRating] = useState<number>(0);
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [avgRating, setAvgRating] = useState<number>(0);
    const [cardBackgroundColor, setCardBackgroundColor] = useState<string>('rgba(0, 0, 0, 0)');
    const [backgroundColor, setBackgroundColor] = useState<string>('rgba(0, 0, 0, 0)');
    const [book, setBook] = useState<BookType | undefined>(undefined);
    const dispatch = useDispatch<AppDispatch>();

    const imgRef = useRef<HTMLImageElement>(null);

    const fetchData = async () => {
        if (!id) return;
        const getBook = await dispatch(api.endpoints.getBookById.initiate(id));
        const getReviews = await dispatch(getReviewsByBookId(id));

        if (getBook.error) return;

        
        const book = getBook.data as BookType;
        const reviews = getReviews.payload as ReviewType[];

        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const avgRating = totalRating / reviews.length;

        setBook(book);
        setReviews(reviews);
        setAvgRating(avgRating);
    };

    const handleDeleteReview = async (reviewId: number) => {
        dispatch(deleteReview({ userId: user!.id!, reviewId }));

        // remove review from state
        const newReviews = reviews.filter(review => review.id !== reviewId);

        setReviews(newReviews);
        setNewReview('');
        setNewRating(0);
        setUpdate(false);
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
            setBook(undefined);
        };
    }, [id]);

    useEffect(() => {
        const placedReview = reviews.find(review => review.id_user === user?.id);
        setUserReview(placedReview);

        if (reviews.length === 0) return;
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const avgRating = totalRating / reviews.length;
        setAvgRating(avgRating);
    }, [reviews]);

    return (
        <div className="h-full">
            <Navbar />
            <div className="p-4 h-full [&>*]:p-2 [&>*]:mb-4 [&>*]:rounded-xl">
                <div className="relative h-[90%] flex flex-col justify-center items-center overflow-hidden" 
                    style={{ backgroundColor: backgroundColor !== 'rgba(0, 0, 0, 0)' ? backgroundColor : '#2222228f',
                    color: getTextContrast(cardBackgroundColor) 
                }}>
                    <h1 className="text-3xl text-center font-bold p-2 z-10">{book?.title}</h1>
                    <div className="flex flex-col gap-2 shadow-md rounded-lg h-fit p-4 w-2/3 max-md:h-full overflow-auto max-md:w-full z-10" 
                    style={{ backgroundColor: cardBackgroundColor !== 'rgba(0, 0, 0, 0)' ? cardBackgroundColor : '#222' }}>
                        <div className="flex gap-2 max-md:flex-col">
                            <img ref={imgRef} src={book?.image} alt={book?.title} className="w-60 h-80 mx-auto"/>
                            <div className="[&>*>span]:font-bold [&>*>span]:underline [&>*]:border-b-2 [&>*]:border-gray-400 [&>*]:py-2">
                                <h4><span>Rating:</span> {avgRating}/5</h4>
                                <h4><span>Author:</span> {book?.author}</h4>
                                <h4><span>Description:</span> {book?.description}</h4>
                                <h4><span>Price:</span> {book?.price}$</h4>
                                <h4><span>Sold:</span> {" "}
                                    {book?.sold! >= book?.available! ? 
                                    <span className="h4-1 text-sm border-2 text-error-text mx-1 border-error-border ">Sold Out!</span> : 
                                    book?.sold
                                    }
                                </h4>
                                <h4><span>Available:</span> {book?.available}</h4>
                                <h4><span>Categories:</span> {book?.category}</h4>
                            </div>
                        </div>
                    </div>
                    <img ref={imgRef} src={book?.image} alt={book?.title} className="absolute left-0 top-0 h-full opacity-30 mx-auto z-0 rotate-90 max-md:hidden" />
                </div>
                <div className="flex flex-col gap-2"
                style={{ backgroundColor: backgroundColor !== 'rgba(0, 0, 0, 0)' ? backgroundColor : '#2222228f',
                    color: getTextContrast(cardBackgroundColor) 
                }}>
                    <h2 className="text-2xl underline font-bold max-md:text-lg">Reviews:</h2>
                    {
                        (user && !userReview) &&
                        <AddReview 
                        book={book}
                        setReviews={setReviews}
                        userReview={userReview} 
                        update={update} 
                        setUpdate={setUpdate} 
                        newReview={newReview} 
                        setNewReview={setNewReview} 
                        newRating={newRating} 
                        setNewRating={setNewRating} />
                    }
                    <div className="flex flex-col gap-2 rounded-lg [&>*]:rounded-lg max-md:text-sm">
                        {reviews.map((review, index) => (
                            <div key={index} className="flex flex-col gap-2 p-2 shadow-md rounded-lg even:bg-black odd:bg-white even:text-white odd:text-black">
                                { user && userReview && update && userReview.id === review.id ?
                                    (
                                        <AddReview
                                        book={book}
                                        setReviews={setReviews}
                                        userReview={review}
                                        update={update}
                                        setUpdate={setUpdate}
                                        newReview={newReview}
                                        setNewReview={setNewReview}
                                        newRating={newRating}
                                        setNewRating={setNewRating} />
                                        
                                    ) :
                                    (
                                        <div className="p-2">
                                            <span className="flex justify-between">
                                                <h3 className="font-bold">{`${review.user.f_name} ${review.user.l_name}`}</h3>
                                                <span className="font-bold">Rating: <span className="text-lg">{review.rating}/5</span></span>
                                            </span>
                                            <div className="p-2">
                                                <p className="border-l-2 border-gray-400 p-2">
                                                    {review.body}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="flex justify-end gap-1">
                                    { user?.id === review.id_user && 
                                            <>
                                                <button className="w-fit h-fit p-2 bg-info-background text-info-text rounded-full" onClick={() => {
                                                        setUserReview(review)
                                                        setUpdate(!update); 
                                                        setNewReview(review.body);
                                                    }}>
                                                    <TbPencil />
                                                </button>
                                                <button className="w-fit h-fit p-2 bg-error-background text-error-text rounded-full" onClick={() => handleDeleteReview(review.id)}>
                                                    <TbTrash />
                                                </button>
                                            </>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book;
