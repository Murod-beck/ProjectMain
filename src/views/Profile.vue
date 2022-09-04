<template>
  <div class="conter">
    <Hero :titles="$filters.local('Profile')" />

    <form class="form auth-card">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            validate: v$.name.$dirty && v$.name.required,
          }"
        />
        <label for="description">{{ $filters.local('Name') }}</label>
        <span class="helper-text invalid" v-if="v$.name.$error">{{
          $filters.local('NameSpan')
        }}</span>
      </div>

      <div class="switch page-title">
        <label>
          English
          <input type="checkbox" v-model="isLocale" />
          <span class="lever"></span>
          Russia
        </label>
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
        @click.prevent="submitFormas"
      >
        {{ $filters.local('Yangilash') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import Hero from '@/components/apps/Hero.vue';
export default {
  name: 'Profile',
  data() {
    return {
      v$: useVuelidate(),
      name: '',
      isLocale: true,
    };
  },
  validations() {
    return {
      name: { required },
    };
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitFormas() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isLocale ? 'ru-RU' : 'en-US',
        });
      } catch (e) {}
    },
  },
  mounted() {
    this.name = this.info.name;
    this.isLocale = this.info.locale === 'ru-RU';
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  computed: {
    ...mapGetters(['info']),
  },
  components: { Hero },
};
</script>
<style scoped></style>
