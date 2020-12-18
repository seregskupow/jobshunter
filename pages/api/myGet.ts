import { GetServerSidePropsContext } from "next";
import axios from "axios";

export default async function MyGet(
  url: string,
  ctx: GetServerSidePropsContext
) {
  const cookie = ctx.req?.headers.cookie;
  // const resp = await fetch(url, {
  //   headers: {
  //     cookie: cookie!,
  //   },
  //   credentials: "include",
  // });
  try {
    const { data, status } = await axios.get(url, {
      headers: {
        cookie,
      },
      validateStatus: () => true,
      withCredentials: true,
    });
    if (status === 401) {
      ctx.res?.writeHead(302, {
        Location: "http://localhost:3000/auth/login",
      });
      ctx.res?.end();
      return [null, null];
    }
    return [data, ""];
  } catch (error) {
    return [null, "server error occured"];
  }
}
