<template>
  <div class="queuenumber">
      <h3>{{title}}</h3>
      <h2>{{queueNumber}}</h2>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'YourQueuenumber',  
  components: {
      
  },
  props:{
      title: String,
      queueNumber: Number
  }
}
</script>

<style scoped>
    .queuenumber{
        background: #fff;
        color: #008385;
        padding: 1rem;
        width: 70%;
        height: 200px;
        margin: 1rem auto;
        border-radius: 10px;
        border: 2px solid #008385;
    }
    h3{
        margin-bottom: 1rem;
    }
    h2{
        font-size: 6rem;
        text-align: center;
    }
</style>
