import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Task from '../components/Task.jsx'

afterEach(cleanup);

it('should should render "Track Hours"', () => {
  const { getByTestId } = render(
    <Task
      name="Task Test"
      hours="20"
      hoursCompleted="10"
    />
  );

  expect(getByTestId('taskName')).toHaveTextContent("Task Test")
});
