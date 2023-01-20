import { useEffect } from "react"

export function CardLabels({ CardLabels }) {
  const displayLabels = []
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

  useEffect(() => {
    console.log('hello from labels');
  }, [])

  return (
    <div className="card-labels">
      {CardLabels?.map(label => {

        labels.map(displayLabel => {
          if (label === displayLabel.id) displayLabels.push(displayLabel)
        })
      })}

      {displayLabels.map(label => (
        <span style={{ background: label.color }}>{label.title}</span>
      ))}
    </div>
  )

}
