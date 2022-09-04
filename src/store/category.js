import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
  child,
} from 'firebase/database';

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const refs = await ref(db, 'users/' + uid + '/categories');
        const categories = [];
        await onValue(refs, (snapshot) => {
          snapshot.forEach((value) => {
            const idi = value.key;
            const val = value.val();
            categories.push({
              ...val,
              id: idi,
            });
          });
        });
        return categories;
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const updateCategors = ref(db, 'users/' + uid + '/categories');
        const updates = await child(updateCategors, id);
        update(updates, { title, limit });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const newCategory = await ref(db, 'users/' + uid + '/categories');
        const category = push(newCategory, { title, limit });
        return { title, limit, id: category.key };
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
