
export function BoardHeader({ board }) {
    function handleChange({ target }) {
        console.log(target);
    }
    return (<h3 contentEditable="true" onChange={handleChange}>{board.title}</h3>)
}