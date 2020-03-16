import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Main from '../components/Main.jsx'

afterEach(cleanup);

it('should render "Track Hours"', () => {
  const { getByTestId } = render(<Main />);
  expect(getByTestId('header')).toHaveTextContent("Track Hours")
});

it('should add a task', async () => {
  const { getByPlaceholderText, getByText, queryByText, wait } = render(<Main />);

  const taskInput = getByPlaceholderText('task');
  const hoursInput = getByPlaceholderText('hours - default 20');
  const subtmiButton = getByText('Submit');

  fireEvent.change(taskInput, {target: {value: "new test task"}});
  expect(taskInput.value).toBe('new test task');

  fireEvent.change(hoursInput, {target: {value: "15"}});
  expect(hoursInput.value).toBe('15');

  fireEvent.click(subtmiButton);
  expect(taskInput).toHaveTextContent("");
  expect(hoursInput).toHaveTextContent("");

  // expect(queryByText("new test task")).toBeTruthy();

  /*

    *find input task-name
    *add text
    *add hour input
    assert task exists
    with no more than hours inputted

  */


});

