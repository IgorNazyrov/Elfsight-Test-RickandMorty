import styled from 'styled-components';
import { useCallback, useState } from 'react';
import { useFilter } from '../providers/FilterProvider';
import { CustomSelect } from '../common/CustomSelect';

export function Filter() {
  const statusOptions = [
    { value: '', label: 'Status' },
    { value: 'Alive', label: 'Alive' },
    { value: 'Dead', label: 'Dead' },
    { value: 'unknown', label: 'Unknown' }
  ];

  const genderOptions = [
    { value: '', label: 'Gender' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'unknown', label: 'Unknown' }
  ];

  const speciesOptions = [
    { value: '', label: 'Species' },
    { value: 'Human', label: 'Human' },
    { value: 'Alien', label: 'Alien' },
    { value: 'Humanoid', label: 'Humanoid' },
    { value: 'unknown', label: 'Unknown' },
    { value: 'Poopybutthole', label: 'Poopybutthole' },
    { value: 'Mythological Creature', label: 'Mythological Creature' },
    { value: 'Animal', label: 'Animal' },
    { value: 'Robot', label: 'Robot' },
    { value: 'Cronenberg', label: 'Cronenberg' },
    { value: 'Disease', label: 'Disease' }
  ];

  const { setActiveFilters } = useFilter();
  const [tempFilters, setTempFilters] = useState({
    gender: '',
    status: '',
    species: '',
    name: '',
    type: ''
  });

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setTempFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const resetFilters = useCallback(() => {
    setTempFilters({
      gender: '',
      status: '',
      species: '',
      name: '',
      type: ''
    });
    setActiveFilters({
      gender: '',
      status: '',
      species: '',
      name: '',
      type: ''
    });
  }, [setActiveFilters]);

  return (
    <FilterContainer>
      <StyledDiv>
        <CustomSelect
          name="status"
          options={statusOptions}
          value={tempFilters.status}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleFilterChange}
        />
      </StyledDiv>
      <StyledDiv>
        <CustomSelect
          name="gender"
          options={genderOptions}
          value={tempFilters.gender}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleFilterChange}
        />
      </StyledDiv>
      <StyledDiv>
        <CustomSelect
          name="species"
          options={speciesOptions}
          value={tempFilters.species}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleFilterChange}
        />
      </StyledDiv>
      <StyledDiv>
        <StyledInput
          type="text"
          placeholder="Name"
          name="name"
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleFilterChange}
          value={tempFilters.name}
        />
      </StyledDiv>
      <StyledDiv>
        <StyledInput
          type="text"
          placeholder="Type"
          name="type"
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleFilterChange}
          value={tempFilters.type}
        />
      </StyledDiv>
      <StyledDiv>
        <StyledBtn
          // eslint-disable-next-line
          onClick={() => setActiveFilters(tempFilters)}
        >
          Apply
        </StyledBtn>
        <StyledBtn onClick={resetFilters} color="red">
          Reset
        </StyledBtn>
      </StyledDiv>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 531px) {
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr;
  }
`;

const StyledDiv = styled.div`
  margin: 4px 4px;
  display: flex;
`;

const StyledInput = styled.input`
  border: 2px solid #83bf46;
  border-radius: 5px;
  background: #263750;
  width: 150px;
  padding: 5px 10px;
  color: rgb(212, 212, 212);
  outline: none;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &::placeholder {
    color: rgb(154, 153, 153);
  }

  &:focus {
    border: 2px solid #83bf46;
    background: rgb(43, 62, 91);
    overflow: auto;
    white-space: normal;
  }
`;

const StyledBtn = styled.button`
  border-radius: 5px;
  margin-right: 4px;
  border: 2px solid ${({ color }) => (color === 'red' ? '#d23c3c' : '#83bf46')};
  color: ${({ color }) => (color === 'red' ? '#d23c3c' : '#83bf46')};
  width: 72px;
  background: #001832;
  cursor: pointer;
  transition: all 0.5s linear;

  &:hover {
    background: ${({ color }) => (color === 'red' ? '#d23c3c' : '#83bf46')};
    color: #f1f1f1;
  }
`;
