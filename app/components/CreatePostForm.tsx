import { ListButton, List, ListInput } from "konsta/react";
import { Form } from "@remix-run/react";

export default function CreatePostForm({ errors, data }: { errors: any, data: any }) {
  return (
    <Form id="create-form" method="post" key={data}>
      <List strongIos insetIos>
        <ListInput
          name="heading"
          label="Title"
          type="text"
          placeholder="Title"
          error={errors && errors.heading && errors.heading[0]}
        />
        <ListInput
          name="videoUrl"
          label="Video Url"
          type="text"
          placeholder="URL"
          error={errors && errors.videoUrl && errors.videoUrl[0]}
        />
        <ListInput
          name="content"
          label="Short description"
          type="textarea"
          placeholder="Description..."
          inputClassName="!h-20 resize-none"
          error={errors && errors.content && errors.content[0]}
        />
        <div className="mt-4">
          <ListButton type="submit" className="">
            Save
          </ListButton>
        </div>
      </List>
    </Form>
  );
}
