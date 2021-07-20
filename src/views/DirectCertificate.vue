<template>
  <v-main class="m-0 mt-0 grey lighten-5 fill-height">
    <v-snackbar v-model="snackBar" bottom class="snack">
      {{ snackBarText }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" aria-label="close" @click="snackBar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-container class="my-5 mb-12">
      <v-row fill-height align="center" justify="center" class="mt-0 pt-0">
        <v-col md="6" lg="7" xl="5" sm="12" class="my-4">
          <v-img
            class="elevation-1"
            :src="require('@/assets/img/email.jpg')"
            style="border: 1px solid #0005df; border-radius: 8px"
          ></v-img>
        </v-col>
      </v-row>

      <v-row fill-height align="center" justify="center" class="mt-0 pt-0">
        <v-col md="6" lg="7" xl="5" sm="12" class="my-0 py-0">
          <v-container v-if="!CertificateStatus">
            <v-row justify="center" align="center">
              <v-col md="10" class="">
                <p style="font-size: 105%; color: black">
                  Email<span style="color: #ff5252">*</span>
                </p>
                <v-form ref="directCertificate">
                  <v-text-field
                    v-model="userEmail"
                    :rules="[rules.required, rules.emailRules]"
                    placeholder="Email"
                    outlined
                  ></v-text-field>
                  <v-btn
                    @click="getUserData"
                    :loading="loading"
                    color="#0005DF"
                    dark
                    class="mr-2"
                    >Generate Certificate</v-btn
                  >
                  <v-btn to="/" text color="#0005DF" dark
                    >Back for Feedback</v-btn
                  >
                </v-form>
              </v-col>
            </v-row>
          </v-container>

          <certificate
            v-else
            :userData="userData"
            @showSnakeBar="showSnakeBar"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import FDC from "@/config/firebase";

export default {
  name: "Home",
  data: () => ({
    CertificateStatus: false,
    snackBarText: "",
    rules: {
      required: (value) => !!value || "This field is required.",
      emailRules: v => /.+@.+\..+/.test(v) || "E-mail must be valid",
    },
    userEmail: "",
    loading: false,
    snackBar: false,
    userData: {},
  }),
  components: {
    certificate: () => import("../components/home/certificate"),
  },
  methods: {
    showSnakeBar(result) {
      this.snackBarText = result;
      this.snackBar = true;
    },
    getUserData(result) {
      if(!this.$refs.directCertificate.validate()){
        return;
      }
      this.loading = true;
      FDC.firestore
        .collection("feedback")
        .where("email", "==", this.userEmail)
        .get()
        .then((snap) => {
          if (snap.empty && snap.docs.length <= 0) {
            this.showSnakeBar(
              "You haven't filled the Feedback form Yet, please fill that."
            );
          } else {
            const user = snap.docs[0].data();
            if (user.email !== this.userEmail) {
              this.showSnakeBar(
                "You haven't filled the Feedback form Yet, please fill that."
              );
            } else {
              this.userData = {
                email: user.email,
                name: user.name,
              };
              this.CertificateStatus = true;
              this.showSnakeBar("Certificate Generated");
            }
          }
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
          this.showSnakeBar("Something went wrong" + e);
        });
      // this.CertificateStatus = true;
      // this.showSnakeBar("Certificate Generated");
      // this.userData = {
      //   ...this.userData,
      //   ...result,
      // };
    },
  },
};
</script>
