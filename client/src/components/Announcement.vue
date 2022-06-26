<template>
   <div class="announcement">
      <h1>Sorry! The Admin hasn't started the queue yet</h1>
      <img src="../assets/close.png" alt="">
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Announcement',
}
</script>

<style scoped>
img{
  width: 250px;
  margin-top: 2rem;
}

.announcement{
  color:#008789;
  margin-top: 2rem;
  font-size: 1rem;
  padding: 0 1rem;
}

.announcement h1{
   font-size: 1.8rem;
}
</style>
