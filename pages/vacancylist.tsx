import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import useSWR from "swr";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import { ReactNode, useState } from "react";
import deepEqual from "fast-deep-equal";
import { TFunction } from "next-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
import Layout, { variants } from "../components/Layout elements/Layout/Layout";
import { withTranslation } from "../i18n";
import "react-lazy-load-image-component/src/effects/blur.css";
import MainContainer from "../components/Layout elements/MainContainer";
import GridContainer from "../components/Layout elements/GridContainer/GridContainer";
import GridColumn from "../components/Layout elements/GridContainer/GridColumn";
import Panel from "../components/Layout elements/Panel";
import MyGet from "./api/myGet";
import VacancyCard, {
  VacancyCardProps,
} from "../components/Components By Page/Vacancies components/VacancyCard";
import Filter, {
  InitialFilterValues,
} from "../components/Components By Page/Vacancies components/Filter";
import getAsString from "../helpers/getAsString";
import { Option } from "../components/Components/FormsComponents/Select";
import Search from "../components/Components/Search";
import "../styles/pages/vacancylist.scss";
import FilterActiveBadges from "../components/Components By Page/Vacancies components/FilterActiveBadges";

interface vacancyListProps {
  vacancies: [];
  category: string;
  categories: Array<Option>;
  subCategories: Array<Option>;
  initialSubcategories: Array<number>;
  errors: Array<string>;
  serverQuery: string;
  readonly t: TFunction;
  Layout: any;
}
interface PageComponent<T> extends React.FC<T> {
  Layout: ReactNode;
}

const vacancylist: PageComponent<vacancyListProps> = ({
  vacancies,
  category,
  initialSubcategories,
  categories,
  subCategories,
  serverQuery,
  errors,
  t,
}) => {
  const { query } = useRouter();
  const { data } = useSWR(`/jobs?${stringify(query)}`, {
    dedupingInterval: 2000,
    initialData: deepEqual(query, serverQuery) ? vacancies : undefined,
  });
  const [initialFilterValues] = useState<InitialFilterValues>({
    category: getAsString(query.category) || "123",
    subcategories:
      query.subcategories
        ?.toString()
        .split(",")
        .filter((x) => x !== "")
        .map((x) => +x) || [],
    salary: +getAsString(query.salary) || 0,
  });
  return (
    <MainContainer>
      <div className="banner">
        <h1 className="banner__title">Знайди роботу мрії</h1>
      </div>
      <div className="m-y-20">
        <Search />
      </div>
      <div className="m-y-20">
        <FilterActiveBadges
          categories={categories}
          subCategories={subCategories}
          initialFilterValues={initialFilterValues}
        />
      </div>
      <GridContainer>
        <GridColumn>
          <aside className="sticky__filter">
            <Panel padding={10}>
              <Filter
                categories={categories}
                subCategories={subCategories}
                initialFilterValues={initialFilterValues}
              />
            </Panel>
          </aside>
        </GridColumn>
        <GridColumn>
          <div className="" style={{ marginBottom: "10px" }}></div>
          <h2 style={{ color: "var(--color-contrast)" }}>
            Найдено вакансий: {data?.length}
          </h2>
          <div className="" style={{ marginBottom: "20px" }}></div>
          <AnimatePresence>
            {data?.map((item: VacancyCardProps) => (
              <VacancyCard key={Math.random()} {...item} />
            ))}
          </AnimatePresence>
        </GridColumn>
      </GridContainer>
    </MainContainer>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const category: string = getAsString(query.category);
  const subcategorieSrt: string = query.subcategories
    ? query.subcategories.toString()
    : "";
  const subCatArr: Array<number> = subcategorieSrt
    .split(",")
    .filter((x) => x !== "")
    .map((x) => +x);
  const [vacancies, categories, subCategories] = await Promise.all([
    MyGet(`${process.env.SERVER}/jobs?${stringify(query)}`, ctx),
    MyGet(`${process.env.SERVER}/api/categories`, ctx),
    MyGet(`${process.env.SERVER}/api/subcategories?category=${category}`, ctx),
  ]);
  console.log("IM CALLED");

  return {
    props: {
      initialSubcategories: subCatArr,
      category: category || null,
      vacancies: vacancies.data,
      categories: categories.data,
      subCategories: subCategories.data,
      serverQuery: ctx.query,
      errors: [vacancies.error, categories.error, subCategories.error],
      namespacesRequired: ["common", "vacancyListPage"],
    },
  };
};
vacancylist.Layout = Layout;
export default withTranslation(["common", "vacancyListPage"])(vacancylist);
