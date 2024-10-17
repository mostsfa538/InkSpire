import { useState } from "react"

import { BiSearch } from "react-icons/bi"

import Input from "./Input"
import Button from "./Button"
import { useNavigate } from "react-router-dom";

function Search({ styling }: { styling?: { icon?: string, input?: string, button?: string } }) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const navigate = useNavigate();

    const handleSearch = async (e: React.FormEvent<Element>) => {
        e.preventDefault();
        navigate(`/catalog?search=${searchTerm}`);
    };

    return (
        <form className="flex w-full items-center">
            <span className={styling?.icon}><BiSearch /></span>
            <Input type="text" defaultValue="" placeHolder="Search by book, author or category" onChange={setSearchTerm} styles={styling?.input} />
            <Button text="Search" onClick={handleSearch} styles={styling?.button} />
        </form>
    )
}

export default Search