/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-use-before-define */
import { Field, Form, Formik, useField, useFormikContext } from "formik";
import { useEffect } from "react";
import useSWR from "swr";
import Checkbox from "../../../Components/FormsComponents/Checkbox";
import Select, { Option } from "../../../Components/FormsComponents/Select";
import "./style.scss";

interface FilterProps {
  categories: Array<Option>;
  subCategories: Array<Option>;
}

const Filter: React.FC<FilterProps> = ({ categories, subCategories }) => {
  return (
    <div className="jobs__filter">
      <div className="filter__inner">
        <Formik
          initialValues={{
            category: "all",
            subcategory: [],
          }}
          onSubmit={async (values) => {}}
        >
          {({ isSubmitting, initialValues, values, setFieldValue }) => (
            <Form>
              <h2>Категорія</h2>
              <Field
                as={Select}
                options={categories}
                onChange={(val) => setFieldValue("category", val)}
                name="category"
              />

              <SubCategories
                initialCategory={initialValues.category}
                subCategories={subCategories}
                category={values.category}
                name="subcategory"
              />

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
  category: string;
  subCategories: Array<Option>;
  name: string;
}
const SubCategories: React.FC<SubCategoriesProps> = ({
  initialCategory,
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
      setFieldValue("subcategory", []);
    }
  }, [category, newModels]);

  return (
    <div className="subcategories__container">
      <h2>Підкатегорії</h2>
      {newModels?.map((sub) => (
        <Checkbox
          key={sub.label}
          name="subcategory"
          value={sub.value}
          label={sub.label}
        />
      ))}
    </div>
  );
};
