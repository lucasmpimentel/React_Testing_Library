import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste se é renderizado um card com as informações de determinado pokémon',
  () => {
    test('O nome correto do Pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const getPokemonName = screen.getByTestId('pokemon-name');
      expect(getPokemonName).toHaveTextContent(/pikachu/i);
      const getBug = screen.getByRole('button', { name: /bug/i });
      userEvent.click(getBug);
      expect(getPokemonName).toHaveTextContent(/caterpie/i);
    });

    test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
      renderWithRouter(<App />);
      const getPokemonType = screen.getByTestId('pokemon-type');
      expect(getPokemonType).toHaveTextContent(/electric/i);
      const getBug = screen.getByRole('button', { name: /bug/i });
      userEvent.click(getBug);
      expect(getPokemonType).toHaveTextContent(/bug/i);
    });

    test('O peso médio do pokémon deve ser exibido de forma correta', () => {
      renderWithRouter(<App />);
      const caterpieWeight = 'Average weight: 2.9 kg';
      const pikachuWeight = 'Average weight: 6.0 kg';
      const getPokemonWeight = screen.getByTestId('pokemon-weight');
      expect(getPokemonWeight).toHaveTextContent(pikachuWeight);
      const getBug = screen.getByRole('button', { name: /bug/i });
      userEvent.click(getBug);
      expect(getPokemonWeight).toHaveTextContent(caterpieWeight);
    });

    // Usei essa sugestão do .textContent pra conseguir pegar o nome através do testId
    // https://stackoverflow.com/questions/61654862/how-to-get-the-value-of-the-span-element-with-testid-using-react-testing-library
    test('A imagem do Pokémon deve ser exibida', () => {
      renderWithRouter(<App />);
      const getPikachuImg = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
      const getCaterpieImg = 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png';
      const getPokemonName = screen.getByTestId('pokemon-name').textContent;
      const getPokemonImg = screen.getByRole('img');
      const { src: Img, alt } = getPokemonImg;
      expect(Img).toBe(getPikachuImg);
      expect(alt).toBe(`${getPokemonName} sprite`);
      const getBug = screen.getByRole('button', { name: /bug/i });
      userEvent.click(getBug);
      const getPokemonName2 = screen.getByTestId('pokemon-name').textContent;
      const getPokemonImg2 = screen.getByRole('img');
      const { src: Img2, alt: alt2 } = getPokemonImg2;
      expect(Img2).toBe(getCaterpieImg);
      expect(alt2).toBe(`${getPokemonName2} sprite`);
    });
  });

describe('Teste se o card do Pokémon indicado contém um link para exibir detalhes',
  () => {
    test('O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido',
      () => {
        const ID_PIKACHU = 25;
        const { history } = renderWithRouter(<App />);
        const getDetailsLink = screen.getByRole('link', { name: /more details/i });
        userEvent.click(getDetailsLink);
        const getPikachuName = screen
          .getByRole('heading', { level: 2, name: /Pikachu details/i });
        expect(getPikachuName).toBeInTheDocument();
        const { location: { pathname } } = history;
        expect(pathname).toBe(`/pokemons/${ID_PIKACHU}`);
      });
  });

describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  test('O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg',
    () => {
      renderWithRouter(<App />);
      const getDetailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(getDetailsLink);
      const getFavCheckbox = screen.getByRole('checkbox');
      userEvent.click(getFavCheckbox);
      const getStar = screen.getByRole('img', { name: /is marked as favorite/i });
      const { src } = getStar;
      const starPath = 'star-icon.svg';
      expect(src).toBe(`http://localhost/${starPath}`);
    });
});
