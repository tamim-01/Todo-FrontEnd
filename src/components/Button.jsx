import React from "react"
export function Button ({ disabled,style  , text , onClickHandler , type}){
return <button className={style} disabled={disabled} onClick={onClickHandler} type={type}> {text} </button>
};