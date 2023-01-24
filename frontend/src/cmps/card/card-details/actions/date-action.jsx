import { useState } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { useSelector } from "react-redux"
import { updateCard } from "../../../../store/actions/board.action"

export function DateAction() {
  const [selectedDay, setSelectedDay] = useState(null)
  const [range, setRange] = useState(false)
  const [startEndDate, setStartEndDate] = useState({ start: null, end: null })
  const card = useSelector((storeState) => storeState.boardModule.card)

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
      console.log(`Start date: ${startTime} End date: ${endTime}`)
      // Save the start and end date to your backend or wherever you want
    } else {
      const selectedTime = selectedDay.getTime()
      card.dueDate = selectedTime
      updateCard(card)
    }
    {
      console.log("Please pick a day.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <DayPicker
        mode={range ? "range" : "single"}
        selected={range ? selectedDay : selectedDay?.to}
        onSelect={setSelectedDay}
        footer={footer}
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
