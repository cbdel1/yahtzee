import React from 'react'

export const Values = (props) => {
  return (
    <>
    <button onClick={() => {props.onClick(props.keyValue)}}>
        {props.score}
    </button>
    </>
  )
}
