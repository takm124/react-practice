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
          client.subscribe('/sub/video', (msg) => {
            hostVideoRef.current.srcObject = msg;
          }, {id: "user"})
      }
  }

  wsSubscribe();

  const sendChat = () => {
    client.publish({
      destination : '/app/chat',
      body : JSON.stringify({
        'message' : 'test'
      })
    })
  }

  // peer connection
  // Set up an asynchronous communication channel that will be
  // used during the peer connection setup
  const signalingChannel = new SignalingChannel(remoteClientId);
  signalingChannel.addEventListener('message', message => {
      // New message from remote client received
  });

  // Send an asynchronous message to the remote client
  signalingChannel.send('Hello!');

  async function makeCall() {
    const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
    const peerConnection = new RTCPeerConnection(configuration);
    signalingChannel.addEventListener('message', async message => {
        if (message.answer) {
            const remoteDesc = new RTCSessionDescription(message.answer);
            await peerConnection.setRemoteDescription(remoteDesc);
        }
    });
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    signalingChannel.send({'offer': offer});
};

// Listen for local ICE candidates on the local RTCPeerConnection
peerConnection.addEventListener('icecandidate', event => {
  if (event.candidate) {
      signalingChannel.send({'new-ice-candidate': event.candidate});
  }
});

// Listen for remote ICE candidates and add them to the local RTCPeerConnection
signalingChannel.addEventListener('message', async message => {
  if (message.iceCandidate) {
      try {
          await peerConnection.addIceCandidate(message.iceCandidate);
      } catch (e) {
          console.error('Error adding received ice candidate', e);
      }
  }
});

// Listen for connectionstatechange on the local RTCPeerConnection
peerConnection.addEventListener('connectionstatechange', event => {
  if (peerConnection.connectionState === 'connected') {
      // Peers connected!
  }
});


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
          <button onClick={sendChat}>전송</button>
        </>
  );
};


export default App;
