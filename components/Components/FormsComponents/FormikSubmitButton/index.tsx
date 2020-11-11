import Spinner from "../../Spinner";
import "./style.scss";

export default function FormikSubmitButton({
  isSubmitting,
  margin = 6,
  text
}: {
  isSubmitting: boolean,
  margin?:number,
  text:string
}) {
  const btnText: string = isSubmitting ? "Submitting..." : "Submit";
  return (
    <div className="button__container" style={{margin:`${margin.toString() + "px"} 0px`}}>
      <button
        className="formik__submit__button"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting && <Spinner color={"white"} height={2}/>}
        {text}
      </button>
    </div>
  );
}
