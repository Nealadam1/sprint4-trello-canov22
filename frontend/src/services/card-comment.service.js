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
        commentsArr.unshift(comment)

    }
    return commentsArr
}

function remove(idx, comments) {
    return comments.splice(idx, 1)
}

function getEmptyComment() {
    return { txt: '', createdBy: { _id: "", fullname: "", imgUrl: "" } }
}