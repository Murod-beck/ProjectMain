import { getDatabase, ref, onValue, update } from 'firebase/database';

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async updateInfo({ commit, dispatch, getters }, toUpdate) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const updateData = { ...getters.info, ...toUpdate };
        const updateInfoo = await ref(db, 'users/' + uid + '/info');
        update(updateInfoo, updateData);
        commit('setInfo', updateData);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        return onValue(
          ref(db, 'users/' + uid + '/info'),
          (snapshot) => {
            const username = snapshot.val() || 'Anonymous';
            commit('setInfo', username);
          },
          {
            onlyOnce: true,
          }
        );
      } catch (e) {}
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
