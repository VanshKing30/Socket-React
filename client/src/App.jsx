import { useEffect , useState , useMemo } from "react";
import {io} from "socket.io-client";


const App = () =>{

  const socket = useMemo(
    ()=>
    io("http://localhost:3000" , {
      withCredentials : true,
    }),
    []
  );


  const [messages , setMessages] = useState("");
  const [message , setMessage] = useState("");
  const [room , setRoom] = useState("");
  const [socketID , setSocketID] = useState("");
  const [roomName , setRoomName] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    socket.emit("message" , {message , room});
    setMessage("");
  };

  const joinRoomHandler = (e) =>{
    e.preventDefault();
    socket.emit("join-room" , roomName);
    setRoomName("");
  }

  useEffect(() => {
    socket.on("connect" , ()=>{
      setSocketID(socket.id);
      console.log("connected" , socket.id);
    });

    socket.on("recieve-message" , (data)=>{
      console.log(data);
      setMessages((messages) => [...messages , data]);
    });

    socket.on("welcome" , (s)=>{
      console.log(s);
    });

    return ()=>{
      socket.disconnect();
    };
  } , []);


  return(
    <div>

      <div><h3>{socketID}</h3></div>


      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <input 
        type="text"
        value={roomName}
        placeholder="Enter room id"
        onChange={(e)=> setRoomName(e.target.value)}
        label = "Room Name" />

        <button type="submit">Join</button>
      </form>

      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        value={message} 
        onChange={(e)=>setMessage(e.target.value)}
        label ="outlined"/>

        <input type="text"
        value={room}
        onChange={(e)=>setRoom(e.target.value)}
        label = "Room" />

        <button type="submit">Send</button>
      </form>

      {/* <div>
        {messages.map((m , i) => (
          <p>{m}</p>
        ))}
      </div> */}
    </div>
  )


};


export default App;