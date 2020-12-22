import { GetServerSidePropsContext } from "next";
import axios from "axios";

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
      return [null, null];
    }
    const data = await resp.json();
    return [data, ""];
  } catch (error) {
    return [null, "server error occured"];
  }
}
