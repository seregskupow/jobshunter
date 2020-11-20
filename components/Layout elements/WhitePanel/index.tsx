/* eslint-disable react/require-default-props */
import "./style.scss";

type panelProps = {
  children: React.ReactNode;
  padding?: number;
  width?: number | "auto";
};
export default function WhitePanel({
  children,
  padding = 15,
  width = "auto",
}: panelProps) {
  return (
    <div
      className="white__panel"
      style={{
        padding: `${padding.toString()}px`,
        width: width !== "auto" ? `${width.toString()}%` : width,
      }}
    >
      {children}
    </div>
  );
}
