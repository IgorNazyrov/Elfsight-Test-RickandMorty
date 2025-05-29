import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export const CustomSelect = ({ name, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [crossInstead, setCrossInstead] = useState(false);
  const selectRef = useRef(null);

  const handleSelect = (val) => {
    onChange({ target: { name, value: val } });
    setIsOpen(false);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    const emptyValue = options.find((opt) => opt.value === '')?.value || '';
    onChange({ target: { name, value: emptyValue } });
  };

  useEffect(() => {
    setCrossInstead(value !== '' && value !== undefined);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <SelectContainer ref={selectRef}>
      <SelectHeader onClick={toggleIsOpen} $isOpen={isOpen}>
        {value || options.find((opt) => opt.value === '')?.label}
        {crossInstead ? (
          // eslint-disable-next-line react/jsx-no-bind
          <SelectCross onClick={handleReset}>×</SelectCross>
        ) : (
          <SelectArrow $isOpen={isOpen}>▼</SelectArrow>
        )}
      </SelectHeader>

      {isOpen && (
        <OptionsList>
          {options.map((option) => (
            <OptionItem
              key={option.value}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={() => handleSelect(option.value)}
              $isSelected={value === option.value}
            >
              {option.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  position: relative;
  width: 150px;
  margin-bottom: 10px;
`;

const SelectHeader = styled.div`
  border: 2px solid #83bf46;
  border-radius: 5px;
  background: #263750;
  color: rgb(212, 212, 212);
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectCross = styled.span`
  font-size: 16px;
  user-select: none;

  &:hover {
    color: #83bf46;
    transition: 0.4s;
  }
`;

const SelectArrow = styled.span`
  transform: rotate(${(props) => (props.$isOpen ? '180deg' : '0deg')});
  transition: transform 0.2s;
  font-size: 12px;
  user-select: none;
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #f1f1f1;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  border-top: none;
  border-radius: 0 0 5px 5px;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    margin: 4px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    margin-right: 4px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }
`;

const OptionItem = styled.li`
  padding: 8px 10px;
  cursor: pointer;
  font-weight: ${({ $isSelected }) => ($isSelected ? 'bold' : 'normal')};

  &:hover {
    background: rgb(188, 214, 163);
  }
`;
