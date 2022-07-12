import axios from 'axios'
import React, { useState, useRef } from 'react'
import Style from './../style/IndexStyle.css'
import Chat from '../Components/Chat'
import { useQuery, gql } from "@apollo/client"
import Room from '../Components/Room'
import Subscription from '../Components/Subscription'




function Index(props) {
  return (
      <div className='Index-Container'>
          <div className='Index-Header'>
              <label>Room ID:</label>
              <input type="text" />
          </div>
          <Chat UserDatas={props.UserDatas}/>

          <Subscription />
      </div>
  )
}

export default Index