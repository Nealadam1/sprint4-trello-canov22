import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export function CardMember({ members, card }) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [currMembers, setCurrMembers] = useState([])

  // useEffect(() => {
  //   loadMembers()
  // }, [members])

  // function loadMembers() {
  //   if (!members) return
  //   const res = board.members.filter(
  //     (member) => member._id === members.includes(member._id)
  //   )
  //   console.log(res)
  // }

  // useEffect(() => {}, [members])

  return (
    <div className="card-member">
      <h2>{members}</h2>
      <img className="member-image" src={members.imgUrl} alt="" />
    </div>
  )
}
