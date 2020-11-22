function Article({ slug }) {
  return (
    <div>
      <h1>Article {slug}</h1>
    </div>
  );
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "544" } }],
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const slug = params.slug.toString().split("-").join(" ");
  return {
    props: { slug },
  };
}
export default Article;
