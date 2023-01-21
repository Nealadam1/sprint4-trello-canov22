import { updateBoard } from "../store/actions/board.action";
import { asyncStorageService } from "./async-storage.service";

export function saveLabelToBoard(currLabel, board) {
    console.log('service', currLabel, "\n", board);


    if (board.labels.includes(currLabel.id)) {
        console.log('exists')
    } else {
        console.log('dosent exists');
        board.labels.push(currLabel)
        console.log(board.labels);
        updateBoard(board)
    }

    // board.labels.map(label => {

    //     if (currLabel.id === label.id) {
    //         console.log('label exists', label);

    //     } else {
    //         console.log('new label', currLabel);

    //     }
    // })
    // console.log(board.labels);
}