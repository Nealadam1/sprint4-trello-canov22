import { updateBoard } from "../store/actions/board.action";
import { asyncStorageService } from "./async-storage.service";

export function saveLabelToBoard(currLabel, board) {
    console.log('service', currLabel, "\n", board.labels);

    let editingLabel = board.labels.find(label => {
        return label.id === currLabel.id
    })

    // console.log('lklk', test);


    if (editingLabel) {
        console.log('exists')

    } else {
        console.log('dosent exists');
        // board.labels.push(currLabel)
        console.log(board.labels);
        // updateBoard(board)
    }
}