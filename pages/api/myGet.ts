import { GetServerSidePropsContext} from "next";

export async function MyGet(url:string,ctx:GetServerSidePropsContext){
    const cookie = ctx.req?.headers.cookie;
    console.log({cookie})
    const resp = await fetch(url,{
      headers:{
        cookie:cookie!,
        credentials:'include'
      }
    });
    if(resp.status === 401){
      // ctx.res?.writeHead(302,{
      //   Location :'http://localhost:3000/'
      // })
      ctx.res?.end();
      return;
    }
    const json = await resp.json()
    return json;
  }