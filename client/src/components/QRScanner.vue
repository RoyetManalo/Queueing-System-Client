<template>
  <div class="scanner">
    <qrcode-stream @decode="onDecode"></qrcode-stream>
  </div>
</template>
<script>
import { QrcodeStream } from "vue3-qrcode-reader";

export default {
  name: "ClientScanQr",
  components: {
    QrcodeStream,
  },
  methods: {
    onDecode(decodedString) {
      const data = decodedString;
      this.$store.dispatch("getQrData", JSON.parse(data));
      this.$emit("qr-data");
    },
  },
  emits: ["qr-data"],
};
</script>

<style scoped>
.scanner {
  width: 90%;
  height: 50%;
  margin: 0 auto;
}
</style>
