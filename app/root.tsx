import tailwind from "./tailwind.css";
import { App as KonstaApp, Page, Navbar } from "konsta/react";
import { useSWEffect, LiveReload } from "@remix-pwa/sw";
import { getStrapiURL } from "~/utils/api-helpers";
import { userme } from "~/api/auth/userme.server";
import { useLocation } from "@remix-run/react";

import {
  type LinksFunction,
  type LoaderFunctionArgs,
  json,
} from "@remix-run/node";
import BottomMenu from "~/components/BottomMenu";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const strapiUrl = getStrapiURL();
  const user = await userme(request);
  return json({ user, strapiUrl });
}

export default function App() {
  useSWEffect();
  const location = useLocation();
  const hidden = location.pathname.indexOf("/forum/");
  console.log(location);
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/resources/manifest" />
        <Meta />
        <Links />
      </head>
      <body className="max-w-md mx-auto">
        {/* Message for medium or larger screens */}
        <div className="hidden md:flex justify-center items-center h-screen">
          Please view on a mobile device
        </div>
        <KonstaApp theme="ios" className=" md:hidden">
          <Page>
            <Navbar title="BJJ & Friends" />
            <Outlet />
            {hidden && <BottomMenu />}
          </Page>
        </KonstaApp>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
