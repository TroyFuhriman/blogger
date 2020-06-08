<template>
  <div class="post mt-3 col-md-9 col-12 text-center">
    <button @click="form = !form" class="btn btn-primary">Create Blog</button>
    <form v-if="form" @submit.prevent="createBlog">
      <div class="form-group mt-2">
        <input
          type="text"
          class="form-control"
          name="title"
          id="title"
          aria-describedby="emailHelp"
          v-model="newBlog.title"
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
          v-model="newBlog.body"
          required
          rows="3"
        ></textarea>
      </div>
      <div class="row text-center">
        <div class="col">
          <button type="submit" class="btn btn-success">Post</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      newBlog: {},
      form: false
    };
  },
  computed: {
    blog() {
      return this.$store.state.activeBlog;
    }
  },
  methods: {
    createBlog() {
      this.$store.dispatch("createBlog", { ...this.newBlog });
      this.newBlog = {};
    }
  }
};
</script>

<style>
</style>