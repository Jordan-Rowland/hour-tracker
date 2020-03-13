import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Main from '../components/Main.jsx'

afterEach(cleanup);

it('should should render "Track Hours"', () => {
  const { getByTestId } = render(<Main />);
  expect(getByTestId('header')).toHaveTextContent("Track Hours")
});
