import "./style.scss";

type ButtonProps = {
  text: string;
  event?: () => void;
  color: "red" | "green" | "blue";
};

const Button = ({ text, event = null, color }: ButtonProps) => {
  return (
    <button onClick={event} className={`btn btn-${color}`}>
      <span>{text}</span>
    </button>
  );
};

export default Button;
