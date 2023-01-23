import { useEffect } from "react"
import { eventBus } from "../../services/event-bus.service"
import {CgClose} from "react-icons/cg"
export function GroupActions({group, handleEditButtonClick}){
    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
          document.removeEventListener('click', handleClickOutside)
        }
      }, [])

      function handleClickOutside(ev){
        if (!ev.target.closest('.group-actions-modal')) {
            handleEditButtonClick(ev,group.id)
            document.removeEventListener('click', handleClickOutside)
        }
      }

      function handleEmitAddCard(ev){
        eventBus.emit('add-card',group.id)
        handleEditButtonClick(ev,group.id)

      }
      

    return <section className="group-actions-modal">
        <header className="group-actions-header">
            <h4>List Actions</h4>
            <i onClick={(ev)=>handleEditButtonClick(ev,group.id)}><CgClose /></i>
        </header>
        <ul className="group-actions">
            <li onClick={(ev)=>handleEmitAddCard(ev)}>
                Add card...
            </li>
            <li>
                Copy List...
            </li>
            <li className="list-last">
                Move List...
            </li>
            <hr />
            <li>
                Archive this list
            </li>
        </ul>

    </section>

}