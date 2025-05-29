import { useState } from 'react';
import styled from 'styled-components';
import { Popup } from './popup';
import { useData } from './providers';
import { Card } from './Card';
import { useFilter } from './providers/FilterProvider';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

export function ItemsGrid() {
  const { characters } = useData();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);
  const { filteredCharacters } = useFilter();

  function cardOnClickHandler(props) {
    setPopupSettings({
      visible: true,
      content: { ...props }
    });
  }

  if (!filteredCharacters?.length && !characters?.length) {
    return null;
  }

  const displayCharacters = filteredCharacters?.length
    ? filteredCharacters
    : characters;

  return (
    <Container>
      {displayCharacters.map((props) => (
        <Card
          key={props.id}
          // eslint-disable-next-line
          onClickHandler={() => cardOnClickHandler(props)}
          {...props}
        />
      ))}

      <Popup settings={popupSettings} setSettings={setPopupSettings} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
