import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  test('O titulo About Pokédex aparece na pagina', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(aboutTitle).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstPTag = /This application simulates a Pokédex/i;
    const secPTag = /One can filter Pokémons by type/i;
    const getFirstPTag = screen.getByText(firstPTag);
    const getSecPTag = screen.getByText(secPTag);
    expect(getFirstPTag && getSecPTag).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const imgLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const getImage = screen.getByRole('img');
    expect(getImage.src).toBe(imgLink);
  });
});
