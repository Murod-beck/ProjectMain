<template>
  <div class="conter">
    <Hero :titles="$filters.local('Batasil')" />
    <Loader v-if="loading" />
    <div v-else-if="record" v-for="rec of record" :key="rec">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{
          $filters.local('Orqaga')
        }}</router-link>
        <a @click.prevent class="breadcrumb"
          >{{
            rec.type === 'income'
              ? $filters.local('Kirim')
              : $filters.local('Chiqim')
          }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card red"
            :class="{
              red: rec.type === 'outcome',
              green: rec.type === 'income',
            }"
          >
            <div class="card-content">
              <p>{{ $filters.local('Tavsif') }}: {{ rec.description }}</p>
              <p>
                {{ $filters.local('Miqdor') }}:
                {{ $filters.curr(rec.amount, 'RUB') }}
              </p>
              <p>{{ $filters.local('Categories') }}: {{ rec.catName }}</p>

              <small>{{ $filters.date(rec.date, 'datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>
      {{ $route.params.id }} {{ $filters.local('NoId') }}
    </p>
  </div>
</template>
<script>
import Hero from '@/components/apps/Hero.vue';
export default {
  name: 'Detail',
  data() {
    return {
      record: null,
      loading: true,
      catNames: null,
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const records = await this.$store.dispatch('fetchRecordById', id);
    this.catNames = await this.$store.dispatch('fetchCategories');
    this.record = records.map((record) => {
      return {
        ...record,
        catName: this.catNames.find((c) => c.id === record.categoryId).title,
      };
    });
    this.loading = false;
  },
  components: { Hero },
};
</script>
