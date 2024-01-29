import { getUserData } from "~/utils/session.server";

import qs from "qs";

const query = qs.stringify({
  populate: {
    bio: {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
      }
    }
  },
});

export async function userme(request: Request) {
  const user = await getUserData(request);
  if (!user) return null;

  const baseUrl = process.env.API_URL || "http://127.0.0.1:1337";
  const path = `/api/users/me?${query}`;

  try {
    const userRequest = await fetch(baseUrl + path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.jwt}`,
      },
    });

    const userData = await userRequest.json();
    userData.jwt = user.jwt;
    return userData;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user data");
  }
}