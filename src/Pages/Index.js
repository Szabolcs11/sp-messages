import axios from 'axios'
import React, { useState, useRef } from 'react'
import Style from './../style/IndexStyle.css'
import Chat from '../Components/Chat'
import { useQuery, gql } from "@apollo/client"
import Room from '../Components/Room'


function Index(props) {
  return (
      <div className='Index-Container'>
          <div className='Index-Header'>
              <label>Room ID:</label>
              <input type="text" />
          </div>
          <Chat UserDatas={props.UserDatas}/>
      </div>
  )
}

export default Index