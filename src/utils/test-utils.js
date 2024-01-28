import {BrowserRouter} from "react-router-dom";
import {render} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {store} from "./store";
import {Provider} from "react-redux";

export const renderWithRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return {
    user: userEvent.setup(),
    ...render((<Provider store={store}>{ui}</Provider>), {wrapper: BrowserRouter}),
  }
}
