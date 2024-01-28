import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import z from "zod";
import { json, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import logoImage from "~/assets/bjjandfriends.jpg";
import { login } from "~/api/auth/login.server";
import { getUserData } from "~/utils/session.server";
import { Page, Navbar, List, ListInput, Button, Block } from "konsta/react";
import { User, Lock } from "lucide-react";
import BackButton from "~/components/BackButton";
import { StyleWrapper } from "~/components/StyleWrapper";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserData(request);
  if (user) return redirect("/profile");
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const data = {
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  };

  const formSchema = z.object({
    identifier: z.string().min(1).max(255),
    password: z.string().min(1).max(255),
  });

  const validatedFields = formSchema.safeParse({
    identifier: data.identifier,
    password: data.password,
  });

  if (!validatedFields.success) {
    return json({
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fill out all missing fields.",
    });
  }

  const response = (await login(data)) as any;

  if (response.error)
    return json({
      errors: response.error,
      message: response.error.message,
    });

  return response;
}

export default function LoginRoute() {
  const actionData = useActionData<typeof action>();
  const errors = actionData?.errors;
  const message = actionData?.message;
  return (
    <Page>
      <Navbar title="Login" right={<BackButton />} />
      <Block className="flex justify-center items-center h-[calc(100vh-138px)]">
        <Form method="post" className="w-full">
          <Block className="flex justify-center items-center">
            <img
              src={logoImage}
              alt="BJJ and Friends Logo"
              className="rounded-full overflow-hidden h-24 w-24"
            />
          </Block>
          <List strongIos insetIos className="py-8">
            <StyleWrapper className="mb-6">
              <ListInput
                name="identifier"
                type="text"
                placeholder="Your name"
                media={<User />}
                error={errors?.identifier}
              />
            </StyleWrapper>

            <StyleWrapper className="mb-6">
              <ListInput
                name="password"
                type="password"
                placeholder="Your password"
                media={<Lock />}
                error={errors?.password}
              />
            </StyleWrapper>
          </List>
          <StyleWrapper className="m-4">
            <Button large rounded>
              Signin
            </Button>
          </StyleWrapper>
          {message && (
            <p className="text-center text-red-500 py-4">{message}</p>
          )}
        </Form>
      </Block>
    </Page>
  );
}
