import { useEffect } from "react"
import { eventBus } from "../../services/event-bus.service"

export function GroupActions({group, handleEditButtonClick}){
    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
          document.removeEventListener('click', handleClickOutside)
        }
      }, [])

      function handleClickOutside(ev){
        if (!ev.target.closest('.group-actions-btn')) {
            handleEditButtonClick(group.id)
        }
      }
      

    return <section className="group-actions-modal">
        <header className="group-actions-header">
            <h4>List Actions</h4>
            <i onClick={()=>handleEditButtonClick(group.id)}>X</i>
        </header>
        <ul className="group-actions">
            <li onClick={()=>eventBus.emit('add-card',group.id)}>
                Add card...
            </li>
            <li>
                Copy List...
            </li>
            <li>
                Move List...
            </li>
            <br />
            <li>
                Archive this list
            </li>
        </ul>

    </section>

}