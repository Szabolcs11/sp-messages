import React from 'react'
import Style from './../style/RoomStyle.css'

function Room(props) {
  return (
    <div className='RoomContainer'>
        <p>Key: {props.RoomKey}</p>
    </div>
  )
}

export default Room