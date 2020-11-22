import "./style.scss";

export default function MainContainer(props) {
  return (
    <div className="main__container">
      <div className="main__container_inner">{props.children}</div>
    </div>
  );
}
