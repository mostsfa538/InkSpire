import { BiSearch } from "react-icons/bi"

import Input from "./Input"
import Button from "./Button"

function Search({ styling }: { styling?: { icon?: string, input?: string, button?: string } }) {
    const voidFunc = () => {}
    return (
        <form className="flex w-full items-center">
            <span className={styling?.icon}><BiSearch /></span>
            <Input type="text" defaultValue="" placeHolder="Search by book, author or category" onChange={voidFunc} styles={styling?.input} />
            <Button text="Search" onClick={voidFunc} styles={styling?.button} />
        </form>
    )
}

export default Search