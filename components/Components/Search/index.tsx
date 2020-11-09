import "./style.scss";
import { GetServerSideProps } from "next";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import {withTranslation } from '../../../i18n'

function Search({t}) {
  const router = useRouter();
  const searchParam =
    router.query.search === undefined ? null : router.query.search;
  const [searchValue, setSearch] = useState(searchParam);
  const onInputChange = (value: string) => {
    setSearch(value);
  };
  const onSearchSubmit = (e) => {
    if (e.key === "Enter") {
      Router.push({
        pathname: "/vacancylist",
        query: { limit: 10, search: searchValue },
      });
    }
  };
  return (
    <div className="search">
      <div className="search__field">
      <input
        type="search"
        placeholder={t("searchPlaceholder")}
        value={searchValue}
        onKeyDown={(e) => onSearchSubmit(e)}
        onChange={(e) => onInputChange(e.target.value)}
        name=""
        id=""
      />
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchKeyword: string =
    query.search === undefined ? "" : query.search.toString();
  const limit: number =
    query.limit === undefined ? 5 : parseInt(query.limit.toString());
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_limit=${limit}`
  );
  const posts = await res.json();
  return {
    props: {
      posts,
      searchKeyword,
      namespacesRequired: ["common"],
    },
  };
};
export default withTranslation()(Search);