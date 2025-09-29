import React, { useState, useMemo } from 'react';
import { useSearch } from '../../contexts/SearchContext';
import { Link } from 'react-router-dom';
import searchableContent from '../../data/searchableData';
import './SearchOverlay.css';

const SearchOverlay = () => {
  const { isSearchOpen, closeSearch } = useSearch();
  const [query, setQuery] = useState('');

  const filteredResults = useMemo(() => {
    if (query.length < 2) return [];
    return searchableContent.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="search-overlay" onClick={closeSearch}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <input 
          type="text"
          placeholder="Rechercher du contenu (cours, TP...)"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <div className="search-results">
          {filteredResults.map((item, index) => (
            <Link to={item.url} key={index} className="result-item" onClick={closeSearch}>
              <div className="result-type">{item.type}</div>
              <div className="result-title">{item.title}</div>
              <div className="result-category">{item.category}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;