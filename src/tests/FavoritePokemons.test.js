import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente FavoritePokemons', () => {
  test('É exibido na tela ´No favorite pokemon found´ se não houverem pokémons favoritos',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const noPokemon = screen.getByText(/no favorite pokemon found/i);
      expect(noPokemon).toBeInTheDocument();
    });

  test('São exibidos todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const getDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(getDetails);
    const getFavCheckbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(getFavCheckbox);
    history.push('/pokemons/4');
    const getNewPokemon = screen
      .getByRole('heading', { level: 2, name: /Charmander Details/i });
    expect(getNewPokemon).toBeInTheDocument();
    userEvent.click(getFavCheckbox);
    history.push('/favorites');
    const getFavPageTitle = screen
      .getByRole('heading', { level: 2, name: /Favorite pokémons/i });
    expect(getFavPageTitle).toBeInTheDocument();
    const getFavorites = screen.getAllByTestId('pokemon-name');
    expect(getFavorites.length).toBe(2);
  });
});
