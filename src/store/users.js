import {
  push,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { getStorage, uploadBytes, ref as sgRef } from 'firebase/storage';
export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async register({ dispatch, commit }, { email, password, name, photo }) {
      try {
        await createUserWithEmailAndPassword(getAuth(), email, password);
        const uid = await dispatch('getUid');
        const db = getDatabase();
        await set(dbRef(db, 'users/' + uid + '/info'), {
          bill: 10000,
          name,
        });
        const sg = getStorage();
        const refPhotos = sgRef(sg, uid + '/userPhoto.jpg');
        uploadBytes(refPhotos, photo);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    getUid() {
      const user = getAuth().currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      const auth = getAuth();
      await auth.signOut();
      commit('clearInfo');
    },
  },
  mutations: {},
  modules: {},
};
