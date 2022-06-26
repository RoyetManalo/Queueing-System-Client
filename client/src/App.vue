<template>
  <div id="app">
    <Header
      v-if="
        ['Lobby', 'Getqcard', 'Qrcode', 'Viewqcard', 'ClientScanQr'].indexOf(
          $route.name
        ) > -1
      "
    />
    <router-view />
    <!-- <div class="announcementModal" v-show="isQueueClose">
      <div class="modal-content"><Announcement /></div>
    </div> -->
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import QueueService from "./services/QueueService";
import StatusService from "./services/StatusService";
import Announcement from "./components/Announcement.vue";
export default {
  components: {
    Header,
    Announcement,
  },
  data() {
    return {
      message: null,
      isQueueClose: null,
      queue: true,
    };
  },
  methods: {
    // async createQueue(queueInfo) {
    //   await QueueService.insertQueue(
    //     queueInfo.firstName,
    //     queueInfo.lastName,
    //     queueInfo.age,
    //     queueInfo.vaccineBrand,
    //     queueInfo.dose,
    //     queueInfo.date
    //   );
    //   this.queueInfo = res[0];
    //   this.message = "created";
    //   this.error = "";
    //   this.$router.push("/viewqcard");
    //   this.gotQcard = true;
    //   this.showGetQcard = false;
    // },
  },
  computed: {
    isQueueClosed() {
      return this.$store.state.isQueueClose;
    },
  },
  watch: {
    isQueueClosed(val, oldVal) {
      this.isQueueClose = this.$store.state.isQueueClose;
      console.log(this.isQueueClose);
      if (this.$store.state.isQueueClose == true) {
        this.$router.push("/queueclose");
      } else {
        this.$router.push("/");
      }
    },
  },
  created() {
    this.$store.dispatch("fetchQueueStatus");
    // get a jwt

    console.log(this.$store.state.isQueueClose);
  },
  async beforeRouteEnter(to, from, next) {
    const statusRes = await StatusService.getStatus();
    const statusData = statusRes.data;
    const queueStatus = statusData[0].status;
    this.isQueueClose = queueStatus;
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  margin: auto;
}

.announcementModal {
  display: block;
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
  width: 40%;
  height: 50%;
  position: relative;
  margin: 5% auto;
  background: #fff;
  padding: 2rem 0;
  border-radius: 10px;
  max-height: 780px;
}

@media (max-width: 500px) {
  .modal-content {
    width: 90%;
    height: 70%;
    margin-top: 7rem;
  }
}
</style>
