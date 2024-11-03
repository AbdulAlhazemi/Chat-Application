/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { useAuthContext } from "./context";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socketInstance = io("https://chat-app-yt.onrender.com", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socketInstance);

      // Listen for online users
      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Handle socket errors (optional)
      socketInstance.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });

      return () => {
        socketInstance.close();
        setSocket(null); // Clear socket state on cleanup
      };
    } else if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

// Define PropTypes for the component
SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
