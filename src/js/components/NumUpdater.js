import React from 'react';
import { store } from '../store';
import Layout from './Layout';

export default () =>
  <Layout click={() => store.dispatch({ type: 'INCREMENT' })} num={store.getState().get('num')} />;
