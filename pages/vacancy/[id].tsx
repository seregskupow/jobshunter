import {withTranslation } from '../../i18n'
export default function Vacancy(props) {
    return (
        <div>
            vacancy № {props.id}
        </div>
    )
}
export async function getStaticPaths() {
    return {
      paths: [
        { params: { id:"544"} }
      ],
      fallback: true    
    };
  }
export async function getStaticProps({params}) {
    const id = params.id;
    return {
      props: {id},
    }
  }
 