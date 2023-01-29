import { useState } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
// import './day-picker.css';

import { CgClose } from "react-icons/cg"
import { useSelector } from "react-redux"
import {
  closeActionModal,
  updateCard,
} from "../../../../store/actions/board.action"

export function DateAction({ setCard, card }) {
  const [selectedDay, setSelectedDay] = useState(null)
  const [range, setRange] = useState(false)
  const [startEndDate, setStartEndDate] = useState({ start: null, end: null })
  // const card = useSelector((storeState) => storeState.boardModule.card)

  const footer = startEndDate.start ? null : selectedDay ? ( // </p> //   End date: {new Date(startEndDate.end).toDateString()} //   <br /> //   Start date: {new Date(startEndDate.start).toDateString()} // <p>
    <p>Selected date: {new Date(selectedDay).toDateString()}</p>
  ) : (
    <p>Please pick a day.</p>
  )

  function handleChange({ target }) {
    let { checked } = target
    if (checked) {
      setRange(true)
      const prevDay = new Date(selectedDay)
      prevDay.setDate(prevDay.getDate() - 1)
      setSelectedDay({
        from: prevDay,
        to: selectedDay,
      })
      setStartEndDate({ start: prevDay, end: selectedDay })
    } else {
      setRange(false)
      setStartEndDate({ start: null, end: selectedDay })
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (startEndDate.start) {
      const startTime = startEndDate.start.getTime()
      const endTime = startEndDate.end.getTime()
      const selectedTime = { startTime, endTime }
      card.dueDate = selectedTime
      updateCard(card, "SET_DATE")

      // Save the start and end date to your backend or wherever you want
    } else {
      const selectedTime = selectedDay.getTime()
      updateCard({ ...card, dueDate: selectedTime }, "SET_DATE")
      setCard({ ...card, dueDate: selectedTime })
      closeActionModal()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-cover-header">
        <p>
          Dates
          <i onClick={closeActionModal}>
            <CgClose />
          </i>
        </p>
        <div className="sep-line"></div>
      </div>
      <DayPicker
        styles={{
          rdp: { margin: "0" },
        }}
        mode={range ? "range" : "single"}
        selected={range ? selectedDay : selectedDay?.to}
        onSelect={setSelectedDay}
        footer={footer}
        onChange={handleChange}
        showOutsideDays
      />
      <label>
        <input type="checkbox" onChange={handleChange} />
        Start date
      </label>
      <button className="blue-button" type="submit">
        Save
      </button>
    </form>
  )
}
