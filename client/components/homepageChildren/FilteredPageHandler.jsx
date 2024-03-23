import React from 'react';
import { useParams } from 'react-router-dom';
import FilteredPage from './FilteredPage';

const FilteredPageHandler = () => {
  const { filter } = useParams();

  let filterType = filter.toLowerCase().includes('alcohol')
    ? 'alcoholic'
    : 'category';
  return <FilteredPage filterType={filterType} />;
};

export default FilteredPageHandler;
