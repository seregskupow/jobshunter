/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-use-before-define */
import { Field, Form, Formik, useField, useFormikContext } from "formik";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSWR from "swr";
import Checkbox from "../../../Components/FormsComponents/Checkbox";
import Select, { Option } from "../../../Components/FormsComponents/Select";
import "./style.scss";
import { Router } from "../../../../i18n";
import getAsString from "../../../../helpers/getAsString";
import { setSubCategories } from "../../../../redux/actions/filterActions";

const prices: Array<Option> = [
  {
    value: 0,
    label: "Не важно",
  },
  {
    value: 100,
    label: "От 100$",
  },
  {
    value: 200,
    label: "От 200$",
  },
  {
    value: 300,
    label: "От 300$",
  },
  {
    value: 400,
    label: "От 400$",
  },
  {
    value: 500,
    label: "От 500$",
  },
];
export interface InitialFilterValues {
  category: string;
  subcategories: Array<number>;
  salary: number;
}
interface FilterProps {
  initialFilterValues: InitialFilterValues;
  categories: Array<Option>;
  subCategories: Array<Option>;
}

const Filter: React.FC<FilterProps> = ({
  initialFilterValues,
  categories,
  subCategories,
}) => {
  const { query } = useRouter();
  let initialCategory;
  let initialSalary: Option;
  if (typeof window !== "undefined" && Router.query.category) {
    initialCategory = categories.find(
      (item) => +item.value === +getAsString(Router.query.category)
    );
  } else {
    // eslint-disable-next-line prefer-destructuring
    initialCategory = categories[0];
  }
  if (typeof window !== "undefined" && Router.query.salary) {
    initialSalary = prices.find(
      (item) => +item.value === +getAsString(query.salary)
    );
  } else {
    // eslint-disable-next-line prefer-destructuring
    initialSalary = prices[0];
  }
  return (
    <div className="jobs__filter">
      <div className="filter__inner">
        <Formik
          initialValues={initialFilterValues}
          onSubmit={async (values) => {
            const subcategories = values.subcategories.length
              ? values.subcategories.join(",")
              : null;
            const salary = values.salary !== 0 ? values.salary : null;
            Router.push(
              {
                pathname: "/vacancylist",
                query: {
                  ...router.query,
                  ...values,
                  ...(salary !== null && { salary }),
                  ...(subcategories !== null && { subcategories }),
                  page: 1,
                },
              },
              undefined,
              { shallow: true }
            );
          }}
        >
          {({
            submitForm,
            initialValues,
            values,
            setFieldValue,
            setValues,
          }) => (
            <Form>
              <div className="filter__item">
                <h2 className="filter__item__title">Категорія</h2>
                <Field
                  as={Select}
                  options={categories}
                  value={initialCategory}
                  onChange={async (val) => {
                    await setValues({
                      category: val,
                      subcategories: [],
                      salary: values.salary,
                    });
                    await setFieldValue("subcategories", []);
                    await submitForm();
                  }}
                  name="category"
                />
              </div>
              <div className="filter__item">
                <SubCategories
                  initialCategory={initialCategory}
                  initialSub={initialValues.subcategories}
                  subCategories={subCategories}
                  category={values.category}
                  name="subcategories"
                />
              </div>
              <div className="filter__item">
                <h2 className="filter__item__title">Зарплата</h2>
                <Field
                  as={Select}
                  options={prices}
                  value={initialSalary}
                  isSearchable={false}
                  onChange={(val) => {
                    setFieldValue("salary", val);
                    submitForm();
                  }}
                  name="salary"
                />
              </div>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Filter;

interface SubCategoriesProps {
  initialCategory: string;
  initialSub: Array<number>;
  category: string;
  subCategories: Array<Option>;
  name: string;
}
const SubCategories: React.FC<SubCategoriesProps> = ({
  initialCategory,
  initialSub,
  category,
  subCategories,
  ...props
}) => {
  const dispatch = useDispatch();
  const { setFieldValue } = useFormikContext();
  const [field] = useField({
    name: props.name,
  });
  const initialCategoriesOrUndefined =
    category === initialCategory ? subCategories : undefined;
  const { data: newModels } = useSWR<Array<Option>>(
    `/api/subcategories?category=${category}`,
    {
      dedupingInterval: 60000,
      initialData: category === "all" ? [] : initialCategoriesOrUndefined,
    }
  );

  useEffect(() => {
    const onlyValues = newModels?.map((a) => a.value);
    if (!onlyValues?.includes(field.value)) {
      setFieldValue(props.name, initialSub);
    }
    dispatch(setSubCategories(newModels));
  }, [category, newModels]);
  if (newModels?.length) {
    return (
      <>
        <h2 className="filter__item__title">Підкатегорії</h2>
        <div className="subcategories__container">
          {newModels?.map((sub) => (
            <Checkbox
              key={sub.label}
              name={props.name}
              value={sub.value}
              label={sub.label}
              delay={0}
            />
          ))}
        </div>
      </>
    );
  }
  return null;
};
