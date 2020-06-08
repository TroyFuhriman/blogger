<template>
  <div class="about container-fluid bg-image1">
    <div class="row">
      <div class="col text-light text-shadow text-center">
        <h1>Welcome {{ profile.name }}</h1>
        <img class="rounded" :src="profile.picture" alt />
        <p>{{ profile.email }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col text-center">
        <h1>My Blogs</h1>
      </div>
    </div>
    <div class="row pb-3">
      <blogs v-for="blog in proBlog" :key="blog.id" :blogs="blog" />
    </div>
    <div class="row">
      <div class="col text-center text-shadow text-light">
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
  text-shadow: 1px 1px black;
}
</style>
