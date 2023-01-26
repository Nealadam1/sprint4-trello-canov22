import React, { useState } from "react";
import { BoardColors } from "./board-colors";

export function CardChangeBg({ board }) {
    const [isColors, setIsColors] = useState(false)
    const [isPhotos, setIsPhotos] = useState(false)

    return (
        <section>
            {isColors &&
                <div>
                    <section>
                        <button className="grey-back" onClick={() => setIsColors(!isColors)}>back</button>
                        <BoardColors board={board} />
                    </section>
                </div>
            }
            {!isColors &&
                <div>
                    <button onClick={() => setIsPhotos(!isPhotos)}>Photos</button>
                    <button onClick={() => setIsColors(!isColors)}>Colors</button>
                    <hr />
                    <h3>Custom</h3>
                    <button>+</button>
                </div>}
        </section>
    )
}