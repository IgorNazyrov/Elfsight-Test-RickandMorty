import styled from 'styled-components';
import { useData } from './providers';
import { useFilter } from './providers/FilterProvider';

export function Pagination() {
  const { info, activePage, setActivePage, setApiURL } = useData();
  const { activeFilters, filteredInfo } = useFilter();
  const totalPages = filteredInfo?.pages || info.pages;

  const pageClickHandler = (index) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(index);

    const url = new URL('https://rickandmortyapi.com/api/character/');

    if (activeFilters.species)
      url.searchParams.set('species', activeFilters.species);
    if (activeFilters.gender)
      url.searchParams.set('gender', activeFilters.gender);
    if (activeFilters.status)
      url.searchParams.set('status', activeFilters.status);
    if (activeFilters.status)
      url.searchParams.set('status', activeFilters.status);
    if (activeFilters.status)
      url.searchParams.set('status', activeFilters.status);

    url.searchParams.set('page', index + 1);

    setApiURL(url);
  };

  const getPageRange = () => {
    const visiblePages = [];
    const maxVisible = 5;

    let start = Math.max(0, activePage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages - 1, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(0, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <StyledPagination>
      {/* Кнопка "Первая" */}
      {activePage > 0 && (
        <>
          <Page
            // eslint-disable-next-line
            onClick={() => pageClickHandler(0)}
          >
            « First
          </Page>
          {activePage > 2 && <Ellipsis>...</Ellipsis>}
        </>
      )}

      {/* Основные страницы */}
      {getPageRange().map((page) => (
        <Page
          key={page}
          active={page === activePage}
          // eslint-disable-next-line
          onClick={() => pageClickHandler(page)}
        >
          {page + 1}
        </Page>
      ))}

      {/* Кнопка "Последняя" */}
      {activePage < totalPages - 1 && (
        <>
          {activePage < totalPages - 3 && <Ellipsis>...</Ellipsis>}
          <Page
            // eslint-disable-next-line
            onClick={() => pageClickHandler(totalPages - 1)}
          >
            Last »
          </Page>
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
