<template>
  <div class="clientScanQr">
    <h1>Verify Your QR Code</h1>
    <QRScanner @qr-data="scanQr" />
    <div class="btn">
      <router-link to="/"
        ><Button text="Cancel Scan" class="btn"
      /></router-link>
    </div>
  </div>
  <div class="ClientScanQrModal" ref="clienScanQr">
    <div class="modal-content">
      <div class="title">
        <h2>Verified!</h2>
        <h2>You're on the queue</h2>
      </div>
      <div class="details">
        <span>Full Name: {{ qrData.firstName }} {{ qrData.lastName }}</span>
        <span>Queue Number: {{ qrData.queueNumber }}</span>
      </div>
      <div class="btn">
        <Button text="OK" @click="closeModal" />
      </div>
    </div>
  </div>
</template>

<script>
import QRScanner from "../components/QRScanner.vue";
import Button from "../components/Button.vue";

export default {
  name: "ClientScanQr",
  components: {
    Button,
    QRScanner,
  },
  data() {
    return {
      fullName: "",
      queuNumber: "",
    };
  },
  computed: {
    // qrData: {
    //   get() {
    //     return this.$store.state.qrData;
    //   },
    // },
    qrData() {
      return this.$store.state.qrData;
    },
  },
  methods: {
    scanQr() {
      this.showModal();
    },
    closeModal() {
      this.$refs.clienScanQr.style.display = "none";
    },
    showModal() {
      this.$refs.clienScanQr.style.display = "block";
    },
  },
};
</script>

<style scoped>
.clientScanQr {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: calc(100% - 82px);
  max-width: 414px;
  margin: auto;
}
.btn {
  padding-left: 2rem;
  padding-right: 2rem;
}

h1 {
  color: #008385;
}

.ClientScanQrModal {
  display: none;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  width: 350px;
  position: relative;
  height: 50%;
  margin: 10rem auto;
  background: #fff;
  padding: 2rem 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.details {
  padding-left: 3rem;
}

.details span {
  display: block;
  text-align: left;
  margin: 1rem 0;
  font-size: 1.3rem;
  color: #008385;
}

.title h2 {
  color: #008385;
  margin-bottom: 0.5rem;
}
</style>
