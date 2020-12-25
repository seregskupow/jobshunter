/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-use-before-define */
import { Field, Form, Formik, useField, useFormikContext } from "formik";
import router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import Checkbox from "../../../Components/FormsComponents/Checkbox";
import Select, { Option } from "../../../Components/FormsComponents/Select";
import "./style.scss";

interface FilterProps {
  category: string;
  initialSubcategories: Array<number>;
  categories: Array<Option>;
  subCategories: Array<Option>;
}

const Filter: React.FC<FilterProps> = ({
  category,
  categories,
  initialSubcategories,
  subCategories,
}) => {
  let initialCategory: Option;
  if (category) {
    initialCategory = categories.find((item) => +item.value === +category);
  } else {
    // eslint-disable-next-line prefer-destructuring
    initialCategory = categories[0];
  }
  return (
    <div className="jobs__filter">
      <div className="filter__inner">
        <Formik
          initialValues={{
            category,
            subcategories: initialSubcategories,
          }}
          onSubmit={async (values) => {
            const subcategories = values.subcategories.length
              ? values.subcategories.join(",")
              : null;
            router.push(
              {
                pathname: "/vacancylist",
                query: {
                  ...router.query,
                  ...values,
                  ...(subcategories !== null && { subcategories }),
                  page: 1,
                },
              },
              undefined,
              { shallow: true }
            );
          }}
        >
          {({ submitForm, initialValues, values, setValues }) => (
            <Form>
              <div className="filter__item">
                <h2 className="filter__item__title">Категорія</h2>
                <Field
                  as={Select}
                  options={categories}
                  value={initialCategory}
                  onChange={(val) => {
                    setValues({
                      category: val,
                      subcategories: [],
                    });
                    submitForm();
                  }}
                  name="category"
                />
              </div>
              <div className="filter__item">
                <SubCategories
                  initialCategory={initialValues.category}
                  initialSub={initialValues.subcategories}
                  subCategories={subCategories}
                  category={values.category}
                  name="subcategories"
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
    if (!newModels?.map((a) => a.value).includes(field.value)) {
      setFieldValue(props.name, initialSub);
    }
  }, [category, newModels]);

  return (
    <div className="subcategories__container">
      <h2 className="filter__item__title">Підкатегорії</h2>
      {newModels?.map((sub) => (
        <Checkbox
          key={sub.label}
          name={props.name}
          value={sub.value}
          label={sub.label}
        />
      ))}
    </div>
  );
};
