<template>
  <div class="qr">
    <img :src="imgSrc" :alt="imgSrc" />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Qr",
  props: {
    imgSrc: String,
  },
};
</script>

<style scoped>
.qr {
  background: #fff;
  color: #008385;
  padding: 1rem;
  width: 100%;
  height: 295px;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  border: 2px solid #008385;
}

img {
  width: 100%;
}

@media (min-width: 500px) {
  img {
    width: 7 5%;
  }
  .qr {
    width: 80%;
    height: 315px;
  }
}
</style>
