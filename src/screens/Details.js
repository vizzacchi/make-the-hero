import { useParams, useNavigate } from "react-router-dom";
import { Flex, Box } from "reflexbox";
import styled from "styled-components";
import { BorderRadiuses, Colors, Shadows, Spaces } from "../shared/DesignTokens";
import {SelectField, Option} from "../common-components/SelectField/SelectField";
import  {Button}  from "../common-components/Button/Buttons";
import { Alert } from "../common-components/Alert/Alert";
import { HeadingTwo } from "../common-components/HeadingTwo/HeadingTwo";
import { Description } from "../common-components/Description/Description";
import { Card } from "../common-components/Card/Card";
import { Caption } from "../common-components/Caption/Caption";
import  useHero  from "../hooks/useHero";
import { useFormik } from "formik";
import * as yup from 'yup';

const Container = styled.aside`
  width: 727px;
  margin: 0 auto;
`;

const HeroAvatar = styled.div`
  width: 344px;
  height: 194px;
  box-shadow: ${Shadows.ONE};
  border-radius: ${BorderRadiuses.ONE};
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 25%;
  `;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${Spaces.TWO};
`;


export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const{hero, isLoadingHero, setHeroAssessment, getHeroAssessment} = useHero(id);
  const formik = useFormik({
    initialValues: getHeroAssessment(id) || {assessment: '',},
    validationSchema: yup.object().shape({
      assessment: yup.string().required(),
    }),
    onSubmit: values => {
      const hero = {id, ...values};
      setHeroAssessment(hero);
      alert('Sucess! You Assessment was saved!');
      navigate(-1);
    },
  });

  return (
  !isLoadingHero && (
  <Container>
    <Flex mt={Spaces.FOUR} as="section">
      <HeroAvatar src={hero.image.url}/>
      <Flex
        flexDirection="column"
        justifyContent="center"
        height={194}
        ml={Spaces.SEVEN}
      >
        <form onSubmit={formik.handleSubmit}>
        <Flex>
          <SelectField
            name="assessment"
            onChange={formik.handleChange}
            value={formik.values.assessment}
            >
            <Option value = "" disabled>Rate the hero!</Option>
            <Option>5</Option>
            <Option>4</Option>
            <Option>3</Option>
            <Option>2</Option>
            <Option>1</Option>
          </SelectField>
          <Box ml={Spaces.TWO}>
            <Button type="submit">Save</Button>
          </Box>
        </Flex>
        {/* Se a validação der erro mostra a mensagem */}
        {formik.errors.assessment && (
          <Box mt={Spaces.TWO}>
            <Alert type="error">You need to select some option above</Alert>
          </Box>
        )}
        </form>
      </Flex>
    </Flex>
    <Box my={Spaces.ONE_HALF} as="section">
      <HeadingTwo as="h1">{hero.name}</HeadingTwo>
      <Description color={Colors.GRAY_700}>{hero.biography['full-name']} - {hero.biography.publisher}</Description>
    </Box>
    <DetailsGrid>
      <Card>
        <Box p={Spaces.TWO}>
          <Box mb={Spaces.ONE}>
          <Caption>NickNames</Caption>
          </Box>
          <Description color={Colors.GRAY_700}>
              {hero.biography.aliases.join(', ')}
          </Description>
        </Box>
      </Card>
      <Card>
        <Box p={Spaces.TWO}>
          <Box mb={Spaces.ONE}>
          <Caption>Born Places</Caption>
          </Box>
          <Description color={Colors.GRAY_700}>
              {hero.biography['place-of-birth']}
          </Description>
        </Box>
      </Card>
      <Card>
        <Box p={Spaces.TWO}>
          <Box mb={Spaces.ONE}>
          <Caption>First HQ</Caption>
          </Box>
          <Description color={Colors.GRAY_700}>
             {hero.biography['first-appearance']}
          </Description>
        </Box>
      </Card>

      <Card>
        <Box p={Spaces.TWO}>
          <Box mb={Spaces.ONE}>
          <Caption>Bio Information</Caption>
          </Box>
          <Description color={Colors.GRAY_700}>
              <strong>Genre:</strong> {hero.appearance.gender}
              <br/>
              <strong>Race:</strong> {hero.appearance.race}
              <br/>
              <strong>Height:</strong> {hero.appearance.height[0]}
              <br/>
              <strong>Weight:</strong> {hero.appearance.weight[0]}
              <br/>
              <strong>Eye Color:</strong> {hero.appearance['eye-color']}
              <br/>
              <strong>Hair Color</strong> {hero.appearance['hair-color']}
          </Description>
        </Box>
      </Card>
      <Card>
        <Box p={Spaces.TWO}>
          <Box mb={Spaces.ONE}>
          <Caption>Attributes</Caption>
          </Box>
          <Description color={Colors.GRAY_700}>
              <strong>Strength:</strong> {hero.powerstats.strength}
              <br/>
              <strong>Smart:</strong> {hero.powerstats.intelligence}
              <br/>
              <strong>Speed:</strong> {hero.powerstats.speed}
              <br/>
              <strong>Durability:</strong> {hero.powerstats.durability}
              <br/>
              <strong>Power:</strong> {hero.powerstats.power}
              <br/>
              <strong>Combat:</strong> {hero.powerstats.combat}
          </Description>
        </Box>
      </Card>

    </DetailsGrid>
    <Flex
      width="100%"
      justifyContent="center"
      mt={Spaces.FIVE}>
        <Box>
          <Button ghost onClick={() => {
            navigate(-1);
          }}>Voltar</Button>
        </Box>
      </Flex>

  </Container>
  )
)}
