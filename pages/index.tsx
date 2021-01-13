import { motion } from "framer-motion";
import { Link, withTranslation } from "../i18n";
import Layout, { variants } from "../components/Layout elements/Layout/Layout";
import MainContainer from "../components/Layout elements/MainContainer";
import GridContainer from "../components/Layout elements/GridContainer/GridContainer";
import GridColumn from "../components/Layout elements/GridContainer/GridColumn";
import WhitePanel from "../components/Layout elements/Panel";
import "../styles/pages/homePage.scss";
import Search from "../components/Components/Search";
import TypeWriter from "../components/Components/TypeWriter";

const categoryLinks = [
  {
    title: "Містом",
    img: "/images/homepage/searchBy/city.jpg",
    link: "#",
  },
  {
    title: "Рубрикою",
    img: "/images/homepage/searchBy/rubric.jpg",
    link: "#",
  },
  {
    title: "Професією",
    img: "/images/homepage/searchBy/profession.jpg",
    link: "#",
  },
  {
    title: "Графіком",
    img: "/images/homepage/searchBy/time.jpg",
    link: "#",
  },
];
function Home({ t }) {
  console.log("Index rendered");
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <section className="header">
        <MainContainer>
          <div className="mb-20">
            <TypeWriter
              text={[
                "Ти можеш бути ким захочеш",
                "Обери професію мрії",
                "Досягни успіху",
                "Зростай професійно",
              ]}
            />
          </div>
          <Search />
        </MainContainer>
      </section>
      <section className="search-by">
        <h2>Шукай професію за...</h2>
        <div className="categories__links__container">
          {categoryLinks.map(({ title, img, link }, index) => (
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              key={title}
              className="category__link__wrapper"
            >
              <Link href={link}>
                <a className="category__link btn__click">
                  <img src={img} alt="" />
                  <span>{title}</span>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
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
