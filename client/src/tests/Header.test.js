import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Header from '../components/Header.jsx'

afterEach(cleanup);

it('should click about', () => {
  const { getByText, queryByText } = render(<Header />);
  fireEvent.click(getByText('About'));

  expect(queryByText('Logout')).toBeNull();
});
