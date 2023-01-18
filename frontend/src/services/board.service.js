import { asyncStorageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

const STORAGE_BOARD_KEY = "boardDB"

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
}
window.cs = boardService

_createDemoData()

async function query() {
  var boards = await asyncStorageService.query(STORAGE_BOARD_KEY)
  return boards
}

function getById(boardId) {
  return asyncStorageService.get(STORAGE_BOARD_KEY, boardId)
}

async function remove(boardId) {
  // throw new Error('Nope')
  await asyncStorageService.remove(STORAGE_BOARD_KEY, boardId)
}

async function save(board) {
  var savedBoard
  if (board._id) {
    savedBoard = await asyncStorageService.put(STORAGE_BOARD_KEY, board)
  } else {
    // Later, owner is set by the backend
    // board.owner = userService.getLoggedinUser()
    savedBoard = await asyncStorageService.post(STORAGE_BOARD_KEY, board)
  }
  return savedBoard
}

function _createDemoData() {
  let demoData = utilService.loadFromStorage(STORAGE_BOARD_KEY)
  if (!demoData) {
    demoData = [
      {
        _id: "b101",
        title: "Demo",
        isStarred: false,
        archivedAt: "",
        createdBy: {
          _id: "u101",
          fullname: "Liron Kurchi",
          imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
        },
        style: { backgroundColor: "lightblue" },
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
            fullname: "Liron Kruchi",
            imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
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
              },
              {
                id: "c103",
                title: "Data model aproval",
              },
              {
                id: "c104",
                title: "Socket implement",
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
                      fullname: "Liron Kruchi",
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
                style: {
                  bgColor: "#26de81",
                },
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
                      fullname: "Liron Kruchi",
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
                style: {
                  bgColor: "#26de81",
                },
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
        title: "Demo",
        isStarred: false,
        archivedAt: "",
        createdBy: {
          _id: "u101",
          fullname: "Liron Kurchi",
          imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
        },
        style: { backgroundColor: "lightblue" },
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
            fullname: "Liron Kruchi",
            imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
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
              },
              {
                id: "c103",
                title: "Data model aproval",
              },
              {
                id: "c104",
                title: "Socket implement",
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
                      fullname: "Liron Kruchi",
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
                style: {
                  bgColor: "#26de81",
                },
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
                      fullname: "Liron Kruchi",
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
                style: {
                  bgColor: "#26de81",
                },
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
    ]
    utilService.saveToStorage(STORAGE_BOARD_KEY, demoData)
  }
}

function getEmptyBoard() {
  return {
    vendor: "Susita-" + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(1000, 9000),
  }
}

// TEST DATA
// asyncStorageService.post(STORAGE_BOARD_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
