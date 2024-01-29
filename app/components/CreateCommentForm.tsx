import { ListButton, List, ListInput } from "konsta/react";
import { Form } from "@remix-run/react";

export function CreateCommentForm({ errors, data }: { errors: any, data: any }) {
  return (
    <Form id="create-form" method="post" key={data}>
      <List strongIos insetIos>
        <ListInput
          name="comment"
          label="Comment"
          type="text"
          placeholder="Comment"
          error={errors && errors.title && errors.title[0]}
        />
        <div className="mt-4">
          <ListButton type="submit" className="">
            Leave Comment
          </ListButton>
        </div>
      </List>
    </Form>
  );
}
