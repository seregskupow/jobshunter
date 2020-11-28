import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  GetServerSideProps,
  NextPageContext,
  InferGetServerSidePropsType,
} from "next";

import { GetServerSidePropsContext } from "next-redux-wrapper";
import Layout from "../components/Layout elements/Layout/Layout";
import { Router, withTranslation } from "../i18n";
import "react-lazy-load-image-component/src/effects/blur.css";
import MainContainer from "../components/Layout elements/MainContainer";
import GridContainer from "../components/Layout elements/GridContainer/GridContainer";
import GridColumn from "../components/Layout elements/GridContainer/GridColumn";
import WhitePanel from "../components/Layout elements/WhitePanel";
import { MyGet } from "./api/myGet";

function vacancylist({
  posts,
  searchKeyword,
  t,
}: // eslint-disable-next-line no-use-before-define
InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <MainContainer>
      <h1>{t("vacancyListPage:title")}</h1>
      <GridContainer>
        <GridColumn>
          {posts &&
            posts.slice(0, 20).map((post) => (
              <WhitePanel key={Math.random()} margin={8}>
                <div className="col-12 mb-3">
                  <div
                    className="card"
                    style={{ width: "100%" }}
                    key={Math.random()}
                  >
                    <LazyLoadImage
                      alt="..."
                      src={post.url}
                      effect="blur"
                      style={{ height: "300px", width: "100%" }}
                    />
                    <div className="card-body">
                      <p
                        className="card-text"
                        style={{ fontWeight: "bold", color: "#1A6DCF" }}
                      >
                        {post.title}
                      </p>
                    </div>
                  </div>
                </div>
              </WhitePanel>
            ))}
        </GridColumn>
        <GridColumn>
          <WhitePanel>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, ullam
            repudiandae porro commodi, quam enim itaque iste quo voluptate
            similique libero culpa alias quod incidunt excepturi ab odio,
            nesciunt dolorum dolor sapiente delectus. Labore accusamus
            praesentium minima autem tenetur culpa obcaecati quod quidem. Fugit,
            cumque. Quaerat quo obcaecati perferendis recusandae?
          </WhitePanel>
        </GridColumn>
      </GridContainer>
    </MainContainer>
  );
}
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { query } = ctx;
  // search Jeyword from url or search
  const searchKeyword: string =
    query.search === undefined ? "" : query.search.toString();
  // limit for posts
  const limit: number =
    query.limit === undefined ? 5 : parseInt(query.limit.toString(), 10);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_limit=${limit}`
  );
  const posts = await res.json();
  return {
    props: {
      posts,
      searchKeyword,
      namespacesRequired: ["common", "vacancyListPage"],
    },
  };
};
vacancylist.Layout = Layout;
export default withTranslation("common")(vacancylist);
