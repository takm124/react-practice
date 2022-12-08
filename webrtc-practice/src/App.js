import React, {useRef, useState,  useEffect} from "react";
import styled from "styled-components";
import * as StompJs from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

const Container = styled.div`
  width: 512px;
  height: 368px;

  position: relative; 
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; 

  margin-top: 100px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;


function App() {
  // 웹소켓 구현부
  const [content, setContent] = useState("");
  const client = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/ws', 
      connectHeaders: {
          login: 'user',
          password: 'password'
      },
      debug: function (str) {
          console.log(str);
      },
  });

  client.activate();

  const wsSubscribe = () => {
      client.onConnect = () => {
          client.subscribe('/call/video', (msg) => {
              console.log(msg.body);
          }, {id: "user"})
      }
  }

  wsSubscribe();

  // Video 구현부
  var stream;

  const hostVideoRef = useRef(null);
  function getConnectedDevices(type, callback) {
      navigator.mediaDevices.enumerateDevices()
          .then(devices => {
            const filtered = devices.filter(device => device.kind === type);
            callback(filtered);
          });
  }
  getConnectedDevices('videoinput', cameras => console.log('Cameras found', cameras.length));

  async function playVideoFromCamera() {
      try {
        const constraints = { 'video': true };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        hostVideoRef.current.srcObject = stream;

      } catch (error) {
        console.error('Error opening video camera.', error);
      }
  }

  //playVideoFromCamera();

  return (
        <>
          <Container>
            <video id="localVideo" ref={hostVideoRef} autoPlay />
          </Container>
            <button onClick = {sendChat}>전송</button>
            <button onClick = {presenter}>presenter</button>
        </>
  );
};


export default App;
