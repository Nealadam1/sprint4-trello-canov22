export function MemberPreview({ members }) {
    return (
        <div className="member-images">
            {members.map((member) => (
                <img className="member-image" alt="" src={member.imgUrl} />
            ))}
        </div>
    )

}