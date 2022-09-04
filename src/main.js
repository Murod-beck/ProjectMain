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
  apiKey: 'AIzaSyCsuxgWl1y49kQez7b3Vz7jic1bBu24n5A',
  authDomain: 'projects-m-28a3c.firebaseapp.com',
  databaseURL:
    'https://projects-m-28a3c-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'projects-m-28a3c',
  storageBucket: 'gs://projects-m-28a3c.appspot.com',
  messagingSenderId: '217037928884',
  appId: '1:217037928884:web:33ac1fbb375471b0df1ae1',
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
