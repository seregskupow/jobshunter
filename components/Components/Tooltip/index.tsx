import "./style.scss";
import { useState } from "react";

interface TooltipProps {
  content: string;
  /**
   * Available variants: "top", "right", "left", "bottom"
   */
  direction?: "top" | "right" | "left" | "bottom";
  /**
   * Delay before Tooltip appears
   */
  delay?: number;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  direction = "bottom",
  delay = 600,
  children,
}) => {
  let timeout: ReturnType<typeof setTimeout>;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {children}
      {active && (
        <div className={`Tooltip-Tip ${direction}`}>
          {/* Content */}
          {content}
        </div>
      )}
    </div>
  );
};
export default Tooltip;
