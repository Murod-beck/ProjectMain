<template>
  <div>
    <div class="app-main-layout">
      <HeaderCard :key="locale" />
      <main class="app-content">
        <div class="app-page">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import HeaderCard from './HeaderCard.vue';
import messages from '@/messages/messages';
import local from '@/filtrs/localefiltr';

export default {
  data() {
    return {};
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }
    this.loading = false;
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || local('Error'));
    },
  },
  components: { HeaderCard },
};
</script>
