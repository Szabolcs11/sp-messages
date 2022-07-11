import React, { useState, useRef, useEffect } from 'react'
import Style from './../style/ChatStyle.css'
import axios from 'axios'
import MessageComponent from './Message'
import { v4 as uuid } from 'uuid'
import { useQuery, gql, useMutation, useSubscription } from "@apollo/client"
import Room from './Room'


const GETALLMESSAGEFROMEXPRESS = gql`
query Messages($userId: ID!) {
    messages(user_id: $userId) {
      id
      message
      date
      roomkey
      sender {
        username
        id
      }
    }
  }
`

const SENDMESSAGETOEXPRESS = gql`
mutation Mutation($input: MessageInput!) {
    createMessage(input: $input) {
      id
      message
      date
      sender {
        username
        id
      }
    }
  }
`

const SUBSCRIBETOMESSAGES = gql`
subscription Subscription {
    messagesent {
      id
      message
      date
      sender {
        username
        id
      }
    }
}
`



function Chat(props) {

    const [Message, setMessage] = useState([{}])
    const mess = useRef()

    const [CurrentRoomKey, setCurrentRoomKey] = useState()
    

    // UI --(graphqp)--> EXPRESS -> Strapi
    const { loading, error, data, refetch } = useQuery(GETALLMESSAGEFROMEXPRESS, {variables: {userId: props.UserDatas.id}})
    if (data) {
        if (data != Message) {
            setMessage(data)
            setCurrentRoomKey(data.messages[1].roomkey)
        }
    }
    // console.log(Message)
    const [smutateFunction, { sdata, sloading, serror }] = useMutation(SENDMESSAGETOEXPRESS)


    // Subscription \\
    const { smdata, smloading } = useSubscription(
        SUBSCRIBETOMESSAGES, 
        {
            onSubscriptionData: (onsmdata) => {
                // setMessage(previousState => [...previousState, onsmdata.subscriptionData.data.messagesent])
                // setMessage(...Message.messages, {id: 1, message: "TEXT", date:"2022-02-22", sender: {username: "asd", id: 1}})
                refetch()
                // console.log(onsmdata.subscriptionData.data.messagesent)
                // data.push( {id: 1, message: "TEXT", date:"2022-02-22", sender: {username: "asd", id: 1}} )
                // console.log(onsmdata)
            }
        }
    )

    const SendMessage = () => {
        if (CurrentRoomKey) {
            smutateFunction({variables: {
                input: {
                    message: mess.current.value,
                    sender: props.UserDatas.id,
                    sendername: props.UserDatas.username,
                    roomkey: CurrentRoomKey
                }
            }})
            refetch()
            mess.current.value = ""
        }
    }

    // const joinroom = () => {
    //     console.log("asd")
    // }

    function joinroom() {
        console.log("as")
    }

            
    return (
        <>
        <div>
            CurrentRoomKey: {CurrentRoomKey || "Undefined"}
        </div>
            <div className='Rooms'>
                <Room onClick={joinroom} RoomKey="H5GG7"/>
            </div>
            <div className='Chat-Container'>
                <div className='Chat-Messages'>
                    { Message.messages ?
                    Message.messages.map((d) => {
                    // data.messages.map((d) => {
                        return (
                            <MessageComponent key={d.id} MessageText={d.message} Date={d.date} SenderName={d.sender.username} />
                        )
                    })
                    :
                    <p>Error loading message!</p>
                    }
                    {/* {data ? 
                        data.messages.data.map((d) => {
                            return (
                                <MessageComponent key={d.id} MessageText={d.attributes.Message} Date={d.attributes.createdAt} SenderName={d.attributes.sender.data.attributes.username}/>
                            )
                        })
                    :
                    <p>Error loading message!</p>
                    } */}
                </div>
                <div className='Chat-Control'>
                    <input type="text" className='Chat-Input' ref={mess}/>
                    <div className='Chat-Button' onClick={SendMessage}>
                        Send
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat