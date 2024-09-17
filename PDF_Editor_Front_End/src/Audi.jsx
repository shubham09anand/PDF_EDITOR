// App.jsx
import React, { useState, useEffect } from 'react';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    // Set up WebSocket connection
    const ws = new WebSocket('ws://localhost:8080'); // Replace with your signaling server URL

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.offer) {
        // Handle incoming offer
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        ws.send(JSON.stringify({ answer }));
      } else if (data.answer) {
        // Handle incoming answer
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
      } else if (data.iceCandidate) {
        // Add ICE candidate
        await peerConnection.addIceCandidate(new RTCIceCandidate(data.iceCandidate));
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [peerConnection]);

  const startCall = async () => {
    try {
      // Get audio stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setLocalStream(stream);

      // Create RTCPeerConnection
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }], // Add STUN server for NAT traversal
      });

      // Add local stream to peer connection
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      // Set up ICE candidate handling
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.send(JSON.stringify({ iceCandidate: event.candidate }));
        }
      };

      // Set up remote stream handling
      pc.ontrack = (event) => {
        const remoteAudio = document.getElementById('remoteAudio');
        remoteAudio.srcObject = event.streams[0];
        remoteAudio.play(); // Auto play remote audio
      };

      // Create an offer to start the call
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.send(JSON.stringify({ offer }));

      setPeerConnection(pc);
    } catch (error) {
      console.error('Error accessing media devices or setting up call: ', error);
    }
  };

  return (
    <div>
      <h1>WebRTC Audio Call</h1>
      <button onClick={startCall}>Start Call</button>
      <audio id="remoteAudio" controls autoPlay></audio>
    </div>
  );
};

export default App;
