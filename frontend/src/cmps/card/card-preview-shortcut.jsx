import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { LabelPreview } from "./card-preview/label-preview"
import { MemberPreview } from "./card-preview/member-preview"
import { IoMdCheckboxOutline } from "react-icons/io"
import { Draggable } from "react-beautiful-dnd"
import { useRef } from "react"

export function CardPreviewShortcut({ card, title, setTitle }) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [currMembers, setCurrMembers] = useState([])
  const inputRefShortcutTitle = useRef(null)

  useEffect(() => {
    if (inputRefShortcutTitle) {
      inputRefShortcutTitle.current.focus()
    }
  }, [inputRefShortcutTitle])

  useEffect(() => {
    loadMembers()
  }, [card.memberIds])

  function loadMembers() {
    if (!card.memberIds) return
    let cardMembers = board.members.filter((member) =>
      card.memberIds.includes(member._id)
    )
    setCurrMembers(cardMembers)
  }

  function completedTodos(checklists) {
    let completed = 0
    checklists.forEach((checklist) => {
      completed += checklist.todos.filter((todo) => todo.isDone).length
    })
    return completed
  }

  function totalTodos(checklists) {
    let total = 0
    checklists.forEach((checklist) => {
      total += checklist.todos.length
    })
    return total
  }

  function handleChange({ target }) {
    setTitle(target.value)
  }

  return (
    <div className="card-preview" >
      {card?.style?.bgColor ? (
        <header
          className="card-header"
          style={{ backgroundColor: card.style.bgColor }}
        ></header>
      ) : null}
      <div className="card-info">
        {card?.labelIds && <LabelPreview labels={card.labelIds} />}
        <p>
          <textarea
            className="card-title-input"
            type="text"
            ref={inputRefShortcutTitle}
            value={title}
            onChange={handleChange}
          />
        </p>
        {card?.checklist ||
          (card?.memberIds && (
            <div className="card-details-preview">
              {card.checklists ? (
                <div className="card-checklist">
                  {totalTodos(card.checklists) > 0 && (
                    <span className="todo-checkbox-preview">
                      <IoMdCheckboxOutline />
                    </span>
                  )}
                  <span className="todos-preview">
                    {totalTodos(card.checklists) > 0 && (
                      <span>
                        {completedTodos(card.checklists)}/
                        {totalTodos(card.checklists)}
                      </span>
                    )}
                  </span>
                </div>
              ) : null}
              <MemberPreview card={card} members={currMembers} />
            </div>
          ))}
      </div>
    </div>
  )
}
