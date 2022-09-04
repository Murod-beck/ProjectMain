<template>
  <div class="conter">
    <Hero :titles="$filters.local('Record')" />

    <Loader v-if="loading" />

    <p class="center red" v-else-if="!categories.length">
      {{ $filters.local('NoCategor') }}
      <router-link to="/categories">{{
        $filters.local('NewCategor')
      }}</router-link>
    </p>

    <div class="card grey darken-3 recs">
      <form class="form" @submit.prevent="submitFormat">
        <div class="input-field">
          <select ref="select" v-model="category">
            <option v-for="sel of categories" :key="sel.id" :value="sel.id">
              {{ sel.title }}
            </option>
          </select>
          <label> {{ $filters.local('Categors') }}</label>
        </div>

        <p>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
            />
            <span>{{ $filters.local('Kirim') }}</span>
          </label>
        </p>

        <p>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
            />
            <span>{{ $filters.local('Chiqim') }}</span>
          </label>
        </p>

        <div class="input-field">
          <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{ invalid: v$.amount.$error && v$.amount.minValue }"
          />
          <label for="amount">{{ $filters.local('Miqdor') }}</label>
          <span
            class="helper-text invalid"
            v-if="v$.amount.$error && v$.amount.minValue"
            >{{ $filters.local('minMiqdor') }}</span
          >
        </div>

        <div class="input-field">
          <input
            id="description"
            type="text"
            v-model="description"
            :class="{
              invalid: v$.description.$error && v$.description.required,
            }"
          />
          <label for="description">{{ $filters.local('Yozuv') }}</label>
          <span
            class="helper-text invalid"
            v-if="v$.description.$error && v$.description.required"
            >{{ $filters.local('addYozuv') }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ $filters.local('Yaratish') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
import Hero from '@/components/apps/Hero.vue';
import local from '@/filtrs/localefiltr';
export default {
  name: 'Record',
  data() {
    return {
      v$: useVuelidate(),
      loading: true,
      select: null,
      categories: [],
      category: null,
      type: 'outcome',
      amount: 1,
      description: '',
    };
  },
  validations() {
    return {
      amount: { minValue: minValue(1) },
      description: { required },
    };
  },
  computed: {
    ...mapGetters(['info']),
    canRecord() {
      if (this.type === 'income') {
        return true;
      }
      return this.info.bill >= this.amount;
    },
  },
  methods: {
    async submitFormat() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      if (this.canRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          });
          const bill =
            this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;
          await this.$store.dispatch('updateInfo', { bill });
          this.$message(local('newRecord'));
          this.v$.$reset();
          this.amount = 1;
          this.description = '';
        } catch (e) {}
      } else {
        this.$message(`${local('noAmount')} (${this.amount - this.info.bill})`);
      }
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  components: { Hero },
};
</script>
