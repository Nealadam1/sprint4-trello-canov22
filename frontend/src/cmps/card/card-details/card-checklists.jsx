export function CardChecklists({ checklists }) {
  return (
    <div className="card-checklists">
      <h3>Checklist</h3>
      {checklists[0].todos.map((todo) => (
        <li>{todo.title}</li>
      ))}
    </div>
  )
}
