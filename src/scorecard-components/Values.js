import React from 'react'

export const Values = (props) => {
  return (
    <>
    <tr>
        <th>{props.sectionValue}</th>
        <td>
            <button 
                onClick={() => {console.log('clicked')}} 
                id={props.sectionValue}>
                    {props.score}
            </button>
        </td>
    </tr>
    
    </>
  )
}
