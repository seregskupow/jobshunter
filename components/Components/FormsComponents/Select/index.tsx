/* eslint-disable no-use-before-define */
import { useEffect, useState } from "react";
import "./style.scss";
import { CgChevronDown } from "react-icons/cg";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import useKeyPress from "../../../../hooks/useKeypress";

type Option = {
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
  value?: string;
  onChange(arg: string | number): void;
}
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
  const [currentValue, setCurrValue] = useState<Option>(options[0]);
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
    onChange(currentValue.label);
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
  useEffect(() => {
    if (controlledOptions.length && downPress) {
      setCursor((prevState) =>
        prevState < controlledOptions.length - 1 ? prevState + 1 : 0
      );
    }
  }, [downPress]);
  useEffect(() => {
    if (controlledOptions.length && upPress) {
      setCursor((prevState) =>
        prevState > 0 ? prevState - 1 : controlledOptions.length - 1
      );
    }
  }, [upPress]);
  useEffect(() => {
    if (controlledOptions.length && enterPress) {
      setCurrentOption(controlledOptions[cursor]);
      setOpen(false);
    }
  }, [cursor, enterPress, setOpen, setCurrentOption]);
  useEffect(() => {
    if (controlledOptions.length && hovered) {
      setCursor(controlledOptions.indexOf(hovered));
    }
  }, [hovered]);
  const removePageScroll = (e) => {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  };
  const handleClick = (e) => {
    if (selectBtn.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };
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
