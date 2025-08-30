'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onTagFilter: (tags: string[]) => void;
  availableTags: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onTagFilter, availableTags }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, onSearch]);

  useEffect(() => {
    onTagFilter(selectedTags);
  }, [selectedTags, onTagFilter]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Search Input */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-foreground/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blogs and projects..."
            className="w-full pl-12 pr-24 py-3 bg-card-bg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
          <div className="absolute right-2 flex items-center space-x-2">
            {(searchQuery || selectedTags.length > 0) && (
              <button
                onClick={clearSearch}
                className="p-2 hover:bg-background rounded-md transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-md transition-all duration-200 ${
                showFilters ? 'bg-primary text-white' : 'hover:bg-background'
              }`}
              aria-label="Toggle filters"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Tags */}
        {showFilters && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-card-bg border border-border rounded-lg shadow-lg z-10 animate-fade-in">
            <p className="text-sm font-semibold mb-2">Filter by tags:</p>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
                    selectedTags.includes(tag)
                      ? 'bg-primary text-white'
                      : 'bg-background hover:bg-primary/10 border border-border'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {selectedTags.length > 0 && (
        <div className="mt-3 flex items-center flex-wrap gap-2">
          <span className="text-sm text-foreground/70">Active filters:</span>
          {selectedTags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
            >
              {tag}
              <button
                onClick={() => toggleTag(tag)}
                className="ml-2 hover:text-primary-dark"
                aria-label={`Remove ${tag} filter`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;