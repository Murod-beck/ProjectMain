<template>
  <form class="card auth-card">
    <div class="card-title center">
      <i class="material-icons">login</i>
    </div>

    <div class="input-field">
      <input
        id="email"
        type="text"
        v-model.trim="email"
        :class="{
          invalid: v$.email.$error && v$.email.required,
        }"
      />
      <label for="email">Email</label>
      <small
        class="helper-text invalid"
        v-if="v$.email.$error && v$.email.required"
        >{{ $filters.local('Emails') }}
      </small>
    </div>

    <div class="input-field">
      <input
        id="password"
        type="password"
        v-model.trim="password"
        :class="{
          invalid: v$.password.$error && v$.password.minLength,
        }"
      />
      <label for="password">{{ $filters.local('Parol') }}</label>
      <small
        class="helper-text invalid"
        v-if="v$.password.$error && v$.password.minLength"
      >
        {{ $filters.local('Parols') }} {{ password.length }}</small
      >
    </div>

    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          @click.prevent="submitForm"
        >
          {{ $filters.local('Kirish') }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ $filters.local('Akaunt') }}
        <router-link to="/register">{{
          $filters.local('Register')
        }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useValidate from '@vuelidate/core';
import { email, required, minLength } from '@vuelidate/validators';
import messages from '@/messages/messages';
export default {
  name: 'Login',
  created() {},
  data() {
    return {
      v$: useValidate(),
      email: '',
      password: '',
    };
  },
  validations() {
    return {
      email: { email, required },
      password: { required, minLength: minLength(6) },
    };
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }
      const formUsers = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch('login', formUsers);
        this.$router.push('/');
      } catch (e) {}
    },
  },
};
</script>

<style lang="scss" scoped>
.card-action {
  border-top: 0;
}
</style>
