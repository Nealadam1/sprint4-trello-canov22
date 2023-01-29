import React from "react"
import { setBoard, updateBoard } from "../../../store/actions/board.action";
export function BoardColors({ board }) {
    let colors = ['#B7DDB0', '#F5EA92', '#FAD29C', '#7BC86C', '#F5DD29', '#FFAF3F', '#EF7564', '#CD8DE5', '#5AAC44', '#E6C60D', '#E79217', '#CF513D', '#A86CC1', '#8BBDD9', '#8FDFEB', '#172b4d', '#F9C2E4', '#505F79', '#5BA4CF', '#29CCE5', '#6DECA9', '#FF8ED4']
    
    function setBoardColor(color) {
        board = ({ ...board, style: { backgroundColor: color } })
        setBoard(board)
        updateBoard(board)
        // if (board?.attachments[0]?.imgUrl) {
        //     board.style = { bgColor: "#fffff" }
        //     return {
        //         backgroundImage: board?.attachments
        //             ? `url(${board?.attachments[0]?.imgUrl})`
        //             : "fff",
        //         objectFit: "fill",
        //         width: "100%",
        //         backgroundRepeat: "no-repeat",
        //         backgroundPosition: "center",
        //         height: "100px",
        //     }
        // } else if (board?.attachments[0]?.link) {
        //     board.style = { bgColor: "#fff" }
        //     return {
        //         backgroundImage: board?.attachments
        //             ? `url(${board?.attachments[0]?.link})`
        //             : "fff",
        //         objectFit: "fill",
        //         width: "100%",
        //         backgroundRepeat: "no-repeat",
        //         backgroundPosition: "center",
        //         height: "100px",
        //     }
        // } else if (board?.style?.bgColor) {
        //     return {
        //         background: board?.style ? board?.style?.bgColor : "fff",
        //         borderRadius: "3px 3px 0 0",
        //     }
        // }
        // imgURL >> LINK >>> COLOR
    }

    return <div className="colors">
        {colors.map(color => {
            return <div className="color" key={color} style={{ backgroundColor: color }} onClick={() => setBoardColor(color)}></div>
        })}
    </div>
}