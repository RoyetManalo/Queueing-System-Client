<template>
  <div class="getqcard">
    <p ref="error" class="error">{{ error }}</p>
    <h2>Create Your Queue Card</h2>
    <form @submit.prevent="validateForms" action="POST">
      <input
        type="text"
        placeholder="First Name"
        name="firstName"
        required
        v-model="firstName"
      />
      <input
        type="text"
        placeholder="Last Name"
        name="lastName"
        required
        v-model="lastName"
      />
      <input
        type="number"
        placeholder="Age"
        name="age"
        required
        v-model="age"
      />
      <select name="vaccinebrand" id="" required v-model="vaccineBrand">
        <option disabled value="">Vaccine Brand</option>
        <option
          v-for="vaccine in vaccines"
          :key="vaccine._id"
          :value="vaccine.vaccineBrand"
        >
          {{ vaccine.vaccineBrand }}
        </option>
      </select>
      <select name="dose" id="" required v-model="dose">
        <option disabled value="">Dose</option>
        <option value="1">1st Dose</option>
        <option value="2">2nd Dose</option>
      </select>
      <Button text="Create Queue Card" />
    </form>
    <div class="button">
      <router-link to="/lobby"><Button text="Back" /></router-link>
    </div>
  </div>
  <div v-if="sending" id="spinner" ref="spinner">
    <div class="spinner-content">
      <img src="../assets/load3.gif" alt="" />
      <p>Creating your queue card</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from "../components/Button.vue";
import QueueService from "../services/QueueService";
import VaccineService from "../services/VaccineService";
export default {
  name: "Getqcard",
  components: {
    Button,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      age: "",
      vaccineBrand: "",
      dose: "",
      date: new Date(),
      error: "",
      sending: false,
    };
  },
  methods: {
    async validateForms() {
      if (
        this.firstName === "" ||
        this.lastName === "" ||
        this.age === "" ||
        this.vaccineBrand === "" ||
        this.dose === ""
      ) {
        this.error = "Please Fill in Fields";
        setTimeout(() => {
          this.$refs.error.style.display = "none";
        }, 4000);
      } else {
        this.sending = true;
        const newPerson = {
          firstName: this.firstName,
          lastName: this.lastName,
          age: this.age,
          vaccineBrand: this.vaccineBrand,
          dose: this.dose,
          date: this.date,
        };
        this.$store.dispatch("changeSendingStatus"); // sending = true
        this.$store.dispatch("addNewPersonInQueue", newPerson);
        // await QueueService.insertQueue(
        //   this.firstName,
        //   this.lastName,
        //   this.age,
        //   this.vaccineBrand,
        //   this.dose,
        //   this.data,
        //   localStorage.getItem("token")
        // );
        // this.$router.push("/viewqcard");
        // Check if newPerson in queue is filled with data if true call changeSending status then route to diffent page
      }
    },
  },
  computed: {
    isSending() {
      return this.$store.state.isSending;
    },
    newPersonInQueue() {
      return this.$store.state.newPersonInQueue;
    },
    vaccines() {
      return this.$store.state.vaccines;
    },
  },
  watch: {
    newPersonInQueue(val, oldVal) {
      // is triggered whenever the store state changes
      this.$store.dispatch("changeSendingStatus");
      this.$store.dispatch("changeClientStatus");
      this.$router.push("/viewqcard");
    },
  },
};
</script>

<style scoped>
.getqcard {
  height: calc(100% - 82px);
  max-width: 414px;
  padding: 2rem 0.5rem 0 0.5rem;
  margin: auto;
}

.buttons {
  margin-bottom: 3rem;
}

form {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
}

form input,
form select {
  padding: 1rem;
  margin-bottom: 1.2rem;
  border-radius: 10px;
  border: 1px solid #008385;
}

.button {
  padding: 0 2.4rem;
}

h2 {
  margin-bottom: 1rem;
  padding: 1rem 0;
  color: #008385;
}

.error {
  color: red;
  width: 70%;
  margin: 0 auto;
}

select,
input {
  background: #fff;
  color: #008385;
}

#spinner {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75) no-repeat center center;
  width: 100%;
  z-index: 2;
}

#spinner img {
  width: 20%;
}

#spinner .spinner-content {
  position: absolute;
  width: 100%;
  top: 40%;
}

#spinner .spinner-content p {
  color: #fff;
  margin-top: 1rem;
}

a {
  text-decoration: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

@media (min-width: 500px) {
  #spinner img {
    width: 10%;
  }
  #spinner .spinner-content {
    position: absolute;
    width: 50%;
    top: 40%;
    left: 25%;
  }
}
</style>
