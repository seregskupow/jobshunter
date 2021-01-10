/* eslint-disable no-use-before-define */
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { Option } from "../../../Components/FormsComponents/Select";
import { InitialFilterValues } from "../Filter";
import "./style.scss";
import { Router, Link } from "../../../../i18n";

interface ActiveFiltersProps {
  categories: Array<Option>;
  subCategories: Array<Option>;
  initialFilterValues: InitialFilterValues;
}
const FilterActiveBadges: React.FC<ActiveFiltersProps> = ({
  categories,
  subCategories,
  initialFilterValues,
}) => {
  const subs = useSelector((state) => state.filter.subCategories);
  const removeParam = (query, param: string, value: string) => {
    const queryToClean = JSON.parse(JSON.stringify(query));
    if (!queryToClean[param]) {
      return null;
    }
    const objItem = queryToClean[param]
      .split(",")
      .filter((item) => item !== value);
    if (!objItem.length) {
      delete queryToClean[param];
    }
    queryToClean[param] = objItem.join(",");
    return queryToClean;
  };
  const redirectTo = (param, value) => {
    Router.push(
      {
        pathname: "/vacancylist",
        query: removeParam(Router.query, param, value),
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <div className="filter-badges-container">
      {(initialFilterValues?.subcategories.length ||
        initialFilterValues?.salary !== 0 ||
        initialFilterValues.category) && (
        <Link href="/vacancylist">
          <a className="filter-badge btn__click filter-badge__clear-all">
            Очистити фільтер
          </a>
        </Link>
      )}
      {categories
        ?.filter(
          (item) =>
            item.value.toString() === initialFilterValues.category.toString()
        )
        .map((badge) => (
          <Badge
            key={Math.random()}
            onClick={() => redirectTo("category", badge.value.toString(10))}
            text={badge.label}
            value={badge.value}
          />
        ))}
      {subs
        ?.filter((item) =>
          initialFilterValues.subcategories.includes(item.value)
        )
        ?.map((badge) => (
          <Badge
            key={Math.random()}
            onClick={() =>
              redirectTo("subcategories", badge.value.toString(10))
            }
            text={badge.label}
            value={badge.value}
          />
        ))}
    </div>
  );
};
export default FilterActiveBadges;

interface BadgeProps {
  text: string;
  value: string | number;
  onClick: () => void;
}
const Badge: React.FC<BadgeProps> = ({ text, value, onClick }) => {
  return (
    <button
      type="button"
      className="filter-badge btn__click"
      onClick={() => onClick()}
    >
      {text}
      <span>
        <FaTimes />
      </span>
    </button>
  );
};
