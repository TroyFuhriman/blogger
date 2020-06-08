<template>
  <div class="col-md-4 col-12 comments">
    <div class="card">
      <div class="row">
        <span
          v-if="comment.creatorEmail == profile.email"
          @click="deleteComment"
          class="text-danger ml-1 col-1"
          type="button"
        >
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
      </div>
      <div class="card-body">
        <p class="card-text small">{{comment.creatorEmail}}</p>
        <h4 class="card-title">{{comment.body}}</h4>
        <p class="card-text text-right small">{{comment.createdAt}}</p>
        <span v-if="hidden">{{comment.blogId}}</span>
      </div>
      <div class="text-center">
        <button
          @click="form = !form"
          v-if="comment.creatorEmail == profile.email"
          class="btn btn-warning btn-outline-dark mb-2"
        >Edit</button>
      </div>
      <div class="row justify-content-center">
        <form v-if="form" @submit.prevent="editComment" class="form-group mt-1 col-11">
          <input
            type="text"
            class="form-control"
            v-model="editComments.body"
            name="comm"
            id="comm"
            placeholder="edits this comment"
          />
          <div class="row">
            <div class="col text-center">
              <span v-if="hidden">{{comment.id}}</span>
              <button type="submit" class="mt-3 btn btn-success btn-outline-dark">edit Comment</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comments",
  data() {
    return {
      editComments: {
        id: this.comment.id,
        blogId: this.comment.blogId
      },
      form: false
    };
  },
  props: ["comment"],
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", this.comment);
    },
    editComment() {
      this.$store.dispatch("editComments", { ...this.editComments });
      this.editComments = {
        id: this.comment.id,
        blogId: this.comment.blogId
      };
    }
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    activeBlog() {
      return this.$store.state.activeBlog;
    }
  }
};
</script>

<style>
</style>