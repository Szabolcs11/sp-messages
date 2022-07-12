import React from 'react'
import { useQuery, gql, useMutation, useSubscription, useApolloClient } from "@apollo/client"

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

function Subscription() {
    
    // const { data: smdata, } = useSubscription(
    //     SUBSCRIBETOMESSAGES, 
    //     {variables: {roomId: CurrentRoomKey}},
        
    //     {
    //         onSubscriptionData: (onsmdata) => {
    //             console.log("a", " ASDAS ")
    //         }
    //     }
    // )

    return (
        <div></div>
    )
}

export default Subscription