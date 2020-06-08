<template>
  <div class="about container-fluid bg-image1">
    <div class="row">
      <div class="col text-shadow text-center">
        <h2 class="flex-wrap">Welcome {{ profile.name }}</h2>
        <img @click="form = !form" class="rounded" :src="profile.picture" alt />
        <div v-if="form" class="row justify-content-center">
          <form class="text-center col-2">
            <div class="form-group">
              <input
                type="text"
                name="name"
                id="name"
                class="form-control"
                v-model="uProfile.name"
                placeholder="Name..."
              />
            </div>
            <button @click="updateProfile" class="btn btn-success btn-outline-dark">update profile</button>
          </form>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-3 border-bottom border-dark text-shadow text-center">
        <h1>My Blogs</h1>
      </div>
    </div>
    <div class="row pb-3">
      <blogs v-for="blog in proBlog" :key="blog.id" :blogs="blog" />
    </div>
    <div class="row justify-content-center">
      <div class="col-3 border-bottom border-dark text-center text-shadow text-light">
        <h1>My Comments</h1>
      </div>
    </div>
    <div class="row pb-3">
      <comments v-for="comment in proComments" :key="comment.id" :comment="comment" />
    </div>
  </div>
</template>

<script>
import Blogs from "@/components/BlogsComponent.vue";
import Comments from "@/components/CommentsComponent.vue";
export default {
  name: "Profile",
  data() {
    return {
      uProfile: {},
      form: false
    };
  },
  components: {
    Blogs,
    Comments
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    proBlog() {
      return this.$store.state.pBlog;
    },
    proComments() {
      return this.$store.state.pComments;
    }
  },
  // methods: {
  //   updateProfile() {
  //     this.$store.dispatch("updateProfile"),
  //       { ...this.uProfile },
  //       (this.uProfile = {});
  //   }
  // },
  mounted() {
    this.$store.dispatch("getProfile");
    this.$store.dispatch("getProfileComments");
    this.$store.dispatch("getProfileBlog");
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
.text-shadow {
  text-shadow: 1px 1px white;
}
</style>
