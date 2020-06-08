<template>
  <div class="col-md-6 col-12 blogs mt-3">
    <div class="card">
      <div class="row">
        <span
          type="button"
          v-if="blogs.creatorEmail == profile.email"
          @click="deleteBlog"
          class="text-danger ml-1 col-1"
        >
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
      </div>
      <div class="card-body">
        <router-link :to="{ name: 'BlogDetails', params: { id: blogs.id }}">
          <h3 class="card-title text-center border-bottom">{{blogs.title}}</h3>
        </router-link>
        <h5 class="card-text">{{blogs.body}}</h5>
        <p class="card-text small text-right">{{blogs.creatorEmail}}</p>
        <p class="card-text small text-right">{{blogs.createdAt}}</p>
      </div>
      <div
        class="text-center justify-content-center row"
        v-if="blogs.creatorEmail == profile.email"
      >
        <div class="col-11">
          <button @click="form = !form" class="mb-2 btn btn-warning btn-outline-dark">Edit</button>
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
                <button type="submit" class="btn btn-success btn-outline-dark mb-2">Post</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Blogs",
  data() {
    return {
      editBlog: {
        blogId: this.blogs.id
      },
      form: false
    };
  },
  props: ["blogs"],
  methods: {
    deleteBlog() {
      this.$store.dispatch("deleteBlog", this.blogs.id);
    },
    editedBlog() {
      this.$store.dispatch("editBlog", {
        ...this.editBlog
      });
      this.editBlog = {
        blogId: this.blogs.id
      };
    }
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  mounted() {}
};
</script>

<style>
.card {
  opacity: 90%;
}
</style>

        

