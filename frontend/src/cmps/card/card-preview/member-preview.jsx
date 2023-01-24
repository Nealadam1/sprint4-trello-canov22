export function MemberPreview({ members }) {
  console.log(members)
  return (
    <div className="member-images">
      {members.map((member, idx) => (
        <img key={idx} className="member-image" alt="" src={member.imgUrl} />
      ))}
    </div>
  )
}
