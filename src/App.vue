<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/components/apps/EmptyLayout';
import MainLayout from '@/components/apps/MainLayout';
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout';
    },
  },
  components: {
    EmptyLayout,
    MainLayout,
  },
};
</script>
<style lang="scss">
@import 'materialize-css/dist/css/materialize.css';
@import 'assets/index.css';
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&display=swap');
</style>
