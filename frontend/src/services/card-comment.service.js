import { utilService } from "./util.service"

export const cardCommentService = {
    getEmptyComment,
    save,
    remove
}

function save(commentsArr, comment, loggedinUser) {
    if (comment.id) {

    } else {
        comment.id = utilService.makeId()
        comment.createdBy = loggedinUser
        comment.createdAt = Date.now()
        console.log(comment);
        commentsArr.push(comment)

    }
    return commentsArr
}

function remove(commentId, idx) {

}

function getEmptyComment() {
    return { txt: '', createdBy: { _id: "", fullname: "", imgUrl: "" } }
}