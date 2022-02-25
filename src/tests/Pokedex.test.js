import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Teste o componente Pokedex', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const getTitle = screen
      .getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(getTitle).toBeInTheDocument();
  });
});

describe(
  'Teste se é exibido o próximo Pokémon da lista quando clicado o botão Próximo pokémon',
  () => {
    beforeEach(() => renderWithRouter(<App />));
    test('O botão deve conter o texto Próximo pokémon', () => {
      const getButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(getButton).toBeInTheDocument();
    });

    test('Os Pokémons devem ser mostrados, um a um, ao clicar sucessivamente no botão',
      () => {
        const getPokemon = () => screen.getByTestId('pokemon-name').textContent;
        const getButton = screen.getByRole('button', { name: /Próximo pokémon/i });
        pokemonList.forEach((pokemon) => {
          expect(getPokemon()).toBe(pokemon.name);
          userEvent.click(getButton);
        });
        expect(getPokemon()).toBe(pokemonList[0].name);
      });

    test('Teste se é mostrado apenas um Pokémon por vez', () => {
      const getAllPokemons = screen.getAllByTestId('pokemon-name');
      expect(getAllPokemons).toHaveLength(1);
    });
  },
);

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição',
    () => {
      const getFilterButton = (pokemonType) => screen
        .getByRole('button', { name: pokemonType });
      pokemonList.forEach((pokemon) => {
        const { type } = pokemon;
        expect(getFilterButton(type)).toBeInTheDocument();
      });
    });

  test('Ao selecionar um tipo, a Pokédex deve circular apenas nos pokémons daquele tipo',
    () => {
      const getNextButton = screen.getByRole('button', { name: /próximo pokémon/i });
      const getPokemonType = () => screen.getByTestId('pokemon-type').textContent;
      const getFilterButton = (pokemonType) => screen
        .getByRole('button', { name: pokemonType });
      pokemonList.forEach((pokemon) => {
        const { type } = pokemon;
        const selType = getFilterButton(type);
        userEvent.click(selType);
        expect(getPokemonType()).toBe(type);
        const nextBtnDisabled = screen
          .getByTestId('next-pokemon')
          .getAttribute('disabled');
        console.log(nextBtnDisabled);
        if (nextBtnDisabled) {
          userEvent.click(getNextButton);
          expect(getPokemonType()).toBe(type);
        }
      });
      const getTypeBtn = screen.getAllByTestId('pokemon-type-button');
      expect(getTypeBtn[0]).toBeInTheDocument();
      const getAllBtn = screen.getByRole('button', { name: /all/i });
      userEvent.click(getAllBtn);
    });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const getAllBtn = screen.getByRole('button', { name: /All/i });
    expect(getAllBtn).toBeInTheDocument();
  });
});
