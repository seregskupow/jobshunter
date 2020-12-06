import { GetServerSidePropsContext } from "next";

export default async function MyGet(
  url: string,
  ctx: GetServerSidePropsContext
) {
  const cookie = ctx.req?.headers.cookie;
  const resp = await fetch(url, {
    headers: {
      cookie: cookie!,
    },
    credentials: "include",
  });
  if (resp.status === 401) {
    // ctx.res?.writeHead(302,{
    //   Location :'http://localhost:3000/'
    // })
    ctx.res?.end();
    return;
  }
  const json = await resp.json();
  console.log(json);
  return json;
}
