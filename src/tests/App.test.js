import React from 'react';
import {fireEvent, screen, waitFor} from '@testing-library/react';
import App from "../App";
import {renderWithRouter} from "../utils/test-utils";
import {store} from "../utils/store";
import {setAuthedUser} from "../actions/authedUser";

describe('App', () => {
  it('Login Page renders without crashing', async () => {
    const route = '/';
    renderWithRouter(<App/>, {route});
    await waitFor(() => {
      expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    }, 1000);
  });
  it('The navigation link selected on app load with custom route', async () => {
    store.dispatch(setAuthedUser('tester'));
    const route = '/add';
    renderWithRouter(<App/>, {route});
    const selected = screen.getByTestId('nav-button-' + route);
    expect(selected.getAttribute('aria-selected')).toBe('true');
  });
  it('link selected status changes on click', async () => {
    const route = '/';
    const targetRoute = '/leaderboard';
    renderWithRouter(<App/>, {route});
    const button = screen.getByTestId('nav-button-' + targetRoute);
    expect(button.getAttribute('aria-selected')).toBe('false');
    fireEvent.click(button);
    const selected = screen.getByTestId('nav-button-' + targetRoute);
    expect(selected.getAttribute('aria-selected')).toBe('true');
  });

  it('Sign out button works', async () => {
    const route = '/';
    renderWithRouter(<App/>, {route});
    const button = screen.getByTestId('sign-out-button');
    fireEvent.click(button);
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('Snapshot test', async () => {
    const route = '/';
    const {container} = renderWithRouter(<App/>, {route});
    expect(container).toMatchSnapshot();
  });
});
