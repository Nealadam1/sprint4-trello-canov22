import { utilService } from "../../../services/util.service"
export function CardComments({ comments }) {
  return (
    <div className="card-comments">
      <h3>Activity</h3>
      <ul>
        {comments.map((comment) => (
          <div>
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
