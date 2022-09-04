<template>
  <div class="loaders">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  created() {},
  data() {
    return {};
  },
  computed: {},
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.loaders {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  margin: 100px auto;
}
.circle {
  background-color: blueviolet;
  width: 20px;
  height: 20px;
  margin: 0 4px;
  border-radius: 50%;
  animation: animate 2s infinite linear;
}
.circle:nth-child(1) {
  animation-delay: 0.5s;
}
.circle:nth-child(2) {
  animation-delay: 1s;
}
.circle:nth-child(3) {
  animation-delay: 1.5s;
}
@keyframes animate {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
