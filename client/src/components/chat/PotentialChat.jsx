import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChat = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  //console.log(potentialChats, "pChats");
  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((data, index) => {
            return (
              <div
                className="single-user"
                key={index}
                onClick={() => createChat(user._id, data._id)}
              >
                {data.name}
                <span
                  className={
                    onlineUsers?.some((user) => user?.userId === data?._id)
                      ? "user-online"
                      : ""
                  }
                ></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChat;
