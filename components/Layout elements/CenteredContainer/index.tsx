/* eslint-disable react/require-default-props */
import { FunctionComponent, ReactNode } from "react";
import "./style.scss";

type Props = {
  children: ReactNode;
  width?: number | "auto" | "100%";
  height?: number | "auto" | "100%";
  direction?: "row" | "column";
  align?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "stretch"
    | "unset";
};
const CenteredContainer: FunctionComponent<Props> = ({
  children,
  width = "100%",
  height = "auto",
  direction = "row",
  align = "unset",
}: Props) => {
  return (
    <div
      className="centered__container"
      style={{
        width: "100%",
        maxWidth: `${width.toString()}px`,
        flexDirection: direction,
        height: `${height.toString()}%`,
        alignItems: align,
      }}
    >
      {children}
    </div>
  );
};
export default CenteredContainer;
