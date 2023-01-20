import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { boardService } from "../../../../services/board.service";
import { updateCard } from "../../../../store/actions/board.action";

export function LabelAction({ card }) {
  // if (!card.labels) card.labelIds = []
  const labels = useSelector((storeState) => storeState.labelModule.labels)
  const [checkedState, setCheckedState] = useState(new Array(labels.length).fill(false))
  const [labelIds, setLabelIds] = useState(card.labelIds)
  const [currCard, setCurrCard] = useState(card)

  useEffect(() => {
    setLabelIds(prevState => ([...prevState]))
  }, [currCard])

  function handleCheckboxChange(labelId) {
    setCurrCard({ ...card })
    const idx = labels.findIndex(label => label.id === labelId);
    setCheckedState(prevState => {
      const newCheckedState = [...prevState];
      newCheckedState[idx] = !newCheckedState[idx];
      return newCheckedState;
    });
    //update the labelIds array
    setLabelIds(prevState => {
      if (prevState.includes(labelId)) {
        card.labelIds = prevState.filter(id => id !== labelId)
        updateCard(card)
        return prevState.filter(id => id !== labelId)
      } else {
        card.labelIds = [...prevState, labelId]
        updateCard(card)
        return [...prevState, labelId]
      }
    });
  }

  return <div>
    {labels.map((label, idx) => {
      console.log(label.id, idx);

      return (
        <div key={label.id} style={{ backgroundColor: label.color }}>
          <input
            id={label.id}
            checked={labelIds?.includes(label.id)}
            onClick={() => handleCheckboxChange(label.id)}
            type="checkbox"
          />

          <label htmlFor={label.id}>{label.title}</label>
        </div>
      )
    })}
  </div>
}









// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { boardService } from "../../../../services/board.service";
// import { updateCard } from "../../../../store/actions/board.action";

// export function LabelAction({ card }) {
//   const labels = useSelector((storeState) => storeState.labelModule.labels)
//   const [currCard, setCurrCard] = useState(card)
//   const [checkedState, setCheckedState] = useState(
//     new Array(labels.length).fill(false)
//   );
//   const { labelIds } = card

//   useEffect(() => {
//     setCurrCard({ ...currCard, labelIds: [...currCard?.labelIds] })
//   }, [labels])

//   // function onChangeLabel({ target }) {
//   //   const { value, name } = target

//   //   if (card.labelIds.includes(value)) {
//   //     currCard.labelIds.splice(currCard.labelIds.findIndex(label => value === label), 1);
//   //     updateCard(currCard)
//   //     return false
//   //   } else {
//   //     setCurrCard({ ...currCard, labelIds: [...currCard.labelIds, value] })
//   //     updateCard({ ...currCard, labelIds: [...currCard.labelIds, value] })
//   //     return true
//   //   }
//   // }
//   // function onChangeLabel({ target }) {
//   //   const { value, name } = target
//   //   // console.log(+value);

//   //   // const updatedCheckedState = checkedState.map((item, index) =>
//   //   //   index === +value ? !item : item
//   //   // )
//   //   // console.log('aegegeag', updatedCheckedState);
//   //   // // const updatedCheckedState = checkedState.map((item, index) =>
//   //   // //   index === value ? !item : item
//   //   // // );

//   //   // setCheckedState(updatedCheckedState);



//   // }
//   // console.log('card', checkedState);

//   return <div>
//     {labels ? labels.map((label, idx) => {
//       console.log(label.id, idx);
//       return (
//         <div key={label.id} style={{ backgroundColor: label.color }}>
//           <input id={label.id}
//             value={idx}
//             checked={labelIds?.includes(label.id)}
//             // onChange={onChangeLabel}
//             type="checkbox" />

//           <label htmlFor={label.id}>{label.title}</label>
//         </div>
//       )

//       // return (
//       //   <div key={label.id} style={{ backgroundColor: label.color }}>
//       //     <input id={label.id}
//       //       checked={labelIds.includes(label.id)}
//       //       value={label.id} name='labelIds'
//       //       onChange={onChangeLabel}
//       //       type="checkbox" />

//       //     <label htmlFor={label.id}>{label.title}</label>
//       //   </div>
//       // )
//     }) : ''}
//   </div>
// }
