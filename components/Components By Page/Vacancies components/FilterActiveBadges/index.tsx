/* eslint-disable no-use-before-define */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Option } from "../../../Components/FormsComponents/Select";
import { InitialFilterValues } from "../Filter";
import "./style.scss";
import { Router } from "../../../../i18n";
import cleanUrl from "../../../../helpers/cleanUrl";

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
  const dispatch = useDispatch();
  const subs = useSelector((state) => state.filter.subCategories);
  useEffect(() => {
    console.log(Router.asPath);
  }, []);
  const removeParamFromUrl = (param) => {
    console.log(param);
    const removedParam: string = Router.asPath.replace(param.toString(), "");
    console.log({ u: cleanUrl(removedParam) });
    return cleanUrl(removedParam);
  };
  const redirectTo = () => {};
  return (
    <>
      {JSON.stringify(initialFilterValues.subcategories, null, 2)}
      {JSON.stringify(
        subs?.filter((item) =>
          initialFilterValues.subcategories.includes(item.value)
        ),
        null,
        2
      )}
      {categories
        ?.filter((item) => item.value === +initialFilterValues.category)
        ?.map((badge) => (
          <Badge
            key={Math.random()}
            onClick={removeParamFromUrl}
            text={badge.label}
            value={badge.value}
          />
        ))}
      {subCategories
        ?.filter((item) =>
          initialFilterValues?.subcategories.includes(+item.value)
        )
        ?.map((badge) => (
          <Badge
            key={Math.random()}
            onClick={removeParamFromUrl}
            text={badge.label}
            value={badge.value}
          />
        ))}
    </>
  );
};
export default FilterActiveBadges;

interface BadgeProps {
  text: string;
  value: string | number;
  onClick(arg: string): void;
}
const Badge: React.FC<BadgeProps> = ({ text, value, onClick }) => {
  return (
    // <span className="filter-badge" onClick={() => onClick(value.toString())}>
    //   {text}
    // </span>
    <></>
  );
};
