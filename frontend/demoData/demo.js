const board = {
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
      fullname: "Liron Kruchinin",
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
          title: "Check PWA",
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
}
const user = [
  {
    _id: "u101",
    fullname: "Neal Adam",
    username: "Nealadam@live.com",
    password: "NealAdam",
    imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
    mentions: [
      {
        //optional
        id: "m101",
        boardId: "b101",
        cardId: "c101",
      },
    ],
  },
  {
    _id: "u102",
    fullname: "Liron Kruchinin",
    username: "LironKruchinin@gmail.com",
    password: "LironKruchinin",
    imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
    mentions: [
      {
        //optional
        id: "m101",
        boardId: "b101",
        cardId: "c101",
      },
    ],
  },
  {
    _id: "u103",
    fullname: "Gilad Dagan",
    username: "giladdagan@gmail.com",
    password: "GiladDagan",
    imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
    mentions: [
      {
        //optional
        id: "m101",
        boardId: "b101",
        cardId: "c101",
      },
    ],
  },
]
