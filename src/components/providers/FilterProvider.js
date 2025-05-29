import axios from 'axios';
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useRef
} from 'react';
import { useData } from './DataProvider';
import { useLocation, useSearchParams } from 'react-router-dom';

export function FilterProvider({ children }) {
  const { activePage, setActivePage } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [activeFilters, setActiveFilters] = useState({
    gender: searchParams.get('gender') || '',
    status: searchParams.get('status') || '',
    species: searchParams.get('species') || '',
    name: searchParams.get('name') || '',
    type: searchParams.get('type') || ''
  });
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState(null);
  const controllerRef = useRef(null);

  const getFilteredUrl = useCallback(
    (page) => {
      const params = new URLSearchParams();

      if (activeFilters.species) params.set('species', activeFilters.species);
      if (activeFilters.gender) params.set('gender', activeFilters.gender);
      if (activeFilters.status) params.set('status', activeFilters.status);
      if (activeFilters.name) params.set('name', activeFilters.name);
      if (activeFilters.type) params.set('type', activeFilters.type);

      params.set('page', page);

      return `https://rickandmortyapi.com/api/character/?${params}`;
    },
    [
      activeFilters.gender,
      activeFilters.status,
      activeFilters.species,
      activeFilters.name,
      activeFilters.type
    ]
  );

  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);

    const newPage = parseInt(currentParams.get('page')) || 1;
    const newFilters = {
      gender: currentParams.get('gender') || '',
      status: currentParams.get('status') || '',
      species: currentParams.get('species') || '',
      name: currentParams.get('name') || '',
      type: currentParams.get('type') || ''
    };

    setActiveFilters((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(newFilters)) {
        return newFilters;
      }

      return prev;
    });

    setActivePage(Math.max(newPage - 1, 0));
  }, [location.search, setActivePage]);

  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    if (activePage > 0) {
      params.set('page', activePage + 1);
    } else {
      params.delete('page');
    }

    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params);
    }
  }, [activeFilters, activePage, setSearchParams, searchParams]);

  useEffect(() => {
    setActivePage(0);
  }, [activeFilters, setActivePage]);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const fetchData = async () => {
      try {
        const url = getFilteredUrl(activePage + 1);
        const response = await axios.get(url, {
          signal: controller.signal
        });

        setFilteredInfo(response.data.info);
        setFilteredCharacters(response.data.results);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [getFilteredUrl, activePage]);

  const filterValue = useMemo(
    () => ({
      activeFilters,
      setActiveFilters,
      filteredCharacters,
      setFilteredCharacters,
      filteredInfo,
      setFilteredInfo,
      getFilteredUrl
    }),
    [activeFilters, filteredCharacters, filteredInfo, getFilteredUrl]
  );

  return (
    <FilterContext.Provider value={filterValue}>
      {children}
    </FilterContext.Provider>
  );
}
const FilterContext = createContext({});

export const useFilter = () => useContext(FilterContext);
