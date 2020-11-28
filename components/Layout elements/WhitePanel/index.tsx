/* eslint-disable react/require-default-props */
import "./style.scss";

type panelProps = {
  children: React.ReactNode;
  padding?: number;
  width?: number | "auto";
  margin?: number;
};
export default function WhitePanel({
  children,
  padding = 15,
  width = "auto",
  margin = 0,
}: panelProps) {
  return (
    <div
      className="white__panel"
      style={{
        margin: `${margin.toString()}px`,
        padding: `${padding.toString()}px`,
        width: width !== "auto" ? `${width.toString()}%` : width,
      }}
    >
      {children}
    </div>
  );
}
