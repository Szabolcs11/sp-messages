import React from 'react'
import Style from './../style/MessageStyle.css'

function Message(props) {
  var date = new Date(props.Date)
  let normaldate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  let datetime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  let sendername = props.SenderName || "error"
  return (
    <div className='Chat-Message-Container'>
        <div className='Chat-Message'>
            {sendername}: [{datetime}]: {props.MessageText}
        </div>
    </div>
  )
  // return (
  //   <div className='Chat-Message-Container'>
  //       <div className='Chat-Message'>
  //           {sendername}: [{datetime}]
  //       </div>
  //       <img src='http://localhost:1337/uploads/thumbnail_10x_featured_social_media_image_size_0108b0c4a7.png?width=780&height=460' />
  //   </div>
  // )
}

export default Message