import React, { useContext, useState } from 'react';
import { Attribute } from '@/services/attribute';

export interface IFiltersContext {
  selectedAttributes: Attribute[];
  selectedCategory: string;
  setSelectedAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const FiltersContext = React.createContext<IFiltersContext | null>(null);

export const FiltersContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedAttributes, setSelectedAttributes] = useState<Attribute[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <FiltersContext.Provider
      value={{
        selectedAttributes,
        selectedCategory,
        setSelectedAttributes,
        setSelectedCategory,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error(
      'useFiltersContext must be inside a FiltersContextProvider with a value'
    );
  }
  return context;
};
