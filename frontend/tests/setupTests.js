import ReactDOM from 'react-dom';

import 'jest-styled-components';

global.beforeEach(() => {
  ReactDOM.createPortal = jest.fn((element) => element);
});

afterEach(() => {
  ReactDOM.createPortal.mockClear();
});
