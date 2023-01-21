import { utilService } from "../../../services/util.service"
import { RxActivityLog } from "react-icons/rx"
export function CardComments({ comments }) {
  return (
    <div className="card-comments">
      <div className="card-comments-title">
        <span className="comments-icon">
          <RxActivityLog />
        </span>
        <h3>Activity</h3>
      </div>
      <ul>
        {comments.map((comment) => (
          <div key={comment.id}>
            <img
              className="member-image"
              src={comment.byMember.imgUrl}
              alt="member"
            />
            <span>{comment.byMember.fullname}</span>
            <span>{utilService.formatTime(comment.createdAt)}</span>

            <li>{comment.txt}</li>
          </div>
        ))}
      </ul>
    </div>
  )
}
