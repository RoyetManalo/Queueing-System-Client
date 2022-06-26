<template>
  <div class="content">
    <h1>Sorry! The Admin hasn't started the queue yet</h1>
    <h1>Try Refreshing the page</h1>
    <img src="../assets/close.png" alt="" />
  </div>
</template>

<script>
// @ is an alias to /src
import QueueService from "../services/QueueService";
export default {
  // inheritAttrs: false,
  name: "QueueClose",
  data() {
    return {
      imgURL: null,
    };
  },
  methods: {
    async login() {
      const res = await QueueService.getToken();
      const token = res.data;
      localStorage.setItem("token", token);
      this.$router.push("/lobby");
    },
  },
  created() {
    this.imgURL = require("../assets/SECH LOGO.png");
  },
  beforeRouteLeave(to, from, next) {
    if (this.$store.state.isQueueClose === true) {
      if (to.name !== "QueueClose") next({ name: "QueueClose" });
      else next();
    } else {
      next();
    }
  },
};
</script>

<style scoped>
img {
  width: 400px;
  margin-top: 2rem;
}

.content {
  background: #008789;
  color: #fff;
  max-width: 750px;
  margin: 0 auto;
  height: 100vh;
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
  padding: 2rem;
}

@media (max-width: 420px) {
  h1 {
    font-size: 1.3rem;
  }
  img {
    width: 300px;
  }

  .logo {
    text-align: center;
  }
}

@media (min-width: 421px) {
  .content {
    max-width: 100%;
  }
}
</style>
