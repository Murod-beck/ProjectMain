<template>
  <div class="conter">
    <Hero :titles="$filters.local('Tarix')" />

    <div class="history-chart">
      <canvas id="myChart"></canvas>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!records.length">
      {{ $filters.local('noRecord') }}
    </p>
    <section v-else>
      <HistoryTableVue :records="items" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageHendler"
        :prev-text="$filters.local('Orqaga')"
        :next-text="$filters.local('Oldinga')"
        :container-class="'pagination center'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>
<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import pagination from '../mixins/paginete';
import HistoryTableVue from '@/components/HistoryTable.vue';
import Hero from '@/components/apps/Hero.vue';
import local from '@/filtrs/localefiltr';
export default {
  name: 'History',
  mixins: [pagination],
  data() {
    return {
      loading: true,
      records: [],
      charts: null,
    };
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.setup(categories);

    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: categories.map((c) => c.title),
        datasets: [
          {
            label: local('Chiqim'),
            data: categories.map((c) => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === 'outcome') {
                  total += +r.amount;
                }
                return total;
              }, 0);
            }),

            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
          },
        },
      },
    });
    myChart;
    this.loading = false;
  },
  methods: {
    setup(categories) {
      this.setPagination(
        this.records.map((record) => {
          return {
            ...record,
            categoryName: categories.find((c) => c.id === record.categoryId)
              .title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText:
              record.type === 'income' ? local('Kirim') : local('Chiqim'),
          };
        })
      );
    },
  },
  components: { HistoryTableVue, Hero },
};
</script>
