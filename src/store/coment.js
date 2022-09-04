import { getDatabase, ref, push, onValue, update } from 'firebase/database';

export default {
  actions: {
    async createComent({ commit }, { name, coment }) {
      try {
        const db = getDatabase();
        const newComent = await ref(db, 'coments');
        push(newComent, { name, coment });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchComent({ dispatch }) {
      try {
        const db = getDatabase();
        const comentar = [];
        await onValue(ref(db, 'coments'), (snapshot) => {
          snapshot.forEach((values) => {
            comentar.push(values.val());
          });
        });
        return comentar;
      } catch (e) {}
    },
  },
};
