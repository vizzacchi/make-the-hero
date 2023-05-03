import React from 'react';
import HeroCard from '../components/HeroCard/HeroCard';
import HeroCardLoader from '../components/HeroCard/HeroCardLoader';
import {SearchField} from '../common-components/SearchField/SearchField';
import {Button} from '../common-components/Button/Buttons';
import {Spaces } from '../shared/DesignTokens';
import styled from 'styled-components';
import {Box, Flex} from 'reflexbox';
import { Alert } from '../common-components/Alert/Alert';
import useHeroes from '../hooks/useHeroes';

const HeroesGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${Spaces.ONE_HALF};

  @media(min-width: 1024px){
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: ${Spaces.ONE_HALF};
    gap: ${Spaces.TWO};
  }
`;

// async function searchHero (searchValue){
//   const { data } = await axios.get(
//       `${process.env.REACT_APP_SUPER_HERO_API_BASE_URL}/${process.env.REACT_APP_SUPER_HERO_API_KEY}/search/${searchValue}`
//   )
//   return data;
// }

export default function Search() {
  const [search, setSearch] = React.useState({
    value: 'captain',
    doSearch: true,
  });
  // estamos usando o useState para criar um estado para o componente Search, que é o search,
  //  e o setSearch é a função que vai alterar o estado do search
  //const[heroes, setHeroes] = React.useState([]);
  // estamos criando um estado Heroes para receber o retorno da API. O estado inicial é um array vazio
  const{heroes, isLoadingHeroes, error,  searchHero} = useHeroes(search.value);

  // React.useEffect(() => {
  //   if(search.value && search.doSearch){
  //     searchHero(search.value).then((data) => {
  //       console.log(data);
  //       //setHeroes(data.results || []); está encapsulado
  //     // o useEffect é um hook que executa uma função sempre que o componente é renderizado, se colocar nos colchetes as
  //     //  variáveis que devem ser observadas, ele vai executar a função na inicialização e quando essas variáveis forem alteradas
  //     });
  //   }
  // }, [search]);

   React.useEffect(() => {
     if(search.doSearch){
       searchHero().then(() => {
         setSearch((prevValue) => ({...prevValue, doSearch: false}));
       });
     }
   }, [search]);

  function handleUpdateSearchValue({target: {value} }){
    setSearch({ value });
  }

  function handleSearch(){
    setSearch((prevValue) => ({...prevValue, doSearch: true}));
  }


  return(
    <>
      <Flex
        width={['100%', '600px', '800px']}
        mx={[Spaces.NONE, 'auto']}
        mt={[Spaces.THREE, Spaces.FOUR, Spaces.FIVE]}
        px={[Spaces.ONE, Spaces.NONE]}
        mb={[Spaces.THREE, Spaces.FOUR, Spaces.FIVE]}
      >
        <Box flexGrow="1">
          <SearchField
            placeholder="Procure por heróis"
            onKeyUp={handleUpdateSearchValue}
            />
        </Box>
        <Box ml={Spaces.TWO}>
          <Button onClick={handleSearch}>Procurar</Button>
        </Box>
      </Flex>

        <HeroesGrid px={[Spaces.ONE, Spaces.ONE_HALF, Spaces.TWO]} pb={[Spaces.ONE, Spaces.ONE_HALF, Spaces.TWO]}>
        {/* // px é o padding horizontal one para mobile, one_half para tablet e two para desktop */}
        {isLoadingHeroes && (
          <>
            <HeroCardLoader/>
            <HeroCardLoader/>
            <HeroCardLoader/>
            <HeroCardLoader/>
          </>
        )}
        {!isLoadingHeroes && heroes.map((hero) => (
            <HeroCard
              key={hero.id}
              id={hero.id}
              secretIdentity={hero.name}
              name={hero.biography['full-name']}
              picture={hero.image.url}
              universe={hero.biography.publisher}
            />
          ))}
            </HeroesGrid>
        {(heroes.length === 0 || error)  && !isLoadingHeroes && (
          <Box px={[Spaces.ONE, Spaces.TWO]}>
            <Alert type={"info"}>Não encontramos nenhum herói!</Alert>
          </Box>
        )}

    </>
  );
}
