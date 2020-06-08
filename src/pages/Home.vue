<template>
  <div class="home container-fluid bg-image">
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="border-bottom text-dark border-dark">Welcome</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <post v-if="$auth.isAuthenticated" />
    </div>
    <div class="row">
      <blogs v-for="blog in blogs" :key="blog.id" :blogs="blog" />
    </div>
  </div>
</template>

<script>
import Blogs from "@/components/BlogsComponent.vue";
import Post from "@/components/PostComponent.vue";
export default {
  name: "home",
  components: {
    Blogs,
    Post
  },
  methods: {
    profileCheck() {
      this.$store.dispatch("getProfile");
    }
  },
  mounted() {
    this.$store.dispatch("getBlogs");
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    },
    profile() {
      return this.$store.state.profile;
    }
  }
};
</script>
<style>
.bg-image {
  background-image: url(../assets/river.jpg);
  height: fit-content;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
