/* eslint-disable react/no-array-index-key */
import { useState, useRef, useEffect } from "react";
import { MessageSquare, SendHorizonal } from "lucide-react";
import {
  Page,
  Navbar,
  Messagebar,
  Messages,
  Message,
  Link,
  Icon,
} from "konsta/react";

import BackButton from "~/components/BackButton";

export default function MessagesPage() {
  const [messageText, setMessageText] = useState("");
  const [messagesData, setMessagesData] = useState([
    {
      type: "sent",
      text: "Hi, Kate",
    },
    {
      type: "sent",
      text: "How are you?",
    },
    {
      name: "Kate",
      type: "received",
      text: "Hi, I am good!",
      avatar: "https://cdn.framework7.io/placeholder/people-100x100-9.jpg",
    },
    {
      name: "Blue Ninja",
      type: "received",
      text: "Hi there, I am also fine, thanks! And how are you?",
      avatar: "https://cdn.framework7.io/placeholder/people-100x100-7.jpg",
    },
    {
      type: "sent",
      text: "Hey, Blue Ninja! Glad to see you ;)",
    },
    {
      type: "sent",
      text: "How do you feel about going to the movies today?",
    },
    {
      name: "Kate",
      type: "received",
      text: " Oh, great idea!",
      avatar: "https://cdn.framework7.io/placeholder/people-100x100-9.jpg",
    },
    {
      name: "Kate",
      type: "received",
      text: " What cinema are we going to?",
      avatar: "https://cdn.framework7.io/placeholder/people-100x100-9.jpg",
    },
    {
      name: "Blue Ninja",
      type: "received",
      text: "Great. And what movie?",
      avatar: "https://cdn.framework7.io/placeholder/people-100x100-7.jpg",
    },
    {
      name: "Blue Ninja",
      type: "received",
      text: "What time?",
      avatar: "https://cdn.framework7.io/placeholder/people-100x100-7.jpg",
    },
  ]);

  const pageRef = useRef();
  const initiallyScrolled = useRef(false);

  const scrollToBottom = () => {
    const pageElement = pageRef.current?.current || pageRef.current?.el;
    pageElement.scrollTo({
      top: pageElement.scrollHeight - pageElement.offsetHeight,
      behavior: initiallyScrolled.current ? "smooth" : "auto",
    });
  };

  useEffect(() => {
    scrollToBottom();
    initiallyScrolled.current = true;
  }, [messagesData]);

  const handleSendClick = () => {
    const text = messageText.replace(/\n/g, "<br>").trim();
    const type = "sent";
    const messagesToSend = [];
    if (text.length) {
      messagesToSend.push({
        text,
        type,
      });
    }
    if (messagesToSend.length === 0) {
      return;
    }
    setMessagesData([...messagesData, ...messagesToSend]);
    setMessageText("");
  };

  const inputOpacity = messageText ? 1 : 0.3;
  const isClickable = messageText.trim().length > 0;

  // const currentDate = new Intl.DateTimeFormat("en-US", {
  //   weekday: "long",
  //   month: "short",
  //   day: "numeric",
  //   hour12: false,
  //   hour: "2-digit",
  //   minute: "2-digit",
  // })
  //   .formatToParts(new Date())
  //   .map((part) => {
  //     if (["weekday", "month", "day"].includes(part.type)) {
  //       return <b key={part.type}>{part.value}</b>;
  //     }
  //     return part.value;
  //   });

  /* <MessagesTitle>{currentDate}</MessagesTitle> */

  return (
    <Page className="ios:bg-white ios:dark:bg-black" ref={pageRef}>
      <Navbar title="Messages" right={<BackButton />} />
      <Messages>
        {messagesData.map((message, index) => (
          <Message
            key={index}
            type={message.type}
            name={message.name}
            text={message.text}
            avatar={
              message.type === "received" && (
                <img
                  alt="avatar"
                  src={message.avatar}
                  className="w-8 h-8 rounded-full"
                />
              )
            }
          />
        ))}
      </Messages>
      <Messagebar
        placeholder="Message"
        value={messageText}
        onInput={(e) => setMessageText(e.target.value)}
        left={
          <Link onClick={() => console.log("click")} toolbar iconOnly>
            <Icon
              ios={<MessageSquare className="w-7 h-7" />}
              material={
                <MessageSquare className="w-7 h-7 fill-black dark:fill-md-dark-on-surface" />
              }
            />
          </Link>
        }
        right={
          <Link
            onClick={isClickable ? handleSendClick : undefined}
            toolbar
            style={{
              opacity: inputOpacity,
              cursor: isClickable ? "pointer" : "default",
            }}
          >
            <Icon
              ios={<SendHorizonal className="w-7 h-7" />}
              material={
                <SendHorizonal className="w-7 h-7 fill-black dark:fill-md-dark-on-surface" />
              }
            />
          </Link>
        }
      />
    </Page>
  );
}
