<template>
  <div class="content">
    <header class="header">
      <div class="logo">
        <img :src="imgURL" alt="" />
      </div>
      <div class="title">
        <h2>Santa Elena Health Care</h2>
        <h2>QR-Based Queueing System</h2>
      </div>
    </header>
    <section class="section">
      <div class="qcard">
        <div>
          <span>To request a qr-based queue card, click the button</span>
        </div>
        <div>
          <button class="btn" @click="login">Get Queue Card</button>
        </div>
      </div>
      <div class="scanqcard">
        <div>
          <span>To verify if you are in the queue, click the scan button</span>
        </div>
        <div>
          <router-link to="/clientscanqr">
            <button class="btn">Scan QR-Code</button></router-link
          >
        </div>
      </div>
    </section>
    <img src="/images/97-QRCODE.png" alt="" />
    <footer>
      <p>Copyright &copy; 2022</p>
      <p>A project by Royet Manalo</p>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import QueueService from "../services/QueueService";
import StatusService from "../services/StatusService";
export default {
  name: "Homepage",
  data() {
    return {
      imgURL: null,
    };
  },
  methods: {
    async login() {
      const res = await QueueService.getToken();
      const token = res.data;
      localStorage.setItem("token", token);
      this.$store.state.token = localStorage.getItem("token");
      const statusRes = await StatusService.getStatus();
      const statusData = statusRes.data;
      const queueStatus = statusData[0].status;

      if (queueStatus === true) {
        this.$router.push("/queueclose");
        console.log("closed");
      } else {
        this.$router.push("/lobby");
        console.log("lobby");
        console.log(queueStatus);
      }
    },
  },
  created() {
    this.imgURL = require("../assets/SECH LOGO.png");
  },
};
</script>

<style scoped>
img {
  width: 200px;
}

.content {
  background: #008789;
  color: #fff;
  max-width: 750px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
}

.header .title h2 {
  font-size: 2.5rem;
  margin: 1rem 0;
}

.header .title {
  margin-left: 4rem;
}

.section {
  padding: 0 1rem;
}

.qcard {
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-bottom: 2rem;
}

.scanqcard {
  display: grid;
  grid-template-columns: 2fr 1fr;
  justify-content: space-between;
}

.btn {
  background: #2097ea;
  color: #fff;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1.2rem;
}

.section span {
  font-size: 1.6rem;
}

footer {
  text-align: center;
  padding-bottom: 2rem;
  font-size: 1.2rem;
}

@media (max-width: 420px) {
  .header {
    padding: 1rem;
    display: block;
  }

  .header .title {
    margin-left: 1rem;
  }

  .header .title h2 {
    font-size: 1.5rem;
    text-align: center;
  }
  img {
    width: 80px;
  }

  .section {
    margin-bottom: 8rem;
    padding: 0 2rem;
  }

  .logo {
    text-align: center;
  }

  .qcard span,
  .scanqcard span {
    font-size: 1.1rem;
    display: block;
  }

  .qcard,
  .scanqcard {
    display: block;
  }

  .btn {
    font-size: 1rem;
    margin-top: 1rem;
    padding: 0.8rem;
  }

  footer p {
    font-size: 1rem;
    margin-bottom: 10px;
  }
}

@media (min-width: 421px) {
  .content {
    max-width: 100%;
  }
}
</style>
