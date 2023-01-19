import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { setBoard, updateBoard } from "../../store/actions/board.action";
import { faStar as faFullStar } from "@fortawesome/free-solid-svg-icons"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { BoardMembers } from "../members/board-members";

export function BoardHeader({ board }) {
    const [boardTitle, setBoardTitle] = useState(board.title)
    const [starred, setIsStarred] = useState(board.isStarred)
    const [isEditingTitle, setIsEditingTitle] = useState(false)

    function handleTitleChange({ target }) {
        setBoardTitle(target.value)
    }

    function handleTitleSave() {
        board.title = boardTitle
        updateBoard(board)
        setBoard(board)
        setIsEditingTitle(false)
    }

    function handleIsStarred() {
        board.isStarred = !board.isStarred
        setIsStarred(board.isStarred)
        updateBoard(board)
    }

    function handleBlur(event) {
        handleTitleSave();
    }

    function handleCmpRender(event) {

    }

    return (
        <div className="board-header">
            {isEditingTitle ? (
                <>
                    <input style={{width: boardTitle.length*7}}
                        type="text"
                        value={boardTitle}
                        onChange={handleTitleChange}
                        onBlur={handleBlur}
                    />
                </>
            ) : (
                <div className="board-title" onClick={() => setIsEditingTitle(true)}>
                    {boardTitle}
                </div>
            )}
            <div className="board-actions">
                <div className="board-action-star">
                    <button onClick={handleIsStarred}>
                        <FontAwesomeIcon className="btn-icon" icon={board.isStarred ? faFullStar : faStar} />
                    </button>
                </div>
                <span className="btn-divider">|</span>
                <div className="board-action-board">
                    <button onClick={handleCmpRender}>
                        Board
                    </button>
                </div>
                <span className="btn-divider">|</span>
                <div className="board-action-dashboard">
                    <button onClick={handleCmpRender}>
                        Dashboard
                    </button>
                </div>
                <span className="btn-divider">|</span>
                <div className="board-action-filter">
                    <button onClick={handleCmpRender}>
                        Filter
                    </button>
                </div>
                <span className="btn-divider">|</span>
                <div className="board-action-members">
                    <BoardMembers />
                </div>
                <span className="btn-divider">|</span>
                <div className="board-action-menu">
                    <button onClick={handleCmpRender}>
                        Menu
                    </button>
                </div>



            </div>
        </div>
    );

}