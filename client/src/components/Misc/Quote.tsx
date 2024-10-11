import { useEffect, useState } from "react"
import { quotes } from "../../constants/quote"

function Quote() {
    const [quote, setQuote] = useState(quotes[0])
    let index = 0;

    const changeQuote = () => {
        index = (index + 1) % quotes.length
        setQuote(quotes[index])
    }

    useEffect(() => {
        const interval = setInterval(changeQuote, 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div key={quote.author} className="flex flex-col animate-fadeInOut opacity-0">
            <q className='italic font-serif text-center'>{quote.quote}</q>
            <span className="flex justify-end">— {quote.author}</span>
        </div>
  )
}

export default Quote