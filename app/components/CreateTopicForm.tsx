import { ListButton, List, ListInput } from "konsta/react";
import { Form } from "@remix-run/react";

export default function CreateTopicForm({ errors, data }: { errors: any, data: any }) {
  return (
    <Form id="create-form" method="post" key={data}>
      <List strongIos insetIos>
        <ListInput
          name="title"
          label="Topic Title"
          type="text"
          placeholder="Title"
          error={errors && errors.title && errors.title[0]}
        />
      
        <ListInput
          name="description"
          label="Topic"
          type="textarea"
          placeholder="Topic..."
          inputClassName="!h-20 resize-none"
          error={errors && errors.description && errors.description[0]}
        />
        <div className="mt-4">
          <ListButton type="submit" className="">
            Create Topic
          </ListButton>
        </div>
      </List>
    </Form>
  );
}
