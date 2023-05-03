import React from 'react';
import useAxios from 'axios-hooks';

export default function useHeroes(searchValue) {
  // só passo o endpoint, pois a URLBASE já está definida na Constant
  const[{data: heroes, loading: isLoadingHeroes}, searchHero] = useAxios(`/search/${searchValue}`,
  {
    manual: true
  });

  React.useEffect(() => {
    searchHero();
  },[]);
  return{
    heroes: heroes?.results || [],
    isLoadingHeroes,
    searchHero
  };
}
