<template>
  <div class="blog-details container-fluid bg-image2 app">
    <div class="main">
      <div class="row justify-content-center mt-5">
        <div class="col-md-6 col-12">
          <div class="card">
            <div class="row">
              <router-link :to="{ name: 'Home'}">
                <span
                  type="button"
                  v-if="blog.creatorEmail == profile.email"
                  @click="deleteBlog"
                  class="text-danger ml-1 col-1"
                >
                  <i class="fa fa-times" aria-hidden="true"></i>
                </span>
              </router-link>
            </div>
            <div class="card-body">
              <h4 class="card-title text-center border-bottom">{{blog.title}}</h4>
              <p class="card-text">{{blog.body}}</p>
              <p class="card-text text-right small">{{blog.creatorEmail}}</p>
            </div>
            <div class="text-center">
              <button
                @click="form = !form"
                v-if="blog.creatorEmail == profile.email"
                class="btn btn-warning btn-outline-dark"
              >Edit</button>
            </div>
            <form v-if="form" @submit.prevent="editedBlog">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="title"
                  id="title"
                  aria-describedby="emailHelp"
                  v-model="editBlog.title"
                  required
                  placeholder="Title..."
                />
              </div>
              <div class="form-group">
                <textarea
                  placeholder="Blog post here..."
                  class="form-control"
                  name="body"
                  id="body"
                  v-model="editBlog.body"
                  required
                  rows="3"
                ></textarea>
              </div>
              <div class="row text-center">
                <div class="col">
                  <button type="submit" class="btn btn-success btn-outline-dark">Post</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <post-comment v-if="$auth.isAuthenticated" />
      </div>
      <div class="row">
        <comments v-for="comment in comments" :key="comment.id" :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script>
import Comments from "@/components/CommentsComponent.vue";
import PostComment from "@/components/PostComments.vue";
import Blogs from "@/components/BlogsComponent.vue";
export default {
  name: "BlogDetails",
  data() {
    return {
      editBlog: {
        blogId: this.$route.params.id
      },
      form: false
    };
  },
  mounted() {
    this.$store.dispatch("getBlogDetails", this.$route.params.id);
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    },
    profile() {
      return this.$store.state.profile;
    },
    blog() {
      return this.$store.state.activeBlog;
    }
  },
  methods: {
    editedBlog() {
      this.$store.dispatch("editBlog", {
        ...this.editBlog
      });
      this.editBlog = {
        blogId: this.$route.params.id
      };
    },
    deleteBlog() {
      this.$store.dispatch("deleteBlog", this.blog.id);
    }
  },
  components: {
    Comments,
    PostComment,
    Blogs
  }
};
</script>

<style>
</style>