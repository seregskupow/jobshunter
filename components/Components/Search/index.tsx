import "./style.scss";
import { GetServerSideProps } from "next";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GoSearch } from "react-icons/go";
import { withTranslation } from "../../../i18n";
import SettingsIcon from "../../../public/images/icons/search/setting-lines.svg";

function Search({ t }) {
  const router = useRouter();
  const defaultSearchParam = useSelector((state) => state.user.lastSearchKey);
  const searchParam =
    router.query.search === undefined
      ? defaultSearchParam
      : router.query.search;
  const [searchValue, setSearch] = useState(searchParam);
  const onInputChange = (value: string) => {
    setSearch(value);
  };
  useEffect(() => {
    if (defaultSearchParam !== undefined) {
      setSearch(defaultSearchParam);
    }
  }, [defaultSearchParam, setSearch]);
  const onSearchSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    Router.push({
      pathname: "/vacancylist",
      query: { limit: 10, search: searchValue },
    });
  };
  const keyDownHandler = (e: any) => {
    if (e.key === "Enter") {
      onSearchSubmit(e);
    }
  };
  return (
    <div className="search">
      <form action="#" onSubmit={(e) => onSearchSubmit(e)}>
        <div className="search__field">
          <input
            type="search"
            placeholder={t("searchPlaceholder")}
            value={searchValue}
            onKeyDown={(e) => keyDownHandler(e)}
            onChange={(e) => onInputChange(e.target.value)}
            name=""
            id=""
          />
          <button type="submit" className="search__btn btn__click">
            <GoSearch />
          </button>
        </div>
        <button type="button" className="settings__btn btn__click">
          <SettingsIcon />
        </button>
      </form>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchKeyword: string =
    query.search === undefined ? "" : query.search.toString();
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
      namespacesRequired: ["common"],
    },
  };
};
export default withTranslation()(Search);
