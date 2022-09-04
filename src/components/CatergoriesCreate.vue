<template>
  <div class="col s12 m6 brown carta">
    <div class="page-subtitle">
      <h4>{{ $filters.local('Yaratish') }}</h4>
    </div>

    <form class="" @submit.prevent="submitForma">
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="title"
          :class="{
            invalid: v$.title.$error && v$.title.required,
          }"
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
        {{ $filters.local('Yaratish') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
import local from '@/filtrs/localefiltr';
export default {
  name: 'CategoriesCreate',
  data() {
    return {
      v$: useVuelidate(),
      title: '',
      limit: 100,
    };
  },
  validations() {
    return {
      title: { required },
      limit: { minValue: minValue(100) },
    };
  },
  mounted() {
    M.updateTextFields();
  },
  props: {},
  methods: {
    async submitForma() {
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }
      try {
        const categorya = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        });
        (this.title = ''), (this.limit = 100), this.v$.$reset();
        this.$message(local('nowCategor'));
        this.$emit('createdNew', categorya);
      } catch (e) {}
    },
  },
};
</script>

<style lang="scss" scoped></style>
