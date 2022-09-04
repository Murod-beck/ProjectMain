<template>
  <div class="col s12 m6 grey darken-3 carta">
    <div>
      <div class="page-subtitle">
        <h4>{{ $filters.local('Tahrirlash') }}</h4>
      </div>

      <form @submit.prevent="submitForms">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="selec of selected" :key="selec.id" :value="selec.id">
              {{ selec.title }}
            </option>
          </select>
          <label>{{ $filters.local('Categors') }}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$error && v$.title.required }"
          />
          <label for="name">{{ $filters.local('Nam') }}</label>
          <span
            class="helper-text invalid"
            v-if="v$.title.$error && v$.title.required"
            >{{ $filters.local('Names') }}</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$error && v$.limit.minValue }"
          />
          <label for="limit">{{ $filters.local('Miqdor') }}</label>
          <span
            class="helper-text invalid"
            v-if="v$.limit.$error && v$.limit.minValue"
            >{{ $filters.local('minMiqdor') }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ $filters.local('Yangilash') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
import local from '@/filtrs/localefiltr';
export default {
  name: 'CategoriesEdit',
  data() {
    return {
      v$: useVuelidate(),
      select: null,
      current: null,
      title: '',
      limit: 100,
    };
  },
  props: {
    selected: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async submitForms() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch('updateCategory', categoryData);
        this.$message(local('updateCategor'));
        this.$emit('updateData', categoryData);
      } catch (e) {}
    },
  },
  watch: {
    current(catId) {
      const { title, limit } = this.selected.find((c) => c.id === catId);
      (this.title = title), (this.limit = limit);
    },
  },
  created() {
    const { id, title, limit } = this.selected[0];
    (this.current = id), (this.title = title), (this.limit = limit);
  },
  validations() {
    return {
      title: { required },
      limit: { minValue: minValue(100) },
    };
  },
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>

<style lang="scss" scoped></style>
