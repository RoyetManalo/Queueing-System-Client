<template>
  <div class="vaccines">
    <h3>Available Vaccines</h3>
    <ul :key="vaccine._id" v-for="vaccine of vaccines">
      <li><i class="fas fa-syringe"></i>{{ vaccine.vaccineBrand }}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Vaccines",
  components: {},
  props: {
    // vaccines: Array,
  },
  computed: {
    vaccines: {
      get() {
        return this.$store.state.vaccines;
      },
    },
  },
  created() {
    this.$store.dispatch("fetchVaccines");
  },
};
</script>

<style scoped>
.vaccines {
  width: 70%;
  margin: auto;
  background: #008385;
  padding: 1rem;
  border-radius: 10px;
}
ul {
  list-style: none;
}

li {
  text-decoration: none;
  text-align: left;
  font-size: 1.2rem;
  margin: 0.5rem;
  color: #fff;
}

h3 {
  color: #fff;
  text-align: center;
  padding: 0.5rem;
}

i {
  color: #fff;

  margin-right: 1rem;
  font-size: 1.5rem;
}
</style>
