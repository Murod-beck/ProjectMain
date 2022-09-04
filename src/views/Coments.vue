<template>
  <div class="coment-card conter">
    <Hero :titles="$filters.local('Coment')" />

    <ComentAdd @addComent="addComents" />

    <Loader v-if="loading" />

    <p class="center red" v-else-if="!items">
      {{ $filters.local('noComent') }}
    </p>

    <div class="row collection text-col" v-for="com in items" :key="com.id">
      <div class="col s9">
        <p>{{ com.coment }}</p>
      </div>
      <div class="chip secondary-content">
        <img src="@/image/user.png" />
        {{ com.name }}
      </div>
    </div>

    <Paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageHendler"
      :prev-text="$filters.local('Orqaga')"
      :next-text="$filters.local('Oldinga')"
      :container-class="'pagination center'"
      :page-class="'waves-effect'"
    />
  </div>
</template>

<script>
import Hero from '@/components/apps/Hero.vue';
import Loader from '@/components/apps/Loader.vue';
import ComentAdd from '@/components/ComentAdd.vue';
import pagination from '../mixins/paginete';
export default {
  name: 'Coments',
  mixins: [pagination],
  data() {
    return {
      loading: true,
      addCount: 0,
      userImages: null,
    };
  },
  async mounted() {
    this.setPagination(await this.$store.dispatch('fetchComent'));

    this.loading = false;
  },
  props: {},
  methods: {
    addComents(come) {
      this.items.push(come);
    },
  },
  components: { Hero, Loader, ComentAdd },
};
</script>

<style lang="scss" scoped></style>
