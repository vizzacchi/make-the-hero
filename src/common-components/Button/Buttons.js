import styled from 'styled-components';

import {
	BorderRadiuses,
	Colors,
	Shadows,
	Spaces,
	FontLetterSpacing,
	FontFamilies,
	FontWeights,
  FontSizes,
} from '../../shared/DesignTokens';

export const Button = styled.button`
	border: none;
	outline: none;
	width: 100%;
	height: 40px;
	font-family: ${FontFamilies.PRIMARY};
	font-weight: ${FontWeights.BOLD};
	background-color: ${(props)=>
		props.ghost ? Colors.GRAY_700 : Colors.BLUE_500};
		// cria uma propriedade ghost se ela existir cor Gray se nao cor Blue
	color: ${Colors.NEUTRAL_WHITE};
	box-shadow: ${Shadows.ONE};
	border-radius: ${BorderRadiuses.ONE};
	padding: ${Spaces.ONE} ${Spaces.TWO};
	cursor: pointer;
	transition: 200ms all ease;
	text-transform: uppercase;
    letter-spacing: ${FontLetterSpacing.MEDIUM};
	font-size: ${FontSizes.ONE_QUARTER};

	&:hover {
		background-color: ${(props)=>
			props.ghost ? Colors.GRAY_800 : Colors.BLUE_550};
	}
`;
