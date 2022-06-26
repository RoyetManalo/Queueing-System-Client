<template>
  <div class="queuenumber">
    <h3>Current Available Queue Number</h3>
    <h2>{{ availableQueueNumber }}</h2>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Queuenumber",
  computed: {
    availableQueueNumber: {
      get() {
        return this.$store.state.availableQueueNumber;
      },
    },
  },
  created() {
    this.$store.dispatch("fetchAvailableQueueNumber");
  },
};
</script>

<style scoped>
.queuenumber {
  background: #fff;
  color: #008385;
  padding: 1rem;
  width: 70%;
  min-height: 200px;
  margin: 1rem auto;
  border-radius: 10px;
  border: 2px solid #008385;
}
h3 {
  margin-bottom: 1rem;
}
h2 {
  font-size: 6rem;
  text-align: center;
}
</style>
