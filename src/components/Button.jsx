import React from "react"
export function Button ({style  , text , onClickHandler , type}){
return <button className={style} onClick={onClickHandler} type={type}> {text} </button>
};