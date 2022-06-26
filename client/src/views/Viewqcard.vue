<template>
  <div class="viewqcard">
    <h2>Your Queue Card</h2>
    <YourQueuenumber
      title="Your Queue Number"
      :queueNumber="newPersonInQueue.queueNumber"
    />
    <div class="person-details">
      <span
        >Full Name: {{ newPersonInQueue.firstName }}
        {{ newPersonInQueue.lastName }}</span
      >
      <span>Age: {{ newPersonInQueue.age }}</span>
      <span>Vaccine Brand: {{ newPersonInQueue.vaccineBrand }}</span>
      <span>Dose: {{ getDose }} </span>
    </div>
    <div class="button">
      <router-link to="/qrcode"><Button text="View QR Code" /></router-link>
      <router-link to="/lobby"><Button text="Back" /></router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from "../components/Button.vue";
import YourQueuenumber from "../components/YourQueuenumber.vue";
export default {
  name: "Viewqcard",
  components: {
    Button,
    YourQueuenumber,
  },
  data() {
    return {
      newSending: false,
      willShowMessage: true,
      dose: "",
    };
  },
  props: {
    message: String,
  },
  computed: {
    newPersonInQueue() {
      return this.$store.state.newPersonInQueue;
    },
    // Error / i guess it works
    getDose() {
      const dose = this.$store.state.newPersonInQueue.dose;
      if (dose === undefined) {
        return "";
      } else if (dose == 1) {
        return "1st Dose";
      } else if (dose == 2) {
        return "2nd Dose";
      }
    },
    // showMessage(){
    //   setTimeout( () =>{
    //     this.$refs.message.style.display = 'none'
    //   }, 3000)
    //   return this.message === 'created' ? 'Congrats! You have just created your queue card' : 'You have no queuecard yet'
    //   this.willShowMessage = false //fix the logic of this
    // },

    methods: {
      changeWillShowMessage() {
        this.willShowMessage = false;
      },
    },
  },
  created() {
    // this.$store.dispatch("changeSendingStatus");
  },
};
</script>
<style scoped>
.viewqcard {
  height: calc(100% - 82px);
  width: 100%;
  max-width: 414px;
  padding: 2rem 0.5rem 0 0.5rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.button {
  margin: 1.5rem 0;
  padding: 0 3rem;
}

h2 {
  padding: 1rem 0;
  color: #008385;
  text-align: center;
}

span {
  display: block;
  text-align: left;
  color: #008385;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.person-details {
  width: 70%;
  margin: auto;
}

.message {
  color: #008385;
  border: #008385 1px solid;
  padding: 10px;
  width: 70%;
  margin: 0 auto;
}

a {
  text-decoration: none;
}
</style>
