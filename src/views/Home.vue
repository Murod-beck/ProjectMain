<template>
  <div class="conter">
    <Hero :titles="$filters.local('Home')" />
    <Loader v-if="loading" />
    <div class="row" v-else>
      <HomeBill :rates="currency.rates" />
      <HomeCarend :rates="currency.rates" :date="currency.lastupdate" />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill.vue';
import HomeCarend from '@/components/HomeCarend.vue';
import Loader from '@/components/apps/Loader.vue';
import Hero from '@/components/apps/Hero.vue';
export default {
  name: 'Home',
  created() {},
  data() {
    return {
      loading: true,
      currency: null,
    };
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  },

  components: { HomeBill, HomeCarend, Loader, Hero },
};
</script>

<style lang="scss" scoped></style>
