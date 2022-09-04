<template>
  <form class="card auth-card">
    <div class="card-title center">
      <i class="material-icons">person_add</i>
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

    <div class="input-field">
      <input
        id="name"
        type="text"
        v-model="name"
        :class="{
          invalid: v$.name.$error && v$.name.required,
        }"
      />
      <label for="name">{{ $filters.local('Name') }}</label>
      <small
        class="helper-text invalid"
        v-if="v$.name.$error && v$.name.required"
        >{{ $filters.local('NameSpan') }}</small
      >
    </div>

    <p>
      <label>
        <input type="checkbox" v-model="check" />
        <span>{{ $filters.local('Togrilik') }}</span>
      </label>
    </p>

    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          @click.prevent="submitForm"
        >
          {{ $filters.local('Register') }}
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        {{ $filters.local('Akaunts') }}
        <router-link to="/login">{{ $filters.local('Kirish') }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
export default {
  name: 'Register',
  created() {},
  data() {
    return {
      v$: useVuelidate(),
      email: '',
      password: '',
      name: '',
      check: false,
    };
  },
  validations() {
    return {
      email: { email, required },
      password: { required, minLength: minLength(6) },
      name: { required },
      check: { checked: (v) => v },
    };
  },
  props: {},
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }
      const formUser = {
        email: this.email,
        password: this.password,
        name: this.name,
        photo: require('@/image/user.png'),
      };
      try {
        await this.$store.dispatch('register', formUser);
        this.$router.push('/');
      } catch (e) {}
    },
  },
};
</script>

<style lang="scss" scoped></style>
