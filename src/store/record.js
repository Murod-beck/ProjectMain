import { getDatabase, ref, push, onValue, child } from 'firebase/database';

export default {
  actions: {
    async createRecord({ commit, dispatch }, record) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const newRecord = await ref(db, 'users/' + uid + '/records');
        push(newRecord, record);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecords({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const refs = await ref(db, 'users/' + uid + '/records');
        const records = [];
        await onValue(refs, (snapshot) => {
          snapshot.forEach((value) => {
            const valsi = value.val();
            const keysi = value.key;
            records.push({ ...valsi, id: keysi });
          });
        });
        return records;
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecordById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const recordId = [];
        const refs = await child(ref(db, 'users/' + uid + '/records'), id);
        await onValue(refs, (snapshot) => {
          const val = snapshot.val();
          recordId.push({ ...val, id });
        });
        return recordId;
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
