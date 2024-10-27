import { BookType, ReviewType } from "../../types/data";
import { createReview, updateReview } from "../../features/reviews/reviews";
import { AppDispatch } from "../../features/app/store";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";

function AddReview({ 
    book, 
    setReviews, 
    userReview, 
    update, 
    setUpdate, 
    newReview, 
    setNewReview, 
    newRating, 
    setNewRating
 }: { 
    book: BookType | undefined,
    setReviews: (reviews: ReviewType[]) => void,
    userReview: ReviewType | undefined,
    update: boolean,
    setUpdate: (update: boolean) => void,
    newReview: string,
    setNewReview: (newReview: string) => void,
    newRating: number,
    setNewRating: (newRating: number) => void
    }) {
    const { user } = useAuth();
    const dispatch = useDispatch<AppDispatch>();

    const handleAddReview = async () => {

        if (!update) {
            const response = await dispatch(createReview({ userId: user!.id!, bookId: book!.id!, rating: newRating, body: newReview }));
            const newReviews = response.payload as ReviewType[];
            setReviews(newReviews);
        } else {
            const userId = user!.id!;
            const bookId = book!.id!;
            const reviewId = userReview!.id!;
            const rating = newRating === 0 ? userReview!.rating : newRating;
            const body = newReview === '' ? userReview!.body : newReview;

            if (rating === userReview!.rating && body === userReview!.body) {
                setUpdate(false);
                return;
            }

            const response = await dispatch(updateReview({ userId, bookId, reviewId, rating, body }));
            const newReviews = response.payload as ReviewType[];
            setReviews(newReviews);
        }

        setNewReview('');
        setNewRating(0);
        setUpdate(false);
    };

    return (
        <div className="flex flex-col gap-2 p-2 rounded-lg bg-primary-main text-black">
            <h3 className="font-bold">{ update ? 'Update Your Review' : 'Add a review' }:</h3>
            <div className="flex w-full gap-1">
                <textarea
                className="w-full p-2 border-2 border-gray-400 rounded-lg"
                maxLength={190} 
                defaultValue={userReview ? userReview!.body : newReview} 
                onChange={(e) => setNewReview(e.target.value)} />
                <div className="flex flex-col gap-1 items-center">
                    <input 
                    className="p-1 h-fit w-fit border-2 border-gray-400 rounded-lg"
                    type="number"
                    defaultValue={userReview ? userReview!.rating : newRating}
                    min={0}
                    max={5}
                    onChange={(e) => setNewRating(parseInt(e.target.value))} />
                    <span className="h-0.5 w-full bg-black"></span>
                    <span>5</span>
                </div>
            </div>
            <button 
            disabled={!newReview || (update && (userReview?.body === newReview && userReview?.rating === newRating))}
            onClick={() => handleAddReview()}
            className="p-2 bg-primary rounded-lg bg-black w-fit h-fit mx-auto text-white disabled:opacity-50">
                {update ? 'Update' : 'Add'}
            </button>
        </div>
    )
}

export default AddReview