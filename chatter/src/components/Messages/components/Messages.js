import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";
import useSound from "use-sound";
import config from "../../../config";
import LatestMessagesContext from "../../../contexts/LatestMessages/LatestMessages";
import TypingMessage from "./TypingMessage";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import INITIAL_BOTTY_MESSAGE from "../../../common/constants/initialBottyMessage";
import "../styles/_messages.scss";
const BOT = "bot";
const socket = io(config.BOT_SERVER_ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
});
function Messages() {
  // Hookstate - for Footer
  const [message, setMessage] = useState("");
  //Hookstate - for messages between bot and user
  const [messages, setMessages] = useState([
    { message: INITIAL_BOTTY_MESSAGE, id: Date.now(), user: BOT },
  ]);
  // Hokkstate- from typing Bot
  const [botState, setBotState] = useState(false);
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);
  // Scroll event for final chat
  const finalChat = useRef(null);
  const scrollToFinalChat = () => {
    finalChat.current.scrollTo({
      top: finalChat.current.scrollHeight,
      behavior: "smooth",
    });
  };
  // listener event boot-typing
  useEffect(() => {
    socket.on("bot-typing", () => {
      setBotState(true);
      scrollToFinalChat();
    });
  }, []);

  useEffect(() => {
    socket.off("bot-message");
    socket.on("bot-message", (message) => {
      setBotState(false);
      setMessages([...messages, { message, user: BOT, id: Date.now() }]);
      setLatestMessage(BOT, message);
      playReceive();
      scrollToFinalChat();
    });
  }, [messages]);
  //
  const sendMessage = useCallback(() => {
    if (!message) {
      return;
    }
    setMessages([...messages, { message, user: "me", id: Date.now() }]);
    playSend();
    scrollToFinalChat();
    socket.emit("user-message", message);
    setMessage("");
  }, [messages,message]);
  // input value footer
  const onChangeMessage = ({ target }) => {
    setMessage(target.value);
  };

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" ref={finalChat} id="message-list">
        {messages.map((message, index) => (
          <Message
            message={message}
            nextMessage={messages[index + 1]}
            botTyping={botState}
          />
        ))}
        {botState ? <TypingMessage /> : null}
      </div>
      <Footer
        message={message}
        sendMessage={sendMessage}
        onChangeMessage={onChangeMessage}
      />
    </div>
  );
}

export default Messages;
