import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");
const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [username, setUsername] = useState(
    `User${Math.floor(Math.random() * 1000)}`
  );

  useEffect(() => {
    // Listener for chat event
    socket.on("chat", (data) => {
      setChatHistory((prevChatHistory) => {
        const updatedHistory = [...prevChatHistory, data];
        return updatedHistory;
      });
    });

    // Cleanup on component unmount
    return () => {
      socket.off("chat");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat", { username, message });
      setMessage("");
    }
  };

  return (
    <div>
      <div>
        {chatHistory.map((data, index) => {
          return (
            <div key={index}>
              <strong>{data.username}</strong> {data.message}
            </div>
          );
        })}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
