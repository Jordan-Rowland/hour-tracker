import React from 'react';
import { render, cleanup } from '@testing-library/react';
import AddTask from '../components/AddTask.jsx'

afterEach(cleanup);

it('should render "Track Hours"', () => {
  const { getByPlaceholderText } = render(<AddTask />);
  expect(getByPlaceholderText('hours - default 20')).toHaveTextContent("")
});
