import { useData, ItemsGrid, Pagination } from '../components';

export const HomePage = () => {
  const { isFetching, isError } = useData();

  return (
    <>
      {!isFetching && !isError && (
        <>
          <ItemsGrid />

          <Pagination />
        </>
      )}
    </>
  );
};
