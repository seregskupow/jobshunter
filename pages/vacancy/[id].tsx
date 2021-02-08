import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { ImLocation } from "react-icons/im";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import GridColumn from "../../components/Layout elements/GridContainer/GridColumn";
import GridContainer from "../../components/Layout elements/GridContainer/GridContainer";
import Layout, {
  variants,
} from "../../components/Layout elements/Layout/Layout";
import MainContainer from "../../components/Layout elements/MainContainer";
import { withTranslation, Link } from "../../i18n";
import Panel from "../../components/Layout elements/Panel";
import MyGet from "../api/myGet";
import "../../styles/pages/vacancyPage.scss";
import Button from "../../components/Components/Buttons/Button/Button";

const Vacancy = ({ id, vacancy, companyDescription }) => {
  const [showContacts, setShowContacts] = useState(false);
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="vacancy__page__container m-y-20"
    >
      <MainContainer>
        <GridContainer>
          <GridColumn>
            <aside className="sticky__filter">
              <Panel padding={10}>
                <div className="short__company__description">
                  <div className="company__image">
                    <LazyLoadImage
                      alt={companyDescription?.name}
                      src={companyDescription?.logo}
                      effect="blur"
                    />
                  </div>
                  <div className="m-t-10">
                    <Link href="#">
                      <a className="company__link">
                        {companyDescription?.name}
                      </a>
                    </Link>
                  </div>
                  <div className="m-t-10">
                    {showContacts ? (
                      <>
                        <p>
                          <span className="info__label">Телефон: </span>
                          {companyDescription?.phone}
                        </p>
                        <p>
                          <span className="info__label">Вебсайт: </span>
                          <a
                            href={companyDescription?.website}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {companyDescription?.website}
                          </a>
                        </p>
                        <p>
                          <span className="info__label">Місто: </span>
                          {companyDescription?.location}
                        </p>
                      </>
                    ) : (
                      <>
                        <Button
                          text="Показати контакти"
                          event={() => setShowContacts(true)}
                          color="default"
                        />
                      </>
                    )}
                  </div>
                </div>
              </Panel>
              <div className="btn-apply m-y-10">
                <Button text="Відгукнутися" color="contrast" event={() => {}} />
              </div>
            </aside>
          </GridColumn>
          <GridColumn>
            <div className="banner">
              <div className="banner__img__container">
                <LazyLoadImage
                  alt={companyDescription?.name}
                  className="banner__img"
                  src="https://i.work.ua/employer_design/8/4/0/101840_page_company_header_30.png"
                  // effect="blur"
                  placeholderSrc="/images/error/error_placeholder.png"
                />
              </div>
            </div>
            <Panel padding={0}>
              <section className="job__title__container">
                <h1 className="job__title">{vacancy?.title}</h1>
              </section>
              <div className="p-15">
                <section className="short__info">
                  <div className="contact__info">
                    <p>
                      <span>
                        <span className="icon">
                          <FcMoneyTransfer />
                        </span>{" "}
                        Зарплата: 15000$
                      </span>
                    </p>
                    <p>
                      <span>
                        <span className="icon">
                          <ImLocation />
                        </span>{" "}
                        Адреса: м.Київ
                      </span>
                    </p>
                    <p>Контактне лице</p>
                    <p>
                      <span className="icon">
                        <AiOutlineUser />
                      </span>
                      Володя Путін
                    </p>
                    <p>
                      <span className="icon">
                        <AiOutlineMail />
                      </span>
                      putin@mail.com
                    </p>
                    <p>
                      <span className="icon">
                        <FaPhoneAlt />
                      </span>
                      8-8000-535-35-35
                    </p>
                  </div>
                </section>
                {/* <section className="features">
                  <div className="section__title__container">
                    <h2 className="section__title">Особливості вакансії</h2>
                  </div>
                </section> */}
                <section className="job__description__section">
                  <div className="section__title__container">
                    <h2 className="section__title">Опис вакансії</h2>
                  </div>
                  <div
                    className="job__description"
                    dangerouslySetInnerHTML={{ __html: vacancy?.description }}
                  ></div>
                </section>
              </div>
            </Panel>
          </GridColumn>
        </GridContainer>
      </MainContainer>
    </motion.div>
  );
};
Vacancy.Layout = Layout;
export default Vacancy;
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const { data } = await MyGet(`${process.env.SERVER}/api/vacancy/${id}`, ctx);

  return {
    props: {
      vacancy: data?.vacancy,
      companyDescription: data?.companyDescription,
    },
  };
};
// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: "544" } }],
//     fallback: true,
//   };
// }
// export async function getStaticProps({ params }) {
//   const { id } = params;
//   return {
//     props: { id },
//   };
// }
