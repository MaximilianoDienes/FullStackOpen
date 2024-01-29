/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react"

const Note = ({ note, toggleImportance }) => {
    const label = note.important
      ? 'make not important' : 'make important'
  
    return (
      <li className="note">
        {note.content} 
        <button onClick={() => toggleImportance(note.id)}>{label}</button>
      </li>
    )
  }

export default Note