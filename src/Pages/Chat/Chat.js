import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
// import io from 'socket.io-client'
import './Chat.css';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Massages/Messages';

const ENDPOINT = 'localhost:5000';
let socket;

const Chat = () => {
    // const { io } = require("socket.io-client");
    const location = useLocation();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    useEffect(()=>{
        console.log(location.search)
        const {name, room} = queryString.parse(location.search);
        
        console.log(name, room)
        socket =io(ENDPOINT);

        setName(name);
        setRoom(room);
    
        socket.emit('join', {name, room}, (error)=>{
            if(error) {
                alert(error);
            }
        })
        // console.log(socket)
    },[ENDPOINT, location.search])


    useEffect(()=>{
        socket.on('massage', (massage)=>{
            setMessages([...messages, massage])
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
      }
      console.log(message, messages)
      
    return (
        <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      {/* <TextContainer users={users}/> */}
    </div>
    );
};

export default Chat;