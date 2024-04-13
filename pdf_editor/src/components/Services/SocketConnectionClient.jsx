import React from 'react'
import { io } from 'socket.io-client';

const SocketConnectionClient = () => {
     useEffect(() => {
          const s = io("http://127.0.0.1:3001");
          setSocket(s);

          return () => {
               s.disconnect();
          }
     }, [newConsversation]);
}

export default SocketConnectionClient