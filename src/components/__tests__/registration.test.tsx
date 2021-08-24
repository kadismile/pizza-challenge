import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Register} from "../../pages/register/register";
import {persistor, store} from "../../redux/store";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";

const setup = () => {
  const utils = render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Register />
      </PersistGate>
    </Provider>
  )
  const nameInput = utils.getByLabelText('name-input')
  const phoneInput = utils.getByLabelText('phone-input')
  return {
    nameInput,
    phoneInput,
    ...utils,
  }
}

test('It should check for name values', () => {
  const { nameInput } = setup()
  fireEvent.change(nameInput, {target: { value: 'kadismile' }})
  // @ts-ignore
  expect(nameInput.value).toBe('kadismile')
})



