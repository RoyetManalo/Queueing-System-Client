import { createStore } from "vuex";
import QueueService from "../services/QueueService";
import VaccineService from "../services/VaccineService";
import StatusService from "../services/StatusService";
import e from "cors";

export default createStore({
  state: {
    token: null,
    usersIP: null,
    availableQueueNumber: 0,
    isQueueClose: null,
    vaccines: [],
    newPersonInQueue: {},
    newPersonInQueueStatus: "",
    qrData: {},
    newClient: true,
    isSending: false,
  },
  mutations: {
    fetchAvailableQueueNumber(state, availableQueueNumber) {
      state.availableQueueNumber = availableQueueNumber;
      console.log(availableQueueNumber);
    },
    changeQueueStatus(state, status) {
      state.isQueueClose = status;
    },
    fetchVaccines(state, vaccines) {
      state.vaccines = vaccines;
    },
    addNewPersonInQueue(state, newPersonInQueue) {
      state.newPersonInQueue = newPersonInQueue;
      console.log(state.newPersonInQueue);
      console.log(newPersonInQueue);
    },
    getQrData(state, qrdata) {
      state.qrData = qrdata;
      console.log(state.qrData);
      console.log(qrdata);
    },
    changeClientStatus(state) {
      state.newClient = !state.newClient;
    },
    changeSendingStatus(state) {
      state.isSending = !state.isSending;
    },
    putTokenInStore(state, token) {
      state.token = token;
    },
  },
  actions: {
    async fetchAvailableQueueNumber({ commit }) {
      const res = await QueueService.getLatestQueue(
        localStorage.getItem("token")
      );
      let data = res[0] === undefined ? 0 : res[0].queueNumber;
      const queueNumber = data + 1;
      console.log(queueNumber);
      commit("fetchAvailableQueueNumber", queueNumber);
    },
    async fetchQueueStatus({ commit }) {
      const res = await StatusService.getStatus(localStorage.getItem("token"));
      const data = res.data;
      const status = data[0].status;
      console.log(`Queue Status: ${status}`);

      commit("changeQueueStatus", status);
    },
    async fetchVaccines({ commit }) {
      const data = await VaccineService.getAllVaccine(
        localStorage.getItem("token")
      );
      commit("fetchVaccines", data);
      console.log(data);
    },

    async addNewPersonInQueue({ commit }, personDetails) {
      await QueueService.insertQueue(
        personDetails.firstName,
        personDetails.lastName,
        personDetails.age,
        personDetails.vaccineBrand,
        personDetails.dose,
        personDetails.date,
        localStorage.getItem("token")
      );
      const res = await QueueService.getLatestQueuePerson(
        localStorage.getItem("token")
      );
      console.log(res[0]);
      commit("addNewPersonInQueue", res[0]);
    },

    getQrData({ commit }, qrdata) {
      console.log(qrdata);
      commit("getQrData", qrdata);
    },
    changeClientStatus({ commit }) {
      commit("changeClientStatus");
    },
    changeSendingStatus({ commit }) {
      commit("changeSendingStatus");
    },

    putTokenInStore({ commit }, token) {
      commit("putTokenInStore", token);
    },
  },

  getters: {
    showAnnouncement(state) {
      return !state.isQueueOpen;
    },
    isQueueClose(state) {
      return state.isQueueClose;
    },
    getNewPersonInQueue(state) {
      return state.newPersonInQueue;
    },
  },
  modules: {},
});
