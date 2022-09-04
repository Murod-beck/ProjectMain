<template>
  <div class="conter">
    <Hero :titles="$filters.local('Reja')" />
    <div>
      <div class="page-title">
        <h4 class="grey-text">{{ $filters.curr(info.bill, 'RUB') }}</h4>
      </div>

      <Loader v-if="loading" />

      <p class="center red" v-else-if="!categories.length">
        {{ $filters.local('NoCategor') }}
        <router-link to="/categories">{{
          $filters.local('NewCategor')
        }}</router-link>
      </p>

      <section class="grey-text" v-else>
        <div v-for="cats of categories" :key="cats.id">
          <p>
            <strong>{{ cats.title }}</strong>
            {{ $filters.curr(cats.spend, 'RUB') }} {{ $filters.local('Dan') }}
            {{ $filters.curr(cats.limit, 'RUB') }}
          </p>
          <div class="progress" v-tooltips="cats.tooltip">
            <div
              class="determinate"
              :class="[cats.progressColor]"
              :style="{ width: cats.progressPersent + '%' }"
            ></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import currencyFilter from '@/filtrs/currencyfiltr';
import { mapGetters } from 'vuex';
import Hero from '@/components/apps/Hero.vue';
import localize from '@/filtrs/localefiltr';
export default {
  name: 'Planning',
  data() {
    return {
      loading: true,
      categories: [],
    };
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.categories = categories.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === 'outcome')
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);
      const percent = (100 * spend) / cat.limit;
      const progressPersent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red';
      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? localize('Tooltips') : localize('Tooltip')
      } ${currencyFilter(Math.abs(tooltipValue), 'RUB')}`;
      return {
        ...cat,
        progressPersent,
        progressColor,
        spend,
        tooltip,
      };
    });
    this.loading = false;
  },
  computed: {
    ...mapGetters(['info']),
  },
  components: { Hero },
};
</script>
