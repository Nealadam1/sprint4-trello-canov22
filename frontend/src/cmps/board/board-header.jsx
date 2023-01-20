import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { OpenActionModal, setBoard, updateBoard } from "../../store/actions/board.action";
import { faStar as faFullStar } from "@fortawesome/free-solid-svg-icons"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { BoardMembers } from "../members/board-members";
import { DynamicActionModal } from "../dynamic-modal-cmp";
import { useSelector } from "react-redux";

export function BoardHeader({ board }) {
    const [boardTitle, setBoardTitle] = useState(board.title)
    const [starred, setIsStarred] = useState(board.isStarred)
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const isActionModal = useSelector((storeState) => storeState.systemModule.isActionModal)
    const dynmOpenModal = !isActionModal ? (ev)=>OpenActionModal(ev,'board-filter') : null
    const buttonRef = useRef(null)

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

    function handleBlur(ev) {
        if (!ev.target.value) {
            ev.preventDefault()
            return
        } else {
            handleTitleSave()
        }
    }

    function handleCmpRender(event) {

    }

    return (
        <div className="board-header">
            {isEditingTitle ? (
                <>
                    <input style={{ width: 50 + boardTitle.length * 5 }}
                        type="text"
                        value={boardTitle}
                        onChange={handleTitleChange}
                        onBlur={handleBlur}
                        required
                    />
                </>
            ) : (
                <div className="board-title" onClick={() => setIsEditingTitle(true)}>
                    {boardTitle}
                </div>
            )}
            <div className="board-actions">

                <div className="align-left">
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
                </div>

                <div className="align-right">
                    <div className="board-action-filter">
                        <button ref={buttonRef} onClick={dynmOpenModal}>
                            Filter
                            {isActionModal && <DynamicActionModal
                                buttonRef={buttonRef.current}
                                type={"board-filter"} />
                            }
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
        </div>
    );

}