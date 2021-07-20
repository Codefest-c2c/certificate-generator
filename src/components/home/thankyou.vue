<template>
  <v-container
    fluid
    class="mt-0 py-0"
    style="border: 1px solid #e0e0e0; border-radius: 7px;background:white"
  >
    <v-row align="center" justify="center" class="my-10">
      <v-col md="12" lg="12" sm="12" class="">
        <div class="text-center">
          <h2 class="google-font">Thank You {{ userData.name }}</h2>
          <p style="width: 80%; margin-left: auto; margin-right: auto">
            Thank you for joining us at DevFest India 2020! 
            We hope you enjoyed watching the sessions as much as we did hosting for you.
            We are curious to understand your feedback about the sessions and hence we'd appreciate your feedback with the form below.
            Thanks so much,
            See you all next year!
          </p>
        </div>
        <v-container>
          <v-row justify="center" align="center">
            <v-col md="6" class="text-center">
              <p style="font-size: 105%; color: black">
                Coupon Code<span style="color: #ff5252">*</span>
              </p>
              <v-text-field
                v-model="code"
                :rules="[rules.required, rules.length]"
                counter="5"
                placeholder="Code"
                outlined
                :error-messages="errorMessage"
              ></v-text-field>
              <v-btn
                v-on:click="SaveCode"
                :loading="loading"
                color="#0005DF"
                dark
                >Generate Certificate</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import codes from "@/assets/data/codes.json";
import FDC from "@/config/firebase";
export default {
  name: "ThankYou",
  components: {},
  props: ["userData"],
  data: () => ({
    code: "",
    allcodes: {},
    errorMessage: "",
    loading: false,
    rules: {
      required: (value) => !!value || "This field is required.",
      length: (v) => v.length <= 25 || "Max 25 characters",
    },
  }),
  mounted() {
    this.allcodes = codes;
  },
  methods: {
    SaveCode() {
      if (this.code.length > 0) {
        this.loading = true;
        const { docid, day } = this.userData;
        const codeDetails = this.allcodes[this.code];
        if (codeDetails && codeDetails !== undefined) {
          codeDetails.message = "success";
          FDC.firestore
            .collection("feedback")
            .doc(docid)
            .update({
              isCertificate: true,
              certificateCode:this.code
            })
            .then((res) => {
              this.loading = false;
              // console.log(res);
              this.$emit("ThankYouSubmitedSuccess", codeDetails);
            })
            .catch((e) => {
              this.loading = false;
              console.log(e)
            });
        } else {
          this.loading = false;
          this.errorMessage = "This Code is invalid.";
          // console.log("not Found");
        }
      } else {
        this.errorMessage = "This field is required";
      }
    },
  },
};
</script>
