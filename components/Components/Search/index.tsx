import "./style.scss";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoSearch } from "react-icons/go";
import { withTranslation, Router } from "../../../i18n";
import SettingsIcon from "../../../public/images/icons/search/setting-lines.svg";
import Tooltip from "../Tooltip";
import { SET_SEARCH_KEYWORD } from "../../../redux/types";

function Search({ t }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const defaultSearchParam = useSelector((state) => state.user.lastSearchKey);
  let search: string;
  const [searchValue, setSearch] = useState(search);
  const onInputChange = async (value: string) => {
    setSearch(value);
  };
  useEffect(() => {
    search = Router.query.search ? Router.query.search : defaultSearchParam;
    setSearch(search);
  }, []);
  const onSearchSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    Router.push({
      pathname: "/vacancylist",
      query: { ...Router.query, search: searchValue },
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
        <div className="settings__btn__wrapper">
          <Tooltip content="Open filters">
            <button type="button" className="settings__btn btn__click">
              <SettingsIcon />
            </button>
          </Tooltip>
        </div>
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
