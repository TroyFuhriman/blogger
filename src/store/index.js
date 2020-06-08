import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    blogs: [],
    comments: [],
    activeBlog: {},
    pBlog: [],
    pComments: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    getBlogs(state, blogs) {
      state.blogs = blogs;
    },
    addToBlogs(state, blog) {
      state.blogs = blog
    },
    getComments(state, comments) {
      state.comments = comments
    },
    activeBlog(state, activeBlog) {
      state.activeBlog = activeBlog
    },
    addComment(state, comment) {
      state.comments = comment
    },
    getProfileBlog(state, pBlog) {
      state.pBlog = pBlog
    },
    getProfileComments(state, pComments) {
      state.pComments = pComments
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit, dispatch }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBlogs({ commit, dispatch }) {
      try {
        let res = await api.get('blogs');
        commit("getBlogs", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createBlog({ commit, dispatch }, newBlog) {
      try {
        let res = await api.post('blogs', newBlog)
        commit("addToBlogs", res.data)
        dispatch("getBlogs")
      } catch (error) {
        console.error(error)
      }
    },
    async deleteBlog({ commit, dispatch }, blogId) {
      try {
        let res = await api.delete('blogs/' + blogId)
        dispatch("getBlogs")
        dispatch("getBlogDetails")
        dispatch("getProfileBlog")
      } catch (error) {
        console.error(error)
      }
    },
    async getBlogDetails({ commit, dispatch }, id) {
      try {
        let res = await api.get('blogs/' + id)
        commit("getComments", res.data.comments)
        commit("activeBlog", res.data.blog)
      } catch (error) {
        console.error(error)
      }
    },
    async getComments({ commit, dispatch }, id) {
      try {
        let res = await api.get('blogs/' + id)
        commit('getComments', res.data.comments)
      } catch (error) {
        console.error(error)
      }
    },
    async createComment({ commit, dispatch }, newComment) {
      try {
        let res = await api.post('comments', newComment)
        console.log(res)
        commit("addComment", res.data)
        dispatch("getComments", res.data.blogId)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteComment({ commit, dispatch }, comment) {
      try {
        let res = await api.delete('comments/' + comment.id)
        dispatch("getComments", comment.blogId)
        dispatch("getProfileComments")
        console.log()
      } catch (error) {
        console.error(error)
      }
    },
    async editBlog({ commit, dispatch }, editBlog) {
      try {
        console.log(editBlog.blogId)
        let res = await api.put('blogs/' + editBlog.blogId, editBlog);
        dispatch("getBlogDetails", editBlog.blogId)
        dispatch("getBlogs")
        dispatch("getProfileBlog")
      } catch (error) {
        console.error(error)
      }
    },
    async editComments({ commit, dispatch }, editComment) {
      try {
        console.log(editComment)
        let res = await api.put('comments/' + editComment.id, editComment)
        dispatch("getComments", editComment.blogId)
        dispatch("getProfileComments")
      } catch (error) {
        console.error(error)
      }
    },
    async getProfileBlog({ commit, dispatch }) {
      try {
        let res = await api.get('profile/blogs')
        commit("getProfileBlog", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getProfileComments({ commit, dispatch }) {
      try {
        let res = await api.get('profile/comments')
        commit("getProfileComments", res.data)
      } catch (error) {
        console.error(error)
      }
    }
  },
});
