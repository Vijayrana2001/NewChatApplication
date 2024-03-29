import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { Base_URL, getRequest } from "../utils/services";

export const useFetchLatestMessage = (chat) => {
  const { newMessage, notifications } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      const response = await getRequest(`${Base_URL}/messages/${chat?._id}`);
      if (response.error) {
        return setError(error);
      }

      const lastMessage = response[response?.length - 1];

      setLatestMessage(lastMessage);
    };
    getMessages();
  }, [newMessage, notifications]);
  return { latestMessage };
};
