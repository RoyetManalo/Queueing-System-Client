<template>
  <div class="lobby">
    <!-- <p v-if="error" class="error">{{ error }}</p> -->
    <Queuenumber />
    <Vaccines />
    <div class="buttons">
      <router-link to="getqcard">
        <Button v-show="newClient" text="Get Queue Card" />
      </router-link>
      <router-link to="/viewqcard">
        <Button v-show="qCardCreated" text="View Queue Card" />
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Queuenumber from "../components/Queuenumber.vue";
import Button from "../components/Button.vue";
import Vaccines from "../components/Vaccines.vue";
import VaccineService from "../services/VaccineService";

export default {
  // inheritAttrs: false,
  name: "Lobby",
  components: {
    Queuenumber,
    Button,
    Vaccines,
  },

  computed: {
    newClient() {
      return this.$store.state.newClient;
    },
    qCardCreated() {
      return !this.$store.state.newClient;
    },
  },
  created() {
    this.$store.dispatch("putTokenInStore", localStorage.getItem("token"));
    console.log(this.$store.state.token);
  },
};
</script>

<style scoped>
.lobby {
  height: calc(100% - 82px);
  max-width: 414px;
  padding: 2rem 0.5rem 0 0.5rem;
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: space-around;
}

.buttons {
  margin-bottom: 3rem;
  padding: 0 3rem;
}

a {
  text-decoration: none;
}
</style>
