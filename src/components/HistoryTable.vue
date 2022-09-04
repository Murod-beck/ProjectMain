<template>
  <table class="text-col">
    <thead>
      <tr>
        <th>#</th>
        <th>{{ $filters.local('Miqdor') }}</th>
        <th>{{ $filters.local('Date') }}</th>
        <th>{{ $filters.local('Categories') }}</th>
        <th>{{ $filters.local('Tur') }}</th>
        <th>{{ $filters.local('Ochish') }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(rec, idx) of records" :key="rec.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ $filters.curr(rec.amount, 'RUB') }}</td>
        <td>{{ $filters.date(rec.date, 'datetime') }}</td>
        <td>{{ rec.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[rec.typeClass]">{{
            rec.typeText
          }}</span>
        </td>
        <td>
          <button
            v-tooltips="'Batafsil'"
            class="btn-small btn"
            @click="$router.push('/detail/' + rec.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'HistoryTable',
  created() {},
  data() {
    return {};
  },
  props: {
    records: {
      require: true,
      type: Array,
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
