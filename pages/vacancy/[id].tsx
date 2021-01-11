import Layout from "../../components/Layout elements/Layout/Layout";
import { withTranslation } from "../../i18n";

const Vacancy = (props) => {
  return <div>vacancy № {props.id}</div>;
};
Vacancy.Layout = Layout;
export default Vacancy;
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "544" } }],
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const { id } = params;
  return {
    props: { id },
  };
}
