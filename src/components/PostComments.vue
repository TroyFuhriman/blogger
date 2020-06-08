<template>
  <div class="post-comment col-md-9 col-12">
    <form @submit.prevent="postComment" class="form-group">
      <input
        type="text"
        class="form-control"
        name="comment"
        id="comment"
        v-model="newComment.body"
        placeholder="share your thoughts"
      />
      <div class="row">
        <div class="col text-center">
          <button class="mt-3 btn btn-success btn-outline-dark">Post Comment</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import NotificationService from "../assets/NotificationService.js";
export default {
  name: "PostComment",
  data() {
    return {
      newComment: {
        blogId: this.$route.params.id
      }
    };
  },
  methods: {
    postComment() {
      NotificationService.toast();
      this.$store.dispatch("createComment", { ...this.newComment });
      this.newComment = {
        blogId: this.$route.params.id
      };
    }
  },
  computed: {
    blog() {
      return this.$store.state.activeBlog;
    }
  }
};
</script>

<style>
</style>