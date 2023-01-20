import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export function CardMember({ members, card }) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [currMembers, setCurrMembers] = useState([])

  useEffect(() => {
    loadMembers()
  }, [members])

  function loadMembers() {
    if (!members) return
    let cardMembers = board.members.filter((member) =>
      members.includes(member._id)
    )
    setCurrMembers(cardMembers)
  }
  return (
    <div className="card-member">
      {currMembers.map((member) => (
        <img key={member._id} className="member-image" src={member.imgUrl} />
      ))}
    </div>
  )
}
