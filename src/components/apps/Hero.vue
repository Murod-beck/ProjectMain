<template>
  <div class="col s12">
    <ul class="collection">
      <li class="collection-item avatar grey darken-3">
        <img class="circle" :src="userPhoto" />
        <span class="title">{{ $filters.date(date, 'datetime') }}</span>
        <div
          class="btn-floating secondary-content modal-trigger"
          v-tooltips="$filters.local('Photo')"
          href="#modal1"
        >
          <i class="material-icons">camera_alt</i>
        </div>
        <h4 class="center">{{ titles }}</h4>
      </li>
    </ul>
    <div id="modal1" class="modal card auth-card" ref="modalka">
      <form action="#" @submit.prevent="addImages">
        <div class="file-field">
          <input type="file" @change="newImages" />
          <div class="file-path-wrapper">
            <input class="file-path" type="text" />
          </div>
        </div>
        <div class="center">
          <img :src="imageUrl" height="100" />
        </div>
        <button
          class="btn waves-effect waves-light secondary-content"
          type="submit"
          name="action"
        >
          Submit
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import local from '@/filtrs/localefiltr';
export default {
  name: 'Hero',
  data() {
    return {
      date: new Date(),
      userPhoto: null,
      modal: null,
      imageUrl: '',
      imagefile: null,
      imagetitle: '',
    };
  },
  props: ['titles'],
  methods: {
    async addImages() {
      if (!this.imagefile) {
        return;
      }
      try {
        const addPhotos = {
          files: this.imagefile,
          title: this.imagetitle,
        };

        await this.$store.dispatch('createPhoto', addPhotos);
        this.$message(local('newPhoto'));
        this.modal.close();
      } catch (e) {}
    },
    newImages(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        return alert('File tanlang!');
      }
      this.imagetitle = filename;

      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.imagefile = files[0];
    },
  },
  async mounted() {
    this.userPhoto = await this.$store.dispatch('fetchPhoto');

    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);

    this.modal = M.Modal.init(this.$refs.modalka);
  },
  destroyed() {
    if (this.modal && this.modal.destroy) {
      this.modal.destroy();
    }
  },
};
</script>

<style lang="scss" scoped></style>
