import qs from "qs";
import { useState, useRef, useEffect } from "react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";

import { FiSend } from "react-icons/fi";

import {
  Page,
  Navbar,
  Messagebar,
  Messages,
  Message,
  MessagesTitle,
  Icon,
} from "konsta/react";

import BackButton from "~/components/BackButton";
import { getStrapiURL, flattenAttributes } from "~/utils/api-helpers";

const query = qs.stringify({});

export async function loader({ params }: LoaderFunctionArgs) {
  const forumId = params.forumId;
  const strapiUrl = getStrapiURL();

  const url = strapiUrl + "/api/topics/" + forumId + "?" + query;
  const res = await fetch(url);
  const data = await res.json();
  const flattenedData = flattenAttributes(data);
  return json({ ...flattenedData, strapiUrl });
}

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const message = formData.get("message");
  console.log(message);
  return json({ message: message });
}

export default function LessonDynamicRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  console.log(fetcher.data, "fetcher.data");

  const [messageText, setMessageText] = useState("");
  const [messagesData, setMessagesData] = useState([
    { type: "sent", text: "Hi, Kate" },
    { type: "sent", text: "How are you?" },
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
    { type: "sent", text: "Hey, Blue Ninja! Glad to see you ;)" },
    { type: "sent", text: "How do you feel about going to the movies today?" },
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

  const { title } = loaderData;
  const pageRef = useRef();
  const initiallyScrolled = useRef(false);

  const scrollToBottom = () => {
    const pageElement = pageRef?.current?.current || pageRef?.current?.el;

    pageElement.scrollTo({
      top: pageElement.scrollHeight - pageElement.offsetHeight,
      behavior: initiallyScrolled.current ? "smooth" : "auto",
    });
  };

  useEffect(() => {
    scrollToBottom();
    initiallyScrolled.current = true;
  }, [messagesData]);

  const inputOpacity = messageText ? 1 : 0.3;
  const isClickable = messageText.trim().length > 0;

  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  })
    .formatToParts(new Date())
    .map((part) => {
      if (["weekday", "month", "day"].includes(part.type)) {
        return <b key={part.type}>{part.value}</b>;
      }
      return part.value;
    });

  return (
    <Page className="ios:bg-white ios:dark:bg-black" ref={pageRef}>
      <Navbar title={title.slice(0, 32) + "..."} right={<BackButton />} />
      <Messages>
        <MessagesTitle>{currentDate}</MessagesTitle>
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
      <fetcher.Form method="POST" key={fetcher.data as string}>
        <Messagebar
          placeholder="Message"
          defaultValue={messageText}
          name="message"
          right={
            <button
              className="w-10 h-10 font-primary flex items-center justify-center"
              type="submit"
              style={{
                opacity: inputOpacity,
                cursor: isClickable ? "pointer" : "default",
              }}
            >
              <Icon
                ios={<FiSend className="w-7 h-7" />}
                material={
                  <FiSend className="w-6 h-6 fill-black dark:fill-md-dark-on-surface" />
                }
              />
            </button>
          }
        />
      </fetcher.Form>
    </Page>
  );
}
