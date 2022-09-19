import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import messagePlugin from './messages/message.plugin';
import currencyFilter from './filtrs/currencyfiltr';
import dateFilter from './filtrs/datefiltr';
import localizeFilter from './filtrs/localefiltr';
import Loader from './components/apps/Loader';
import tooltip from './directive/tooltip';
import Paginate from 'vuejs-paginate-next';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'projectoscrm.firebaseapp.com',
  databaseURL:
    'https://projectoscrm-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'projectoscrm',
  storageBucket: 'projectoscrm.appspot.com',
  messagingSenderId: '788639159202',
  appId: '1:788639159202:web:ccc8da2139a8451ab398fb',
};

const apps = initializeApp(firebaseConfig);

const db = getDatabase(apps);

const sg = getStorage(apps);

const auth = getAuth();
onAuthStateChanged(auth, () => {
  const app = createApp(App);
  app.component('Paginate', Paginate);
  app.directive('tooltips', tooltip);
  app.component('Loader', Loader);
  app.config.globalProperties.$filters = {
    date: dateFilter,
    curr: currencyFilter,
    local: localizeFilter,
  };
  app.use(messagePlugin);
  app.use(store);
  app.use(router);
  app.mount('#app');
});
