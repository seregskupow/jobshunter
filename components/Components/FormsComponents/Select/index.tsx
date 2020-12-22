/* eslint-disable no-use-before-define */
import { useEffect, useState } from "react";
import "./style.scss";
import { CgChevronDown } from "react-icons/cg";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const Select: React.FC<SelectProps> = ({
  options,
  value,
  isDisabled = false,
  isSearchable = true,
  onChange,
  ...props
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [currentValue, setCurrValue] = useState<Option>(options[0]);
  const [controlledOptions, setCtrOptions] = useState<Array<ExtendedOption>>(
    options
  );
  const setCurrentOption = (opt) => {
    const withMarkedSelectedOpt = controlledOptions.map((option) => {
      if (option.label === opt.label) {
        return { ...option, isSelected: true };
      }
      return { ...option, isSelected: false };
    });
    setCtrOptions(withMarkedSelectedOpt);
    setCurrValue(opt);
  };
  const selectBtn = useRef<HTMLDivElement>(null);
  useEffect(() => {
    onChange(currentValue.label);
  }, [currentValue]);
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const handleClick = (e) => {
    if (selectBtn.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };
  return (
    <div className="select__container" ref={selectBtn}>
      <button
        type="button"
        className="select__btn btn__click"
        data-focus={isOpen}
        disabled={isDisabled}
        onClick={() => setOpen(!isOpen)}
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
                callback={(e) => setCtrOptions(e)}
              />
            )}
            <div className="select__options">
              {controlledOptions?.map((opt) => (
                <SelectItem
                  key={Math.random()}
                  item={opt}
                  isSelected={opt.isSelected}
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
  callback: (arg: Array<Option>) => void;
}

const OptionsSearch: React.FC<OptionsSearchProps> = ({
  options,
  currentValue,
  callback,
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
    callback(filteredOptions);
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
  isSelected: boolean;
  callback(arg: Option): void;
}

const SelectItem: React.FC<SelectItemProps> = ({
  item,
  isSelected,
  callback,
}) => {
  return (
    <div
      role="button"
      tabIndex={-1}
      className="select__item"
      data-selected={isSelected}
      onClick={() => callback(item)}
      onKeyDown={() => callback(item)}
    >
      {item.label}
    </div>
  );
};
