import { asyncStorageService } from "./async-storage.service.js"
import { httpService } from "./http.service.js"
import { utilService } from "./util.service.js"

const STORAGE_BOARD_KEY = "boardDB"

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  getDefaultSearch,
  createCard,
  createGroup,
  getEmptyLabel,
  createActivitie,
}
window.cs = boardService

_createDemoData()

async function query(searchBy) {
  // var boards = await asyncStorageService.query(STORAGE_BOARD_KEY)
  var boards = await httpService.get("board")
  let searchedBoards = boards
  if (searchBy) {
    const regex = new RegExp(searchBy, "i")
    searchedBoards = searchedBoards.filter((board) => regex.test(board.title))
  }
  return searchedBoards
}

// async function filterBoard(board, filterBy) {
//   if (!filterBy) return { ...board }
//   const regex = new RegExp(filterBy, "i")
//   const updatedBoard = { ...board }

//   // updatedBoard.groups = board.groups.filter((group) => regex.test(group.title))
//   // return updatedBoard
// }

function getDefaultFilter() {
  return { title: "" }
}

async function getById(boardId) {
  // let board = await httpService.get(`board/${boardId}`)
  // console.log(board);
  // return httpService.get('board/' + boardId)
  // return asyncStorageService.get(STORAGE_BOARD_KEY, boardId)
  try {
    const board = await httpService.get("board/" + boardId)
    return board
  } catch (err) {
    console.log("Had an issue with getting board")
  }
}

async function remove(boardId) {
  // throw new Error('Nope')
  // await asyncStorageService.remove(STORAGE_BOARD_KEY, boardId)
  await httpService.delete(`board/${boardId}`)
}

async function save(board) {
  var savedBoard
  if (board._id) {
    // savedBoard = await asyncStorageService.put(STORAGE_BOARD_KEY, board)
    savedBoard = await httpService.put(`board/${board._id}`, board)
    console.log('savedboard', savedBoard);
  } else {
    // Later, owner is set by the backend
    // board.owner = userService.getLoggedinUser()
    // savedBoard = await httpService.post("board", board)
    // savedBoard = await asyncStorageService.post(STORAGE_BOARD_KEY, board)
    savedBoard = await httpService.post(`board`, board)
  }
  return savedBoard
}

function createActivitie(text, fullname, data, userImage) {
  console.log(text, fullname, data)
  return {
    text,
    fullname,
    createdAt: Date.now(),
    data,
    id: utilService.makeId(),
    userImage,
  }
}

function getEmptyBoard() {
  return {
    title: "",
    isStarred: false,
    archivedAt: "",
    createdBy: { id: "", fullname: "", imgUrl: "" },
    style: {},
    labels: [
      { id: utilService.makeId(), title: "", color: "#7BC86C" },
      { id: utilService.makeId(), title: "", color: "#F5DD29" },
      { id: utilService.makeId(), title: "", color: "#DFE1E6" },
      { id: utilService.makeId(), title: "", color: "#EF7564" },
    ],
    members: [],
    groups: [],
    activities: [],
  }
}

function getEmptyLabel() {
  return {
    id: utilService.makeId(),
    title: "",
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
  }
}

function createCard({ title, description, style, archivedAt }) {
  return {
    title,
    description,
    style,
    id: utilService.makeId(),
    checklists: [],
    labelIds: [],
    archivedAt: "",
    attachments: [],
    comments: []
  }
}

function createGroup({ title }) {
  return { title, id: utilService.makeId(), archivedAt: "", cards: [] }
}

function getDefaultSearch() {
  return { title: "" }
}

// -------------------------------- Demo data --------------------------------

function _createDemoData() {
  let demoData = utilService.loadFromStorage(STORAGE_BOARD_KEY)
  if (!demoData) {
    demoData = [
      {
        _id: "b101",
        title: "October Sprint",
        isStarred: false,
        archivedAt: 1674334960747,
        createdBy: {
          _id: "u101",
          fullname: "Liron Kurchi",
          imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
        },
        style: {
          backgroundColor: "#FFD700",
          thumbnail:
            "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
          img: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
        },
        labels: [
          {
            id: "l101",
            title: "Done",
            color: "#7BC86C",
          },
          {
            id: "l102",
            title: "QA",
            color: "#F5DD29",
          },
          {
            id: "l103",
            title: "In Dev",
            color: "#DFE1E6",
          },
          {
            id: "l104",
            title: "Important",
            color: "#EF7564",
          },
          {
            id: "l105",
            title: "Production Ready",
            color: "#BCD9EA",
          },
        ],
        members: [
          {
            _id: "u101",
            fullname: "Neal Adam",
            imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
          },
          {
            _id: "u102",
            fullname: "Liron Kruchinin",
            imgUrl:
              "https://preview.redd.it/hbkyobublbh61.jpg?auto=webp&s=d309aa476f34e040f9cafb2bf44968f8010b40a0",
          },
          {
            _id: "u103",
            fullname: "Gilad Dagan",
            imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
          },
        ],
        groups: [
          {
            id: "g101",
            title: "Backlog-Client",
            archivedAt: "",
            cards: [
              {
                id: "c101",
                title: "Crud",
                labelIds: ["l104"],
                style: {},
              },
              {
                id: "c102",
                title: "Home Page",
                style: {},
              },
              {
                id: "c103",
                title: "Data model aproval",
                style: {},
              },
              {
                id: "c104",
                title: "Socket implement",
                style: {},
                labelIds: ["l104"],
                memberIds: ["u101", "u102"],
                checklists: [
                  {
                    id: "YEhmF",
                    title: "Checklist",
                    todos: [
                      {
                        id: "2122jX",
                        title: "Socket 1",
                        isDone: false,
                      },
                      {
                        id: "21241jX",
                        title: "Socket 2",
                        isDone: false,
                      },
                      {
                        id: "2125215jX",
                        title: "Socket 3",
                        isDone: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: "c105",
                title: "Home Page",
                style: {},
                attachments: [
                  {
                    id: "teat22",
                    attachUrl: "https://picsum.photos/200/300",
                  },
                ],
              },
            ],
            style: {},
          },
          {
            id: "g102",
            title: "Backlog-Server",
            cards: [
              {
                id: "c106",
                title: "Create backend services",
                archivedAt: "",
              },
              {
                id: "c107",
                title: "",
                description: "description",
                attachments: [
                  {
                    id: "tesat22",
                    attachUrl: "https://www.npmjs.com/package/socket.io-client",
                  },
                ],
                comments: [
                  {
                    id: "ZdPnm",
                    txt: "please CR this",
                    createdAt: 1590999817436,
                    byMember: {
                      _id: "u101",
                      fullname: "Liron Kruchinin",
                      imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
                    },
                  },
                ],
                checklists: [
                  {
                    id: "YEhmF",
                    title: "Checklist",
                    todos: [
                      {
                        id: "212jX",
                        title: "Installing",
                        isDone: true,
                      },
                      {
                        id: "21211jX",
                        title: "Requiring",
                        isDone: true,
                      },
                      {
                        id: "Using",
                        title: "Using",
                        isDone: false,
                      },
                    ],
                  },
                ],
                memberIds: ["u103"],
                labelIds: ["l101", "l102"],
                dueDate: 16156215211,
                byMember: {
                  _id: "u101",
                  username: "Tal",
                  fullname: "Tal Tarablus",
                  imgUrl:
                    "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
                },
                style: { bgColor: "#26de81" },
              },
              {
                id: "c108",
                title: "Template for Mongo",
                description: "description",
                attachments: [
                  {
                    id: "tesat22",
                    attachUrl: "https://www.npmjs.com/package/socket.io-client",
                  },
                ],
                comments: [
                  {
                    id: "ZdPnm",
                    txt: "please CR this",
                    createdAt: 1590999817436,
                    byMember: {
                      _id: "u101",
                      fullname: "Liron Kruchinin",
                      imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
                    },
                  },
                ],
                checklists: [
                  {
                    id: "YEhmF",
                    title: "Checklist",
                    todos: [
                      {
                        id: "212jX",
                        title: "Installing",
                        isDone: true,
                      },
                      {
                        id: "21211jX",
                        title: "Requiring",
                        isDone: true,
                      },
                      {
                        id: "Using",
                        title: "To Do 1",
                        isDone: false,
                      },
                    ],
                  },
                ],
                memberIds: ["u103"],
                labelIds: ["l101", "l102"],
                dueDate: 16156215211,
                byMember: {
                  _id: "u101",
                  fullname: "Neal Adam",
                  imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
                },
                style: { bgColor: "#26de81" },
              },
            ],
            style: {},
          },
        ],
        activities: [
          {
            id: "a101",
            txt: "Changed Color",
            createdAt: 154514,
            byMember: {
              _id: "u101",
              fullname: "Neal Adam",
              imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
            },
            card: {
              id: "c101",
              title: "Replace Logo",
            },
          },
        ],
        cmpsOrder: ["status-picker", "member-picker", "date-picker"],
      },
      {
        _id: "b102",
        title: "Week Planning",
        isStarred: true,
        archivedAt: "",
        createdBy: {
          _id: "u101",
          fullname: "Liron Kurchi",
          imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
        },
        style: {
          backgroundColor: "#FFD700",
          thumbnail:
            "https://images.unsplash.com/photo-1549444931-ea94960d38ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
          img: "https://images.unsplash.com/photo-1549444931-ea94960d38ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80",
        },
        labels: [
          {
            id: "l101",
            title: "Done",
            color: "#7BC86C",
          },
          {
            id: "l102",
            title: "QA",
            color: "#F5DD29",
          },
          {
            id: "l103",
            title: "In Dev",
            color: "#DFE1E6",
          },
          {
            id: "l104",
            title: "Important",
            color: "#EF7564",
          },
          {
            id: "l105",
            title: "Production Ready",
            color: "#BCD9EA",
          },
        ],
        members: [
          {
            _id: "u101",
            fullname: "Neal Adam",
            imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
          },
          {
            _id: "u102",
            fullname: "Liron Kruchinin",
            imgUrl:
              "https://preview.redd.it/hbkyobublbh61.jpg?auto=webp&s=d309aa476f34e040f9cafb2bf44968f8010b40a0",
          },
          {
            _id: "u103",
            fullname: "Gilad Dagan",
            imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
          },
        ],
        groups: [
          {
            id: "g101",
            title: "Backlog-Client",
            archivedAt: "",
            cards: [
              {
                id: "c101",
                title: "Crud",
                style: {},
                labelIds: ["l104"],
              },
              {
                id: "c102",
                title: "Home Page",
                style: {},
              },
              {
                id: "c103",
                title: "Data model aproval",
                style: {},
              },
              {
                id: "c104",
                title: "Socket implement",
                style: {},
                labelIds: ["l104"],
                memberIds: ["u101", "u102"],
                checklists: [
                  {
                    id: "YEhmF",
                    title: "Checklist",
                    todos: [
                      {
                        id: "2122jX",
                        title: "Socket 1",
                        isDone: false,
                      },
                      {
                        id: "21241jX",
                        title: "Socket 2",
                        isDone: false,
                      },
                      {
                        id: "2125215jX",
                        title: "Socket 3",
                        isDone: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: "c105",
                title: "Home Page",
                style: {},
                attachments: [
                  {
                    id: "teat22",
                    attachUrl: "https://picsum.photos/200/300",
                  },
                ],
              },
            ],
            style: {},
          },
          {
            id: "g102",
            title: "Backlog-Server",
            cards: [
              {
                id: "c106",
                title: "Create backend services",
                style: {},
                archivedAt: "",
              },
              {
                id: "c107",
                title: "",
                description: "description",
                attachments: [
                  {
                    id: "tesat22",
                    attachUrl: "https://www.npmjs.com/package/socket.io-client",
                  },
                ],
                comments: [
                  {
                    id: "ZdPnm",
                    txt: "please CR this",
                    createdAt: 1590999817436,
                    byMember: {
                      _id: "u101",
                      fullname: "Liron Kruchinin",
                      imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
                    },
                  },
                ],
                checklists: [
                  {
                    id: "YEhmF",
                    title: "Checklist",
                    todos: [
                      {
                        id: "212jX",
                        title: "Installing",
                        isDone: true,
                      },
                      {
                        id: "21211jX",
                        title: "Requiring",
                        isDone: true,
                      },
                      {
                        id: "Using",
                        title: "Using",
                        isDone: false,
                      },
                    ],
                  },
                ],
                memberIds: ["u103"],
                labelIds: ["l101", "l102"],
                dueDate: 16156215211,
                byMember: {
                  _id: "u101",
                  username: "Tal",
                  fullname: "Tal Tarablus",
                  imgUrl:
                    "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
                },
                style: { bgColor: "#26de81" },
              },
              {
                id: "c108",
                title: "Template for Mongo",
                description: "description",
                attachments: [
                  {
                    id: "tesat22",
                    attachUrl: "https://www.npmjs.com/package/socket.io-client",
                  },
                ],
                comments: [
                  {
                    id: "ZdPnm",
                    txt: "please CR this",
                    createdAt: 1590999817436,
                    byMember: {
                      _id: "u101",
                      fullname: "Liron Kruchinin",
                      imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
                    },
                  },
                ],
                checklists: [
                  {
                    id: "YEhmF",
                    title: "Checklist",
                    todos: [
                      {
                        id: "212jX",
                        title: "Installing",
                        isDone: true,
                      },
                      {
                        id: "21211jX",
                        title: "Requiring",
                        isDone: true,
                      },
                      {
                        id: "Using",
                        title: "To Do 1",
                        isDone: false,
                      },
                    ],
                  },
                ],
                memberIds: ["u103"],
                labelIds: ["l101", "l102"],
                dueDate: 16156215211,
                byMember: {
                  _id: "u101",
                  fullname: "Neal Adam",
                  imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
                },
                style: { bgColor: "#26de81" },
              },
            ],
            style: {},
          },
        ],
        activities: [
          {
            id: "a101",
            txt: "Changed Color",
            createdAt: 154514,
            byMember: {
              _id: "u101",
              fullname: "Neal Adam",
              imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
            },
            card: {
              id: "c101",
              title: "Replace Logo",
            },
          },
        ],
        cmpsOrder: ["status-picker", "member-picker", "date-picker"],
      },
      {
        title: "Weekend goals",
        isStarred: false,
        archivedAt: 1674334958358,
        createdBy: {
          id: "",
          fullname: "",
          imgUrl: "",
        },
        style: {
          backgroundColor: "#B7F4E0",
          img: "https://images.unsplash.com/photo-1530968033775-2c92736b131e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80",
          thumbnail:
            "https://images.unsplash.com/photo-1530968033775-2c92736b131e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        },
        labels: [
          {
            id: "lRESNT",
            title: "",
            color: "#7BC86C",
          },
          {
            id: "sFnzyF",
            title: "",
            color: "#F5DD29",
          },
          {
            id: "AM2IGn",
            title: "",
            color: "#DFE1E6",
          },
          {
            id: "bNSglz",
            title: "",
            color: "#EF7564",
          },
          {
            id: "MXerzF",
            title: "Expensive",
            color: "#a272aa",
          },
        ],
        members: [],
        groups: [
          {
            title: "Lookup Hotels",
            id: "cYvm2H",
            archivedAt: "",
            card: [],
            cards: [
              {
                title: "Check Prices",
                description: "Compare prices between local hotels",
                style: { bgColor: "#00d084" },
                id: "piSWNg",
                labelIds: [],
              },
            ],
          },
        ],
        activities: [],
        _id: "4bIh7",
      },
      {
        title: "Vacation Plans",
        isStarred: true,
        archivedAt: "",

        createdBy: {
          id: "",
          fullname: "",
          imgUrl: "",
        },
        style: {
          backgroundColor: "#011831",
          img: "https://images.unsplash.com/photo-1673842450064-e9a1197e1a66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80",
          thumbnail:
            "https://images.unsplash.com/photo-1673842450064-e9a1197e1a66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        },
        labels: [
          {
            id: "BWgsnV",
            title: "Good",
            color: "#7BC86C",
          },
          {
            id: "E4u0oF",
            title: "",
            color: "#F5DD29",
          },
          {
            id: "H7DIPu",
            title: "",
            color: "#DFE1E6",
          },
          {
            id: "X8vKSF",
            title: "",
            color: "#EF7564",
          },
        ],
        members: [
          {
            _id: "u101",
            fullname: "Neal Adam",
            imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
          },
          {
            _id: "u102",
            fullname: "Liron Kruchinin",
            imgUrl:
              "https://preview.redd.it/hbkyobublbh61.jpg?auto=webp&s=d309aa476f34e040f9cafb2bf44968f8010b40a0",
          },
          {
            _id: "u103",
            fullname: "Gilad Dagan",
            imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
          },
        ],
        groups: [
          {
            title: "Check Flights",
            id: "9ycgGJ",
            archivedAt: "",
            card: [],
            cards: [
              {
                title: "Paris",
                description: "good flight to paris",
                style: { bgColor: "#8ed1fc" },
                id: "jaFiFh",
                checklists: [
                  {
                    id: "LgE3Co",
                    title: "Prices",
                    todos: [
                      {
                        title: "500$",
                        isDone: false,
                        id: "2NwYgA",
                      },
                      {
                        title: "600$ elal",
                        isDone: false,
                        id: "Rn7gL2",
                      },
                      {
                        title: "700$",
                        isDone: true,
                        id: "BMD0m5",
                      },
                    ],
                  },
                ],
                labelIds: ["DeLR1w"],
              },
            ],
          },
          {
            title: "Good Flights",
            id: "ErggV7",
            archivedAt: "",
            card: [],
            cards: [
              {
                title: "Singapore",
                description: "Great location cheap flights",
                style: { bgColor: "#0693e3" },
                id: "i8plo6",
                checklists: [],
                labelIds: ["i70q2h"],
              },
              {
                title: "italy",
                description: "",
                style: { bgColor: "#00d084" },
                id: "M9CgFz",
                checklists: [
                  {
                    id: "SnvG51",
                    title: "pros",
                    todos: [
                      {
                        title: "close ",
                        isDone: false,
                        id: "Va4CqB",
                      },
                    ],
                  },
                  {
                    id: "V7ULTt",
                    title: "cons",
                    todos: [
                      {
                        title: "boring",
                        isDone: true,
                        id: "9RGtDu",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        activities: [],
        _id: "b2A5O",
      },
      {
        title: "Office Meetings",
        isStarred: true,
        archivedAt: "",
        createdBy: {
          id: "",
          fullname: "",
          imgUrl: "",
        },
        style: {
          backgroundColor: "#F2BF0C",
          img: "https://images.unsplash.com/photo-1510007552638-e1c0c4c67ee0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80",
          thumbnail:
            "https://images.unsplash.com/photo-1510007552638-e1c0c4c67ee0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        },
        labels: [
          {
            id: "swJAhD",
            title: "",
            color: "#7BC86C",
          },
          {
            id: "OGSYOZ",
            title: "",
            color: "#F5DD29",
          },
          {
            id: "XrQDlb",
            title: "",
            color: "#DFE1E6",
          },
          {
            id: "ME1RDd",
            title: "",
            color: "#EF7564",
          },
        ],
        members: [
          {
            _id: "u101",
            fullname: "Neal Adam",
            imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
          },
          {
            _id: "u102",
            fullname: "Liron Kruchinin",
            imgUrl:
              "https://preview.redd.it/hbkyobublbh61.jpg?auto=webp&s=d309aa476f34e040f9cafb2bf44968f8010b40a0",
          },
          {
            _id: "u103",
            fullname: "Gilad Dagan",
            imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
          },
        ],
        groups: [
          {
            title: "everyday launch",
            id: "xSTUDm",
            archivedAt: "",
            card: [],
            cards: [
              {
                title: "lunch with dina",
                description: "",
                style: {},
                id: "5dNKlE",
                checklists: [],
              },
              {
                title: "Launch with kobi on monday",
                description: "",
                style: { bgColor: "#fcb900" },
                id: "aV2DHd",
                checklists: [],
              },
            ],
          },
          {
            title: "Imporent meetings",
            id: "E0SLwL",
            archivedAt: "",
            card: [],
            cards: [
              {
                title: "CEO MEETING",
                description: "",
                style: {},
                id: "aPDoGN",
                checklists: [],
              },
              {
                title: "New boss intro at 13:00",
                description: "",
                style: { bgColor: "#eb144c" },
                id: "lJ5Emy",
                checklists: [],
              },
            ],
          },
        ],
        activities: [],
        _id: "OivY0",
      },
      {
        title: "House Chores",
        isStarred: false,
        archivedAt: "",
        createdBy: {
          id: "",
          fullname: "",
          imgUrl: "",
        },
        style: { backgroundColor: "#7bdcb5" },
        labels: [
          {
            id: "C5Wa1M",
            title: "",
            color: "#7BC86C",
          },
          {
            id: "YekDVq",
            title: "",
            color: "#F5DD29",
          },
          {
            id: "RMvCto",
            title: "",
            color: "#DFE1E6",
          },
          {
            id: "IPmVgs",
            title: "",
            color: "#EF7564",
          },
        ],
        members: [
          {
            _id: "u101",
            fullname: "Neal Adam",
            imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
          },
          {
            _id: "u102",
            fullname: "Liron Kruchinin",
            imgUrl:
              "https://preview.redd.it/hbkyobublbh61.jpg?auto=webp&s=d309aa476f34e040f9cafb2bf44968f8010b40a0",
          },
          {
            _id: "u103",
            fullname: "Gilad Dagan",
            imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
          },
        ],
        groups: [],
        activities: [],
        _id: "pAWeg",
      },
      {
        title: "New Store project",
        isStarred: false,
        archivedAt: "",
        createdBy: {
          id: "",
          fullname: "",
          imgUrl: "",
        },
        style: {
          backgroundColor: "#25D9F5",
          img: "https://images.unsplash.com/photo-1673050460660-2bd7b3bb25a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
          thumbnail:
            "https://images.unsplash.com/photo-1673050460660-2bd7b3bb25a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        },
        labels: [
          {
            id: "R8JKWN",
            title: "",
            color: "#7BC86C",
          },
          {
            id: "eGzKKu",
            title: "",
            color: "#F5DD29",
          },
          {
            id: "HQwjGR",
            title: "",
            color: "#DFE1E6",
          },
          {
            id: "XhaZxH",
            title: "",
            color: "#EF7564",
          },
        ],
        members: [
          {
            _id: "u101",
            fullname: "Neal Adam",
            imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
          },
          {
            _id: "u102",
            fullname: "Liron Kruchinin",
            imgUrl:
              "https://preview.redd.it/hbkyobublbh61.jpg?auto=webp&s=d309aa476f34e040f9cafb2bf44968f8010b40a0",
          },
          {
            _id: "u103",
            fullname: "Gilad Dagan",
            imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
          },
        ],
        groups: [],
        activities: [],
        _id: "IeR8q",
      },
      {
        title: "House Project",
        isStarred: false,
        archivedAt: "",
        createdBy: {
          id: "",
          fullname: "",
          imgUrl: "",
        },
        style: {
          backgroundColor: "#B7F4E0",
          img: "https://images.unsplash.com/photo-1530968033775-2c92736b131e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80",
          thumbnail:
            "https://images.unsplash.com/photo-1530968033775-2c92736b131e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        },
        labels: [
          {
            id: "lCG2FJ",
            title: "",
            color: "#7BC86C",
          },
          {
            id: "MsFHHS",
            title: "",
            color: "#F5DD29",
          },
          {
            id: "kapByg",
            title: "",
            color: "#DFE1E6",
          },
          {
            id: "0y5IyK",
            title: "",
            color: "#EF7564",
          },
        ],
        members: [
          {
            _id: "u101",
            fullname: "Neal Adam",
            imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
          },
          {
            _id: "u102",
            fullname: "Liron Kruchinin",
            imgUrl:
              "https://preview.redd.it/hbkyobublbh61.jpg?auto=webp&s=d309aa476f34e040f9cafb2bf44968f8010b40a0",
          },
          {
            _id: "u103",
            fullname: "Gilad Dagan",
            imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
          },
        ],
        groups: [
          {
            title: "repair shower",
            id: "FOgm0Y",
            archivedAt: "",
            card: [],
            cards: [
              {
                title: "get new faucet",
                description: "",
                style: { bgColor: "#7bdcb5" },
                id: "dxKJF7",
                checklists: [],
              },
              {
                title: "get sealing tape",
                description: "",
                style: { bgColor: "#ff6900" },
                id: "QoFhot",
                checklists: [],
              },
              {
                title: "assemble new faucet",
                description: "hey hey",
                style: {},
                id: "K4bQy1",
                checklists: [],
              },
            ],
          },
          {
            title: "driveway maintenance",
            id: "xtKlSs",
            archivedAt: "",
            card: [],
            cards: [
              {
                title: "Clean the Driveway",
                description: "",
                style: { bgColor: "#fcb900" },
                id: "KNPCcw",
                checklists: [],
              },
            ],
          },
          {
            title: "Cat",
            id: "aaL4uP",
            archivedAt: "",
            card: [],
            cards: [
              {
                title: "Feed Cat everyday",
                description: "",
                style: {},
                id: "3nDwAC",
                checklists: [],
              },
              {
                title: "call the vet to schedule appointment",
                description: "0506040306",
                style: { bgColor: "#f78da7" },
                id: "DTPZUn",
                checklists: [
                  {
                    id: "FieyHe",
                    title: "apoinemnt",
                    todos: [
                      {
                        title: "scheduele",
                        isDone: false,
                        id: "yKggvN",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        activities: [],
        _id: "Mffuv",
      },
      {
        title: "Startup Plans",
        isStarred: false,
        archivedAt: "",
        createdBy: {
          id: "",
          fullname: "",
          imgUrl: "",
        },
        style: {
          backgroundColor: "#25D9F5",
          img: "https://images.unsplash.com/photo-1673050460660-2bd7b3bb25a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
          thumbnail:
            "https://images.unsplash.com/photo-1673050460660-2bd7b3bb25a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        },
        labels: [
          {
            id: "2Qo1eC",
            title: "",
            color: "#7BC86C",
          },
          {
            id: "mmdoXk",
            title: "",
            color: "#F5DD29",
          },
          {
            id: "ESjLz9",
            title: "",
            color: "#DFE1E6",
          },
          {
            id: "USGsiI",
            title: "",
            color: "#EF7564",
          },
        ],
        members: [
          {
            _id: "u101",
            fullname: "Neal Adam",
            imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
          },
          {
            _id: "u102",
            fullname: "Liron Kruchinin",
            imgUrl:
              "https://preview.redd.it/hbkyobublbh61.jpg?auto=webp&s=d309aa476f34e040f9cafb2bf44968f8010b40a0",
          },
          {
            _id: "u103",
            fullname: "Gilad Dagan",
            imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
          },
        ],
        groups: [],
        activities: [],
        _id: "KWkkW",
      },
    ]
    utilService.saveToStorage(STORAGE_BOARD_KEY, demoData)
  }
}

// TEST DATA
// asyncStorageService.post(STORAGE_BOARD_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))

const demo = [
  {
    _id: "b101",
    title: "October Sprint",
    isStarred: false,
    archivedAt: 1674334960747,
    createdBy: {
      _id: "u101",
      fullname: "Liron Kurchi",
      imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
    },
    style: {
      backgroundColor: "#FFD700",
      thumbnail:
        "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      img: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
    },
    labels: [
      {
        id: "l101",
        title: "Done",
        color: "#7BC86C",
      },
      {
        id: "l102",
        title: "QA",
        color: "#F5DD29",
      },
      {
        id: "l103",
        title: "In Dev",
        color: "#DFE1E6",
      },
      {
        id: "l104",
        title: "Important",
        color: "#EF7564",
      },
      {
        id: "l105",
        title: "Production Ready",
        color: "#BCD9EA",
      },
    ],
    members: [
      {
        _id: "u101",
        fullname: "Neal Adam",
        imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
      },
      {
        _id: "u102",
        fullname: "Liron Kruchinin",
        imgUrl:
          "https://preview.redd.it/hbkyobublbh61.jpg?auto=webp&s=d309aa476f34e040f9cafb2bf44968f8010b40a0",
      },
      {
        _id: "u103",
        fullname: "Gilad Dagan",
        imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
      },
    ],
    groups: [
      {
        id: "g101",
        title: "Backlog-Client",
        archivedAt: "",
        cards: [
          {
            id: "c101",
            title: "Crud",
            labelIds: ["l104"],
            style: {},
          },
          {
            id: "c102",
            title: "Home Page",
            style: {},
          },
          {
            id: "c103",
            title: "Data model aproval",
            style: {},
          },
          {
            id: "c104",
            title: "Socket implement",
            style: {},
            labelIds: ["l104"],
            memberIds: ["u101", "u102"],
            checklists: [
              {
                id: "YEhmF",
                title: "Checklist",
                todos: [
                  {
                    id: "2122jX",
                    title: "Socket 1",
                    isDone: false,
                  },
                  {
                    id: "21241jX",
                    title: "Socket 2",
                    isDone: false,
                  },
                  {
                    id: "2125215jX",
                    title: "Socket 3",
                    isDone: false,
                  },
                ],
              },
            ],
          },
          {
            id: "c105",
            title: "Home Page",
            style: {},
            attachments: [
              {
                id: "teat22",
                attachUrl: "https://picsum.photos/200/300",
              },
            ],
          },
        ],
        style: {},
      },
      {
        id: "g102",
        title: "Backlog-Server",
        cards: [
          {
            id: "c106",
            title: "Create backend services",
            archivedAt: "",
          },
          {
            id: "c107",
            title: "",
            description: "description",
            attachments: [
              {
                id: "tesat22",
                attachUrl: "https://www.npmjs.com/package/socket.io-client",
              },
            ],
            comments: [
              {
                id: "ZdPnm",
                txt: "please CR this",
                createdAt: 1590999817436,
                byMember: {
                  _id: "u101",
                  fullname: "Liron Kruchinin",
                  imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
                },
              },
            ],
            checklists: [
              {
                id: "YEhmF",
                title: "Checklist",
                todos: [
                  {
                    id: "212jX",
                    title: "Installing",
                    isDone: true,
                  },
                  {
                    id: "21211jX",
                    title: "Requiring",
                    isDone: true,
                  },
                  {
                    id: "Using",
                    title: "Using",
                    isDone: false,
                  },
                ],
              },
            ],
            memberIds: ["u103"],
            labelIds: ["l101", "l102"],
            dueDate: 16156215211,
            byMember: {
              _id: "u101",
              username: "Tal",
              fullname: "Tal Tarablus",
              imgUrl:
                "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
            },
            style: { bgColor: "#26de81" },
          },
          {
            id: "c108",
            title: "Template for Mongo",
            description: "description",
            attachments: [
              {
                id: "tesat22",
                attachUrl: "https://www.npmjs.com/package/socket.io-client",
              },
            ],
            comments: [
              {
                id: "ZdPnm",
                txt: "please CR this",
                createdAt: 1590999817436,
                byMember: {
                  _id: "u101",
                  fullname: "Liron Kruchinin",
                  imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
                },
              },
            ],
            checklists: [
              {
                id: "YEhmF",
                title: "Checklist",
                todos: [
                  {
                    id: "212jX",
                    title: "Installing",
                    isDone: true,
                  },
                  {
                    id: "21211jX",
                    title: "Requiring",
                    isDone: true,
                  },
                  {
                    id: "Using",
                    title: "To Do 1",
                    isDone: false,
                  },
                ],
              },
            ],
            memberIds: ["u103"],
            labelIds: ["l101", "l102"],
            dueDate: 16156215211,
            byMember: {
              _id: "u101",
              fullname: "Neal Adam",
              imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
            },
            style: { bgColor: "#26de81" },
          },
        ],
        style: {},
      },
    ],
    activities: [
      {
        id: "a101",
        txt: "Changed Color",
        createdAt: 154514,
        byMember: {
          _id: "u101",
          fullname: "Neal Adam",
          imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
        },
        card: {
          id: "c101",
          title: "Replace Logo",
        },
      },
    ],
    cmpsOrder: ["status-picker", "member-picker", "date-picker"],
  },
  {
    _id: "b102",
    title: "Week Planning",
    isStarred: true,
    archivedAt: "",
    createdBy: {
      _id: "u101",
      fullname: "Liron Kurchi",
      imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
    },
    style: {
      backgroundColor: "#FFD700",
      thumbnail:
        "https://images.unsplash.com/photo-1549444931-ea94960d38ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      img: "https://images.unsplash.com/photo-1549444931-ea94960d38ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80",
    },
    labels: [
      {
        id: "l101",
        title: "Done",
        color: "#7BC86C",
      },
      {
        id: "l102",
        title: "QA",
        color: "#F5DD29",
      },
      {
        id: "l103",
        title: "In Dev",
        color: "#DFE1E6",
      },
      {
        id: "l104",
        title: "Important",
        color: "#EF7564",
      },
      {
        id: "l105",
        title: "Production Ready",
        color: "#BCD9EA",
      },
    ],
    members: [
      {
        _id: "u101",
        fullname: "Neal Adam",
        imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
      },
      {
        _id: "u102",
        fullname: "Liron Kruchinin",
        imgUrl:
          "https://preview.redd.it/hbkyobublbh61.jpg?auto=webp&s=d309aa476f34e040f9cafb2bf44968f8010b40a0",
      },
      {
        _id: "u103",
        fullname: "Gilad Dagan",
        imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
      },
    ],
    groups: [
      {
        id: "g101",
        title: "Backlog-Client",
        archivedAt: "",
        cards: [
          {
            id: "c101",
            title: "Crud",
            labelIds: ["l104"],
          },
          {
            id: "c102",
            title: "Home Page",
            style: {},
          },
          {
            id: "c103",
            title: "Data model aproval",
            style: {},
          },
          {
            id: "c104",
            title: "Socket implement",
            style: {},
            labelIds: ["l104"],
            memberIds: ["u101", "u102"],
            checklists: [
              {
                id: "YEhmF",
                title: "Checklist",
                todos: [
                  {
                    id: "2122jX",
                    title: "Socket 1",
                    isDone: false,
                  },
                  {
                    id: "21241jX",
                    title: "Socket 2",
                    isDone: false,
                  },
                  {
                    id: "2125215jX",
                    title: "Socket 3",
                    isDone: false,
                  },
                ],
              },
            ],
          },
          {
            id: "c105",
            title: "Home Page",
            attachments: [
              {
                id: "teat22",
                attachUrl: "https://picsum.photos/200/300",
              },
            ],
          },
        ],
        style: {},
      },
      {
        id: "g102",
        title: "Backlog-Server",
        cards: [
          {
            id: "c106",
            title: "Create backend services",
            archivedAt: "",
          },
          {
            id: "c107",
            title: "",
            description: "description",
            attachments: [
              {
                id: "tesat22",
                attachUrl: "https://www.npmjs.com/package/socket.io-client",
              },
            ],
            comments: [
              {
                id: "ZdPnm",
                txt: "please CR this",
                createdAt: 1590999817436,
                byMember: {
                  _id: "u101",
                  fullname: "Liron Kruchinin",
                  imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
                },
              },
            ],
            checklists: [
              {
                id: "YEhmF",
                title: "Checklist",
                todos: [
                  {
                    id: "212jX",
                    title: "Installing",
                    isDone: true,
                  },
                  {
                    id: "21211jX",
                    title: "Requiring",
                    isDone: true,
                  },
                  {
                    id: "Using",
                    title: "Using",
                    isDone: false,
                  },
                ],
              },
            ],
            memberIds: ["u103"],
            labelIds: ["l101", "l102"],
            dueDate: 16156215211,
            byMember: {
              _id: "u101",
              username: "Tal",
              fullname: "Tal Tarablus",
              imgUrl:
                "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
            },
            style: { bgColor: "#26de81" },
          },
          {
            id: "c108",
            title: "Template for Mongo",
            description: "description",
            attachments: [
              {
                id: "tesat22",
                attachUrl: "https://www.npmjs.com/package/socket.io-client",
              },
            ],
            comments: [
              {
                id: "ZdPnm",
                txt: "please CR this",
                createdAt: 1590999817436,
                byMember: {
                  _id: "u101",
                  fullname: "Liron Kruchinin",
                  imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
                },
              },
            ],
            checklists: [
              {
                id: "YEhmF",
                title: "Checklist",
                todos: [
                  {
                    id: "212jX",
                    title: "Installing",
                    isDone: true,
                  },
                  {
                    id: "21211jX",
                    title: "Requiring",
                    isDone: true,
                  },
                  {
                    id: "Using",
                    title: "To Do 1",
                    isDone: false,
                  },
                ],
              },
            ],
            memberIds: ["u103"],
            labelIds: ["l101", "l102"],
            dueDate: 16156215211,
            byMember: {
              _id: "u101",
              fullname: "Neal Adam",
              imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
            },
            style: { bgColor: "#26de81" },
          },
        ],
        style: {},
      },
    ],
    activities: [
      {
        id: "a101",
        txt: "Changed Color",
        createdAt: 154514,
        byMember: {
          _id: "u101",
          fullname: "Neal Adam",
          imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
        },
        card: {
          id: "c101",
          title: "Replace Logo",
        },
      },
    ],
    cmpsOrder: ["status-picker", "member-picker", "date-picker"],
  },
  {
    title: "Weekend goals",
    isStarred: false,
    archivedAt: 1674334958358,
    createdBy: {
      id: "",
      fullname: "",
      imgUrl: "",
    },
    style: {
      backgroundColor: "#B7F4E0",
      img: "https://images.unsplash.com/photo-1530968033775-2c92736b131e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1530968033775-2c92736b131e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    labels: [
      {
        id: "lRESNT",
        title: "",
        color: "#7BC86C",
      },
      {
        id: "sFnzyF",
        title: "",
        color: "#F5DD29",
      },
      {
        id: "AM2IGn",
        title: "",
        color: "#DFE1E6",
      },
      {
        id: "bNSglz",
        title: "",
        color: "#EF7564",
      },
      {
        id: "MXerzF",
        title: "Expensive",
        color: "#a272aa",
      },
    ],
    members: [],
    groups: [
      {
        title: "Lookup Hotels",
        id: "cYvm2H",
        archivedAt: "",
        card: [],
        cards: [
          {
            title: "Check Prices",
            description: "Compare prices between local hotels",
            style: { bgColor: "#00d084" },
            id: "piSWNg",
            labelIds: [],
          },
        ],
      },
    ],
    activities: [],
    _id: "4bIh7",
  },
  {
    title: "Vacation Plans",
    isStarred: true,
    archivedAt: "",

    createdBy: {
      id: "",
      fullname: "",
      imgUrl: "",
    },
    style: {
      backgroundColor: "#011831",
      img: "https://images.unsplash.com/photo-1673842450064-e9a1197e1a66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1673842450064-e9a1197e1a66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    labels: [
      {
        id: "BWgsnV",
        title: "Good",
        color: "#7BC86C",
      },
      {
        id: "E4u0oF",
        title: "",
        color: "#F5DD29",
      },
      {
        id: "H7DIPu",
        title: "",
        color: "#DFE1E6",
      },
      {
        id: "X8vKSF",
        title: "",
        color: "#EF7564",
      },
    ],
    members: [
      {
        _id: "u101",
        fullname: "Neal Adam",
        imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
      },
      {
        _id: "u102",
        fullname: "Liron Kruchinin",
        imgUrl:
          "https://preview.redd.it/hbkyobublbh61.jpg?auto=webp&s=d309aa476f34e040f9cafb2bf44968f8010b40a0",
      },
      {
        _id: "u103",
        fullname: "Gilad Dagan",
        imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
      },
    ],
    groups: [
      {
        title: "Check Flights",
        id: "9ycgGJ",
        archivedAt: "",
        card: [],
        cards: [
          {
            title: "Paris",
            description: "good flight to paris",
            style: { bgColor: "#8ed1fc" },
            id: "jaFiFh",
            checklists: [
              {
                id: "LgE3Co",
                title: "Prices",
                todos: [
                  {
                    title: "500$",
                    isDone: false,
                    id: "2NwYgA",
                  },
                  {
                    title: "600$ elal",
                    isDone: false,
                    id: "Rn7gL2",
                  },
                  {
                    title: "700$",
                    isDone: true,
                    id: "BMD0m5",
                  },
                ],
              },
            ],
            labelIds: ["DeLR1w"],
          },
        ],
      },
      {
        title: "Good Flights",
        id: "ErggV7",
        archivedAt: "",
        card: [],
        cards: [
          {
            title: "Singapore",
            description: "Great location cheap flights",
            style: { bgColor: "#0693e3" },
            id: "i8plo6",
            checklists: [],
            labelIds: ["i70q2h"],
          },
          {
            title: "italy",
            description: "",
            style: { bgColor: "#00d084" },
            id: "M9CgFz",
            checklists: [
              {
                id: "SnvG51",
                title: "pros",
                todos: [
                  {
                    title: "close ",
                    isDone: false,
                    id: "Va4CqB",
                  },
                ],
              },
              {
                id: "V7ULTt",
                title: "cons",
                todos: [
                  {
                    title: "boring",
                    isDone: true,
                    id: "9RGtDu",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    activities: [],
    _id: "b2A5O",
  },
  {
    title: "Office Meetings",
    isStarred: true,
    archivedAt: "",
    createdBy: {
      id: "",
      fullname: "",
      imgUrl: "",
    },
    style: {
      backgroundColor: "#F2BF0C",
      img: "https://images.unsplash.com/photo-1510007552638-e1c0c4c67ee0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1510007552638-e1c0c4c67ee0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    labels: [
      {
        id: "swJAhD",
        title: "",
        color: "#7BC86C",
      },
      {
        id: "OGSYOZ",
        title: "",
        color: "#F5DD29",
      },
      {
        id: "XrQDlb",
        title: "",
        color: "#DFE1E6",
      },
      {
        id: "ME1RDd",
        title: "",
        color: "#EF7564",
      },
    ],
    members: [
      {
        _id: "u101",
        fullname: "Neal Adam",
        imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
      },
      {
        _id: "u102",
        fullname: "Liron Kruchinin",
        imgUrl:
          "https://preview.redd.it/hbkyobublbh61.jpg?auto=webp&s=d309aa476f34e040f9cafb2bf44968f8010b40a0",
      },
      {
        _id: "u103",
        fullname: "Gilad Dagan",
        imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
      },
    ],
    groups: [
      {
        title: "everyday launch",
        id: "xSTUDm",
        archivedAt: "",
        card: [],
        cards: [
          {
            title: "lunch with dina",
            description: "",
            style: {},
            id: "5dNKlE",
            checklists: [],
          },
          {
            title: "Launch with kobi on monday",
            description: "",
            style: { bgColor: "#fcb900" },
            id: "aV2DHd",
            checklists: [],
          },
        ],
      },
      {
        title: "Imporent meetings",
        id: "E0SLwL",
        archivedAt: "",
        card: [],
        cards: [
          {
            title: "CEO MEETING",
            description: "",
            style: {},
            id: "aPDoGN",
            checklists: [],
          },
          {
            title: "New boss intro at 13:00",
            description: "",
            style: { bgColor: "#eb144c" },
            id: "lJ5Emy",
            checklists: [],
          },
        ],
      },
    ],
    activities: [],
    _id: "OivY0",
  },
  {
    title: "House Chores",
    isStarred: false,
    archivedAt: "",
    createdBy: {
      id: "",
      fullname: "",
      imgUrl: "",
    },
    style: { backgroundColor: "#7bdcb5" },
    labels: [
      {
        id: "C5Wa1M",
        title: "",
        color: "#7BC86C",
      },
      {
        id: "YekDVq",
        title: "",
        color: "#F5DD29",
      },
      {
        id: "RMvCto",
        title: "",
        color: "#DFE1E6",
      },
      {
        id: "IPmVgs",
        title: "",
        color: "#EF7564",
      },
    ],
    members: [
      {
        _id: "u101",
        fullname: "Neal Adam",
        imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
      },
      {
        _id: "u102",
        fullname: "Liron Kruchinin",
        imgUrl:
          "https://preview.redd.it/hbkyobublbh61.jpg?auto=webp&s=d309aa476f34e040f9cafb2bf44968f8010b40a0",
      },
      {
        _id: "u103",
        fullname: "Gilad Dagan",
        imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
      },
    ],
    groups: [],
    activities: [],
    _id: "pAWeg",
  },
  {
    title: "New Store project",
    isStarred: false,
    archivedAt: "",
    createdBy: {
      id: "",
      fullname: "",
      imgUrl: "",
    },
    style: {
      backgroundColor: "#25D9F5",
      img: "https://images.unsplash.com/photo-1673050460660-2bd7b3bb25a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1673050460660-2bd7b3bb25a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    labels: [
      {
        id: "R8JKWN",
        title: "",
        color: "#7BC86C",
      },
      {
        id: "eGzKKu",
        title: "",
        color: "#F5DD29",
      },
      {
        id: "HQwjGR",
        title: "",
        color: "#DFE1E6",
      },
      {
        id: "XhaZxH",
        title: "",
        color: "#EF7564",
      },
    ],
    members: [
      {
        _id: "u101",
        fullname: "Neal Adam",
        imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
      },
      {
        _id: "u102",
        fullname: "Liron Kruchinin",
        imgUrl:
          "https://preview.redd.it/hbkyobublbh61.jpg?auto=webp&s=d309aa476f34e040f9cafb2bf44968f8010b40a0",
      },
      {
        _id: "u103",
        fullname: "Gilad Dagan",
        imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
      },
    ],
    groups: [],
    activities: [],
    _id: "IeR8q",
  },
  {
    title: "House Project",
    isStarred: false,
    archivedAt: "",
    createdBy: {
      id: "",
      fullname: "",
      imgUrl: "",
    },
    style: {
      backgroundColor: "#B7F4E0",
      img: "https://images.unsplash.com/photo-1530968033775-2c92736b131e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1530968033775-2c92736b131e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    labels: [
      {
        id: "lCG2FJ",
        title: "",
        color: "#7BC86C",
      },
      {
        id: "MsFHHS",
        title: "",
        color: "#F5DD29",
      },
      {
        id: "kapByg",
        title: "",
        color: "#DFE1E6",
      },
      {
        id: "0y5IyK",
        title: "",
        color: "#EF7564",
      },
    ],
    members: [
      {
        _id: "u101",
        fullname: "Neal Adam",
        imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
      },
      {
        _id: "u102",
        fullname: "Liron Kruchinin",
        imgUrl:
          "https://preview.redd.it/hbkyobublbh61.jpg?auto=webp&s=d309aa476f34e040f9cafb2bf44968f8010b40a0",
      },
      {
        _id: "u103",
        fullname: "Gilad Dagan",
        imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
      },
    ],
    groups: [
      {
        title: "repair shower",
        id: "FOgm0Y",
        archivedAt: "",
        card: [],
        cards: [
          {
            title: "get new faucet",
            description: "",
            style: { bgColor: "#7bdcb5" },
            id: "dxKJF7",
            checklists: [],
          },
          {
            title: "get sealing tape",
            description: "",
            style: { bgColor: "#ff6900" },
            id: "QoFhot",
            checklists: [],
          },
          {
            title: "assemble new faucet",
            description: "hey hey",
            style: {},
            id: "K4bQy1",
            checklists: [],
          },
        ],
      },
      {
        title: "driveway maintenance",
        id: "xtKlSs",
        archivedAt: "",
        card: [],
        cards: [
          {
            title: "Clean the Driveway",
            description: "",
            style: { bgColor: "#fcb900" },
            id: "KNPCcw",
            checklists: [],
          },
        ],
      },
      {
        title: "Cat",
        id: "aaL4uP",
        archivedAt: "",
        card: [],
        cards: [
          {
            title: "Feed Cat everyday",
            description: "",
            style: {},
            id: "3nDwAC",
            checklists: [],
          },
          {
            title: "call the vet to schedule appointment",
            description: "0506040306",
            style: { bgColor: "#f78da7" },
            id: "DTPZUn",
            checklists: [
              {
                id: "FieyHe",
                title: "apoinemnt",
                todos: [
                  {
                    title: "scheduele",
                    isDone: false,
                    id: "yKggvN",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    activities: [],
    _id: "Mffuv",
  },
  {
    title: "Startup Plans",
    isStarred: false,
    archivedAt: "",
    createdBy: {
      id: "",
      fullname: "",
      imgUrl: "",
    },
    style: {
      backgroundColor: "#25D9F5",
      img: "https://images.unsplash.com/photo-1673050460660-2bd7b3bb25a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1673050460660-2bd7b3bb25a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    labels: [
      {
        id: "2Qo1eC",
        title: "",
        color: "#7BC86C",
      },
      {
        id: "mmdoXk",
        title: "",
        color: "#F5DD29",
      },
      {
        id: "ESjLz9",
        title: "",
        color: "#DFE1E6",
      },
      {
        id: "USGsiI",
        title: "",
        color: "#EF7564",
      },
    ],
    members: [
      {
        _id: "u101",
        fullname: "Neal Adam",
        imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
      },
      {
        _id: "u102",
        fullname: "Liron Kruchinin",
        imgUrl:
          "https://preview.redd.it/hbkyobublbh61.jpg?auto=webp&s=d309aa476f34e040f9cafb2bf44968f8010b40a0",
      },
      {
        _id: "u103",
        fullname: "Gilad Dagan",
        imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
      },
    ],
    groups: [],
    activities: [],
    _id: "KWkkW",
  },
]
