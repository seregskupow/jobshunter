/* eslint-disable no-use-before-define */
import "./style.scss";
import { useEffect, useState, Dispatch, useRef, SetStateAction } from "react";
import { CgChevronDown } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import useKeyPress from "../../../../hooks/useKeypress";

export type Option = {
  value: string | number;
  label: string;
};
interface ExtendedOption extends Option {
  isSelected?: boolean;
}
interface SelectProps {
  options: Array<Option>;
  isDisabled?: boolean;
  isSearchable?: boolean;
  value?: ExtendedOption;
  onChange(arg: string | number): void;
}
/**
 * Loops through options array and marks selected option with flag isSelected
 * @param options
 * @param selected
 */
const markSelectedOption = (
  options: Array<Option>,
  selected: ExtendedOption
) => {
  return options?.map((option) => {
    if (option.label === selected.label) {
      return { ...option, isSelected: true };
    }
    return { ...option, isSelected: false };
  });
};
/**
 * Select component
 * @param {Array<Option>} options Array of opions
 * @param {Option} value Default value
 * @param {boolean} isDisabled isDisabled - optional
 * @param {boolean} isSearchable isSearchable  - enable options search
 * @param {(arg: string | number)=> void} onChange onChange function that return value on Select value changed
 */
const Select: React.FC<SelectProps> = ({
  options,
  value,
  isDisabled = false,
  isSearchable = true,
  onChange,
  ...props
}) => {
  const selectBtn = useRef<HTMLInputElement | null>(null);
  const scrollContainer = useRef<HTMLInputElement | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [currentValue, setCurrValue] = useState<Option>(value);
  const [controlledOptions, setCtrOptions] = useState<Array<ExtendedOption>>(
    markSelectedOption(options, currentValue)
  );
  const downPress = useKeyPress("ArrowDown", selectBtn);
  const upPress = useKeyPress("ArrowUp", selectBtn);
  const enterPress = useKeyPress("Enter", selectBtn);
  const [cursor, setCursor] = useState<number>(0);
  const [hovered, setHovered] = useState<ExtendedOption>(currentValue);
  const setCurrentOption = (opt) => {
    setCtrOptions(markSelectedOption(options, opt));
    setCurrValue(opt);
  };

  useEffect(() => {
    onChange(currentValue.value);
  }, [currentValue]);
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", removePageScroll, false);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", removePageScroll, false);
    };
  }, []);
  useEffect(() => {
    if (isOpen) {
      const activeItem: HTMLElement = scrollContainer.current.querySelector(
        ".selected"
      );
      if (activeItem) {
        scrollContainer.current.scrollTop = activeItem.offsetTop;
      }
    }
  }, [isOpen]);
  // Change hovered option on keyDown event
  useEffect(() => {
    if (controlledOptions.length && downPress) {
      setCursor((prevState) =>
        prevState < controlledOptions.length - 1 ? prevState + 1 : 0
      );
    }
  }, [downPress]);
  // Change hovered option on keyUp event
  useEffect(() => {
    if (controlledOptions.length && upPress) {
      setCursor((prevState) =>
        prevState > 0 ? prevState - 1 : controlledOptions.length - 1
      );
    }
  }, [upPress]);
  // Set currentOption on Enter key pressed
  useEffect(() => {
    if (controlledOptions.length && enterPress) {
      setCurrentOption(controlledOptions[cursor]);
    }
  }, [cursor, enterPress]);
  // Close dropdown when value changed
  useEffect(() => {
    setOpen(false);
  }, [enterPress]);
  // Set hovered option index
  useEffect(() => {
    if (controlledOptions.length && hovered) {
      setCursor(controlledOptions.indexOf(hovered));
    }
  }, [hovered]);
  // Remove default page scroll behaviour when using arrows
  const removePageScroll = (e) => {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  };
  // Handle Select click scope
  const handleClick = (e) => {
    if (selectBtn.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };
  // Tells if option should scroll into view if not fully visible on keyUp or keyDown
  const shouldScrollToView = (index) => {
    if (index === cursor && (downPress || upPress)) {
      return true;
    }
    return false;
  };
  return (
    <div className="select__container" ref={selectBtn}>
      <button
        type="button"
        className="select__btn btn__click"
        data-focus={isOpen}
        disabled={isDisabled}
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        <div className="select__value__container">
          <div className="select__value">
            <p>{currentValue.label}</p>
          </div>
          <div className="arrow">
            <CgChevronDown data-open={isOpen} />
          </div>
        </div>
      </button>
      <AnimatePresence exitBeforeEnter>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.1 }}
            className="select__options__container"
          >
            {isSearchable && (
              <OptionsSearch
                options={options}
                currentValue={currentValue}
                updateOptions={(e) => setCtrOptions(e)}
              />
            )}
            <div className="select__options" ref={scrollContainer}>
              {controlledOptions?.map((opt, index) => (
                <SelectItem
                  key={Math.random()}
                  item={opt}
                  isPressed={shouldScrollToView(index)}
                  isHovered={index === cursor}
                  isSelected={opt.isSelected}
                  setHovered={setHovered}
                  callback={(val) => {
                    setCurrentOption(val);
                    setOpen(false);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Select;
interface SelectItemProps {
  item: Option;
  isPressed: boolean;
  isSelected: boolean;
  isHovered: boolean;
  setHovered: Dispatch<SetStateAction<ExtendedOption>>;
  callback(arg: ExtendedOption): void;
}

const SelectItem: React.FC<SelectItemProps> = ({
  item,
  isSelected,
  isPressed,
  setHovered,
  isHovered,
  callback,
}) => {
  const selItem = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (isPressed) {
      selItem.current.scrollIntoView({
        block: "nearest",
        inline: "start",
      });
    }
  }, [isPressed]);

  return (
    <div
      ref={selItem}
      role="button"
      tabIndex={-1}
      className={`select__item ${isSelected && "selected"}`}
      data-selected={isSelected}
      data-hovered={isHovered}
      onClick={() => callback(item)}
      onKeyDown={() => callback(item)}
      onMouseEnter={() => setHovered(item)}
      onMouseLeave={() => setHovered(undefined)}
    >
      {item.label}
    </div>
  );
};

interface OptionsSearchProps {
  options: Array<ExtendedOption>;
  currentValue: Option;
  updateOptions: Dispatch<SetStateAction<Array<ExtendedOption>>>;
}

const OptionsSearch: React.FC<OptionsSearchProps> = ({
  options,
  currentValue,
  updateOptions,
}) => {
  const [search, setSearch] = useState<string>("");
  /**
   * Filter options that include searchinput value
   * @param input
   */
  const filterOptions = (input: string) => {
    const filteredOptions = options.reduce((filtered, option) => {
      if (
        option.label.toLocaleLowerCase().includes(input.toLocaleLowerCase())
      ) {
        if (option.label === currentValue.label) {
          filtered.push({ ...option, isSelected: true });
        } else {
          filtered.push(option);
        }
      }
      return filtered;
    }, []);
    updateOptions(filteredOptions);
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
    filterOptions(e.target.value);
  };
  return (
    <div className="select__search__container">
      <input
        placeholder="Type search..."
        type="text"
        value={search}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};
