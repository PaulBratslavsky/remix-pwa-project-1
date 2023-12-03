import { type LoaderFunctionArgs, redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Navbar, Block, List, ListInput } from "konsta/react";
import { userme } from "~/api/auth/userme.server";
import { getStrapiURL } from "~/utils/api-helpers";

import BackButton from "~/components/BackButton";
import StrapiImage from "~/components/StrapiImage";

export async function loader({ request }: LoaderFunctionArgs) {
  const strapiUrl = getStrapiURL();
  const user = await userme(request);
  if (!user) return redirect("/login");
  return json({ user, strapiUrl });
}

export default function ProfileRoute() {
  const data = useLoaderData<typeof loader>();
  const { name, bio, image, belt, stripes } = data.user.bio;

  return (
    <Page>
      <Navbar title="Profile" right={<BackButton />} />
      <Block className="mt-24">
        <div className="w-full">
          <Block className="flex justify-center items-center">
            <StrapiImage
              className="ios:rounded-lg material:rounded-full ios:w-1/3 material:w-1/3"
              url={image.url}
              alt={image.alternativeText}
              strapiUrl={data.strapiUrl}
            />
          </Block>

          <List strongIos insetIos>
            <ListInput
              label="Name"
              outline
              type="text"
              placeholder="Your name"
              defaultValue={name}
            />

            <ListInput
              name="belt"
              outline
              label="Belt"
              type="select"
              dropdown
              defaultValue={belt}
              placeholder="Please choose..."
            >
              <option value="WHITE">White</option>
              <option value="BLUE">Blue</option>
              <option value="PURPLE">Purple</option>
              <option value="BROWN">Brown</option>
              <option value="BLACK">Black</option>
            </ListInput>

            <ListInput
              name="stripes"
              outline
              label="Stripes"
              type="select"
              dropdown
              defaultValue={stripes}
              placeholder="Please choose..."
            >
              <option value="ONE">1</option>
              <option value="TWO">2</option>
              <option value="THREE">3</option>
              <option value="FOUR">4</option>
            </ListInput>

            <ListInput
              outline
              label="Bio"
              type="textarea"
              placeholder="Bio"
              inputClassName="!h-20 resize-none"
              defaultValue={bio}
            />
          </List>
        </div>
      </Block>
    </Page>
  );
}
