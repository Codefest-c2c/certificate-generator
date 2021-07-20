<template>
  <v-container
    fluid
    class="mt-0 py-0"
    style="border: 1px solid #e0e0e0; border-radius: 7px; background: white"
  >
    <v-row align="center" justify="center" class="mt-0 pt-0">
      <v-col md="12" lg="12" sm="12" class="text-center py-8">
        <h2 class="google-font">Certificate</h2>
        <p style="width: 90%" class="mb-0">
          Thanks for participating. Here's your participation certificate. You
          can either download it or email it. Hope to see you for our next event
          too! Take care.
        </p>
      </v-col>
      <v-col cols="12">
        <canvas id="myCanvas" style="display: none" />
      </v-col>

      <v-col v-if="loading" cols="12" class="text-center"
        ><v-progress-circular indeterminate></v-progress-circular
      ></v-col>

      <v-col v-else cols="12" class="text-center mb-5">
        <img :src="imageUrl" id="cert" height="100%" class="mb-3" width="100%" />
        <v-btn
          id="download"
          dark
          color="#0005df"
          :loading="downloading"
          class="google-font"
          @click="download"
          >download</v-btn
        >
        <!-- <v-btn
          id="mail"
          dark
          depressed
          outlined
          :loading="sendOnMail"
          color="#0005df"
          class="ml-2"
          @click="sendMail"
          >send on Mail</v-btn
        > -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { jsPDF } from "jspdf";
export default {
  name: "Certificate",
  components: {},
  props: ["userData"],
  data: () => ({
    // userData: {
    //   email: "agarwalbharat68@gmail.com",
    //   name: "Bharat Agarwal",
    // },
    canvas: null,
    loading: false,
    imageUrl: "",
    downloading: false,
    sendOnMail: false,
  }),
  mounted() {
    let self = this;
    self.loading = true;
    const { name: userName } = this.userData;
    self.canvas = document.getElementById("myCanvas");
    const canvas = self.canvas;
    const context = canvas.getContext("2d");
    function make() {
      let base_image = new Image();
      base_image.src = require("@/assets/img/certificate.png");
      const height = (base_image.height / base_image.width) * canvas.width;
      base_image.onload = function () {
        canvas.width = base_image.width;
        canvas.height = base_image.height;
        context.drawImage(
          base_image,
          0,
          0,
          base_image.width,
          base_image.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
        context.fillStyle = "white";
        context.font = "150px 'google-sans', Helvetica, Arial, Sans-Serif";
        const textWidth = context.measureText(userName).width;
        context.fillText(userName, canvas.width / 2 - textWidth / 2, 1700);
        self.imageUrl = canvas.toDataURL("image/jpeg", 1.0);
        self.loading = false;
      };
    }
    make();
  },
  methods: {
    sendMail() {
      var self = this;
      self.sendOnMail = true;
      // console.log("calling", self.sendOnMail);
      const { name: userName, email } = self.userData;
      var imgData = self.canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF("l", "mm", "a4");
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      var output = pdf.output("blob");
      var data = new FormData();
      data.append("certificate", output);
      data.append("name", userName);
      data.append("email", email);
      // console.log(data);
      fetch(
        "https://us-central1-gdg-jalandhar-demo.cloudfunctions.net/sendCertificate",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.success)
            self.$emit("showSnakeBar", `Certificate sent to mail ${email}`);
          self.sendOnMail = false;
        })
        .catch((e) => {
          self.sendOnMail = false;
          self.$emit("showSnakeBar", "Something went wrong, try again later");
          console.log(e);
        });
    },
    download() {
      this.downloading = true;
      const { name: userName } = this.userData;
      const imgData = this.canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("l", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      pdf.save(`${userName}-Devfest-India.pdf`);
      this.downloading = false;
    },
  },
};
</script>
