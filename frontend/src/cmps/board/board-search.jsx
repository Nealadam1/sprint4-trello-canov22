import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { boardService } from "../../services/board.service";
import { utilService } from "../../services/util.service";

export function BoardSearch({ onSetSearch }) {
    const [search, SetSearch] = useState('')

    onSetSearch = useRef(utilService.debounce(onSetSearch))

    useEffect(() => {
        onSetSearch.current(search)
    }, [search])

    function handleChange({ target }) {
        let { value } = target
        SetSearch(value)
    }

    return (
        <section className="board-search">
            <form>
                <label htmlFor="search">Search</label>
                <input type="text" name="search" id="search"
                placeholder="Search Boards"
                value={search}
                onChange={handleChange} />
            </form>
        </section>
    )

}