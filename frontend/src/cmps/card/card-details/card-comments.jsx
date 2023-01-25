import React, { useState } from 'react';

import { utilService } from "../../../services/util.service"
import { cardCommentService } from '../../../services/card-comment.service';
import { RxActivityLog } from "react-icons/rx"
import { userService } from '../../../services/user.service';
import { updateCard } from '../../../store/actions/board.action';

export function CardComments({ card }) {
  const { comments } = card
  const loggedinUser = userService.getLoggedinUser()
  const [comment, setComment] = useState(cardCommentService.getEmptyComment())

  function handleSubmit(ev) {
    ev.preventDefault()
    console.log('submitting');
    cardCommentService.save(comments, comment, loggedinUser)
    setComment(cardCommentService.getEmptyComment())
    card = ({ ...card, comments: [...card.comments] })
    updateCard(card)
  }

  function handleChange({ target }) {
    const { value, name } = target
    setComment({ ...comment, [name]: value })

  }
  console.log('card', card);

  return (
    <div className="card-comments">

      <div className="card-comments-title">
        <span className="comments-icon">
          <RxActivityLog />
        </span>

        <h3>Activity</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          className='blue-input'
          placeholder="Write a comment..."
          onChange={handleChange}
          value={comment.txt}
          name="txt"
        />

        <button className="blue-button">Save</button>
      </form>

      <ul className="user-comment-section">
        {comments.map((comment, idx) => (
          <div key={comment.id} >
            <img className="member-image" src={comment.createdBy.imgUrl} alt="member" />
            <span className="user-comment-fullname">
              {comment.createdBy.fullname}
            </span>

            <span className="user-comment-sent-at">
              {utilService.formatTime(comment.createdAt)}
            </span>

            <span>

            </span>

            <li className="user-comment">{comment.txt}</li>
          </div>
        ))
        }
      </ul >

    </div >
  )
}
