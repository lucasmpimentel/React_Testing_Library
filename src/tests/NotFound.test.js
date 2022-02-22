import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import NotFound from '../components/NotFound';

describe('Teste o componente Not Found', () => {
  test('A página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/inexistente');
    const notFoundTitle = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });

  test('A pagina mostra a imagem de not found', () => {
    renderWithRouter(<NotFound />);
    const imgLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const getImg = screen.getByRole('img', { name: /Pikachu crying/i });
    expect(getImg.src).toBe(imgLink);
  });
});
