import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    test('O primeiro link deve possuir o texto Home', () => {
      renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /Home/i });
      expect(homeLink).toBeInTheDocument();
    });

    test('O segundo link deve possuir o texto About', () => {
      renderWithRouter(<App />);
      const aboutLink = screen.getByRole('link', { name: /about/i });
      expect(aboutLink).toBeInTheDocument();
    });

    test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
      renderWithRouter(<App />);
      const favLink = screen.getByRole('link', { name: /favorite pokémons/i });
      expect(favLink).toBeInTheDocument();
    });
  });

describe('Teste se a aplicação é redirecionada corretamente', () => {
  test('A aplicação é redirecionada para a página inicial ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /home/i });
      userEvent.click(homeLink);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/');
    });

  test('A aplicação é redirecionada para a página de About ao clicar no link About',
    () => {
      const { history } = renderWithRouter(<App />);
      const aboutLink = screen.getByRole('link', { name: /about/i });
      userEvent.click(aboutLink);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/about');
    });

  test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados',
    () => {
      const { history } = renderWithRouter(<App />);
      const favLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
      userEvent.click(favLink);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });

  test('A aplicação redireciona para página Not Found ao entrar em uma URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/paginaInexistente');
      const notFound = screen
        .getByRole('heading', { name: /Page requested not found/i, level: 2 });
      expect(notFound).toBeInTheDocument();
    });
});
