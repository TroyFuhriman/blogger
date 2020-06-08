<template>
  <div class="bg-image" id="app">
    <navbar />
    <main>
      <router-view />
    </main>
    <footer class="container-fluid bg-primary mt-3">
      <div class="row">
        <div class="col text-center text-light">Made with Love by Troy</div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import { onAuth } from "@bcwdev/auth0-vue";
import { setBearer, api } from "./store/AxiosStore";
import { getProfile } from "./store/index";
export default {
  name: "App",
  async beforeCreate() {
    await onAuth();
    if (this.$auth.isAuthenticated) {
      setBearer(this.$auth.bearer);
    }
  },
  components: {
    Navbar
  }
};
</script>
<style lang="scss">
// @import "./assets/_variables.scss";
// @import "./assets/_overrides.scss";
@import "./assets/minty.scss";
@import "bootstrap";

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
}
main {
  flex-grow: 1;
}
</style>
