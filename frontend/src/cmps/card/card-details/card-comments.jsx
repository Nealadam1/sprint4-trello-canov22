import React, { useState } from "react"

import { utilService } from "../../../services/util.service"
import { cardCommentService } from "../../../services/card-comment.service"
import { RxActivityLog } from "react-icons/rx"
import { userService } from "../../../services/user.service"
import { updateCard } from "../../../store/actions/board.action"

export function CardComments({ card }) {
  const { comments } = card
  let loggedinUser = userService.getLoggedinUser()
  const [comment, setComment] = useState(cardCommentService.getEmptyComment())
  const [editMode, setEditMode] = useState(false)
  const editClassname = editMode ? "editing" : ""
  const btnState = comment.txt.length > 0 ? "blue" : "grey"
  if (!loggedinUser) loggedinUser = userService.getGuestUser()

  function handleSubmit(ev) {
    ev.preventDefault()
    cardCommentService.save(comments, comment, loggedinUser)
    setComment(cardCommentService.getEmptyComment())
    card = { ...card, comments: [...card.comments] }
    updateCard(card)
  }

  function handleChange({ target }) {
    const { value, name } = target
    setComment({ ...comment, [name]: value })
  }

  function removeComment(idx, comments) {
    cardCommentService.remove(idx, comments)
    card = { ...card, comments: [...card.comments] }
    updateCard(card)
  }

  return (
    <div className="card-comments">
      {/* <div className="card-comments-title">
        <span className="comments-icon">
          <RxActivityLog />
        </span>

        <h3>Activity</h3>
      </div> */}

      <form onSubmit={handleSubmit} className={editClassname}>
        <textarea
          onClick={() => setEditMode(true)}
          className={"blue-input " + editClassname}
          placeholder="Write a comment..."
          onChange={handleChange}
          value={comment.txt}
          name="txt"
          required
          // onBlur={() => setEditMode(false)}
          minLength={4}
        />
        {editMode && <button className={`${btnState}-button`}>Save</button>}
      </form>

      <ul className="user-comment-section">
        {comments.map((comment, idx) => (
          <div className="comment" key={comment.id}>
            <div className="comment-content">
              <img
                className="member-image"
                src={comment?.createdBy?.imgUrl}
                alt="member"
              />

              <span className="user-comment-fullname">
                {comment.createdBy?.fullname}
              </span>
              <span className="user-comment-sent-at">
                {utilService.formatTime(comment?.createdAt)}
              </span>
            </div>

            <span></span>

            <li className="user-comment">{comment.txt}</li>

            <div className="comment-buttons">
              <button>Edit</button>
              <span>•</span>
              <button onClick={() => removeComment(idx, comments)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}
