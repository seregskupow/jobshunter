import { motion } from "framer-motion";
import { Link, withTranslation } from "../i18n";
import Layout, { variants } from "../components/Layout elements/Layout/Layout";
import MainContainer from "../components/Layout elements/MainContainer";
import GridContainer from "../components/Layout elements/GridContainer/GridContainer";
import GridColumn from "../components/Layout elements/GridContainer/GridColumn";
import WhitePanel from "../components/Layout elements/WhitePanel";

function Home({ t }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <MainContainer>
        <h1>{t("common:title")}</h1>
        <h2>{t("indexPage:header")}</h2>
        <Link href="/blog/blog2">
          <a>index</a>
        </Link>
        <GridContainer>
          <GridColumn>
            <WhitePanel width={100}>
              <p style={{ fontSize: "2rem" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                sed sit autem, impedit inventore necessitatibus illo, ut rem
                laborum exercitationem suscipit quas vitae doloribus enim?
                Aliquid, suscipit, molestiae nam temporibus vel voluptatum
                eligendi, natus unde reiciendis eum labore accusamus ex
                perferendis exercitationem ipsum! Perferendis, molestias?
                Consequatur pariatur quaerat quod quisquam?
              </p>
            </WhitePanel>
          </GridColumn>
          <GridColumn>
            <WhitePanel width={100}>
              <p style={{ fontSize: "2rem" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reprehenderit optio quam doloremque eos, molestias iste culpa
                assumenda praesentium labore nulla iusto quas perspiciatis qui
                nihil voluptatum recusandae est facere magnam eius natus nam
                nemo repudiandae quibusdam saepe. Illum architecto earum
                pariatur? Voluptas, voluptatibus suscipit. Architecto ad
                reiciendis sint. Sit, magni?
              </p>
            </WhitePanel>
          </GridColumn>
        </GridContainer>
      </MainContainer>
    </motion.div>
  );
}
Home.getInitialProps = async () => {
  return {
    namespacesRequired: ["common", "indexPage"],
  };
};
Home.Layout = Layout;
export default withTranslation()(Home);
