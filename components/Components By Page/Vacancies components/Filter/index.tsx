import { Field, Form, Formik } from "formik";
import Select from "../../../Components/FormsComponents/Select";
import "./style.scss";

interface FilterProps {
  categories: Array<string>;
}
const opts = [
  { value: 123, label: "Value1" },
  { value: 34, label: "Value2" },
  { value: 23, label: "Value3" },
  { value: 23, label: "Value4" },
  { value: 23, label: "Value5" },
  { value: 23, label: "Value6" },
];
const Filter: React.FC<FilterProps> = ({ categories }) => {
  return (
    <div className="jobs__filter">
      <div className="filter__inner">
        <Formik initialValues={{}} onSubmit={async (values) => {}}>
          <Form>
            <Select options={opts} onChange={(val) => console.log(val)} />
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default Filter;
