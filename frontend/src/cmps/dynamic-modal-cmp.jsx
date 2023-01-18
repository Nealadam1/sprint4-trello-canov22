import { CreateBoard } from "./board/board-create";

export function DynamicActionModal(props) {
    
    switch (props.type) {
        case 'note-txt':
            return <CreateBoard {...props} />
       
    }
}