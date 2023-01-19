export function CardLabels({ CardLabels }) {
  const labels = [
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
  ]
  return (
    <div className="card-labels">
      {labels.map((label) => (
        <span style={{ background: label.color }}>{label.title}</span>
      ))}
    </div>
  )
}
