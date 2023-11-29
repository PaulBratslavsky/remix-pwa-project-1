import { List, ListItem } from "konsta/react";
import { format } from 'date-fns';

interface TopicProps {
  readonly topic: any;
}

interface TopicsProps {
  readonly topics: any;
}
function TopicItem({ topic }: TopicProps) {
  console.dir(topic);

  const user = topic.attributes.user_bio.data;
  const name = user.attributes.name;
  const belt = user.attributes.belt.toLowerCase();

  return (
    <ListItem
      link
      chevronMaterial={false}
      title={topic.attributes.title}
      after={format(new Date(topic.attributes.createdAt), 'dd/MM/yyyy')}
      subtitle={name + " - " + belt + " belt"}
      text={topic.attributes.description}
    />
  );
}

export default function TopicsList({ topics }: TopicsProps) {
  if (!topics) return null;
  return (
    <List strongIos outlineIos>
      {topics.map((topic: any) => (
        <TopicItem key={topic.id} topic={topic} />
      ))}
    </List>
  );
}
