import { createStore } from 'vuex';
import users from './users';
import info from './info';
import category from './category';
import record from './record';
import coment from './coment';
import images from './images';

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error: (s) => s.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchCurrency() {
      const res = await fetch('https://cdn.cur.su/api/latest.json');
      return await res.json();
    },
  },
  modules: { users, info, category, record, coment, images },
});
