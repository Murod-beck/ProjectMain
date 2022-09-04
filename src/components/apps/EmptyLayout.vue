<template>
  <div class="grey darken-3 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from '@/messages/messages';
import local from '@/filtrs/localefiltr';
export default {
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || local('Error'));
    },
  },
};
</script>

<style lang="scss" scoped></style>
