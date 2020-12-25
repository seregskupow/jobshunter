import { GetServerSidePropsContext } from "next";
import axios from "axios";

/**
 * @remarks Makes get request and checks if authorized
 * @param url
 * @param ctx
 * @returns Returns {data:<server response>, error: <error message>}
 */
export default async function MyGet(
  url: string,
  ctx: GetServerSidePropsContext
) {
  const cookie = ctx.req?.headers.cookie;
  try {
    const resp = await fetch(url, {
      headers: {
        cookie: cookie!,
      },
      credentials: "include",
    });
    if (resp.status === 401) {
      ctx.res
        ?.writeHead(302, {
          Location: "http://localhost:3000/auth/login",
        })
        .end();
      return { data: null, error: "unathorized" };
    }
    const data = await resp.json();
    return { data, error: "" };
  } catch (error) {
    return { data: null, error: "server error occured" };
  }
}
