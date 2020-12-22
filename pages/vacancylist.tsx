import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import useSWR from "swr";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import { useState } from "react";
import deepEqual from "fast-deep-equal";
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

function vacancylist({
  vacancies,
  t,
}: // eslint-disable-next-line no-use-before-define
InferGetServerSidePropsType<typeof getServerSideProps>) {
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
            <Filter categories={[]} />
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
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  // search Keyword from url or search
  const searchKeyword: string =
    query.search === undefined ? "" : query.search.toString();
  const [vacancies, error] = await MyGet(
    `${process.env.SERVER}/jobs?${stringify(query)}`,
    ctx
  );
  return {
    props: {
      vacancies,
      searchKeyword,
      namespacesRequired: ["common", "vacancyListPage"],
    },
  };
};
vacancylist.Layout = Layout;
export default withTranslation(["common", "vacancyListPage"])(vacancylist);
