<template>
  <div class="col s12 m6 l4">
    <div class="card bill-card">
      <div class="card-content">
        <span class="card-title">{{ $filters.local('Valyuta') }}</span>

        <p v-for="carn of currencies" :key="carn" class="currency-line">
          <span>{{ $filters.curr(getCarend(carn), carn) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeBill',
  created() {},
  data() {
    return {
      currencies: ['RUB', 'USD', 'UZS'],
    };
  },
  props: ['rates'],
  computed: {
    base() {
      return (
        this.$store.getters.info.bill / this.rates['RUB'] / this.rates['USD']
      );
    },
  },
  methods: {
    getCarend(curren) {
      return Math.floor(this.base * this.rates[curren]);
    },
  },
};
</script>

<style lang="scss" scoped></style>
