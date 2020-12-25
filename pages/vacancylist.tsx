import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import useSWR from "swr";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import { ReactNode, useState } from "react";
import deepEqual from "fast-deep-equal";
import { TFunction } from "next-i18next";
import Layout from "../components/Layout elements/Layout/Layout";
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
import Filter from "../components/Components By Page/Vacancies components/Filter";
import getAsString from "../helpers/getAsString";
import { Option } from "../components/Components/FormsComponents/Select";

interface vacancyListProps {
  vacancies: [];
  categories: Array<Option>;
  subCategories: Array<Option>;
  errors: Array<string>;
  readonly t: TFunction;
  Layout: any;
}
interface PageComponent<T> extends React.FC<T> {
  Layout: ReactNode;
}
const vacancylist: PageComponent<vacancyListProps> = ({
  vacancies,
  categories,
  subCategories,
  errors,
  t,
}) => {
  const { query } = useRouter();
  const [serverQuery] = useState(query);
  const { data } = useSWR(`/jobs?${stringify(query)}`, {
    dedupingInterval: 15000,
    initialData: deepEqual(query, serverQuery) ? vacancies : undefined,
  });
  return (
    <MainContainer>
      <h1>{t("vacancyListPage:title")}</h1>
      <GridContainer>
        <GridColumn>
          <Panel padding={10}>
            <Filter categories={categories} subCategories={subCategories} />
          </Panel>
        </GridColumn>
        <GridColumn>
          {data?.map((item: VacancyCardProps) => (
            <VacancyCard key={item.id} {...item} />
          ))}
        </GridColumn>
      </GridContainer>
    </MainContainer>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const category = getAsString(ctx.query.category);
  const [vacancies, categories, subCategories] = await Promise.all([
    MyGet(`${process.env.SERVER}/jobs?${stringify(query)}`, ctx),
    MyGet(`${process.env.SERVER}/api/categories`, ctx),
    MyGet(`${process.env.SERVER}/api/subcategories?category=${category}`, ctx),
  ]);
  return {
    props: {
      vacancies: vacancies.data,
      categories: categories.data,
      subCategories: subCategories.data,
      errors: [vacancies.error, categories.error, subCategories.error],
      namespacesRequired: ["common", "vacancyListPage"],
    },
  };
};
vacancylist.Layout = Layout;
export default withTranslation(["common", "vacancyListPage"])(vacancylist);
