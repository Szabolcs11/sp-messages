import React, { useState, useRef, useEffect } from 'react'
import Style from './../style/ChatStyle.css'
import axios from 'axios'
import MessageComponent from './Message'
import { v4 as uuid } from 'uuid'
import { useQuery, gql, useMutation, useSubscription, useApolloClient } from "@apollo/client"
import Room from './Room'
import FileUpload from './FileUpload'


const GETALLMESSAGEFROMEXPRESS = gql`
query Query($roomId: ID!) {
    messages(room_id: $roomId) {
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
subscription Subscription($roomId: ID!) {
    messagesent(room_id: $roomId) {
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

const GETALLROOMS = gql`
query Query($userId: ID!) {
    getrooms(user_id: $userId) {
      id
    }
  }
`



function Chat(props) {
    const client = useApolloClient();
    // console.log(client.cache)

    const [Message, setMessage] = useState([{}])
    const mess = useRef()

    const [CurrentRoomKey, setCurrentRoomKey] = useState("R00MK3Y")
    


    // UI --(graphqp)--> EXPRESS -> Strapi
    const { loading, error, data, refetch } = useQuery(GETALLMESSAGEFROMEXPRESS, {variables: {roomId: CurrentRoomKey}})
    // const { loading, error, data, refetch } = useQuery(GETALLMESSAGEFROMEXPRESS, {variables: {roomId: props.UserDatas.id}})
    if (data) {
        if (data != Message) {
            setMessage(data)
            // setCurrentRoomKey(data.messages[0].roomkey)
            // console.log(data.messages[0].roomkey)
        }
    }
    
    // console.log(props.UserDatas.id)
    const { rloading, rerror, data: rdata } = useQuery(GETALLROOMS, {variables: {userId: props.UserDatas.id}})
    // console.log(rdata)
    // console.log(rdata)
    // if (rdata) {
    //     console.log(rdata)
    //     // console.log(rdata.getrooms[0].id)
    // }

    // console.log(rdata.getrooms)
    // if (rdata) {
    //     console.log(rdata)
    // }

    const [smutateFunction, { sdata, sloading, serror }] = useMutation(SENDMESSAGETOEXPRESS)


    // 1. Subscription reactban nem jo \\
    // 2. Valamiert nem kapom visza a szobakat (Reactban)
    // 3. Ki kell szurni az ismetlodo szobakat \\
    // 4. refetch() vagy setMessage(previousState...) ?

    // console.log(client.cache)

    // Subscription \\
    const { data: smdata, } = useSubscription(
        SUBSCRIBETOMESSAGES, 
        {variables: {roomId: CurrentRoomKey}},
        
        {
            onSubscriptionData: (onsmdata) => {

            }
        }
    )

    useEffect(() => {
        refetch()
        // console.log(Message)
        // if (smdata) {
        //     // const messages = [
        //     //     ...Message,
        //     //     smdata
        //     // ]
        //     console.log(smdata)
        // }

        // setMessage(messages)
        // console.log(messages)
    }, [smdata])
    // console.log(smdata, " SUB ", CurrentRoomKey)

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
        else {
            console.log("no room key")
        }
    }

    // const joinroom = () => {
    //     console.log("asd")
    // }

    function joinroom(roomkey) {
        console.log(roomkey)
        setCurrentRoomKey(roomkey)
        // const { loading, error, data, refetch } = useQuery(GETALLMESSAGEFROMEXPRESS, {variables: {userId: props.UserDatas.id}})
    }

    const ImageUpload = () => {

    }

            
    return (
        <>
        <div>
            CurrentRoomKey: {CurrentRoomKey || "Undefined"}
        </div>
            <div className='Rooms'>
                <div className='RoomContainer' onClick={() => joinroom("R00MK3Y")}>
                    <p>Key: R00MK3Y</p>
                </div>
                <div className='RoomContainer' onClick={() => joinroom("ROOM2")}>
                    <p>Key: ROOM2</p>
                </div>

                {/* { rdata ?
                rdata.getrooms.map((r) => {
                    return (
                        <div key={uuid()} className='RoomContainer' onClick={() => joinroom(r.id)}>
                            <p>Key: {r.id}</p>
                        </div> 
                    )
                })
                :
                <p>Error loading rooms</p>
                } */}
                
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
                    <FileUpload />
                </div>
            </div>
        </>
    )
}

export default Chat