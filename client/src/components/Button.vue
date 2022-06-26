<template>
  <button>{{ text }}</button>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Button",
  props: {
    text: String,
  },
};
</script>

<style scoped>
button {
  background: #008385;
  color: #fff;
  padding: 1rem 0;
  border: none;
  margin: 1rem 0;
  border-radius: 10px;
  font-size: 1.3rem;
  width: 100%;
  display: block;
}

a {
  color: #fff;
  text-decoration: none;
}
</style>
