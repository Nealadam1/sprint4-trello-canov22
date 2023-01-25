export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  saveToStorage,
  loadFromStorage,
  formatTime,
  debounce,
  darken,
  changeContrast,
  handleDragEnd,
  lightenColor,
  formatTimestamp,
  randomColor,
  randomModernColor,
}

function randomModernColor() {
  const colors = [
    "#1abc9c",
    "#16a085",
    "#2ecc71",
    "#27ae60",
    "#3498db",
    "#2980b9",
    "#9b59b6",
    "#8e44ad",
    "#34495e",
    "#2c3e50",
    "#f1c40f",
    "#f39c12",
    "#e67e22",
    "#d35400",
    "#e74c3c",
    "#c0392b",
    "#ecf0f1",
    "#bdc3c7",
    "#95a5a6",
    "#7f8c8d",
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

function randomColor() {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function makeId(length = 6) {
  var txt = ""
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function makeLorem(size = 100) {
  var words = [
    "The sky",
    "above",
    "the port",
    "was",
    "the color of television",
    "tuned",
    "to",
    "a dead channel",
    ".",
    "All",
    "this happened",
    "more or less",
    ".",
    "I",
    "had",
    "the story",
    "bit by bit",
    "from various people",
    "and",
    "as generally",
    "happens",
    "in such cases",
    "each time",
    "it",
    "was",
    "a different story",
    ".",
    "It",
    "was",
    "a pleasure",
    "to",
    "burn",
  ]
  var txt = ""
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + " "
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}

function darken(hex) {
  // Check if the hex color code is valid
  if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) return

  // Convert the hex color code to an RGB color
  let r = parseInt(hex.substring(1, 3), 16)
  let g = parseInt(hex.substring(3, 5), 16)
  let b = parseInt(hex.substring(5, 7), 16)

  // Darken the color by 30%
  r = Math.floor(r * 0.95)
  g = Math.floor(g * 0.95)
  b = Math.floor(b * 0.95)

  // Convert the RGB color back to a hex color code
  hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

  return hex
}

function changeContrast(hex) {
  // Check if the hex color code is valid
  if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) return

  // Convert the hex color code to an RGB color
  let r = parseInt(hex.substring(1, 3), 16)
  let g = parseInt(hex.substring(3, 5), 16)
  let b = parseInt(hex.substring(5, 7), 16)

  // Darken the color by 30%
  r = Math.floor(r * 1.01)
  g = Math.floor(g * 1.13)
  b = Math.floor(b * 1.13)

  // Convert the RGB color back to a hex color code
  hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

  return hex
}

function handleDragEnd(newBoard, destination, source, type) {
  const newBoardGroups = Array.from(newBoard.groups) // breaks pointer so we don't change the final object we send

  // reorder groups in the group list
  if (type === "group") {
    // relocating the group in the groups array and sends the new board with updated groups array
    newBoardGroups.splice(source.index, 1)
    newBoardGroups.splice(destination.index, 0, newBoard.groups[source.index])
    newBoard.groups = newBoardGroups
    return newBoard

    // reorder tasks across the groups
  } else if (type === "task") {
    const prevGroupIdx = newBoardGroups.findIndex(
      (group) => group.id === source.droppableId
    )
    const newGroupIdx = newBoardGroups.findIndex(
      (group) => group.id === destination.droppableId
    )
    const prevGroup = newBoardGroups[prevGroupIdx]
    const newGroup = newBoardGroups[newGroupIdx]

    // in case relocating task in the same group
    if (prevGroupIdx === newGroupIdx) {
      // in case the new task index is smaller
      if (destination.index < source.index) {
        newGroup.tasks.splice(
          destination.index,
          0,
          newBoard.groups[prevGroupIdx].tasks[source.index]
        )
        prevGroup.tasks.splice(source.index + 1, 1)

        // in case the new task index is bigger
      } else {
        newGroup.tasks.splice(
          destination.index + 1,
          0,
          newBoard.groups[prevGroupIdx].tasks[source.index]
        )
        prevGroup.tasks.splice(source.index, 1)
      }
      // in case new task location is on different group
    } else {
      newGroup.tasks.splice(
        destination.index,
        0,
        newBoard.groups[prevGroupIdx].tasks[source.index]
      )
      prevGroup.tasks.splice(source.index, 1)
    }

    newBoard.groups[newGroupIdx] = newGroup
    newBoard.groups[prevGroupIdx] = prevGroup
    return newBoard
  }
}

function formatTime(sentAt) {
  const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "auto",
  })

  const DIVISIONS = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ]

  let duration = (sentAt - new Date()) / 1000

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division = DIVISIONS[i]
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name)
    }
    duration /= division.amount
  }
}

function lightenColor(color) {
  let colorInt
  if (color.startsWith("#")) {
    colorInt = parseInt(color.substring(1), 16)
  } else if (color.startsWith("rgb")) {
    colorInt = parseInt(
      color
        .substring(4, color.length - 1)
        .split(",")
        .join(""),
      16
    )
  } else {
    console.log("Invalid color format. Please use either RGB or Hex format.")
    return
  }
  let r = (colorInt >> 16) + 70
  if (r > 255) {
    r = 255
  }
  let b = ((colorInt >> 8) & 0x00ff) + 70
  if (b > 255) {
    b = 255
  }
  let g = (colorInt & 0x0000ff) + 70
  if (g > 255) {
    g = 255
  }
  return "#" + (g | (b << 8) | (r << 16)).toString(16)
}

function formatTimestamp(timestamp) {
  var date = new Date(timestamp)
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  var month = months[date.getMonth()]
  var day = date.getDate()
  var formattedTime = day + " " + month
  return formattedTime
}
