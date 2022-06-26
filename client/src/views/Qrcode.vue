<template>
  <div class="qrcode">
    <div class="heading">
      <h2>QR Code</h2>
      <span>Queue ID: {{ queueInfo._id }}</span>
    </div>

    <Qr :imgSrc="imgSrc" />
    <div class="person-details">
      <span>Full Name: {{ queueInfo.firstName }} {{ queueInfo.lastName }}</span>
      <span
        >Issuance Date and Time: <br />
        {{ getDate }}</span
      >
    </div>
    <div class="button">
      <Button text="Download QR Code" @click="downloadFromS3" />
      <router-link to="/viewqcard"><Button text="Back" /></router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from "../components/Button.vue";
import Queuenumber from "../components/Queuenumber.vue";
import Qr from "../components/Qr.vue";
import QueueService from "../services/QueueService";
export default {
  name: "Qrcode",
  components: {
    Button,
    Queuenumber,
    Qr,
  },
  props: {},
  data() {
    return {
      imgSrc: "",
      queueNumber: this.$store.state.newPersonInQueue.queueNumber,
    };
  },
  methods: {
    async downloadQR() {
      console.log(localStorage.getItem("token"));
      const res = await QueueService.downloadQR(localStorage.getItem("token"));
      const url = window.URL.createObjectURL(new Blob([res.data]));
      console.log(url);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Queue Certificate.pdf");
      link.click();
      setTimeout(() => window.URL.revokeObjectURL(url), 0); // this is important too, otherwise we will be unnecessarily spiking memory!
    },

    async downloadFromS3() {
      console.log(localStorage.getItem("token"));
      const res = await QueueService.getQRFromS3(this.queueNumber);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      console.log(url);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Queue Certificate.pdf");
      link.click();
      setTimeout(() => window.URL.revokeObjectURL(url), 0); // this is important too, otherwise we will be unnecessarily spiking memory!
    },
  },
  computed: {
    queueInfo() {
      return this.$store.state.newPersonInQueue;
    },
    getDate() {
      const date = new Date(this.queueInfo.date);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      let hour = date.getHours();
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12;
      hour = hour ? hour : 12;
      let minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;

      function formatMonth(month) {
        if (month === 0) {
          return "January";
        } else if (month === 1) {
          return "February";
        } else if (month === 2) {
          return "March";
        } else if (month === 3) {
          return "April";
        } else if (month === 4) {
          return "May";
        } else if (month === 5) {
          return "June";
        } else if (month === 6) {
          return "July";
        } else if (month === 7) {
          return "August";
        } else if (month === 8) {
          return "September";
        } else if (month === 9) {
          return "October";
        } else if (month === 10) {
          return "November";
        } else if (month === 11) {
          return "December";
        }
      }
      return `${day}-${formatMonth(month)}-${year} ${hour}:${minute} ${ampm}`;
    },
  },
  async created() {
    // Set the qrcode image to the right path from the server  generated image
    // const res = await QueueService.getQrcodeImage(this.queueInfo.queueNumber);
    const res = await QueueService.getImageFromS3(this.queueInfo.queueNumber);
    const data = res.data;
    const url = window.URL.createObjectURL(new Blob([data]));
    console.log(data);
    console.log(url);
    this.imgSrc = url;
    // this.imgSrc = "/images/97-QRCODE.png";
    setTimeout(() => window.URL.revokeObjectURL(url), 0);
  },
};
</script>
<style scoped>
.qrcode {
  height: calc(100% - 82px);
  width: 80%;
  max-width: 414px;
  padding: 2rem 0.5rem 0 0.5rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.button {
  margin: 1.5rem 0;
}

h2 {
  padding: 1rem 0;
  color: #008385;
  text-align: left;
}

span {
  display: block;
  text-align: left;
  color: #008385;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}
a {
  text-decoration: none;
}

@media (min-width: 500px) {
  .person-details,
  .heading,
  .button {
    padding: 0 2.6rem;
  }
}
</style>
