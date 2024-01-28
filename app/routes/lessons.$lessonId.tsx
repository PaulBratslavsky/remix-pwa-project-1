import qs from "qs";

import YouTubePlayer from "~/components/YouTubePlayer";

import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Page, Navbar, Block, BlockTitle, BlockFooter } from "konsta/react";

import BackButton from "~/components/BackButton";
import { getStrapiURL, flattenAttributes } from "~/utils/api-helpers";
import RichText from "~/components/RichText";
import Editor from "~/components/Editor";

const markdown = `
# Basic Double Leg Takedown in Wrestling

## Overview
The double leg takedown is one of the most common and effective moves in wrestling. It involves penetrating your opponent's defense and using your body to bring them down to the mat.

## Steps

### Step 1: Stance and Position
- Start in a good wrestling stance: knees bent, back straight, and head up.
- Stay light on your feet, ready to move quickly.

### Step 2: Penetration Step
- Take a big step towards your opponent with your lead foot.
- Lower your level as you step, bringing your hips in line with your opponent.

### Step 3: Grabbing the Legs
- Reach both arms around your opponent’s legs.
- Aim to grab behind the knees for a firm grip.

### Step 4: The Lift
- Drive forward with your legs, lifting your opponent off the ground.
- Keep your back straight and head up while lifting.

### Step 5: The Takedown
- As you lift, push forward and slightly to the side.
- Use your body weight to bring your opponent down to the mat.

### Step 6: Control on the Mat
- Once your opponent is on the mat, quickly transition to a controlling position.
- Stay on top and maintain pressure to prevent them from escaping.

## Tips
- Speed and timing are crucial for a successful double leg takedown.
- Practice your penetration step to close the distance quickly.
- Keep a strong grip on your opponent’s legs throughout the move.

`;

const query = qs.stringify({
  fields: ["title", "description", "videoUrl"],
  populate: {
    user_bio: {
      fields: ["name", "belt"],
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
      },
    },
  },
});

export async function loader({ params }: LoaderFunctionArgs) {
  const lessonId = params.lessonId;
  const strapiUrl = getStrapiURL();
  const url = strapiUrl + "/api/lessons/" + lessonId + "?" + query;
  const res = await fetch(url);
  const data = await res.json();
  const flattenedData = flattenAttributes(data);
  return json({ ...flattenedData, strapiUrl });
}

export default function LessonDynamicRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const lesson = loaderData;

  return (
    <Page className="bg-white pb-24">
      <Navbar
        title={lesson.title.slice(0, 34) + "..."}
        right={<BackButton />}
      />

      <YouTubePlayer
        key={lesson.id}
        playerKey={lesson.id}
        url={lesson.videoUrl}
        className="-my-5.75 sticky top-5 z-50"
      />

      <Editor />
      <BlockTitle>{lesson.title}</BlockTitle>
      <BlockFooter className="text-gray-500 mt-6 mb-3">
        Posted on January 21, 2021
      </BlockFooter>
      <Block>
        <p>{lesson.description}</p>
      </Block>
      <Block>
        <RichText content={markdown} />
      </Block>
    </Page>
  );
}
