<template>
  <div class="header">
    <h2>SEHC Queueing System</h2>
    <div class="menu" @click="showMenu" v-show="$route.name !== 'ClientScanQr'">
      <i class="fas fa-bars fa-2x"></i>
    </div>
  </div>
  <div class="side-menu" ref="sideMenu" @click="closeMenu">
    <h3 class="title">SEHC Queueing System</h3>
    <ul class="list">
      <li><i class="fas fa-qrcode fa-2x"></i>SEHC Queueing System</li>
      <li><i class="fas fa-fingerprint fa-2x"></i>Data Privacy & Security</li>
      <li><i class="fas fa-question fa-2x"></i>FAQS</li>
    </ul>
    <h3 class="logout" @click="logout">
      <i class="fas fa-sign-out-alt"></i>Log Out
    </h3>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Header",
  methods: {
    showMenu() {
      this.$refs.sideMenu.classList.toggle("show");
      console.log("showmenu");
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.header {
  background: #008385;
  color: #fff;
  padding: 1rem;
  height: 70px;
  max-width: 414px;
  margin: auto;
  position: relative;
}
h1 {
  margin: 0;
}

a {
  color: #008385;
}

.menu {
  position: absolute;
  top: 1rem;
  right: 1rem; /*fix this  use right position value*/
}

.title {
  font-size: 1.2rem;
}

.side-menu-modal {
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

ul {
  text-decoration: none;
  list-style: none;
  margin-top: 2rem;
}

li {
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 1fr 4fr;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
}

.side-menu {
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(255, 252, 252);
  height: 100vh;
  width: 20%;
  color: #008385;
  padding: 1rem;
  padding-top: 2rem;
  text-align: left;
  transition: all 0.5s ease-in-out;
  transform: translateX(-25rem);
}

.side-menu.show {
  transform: translateX(0);
}
.side-menu .logout {
  text-align: center;
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translate(-50%, 10%);
}

.logout i {
  margin-right: 1rem;
}

@media (max-width: 500px) {
  .side-menu {
    width: 80%;
  }
  .menu {
    right: 8px;
  }
}
</style>
