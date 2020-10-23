import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import initStore from './store';
import userEvent from '@testing-library/user-event';
// UTC1. Win case
test('UTC1 - 0,1,2 (Horizontal line)', async () => {
  const store = initStore();
  const wrapper = render(
    <Provider store={store}>
      <App />
    </Provider>);
  const startGameBtn = wrapper.getByText("Start New Game");
  userEvent.click(startGameBtn);
  const box0 = screen.getByTestId("0");
  userEvent.click(box0);
  const box3 = screen.getByTestId("3");
  userEvent.click(box3);
  const box1 = screen.getByTestId("1");
  userEvent.click(box1);
  const box4 = screen.getByTestId("4");
  userEvent.click(box4);
  const box2 = screen.getByTestId("2");
  userEvent.click(box2);
  const winnerIsPlayerOne = await wrapper.findByText(/player 1 win/i);
  expect(winnerIsPlayerOne.innerHTML).toEqual("Player 1 Win");
});

test('UTC2 - 0,3,6 (Vertical line)', async () => {
  const store = initStore();
  const wrapper = render(
    <Provider store={store}>
      <App />
    </Provider>);
  const startGameBtn = wrapper.getByText("Start New Game");
  userEvent.click(startGameBtn);
  const box0 = screen.getByTestId("0");
  userEvent.click(box0);
  const box3 = screen.getByTestId("4");
  userEvent.click(box3);
  const box1 = screen.getByTestId("3");
  userEvent.click(box1);
  const box4 = screen.getByTestId("5");
  userEvent.click(box4);
  const box2 = screen.getByTestId("6");
  userEvent.click(box2);
  const winnerIsPlayerOne = await wrapper.findByText(/player 1 win/i);
  expect(winnerIsPlayerOne.innerHTML).toEqual("Player 1 Win");
});

test('UTC3 - 0,8,4 - diagonal line left', async () => {
  const store = initStore();
  const wrapper = render(
    <Provider store={store}>
      <App />
    </Provider>);
  const startGameBtn = wrapper.getByText("Start New Game");
  userEvent.click(startGameBtn);
  const box0 = screen.getByTestId("0");
  userEvent.click(box0);
  const box3 = screen.getByTestId("1");
  userEvent.click(box3);
  const box1 = screen.getByTestId("8");
  userEvent.click(box1);
  const box4 = screen.getByTestId("2");
  userEvent.click(box4);
  const box2 = screen.getByTestId("4");
  userEvent.click(box2);
  const winnerIsPlayerOne = await wrapper.findByText(/player 1 win/i);
  expect(winnerIsPlayerOne.innerHTML).toEqual("Player 1 Win");
});

test('UTC3 - 2,4,6 - diagonal line right', async () => {
  const store = initStore();
  const wrapper = render(
    <Provider store={store}>
      <App />
    </Provider>);
  const startGameBtn = wrapper.getByText("Start New Game");
  userEvent.click(startGameBtn);
  const box0 = screen.getByTestId("6");
  userEvent.click(box0);
  const box3 = screen.getByTestId("1");
  userEvent.click(box3);
  const box1 = screen.getByTestId("4");
  userEvent.click(box1);
  const box4 = screen.getByTestId("3");
  userEvent.click(box4);
  const box2 = screen.getByTestId("2");
  userEvent.click(box2);
  const winnerIsPlayerOne = await wrapper.findByText(/player 1 win/i);
  expect(winnerIsPlayerOne.innerHTML).toEqual("Player 1 Win");
});

test('UTC4 - No winner case',async () => {
  //  [x] [o] [x]
  //  [x] [x] [o]
  //  [o] [x] [o]
  const store = initStore();
  const wrapper = render(
    <Provider store={store}>
      <App />
    </Provider>);
  const startGameBtn = wrapper.getByText("Start New Game");
  userEvent.click(startGameBtn);
  const box0 = screen.getByTestId("3");
  userEvent.click(box0);
  const box3 = screen.getByTestId("4");
  userEvent.click(box3);
  const box1 = screen.getByTestId("6");
  userEvent.click(box1);
  const box4 = screen.getByTestId("0");
  userEvent.click(box4);
  const box2 = screen.getByTestId("5");
  userEvent.click(box2);
  userEvent.click(screen.getByTestId("2"));
  userEvent.click(screen.getByTestId("1"));
  userEvent.click(screen.getByTestId("7"));
  userEvent.click(screen.getByTestId("8"));
  const noWinner = await wrapper.findByText(/no winner, please restart a new game/i);
  expect(noWinner.innerHTML.trim()).toEqual("No Winner, please restart a new game");
});