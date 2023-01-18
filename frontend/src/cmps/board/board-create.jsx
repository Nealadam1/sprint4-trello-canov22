import { useState } from "react";
import { boardService } from "../../services/board.service";

export function CreateBoard() {
    [newBoard, setNewBoard] = useState(boardService.getEmptyBoard())
    [boardPreview] = useState(newboard.style.background)

    return (
        <section className="create-board">
            <h2>Create Board</h2>
            <div className="create-board-preview">
                <div className="background-preview" style={{backgroundColor: newboard.stlye.background}}>
                    <img src="../../assets/img/board-preview-skeleton.svg" alt="" />
                </div>
            </div>
        </section>
    )




}