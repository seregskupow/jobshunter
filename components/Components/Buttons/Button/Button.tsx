import "./style.scss";

type ButtonProps = {
  text: string;
  event: () => void;
  color: "contrast" | "default";
};
/**
 * Select component
 * @param  text Button label
 * @param event Function executed on click
 * @param color "contrast" or "default"
 */
const Button = ({ text, event = null, color = "contrast" }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={event}
      className={`btn btn-${color} btn__click`}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
