import { Field, Form, Formik } from "formik";
import Select from "../../../Components/FormsComponents/Select";
import "./style.scss";

interface FilterProps {
  categories: Array<string>;
}
const opts = [
  { value: 123, label: "Hui" },
  { value: 34, label: "Huilo" },
  { value: 23, label: "Pidor" },
  { value: 23, label: "Pidoras" },
  { value: 23, label: "Pidrila" },
  { value: 23, label: "Value6" },
  { value: 23, label: "Value7" },
  { value: 23, label: "Value8" },
  { value: 23, label: "Value9" },
  { value: 23, label: "Value10" },
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
