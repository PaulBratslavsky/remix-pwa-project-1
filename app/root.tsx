import tailwind from "./tailwind.css";
import { App as KonstaApp, Page, Navbar } from "konsta/react";
import { useSWEffect, LiveReload } from "@remix-pwa/sw";

import type { LinksFunction } from "@remix-run/node";
import BottomMenu from "~/components/BottomMenu";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
];

export default function App() {
  useSWEffect();
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
        <KonstaApp theme="ios" className="dark md:hidden">
          <Page>
            <Navbar title="BJJ & Friends" />
            <Outlet />
            <BottomMenu />
          </Page>
        </KonstaApp>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
