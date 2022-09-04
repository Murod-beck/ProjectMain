import local from '@/filtrs/localefiltr';

export default {
  logout: local('Logout'),
  login: local('FirstLogin'),
  'auth/user-not-found': local('NoUserEmail'),
  'auth/wrong-password': local('noPassword'),
  'auth/email-already-in-use': local('noEmail'),
};
