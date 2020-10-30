import { GetServerSideProps  } from "next";
import { InferGetServerSidePropsType } from 'next'
import Layout from "../components/Layout elements/Layout/Layout";
import { signIn, signOut, useSession } from "next-auth/client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
export default function vacancylist({
  posts,
  searchKeyword
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [session, loading] = useSession();
  return (
    <>
      {loading && <>loading</>}
      {!session && <>who the fuck are you</>}
      {session && <>{session.user.name} Its me, mario</>}
      <div className="row">
        {posts &&
          posts.slice(0, 20).map((post) => (
            <div className="col col-sm-10 col-md-5 m-2">
              <div
                className="card"
                style={{ width: "100%" }}
                key={Math.random()}
              >
                <LazyLoadImage
                  alt="..."
                  src={post.url}
                  effect="blur"
                  width={"100%"}
                />
                <div className="card-body">
                  <p className="card-text">{post.title}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps  = async ({query}) => {
  const searchKeyword:string = query.search ===undefined ? "" : query.search.toString();
  const limit:number = query.limit === undefined ? 5 : parseInt(query.limit.toString());
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}`);
  const posts = await res.json();
  return {
    props: {
      posts,
      searchKeyword
    },
  };
};
