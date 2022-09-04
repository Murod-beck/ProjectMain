<template>
  <div class="conter">
    <Hero :titles="$filters.local('Categories')" />
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CatergoriesCreate @createdNew="newCategory" />

        <CategoriesEdit
          v-if="categories.length"
          :selected="categories"
          :key="categories.length + updateCount"
          @updateData="updateCategories"
        />
        <h4 v-else class="center red">{{ $filters.local('NoCategor') }}</h4>
      </div>
    </section>
  </div>
</template>
<script>
import CatergoriesCreate from '@/components/CatergoriesCreate.vue';
import CategoriesEdit from '@/components/CategoriesEdit.vue';
import Hero from '@/components/apps/Hero.vue';
export default {
  name: 'Categories',
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0,
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  methods: {
    newCategory(categor) {
      this.categories.push(categor);
    },
    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    },
  },
  components: { CatergoriesCreate, CategoriesEdit, Hero },
};
</script>
