import {fireEvent, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../../../utils/store";
import React from "react";
import LogInPage from "../../../components/pages/LogInPage";

describe('LogInPage', () => {
  it('updates username, password and clicks on submit button', async () => {
    render(
      <Provider store={store}>
        <LogInPage/>
      </Provider>
    );
    // Access the provider store
    // Get a value from the store
    const usernameInput = screen.getByTestId('username');
    usernameInput.value = 'tester';
    await expect(usernameInput.value).toBe('tester');
    const passwordInput = screen.getByTestId('password');
    passwordInput.value = 'password';
    expect(passwordInput.value).toBe('password');
    // await waitFor(() => {
    //
    // }, 1000);
    const submit = screen.getByTestId('submit');
    fireEvent.click(submit);
  });
  // It navigates to
});
