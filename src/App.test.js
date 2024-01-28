import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from './utils/store';
import {BrowserRouter} from "react-router-dom";
import App from "./App";


describe('App', () => {
  it('renders without crashing', () => {
      const {screen} = render(
        <React.StrictMode>
          <Provider store={store}>
            <BrowserRouter>
              <App/>
            </BrowserRouter>
          </Provider>
        </React.StrictMode>
  );
    expect(screen.getByText(/Employee/i)).toBeInTheDocument();

    // expect(container).toBeInTheDocument();
  });
});
// test('renders learn react link', () => {
//   const {screen} = render(
//     <Provider store={store}>
//       <App/>
//     </Provider>
//   );
//
//   expect(screen.getByText(/learn/i)).toBeInTheDocument();
// });
