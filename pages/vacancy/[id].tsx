
export default function Vacancy({id}) {
    return (
        <div>
            vacancy № {id}
        </div>
    )
}
export async function getStaticPaths() {
    return {
      paths: [
        { params: { id:"544"} }
      ],
      fallback: true    };
  }
export async function getStaticProps({params}) {
    const id = params.id;
    return {
      props: {id},
    }
  }