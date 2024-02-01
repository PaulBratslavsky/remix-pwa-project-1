import { useNavigate } from "@remix-run/react";
import { List, ListItem } from "konsta/react";
import { format } from "date-fns";

interface TopicProps {
  topic: {
    id: number;
    heading: string;
    content: string;
    public: boolean;
    createdAt: string;
    userBio: {
      id: number;
      name: string;
      belt: string;
    };
  };
}

interface TopicsProps {
  topics: TopicProps[];
}

function TopicItem({ topic }: Readonly<TopicProps>) {
  const user = topic.userBio;
  const navigate = useNavigate();
  const name = user.name;
  const belt = user.belt.toLowerCase();

  return (
    <ListItem
      link
      chevronMaterial={false}
      title={topic.heading}
      after={format(new Date(topic.createdAt), "dd/MM/yyyy")}
      subtitle={name + " - " + belt + " belt"}
      text={topic.content}
      onClick={() => navigate("/forum/" + topic.id)}
    />
  );
}

export default function TopicsList({ topics }: Readonly<TopicsProps>) {
  if (!topics) return null;
  return (
    <List strongIos outlineIos className="-mt-1">
      {topics.map((topic: any) => (
        <TopicItem key={topic.id} topic={topic} />
      ))}
    </List>
  );
}
