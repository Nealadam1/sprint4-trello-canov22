import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadBoards } from "../../store/actions/board.action";
export function StarredBoards() {
    const boards = useSelector((storeState) => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards()
    }, [])

    const filteredBoards = boards.filter(board => board.isStarred === true)

    return (
        <ul className="board-starred-list">
            {filteredBoards.map(board => (
                <li className="board-starred-item" key={board._id}>
                    <Link className="board-starred-item-preview" to={`/board/${board._id}`}>
                        <div
                            style={{
                                background: `${board.style.thumbnail
                                    ? `url(${board.style.thumbnail})`
                                    : `${board.style.backgroundColor}`
                                    }`,
                            }}>
                        </div>
                        <p>{board.title}</p>
                    </Link>
                </li>
            ))}
        </ul>
    )

}