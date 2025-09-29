import React from 'react';
import { useSearch } from '../../contexts/SearchContext';
import './SearchButton.css';

const SearchButton = () => {
  const { openSearch } = useSearch();
  return (
    <button onClick={openSearch} className="search-button" title="Rechercher">
      <span>🔍</span>
      Rechercher
    </button>
  );
};

export default SearchButton;