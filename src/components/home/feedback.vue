<template>
  <v-container
    fluid
    class="mt-0 py-0"
    style="border: 1px solid #e0e0e0; border-radius: 7px;background:white"
  >
    <v-row align="center" justify="center" class="my-10">
      <v-col md="12" lg="12" sm="12" class="">
        <div class="px-5 text-center">
        <h2 class="google-font">How did you like Devfest India 2020?</h2>
          <p style="width: 90%;margin-left:auto;margin-right:auto ">
            Alas! Devfest india 2020 is over. We are sad that it's over, but glad that you attended and hopefully found it useful. This will take like 1 minute to finish for you, but will help us a lot in understanding what we did well and what we could have done better!
            <br>
            Thanks in advance :-)
          </p>
        </div>

        <v-container fluid class="">
          <v-row justify="center" align="center">
            <v-col md="10" xs="12">
              <v-form ref="form">
                <p style="font-size: 105%; color: black" class="mb-1">
                  Full Name<span style="color: #ff5252">*</span>
                </p>
                <v-text-field
                  :rules="[rules.required]"
                  counter="25"
                  v-model="response.name"
                  placeholder="Full Name"
                  outlined
                ></v-text-field>

                <p style="font-size: 105%; color: black" class="mb-1">
                  Email<span style="color: #ff5252">*</span>
                </p>
                <v-text-field
                  :rules="[rules.required, rules.emailRules]"
                  type="email"
                  placeholder="Email"
                  v-model="response.email"
                  outlined
                ></v-text-field>

                <p style="font-size: 105%; color: black" class="mb-1">
                  Did you find Devfest useful?<span style="color: #ff5252"
                    >*</span
                  >
                </p>
                <TrackInput track="Mobile Track" :model.sync="response.mobiletrack"/>
                <TrackInput track="Web Track" :model.sync="response.webtrack"/>
                <TrackInput track="ML Track" :model.sync="response.mltrack"/>
                <TrackInput track="Cloud Track" :model.sync="response.cloudtrack"/>
                <TrackInput track="Flutter Track" :model.sync="response.fluttertrack"/>

                <!-- What did you like about Devfest? -->
                <div
                  class="google-font mb-2 mt-1"
                  style="font-size: 105%; color: black !important"
                >
                  What did you like about Devfest?
                </div>
                <v-textarea
                  outlined
                  placeholder="What did you like about Devfest?"
                  v-model="response.good"
                ></v-textarea>
                <!-- What did you like about Devfest? -->

                <!-- What you didn't like about Devfest? -->
                <div
                  class="google-font mb-2 mt-1"
                  style="font-size: 105%; color: black !important"
                >
                  What you didn't like about Devfest?
                </div>
                <v-textarea
                  outlined
                  placeholder="What you didn't like about Devfest?"
                  v-model="response.bad"
                ></v-textarea>
                <!-- What you didn't like about Devfest? -->

                <!-- Know About Event -->
                <v-radio-group
                  :rules="[(v) => !!v || 'This field is required.']"
                  v-model="response.knowAbout"
                  class="mb-3"
                >
                  <div
                    class="google-font mb-1"
                    style="font-size: 105%; color: black !important"
                  >
                    How did you know about Devfest?
                    <span style="color: #ff5252">*</span>
                    <br />
                    <span
                      style="color: #ff5252; font-size: 70%"
                      v-show="response.knowAbout === 0"
                      >This field is required.</span
                    >
                  </div>

                  <v-radio color="#0005DF" value="GDG" v-slot:label>
                    <div style="color: black">GDG</div>
                  </v-radio>
                  <v-radio color="#0005DF" value="DSC" v-slot:label>
                    <div style="color: black">DSC</div>
                  </v-radio>
                  <v-radio
                    color="#0005DF"
                    value="Social Media (Facebook / Twitter)"
                    v-slot:label
                  >
                    <div style="color: black">
                      Social Media (Facebook / Twitter)
                    </div>
                  </v-radio>
                  <v-radio color="#0005DF" value="Analytics India" v-slot:label>
                    <div style="color: black">Analytics India</div>
                  </v-radio>
                  <v-radio color="#0005DF" value="Hacker earth" v-slot:label>
                    <div style="color: black">HackerEarth</div>
                  </v-radio>
                  <v-radio color="#0005DF" value="TechGig" v-slot:label>
                    <div style="color: black">TechGig</div>
                  </v-radio>
                  <v-radio color="#0005DF" value="Friends" v-slot:label>
                    <div style="color: black">Friends</div>
                  </v-radio>
                  <v-radio color="#0005DF" value="Classmates" v-slot:label>
                    <div style="color: black">Classmates</div>
                  </v-radio>
                  <v-radio color="#0005DF" value="Others" v-slot:label>
                    <div style="color: black">Others</div>
                  </v-radio>
                </v-radio-group>
                <!-- Know About Event -->

                <!-- Community Event -->
                <v-radio-group
                  :rules="[(v) => !!v || 'This field is required.']"
                  v-model="response.isGDGIans"
                  class="mb-3"
                >
                  <div
                    class="google-font mb-1"
                    style="font-size: 105%; color: black !important"
                  >
                    Have you attended GDG meetups before?
                    <span style="color: #ff5252">*</span>
                    <br />
                    <span
                      style="color: #ff5252; font-size: 70%"
                      v-show="response.isGDGIans === 0"
                      >This field is required.</span
                    >
                  </div>

                  <v-radio color="#0005DF" value="Yes" v-slot:label>
                    <div style="color: black">Yes</div>
                  </v-radio>
                  <v-radio color="#0005DF" value="No" v-slot:label>
                    <div style="color: black">No</div>
                  </v-radio>
                </v-radio-group>
                <!-- Community Event -->

                <v-btn
                  v-on:click="SaveFeedback"
                  color="#0005DF"
                  dark
                  :loading="loading"
                  >Submit</v-btn
                >
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FDC from "@/config/firebase";

export default {
  name: "Feedback2",
  components: {
    TrackInput:()=>import("@/components/common/TrackForm.vue"),
  },
  data: () => ({
    loading: false,
    rules: {
      required: (value) => !!value || "This field is required.",
      emailRules: v => /.+@.+\..+/.test(v) || "E-mail must be valid",
      radiobtn: (value) => {
        return value.length > 0 || "This field is required.";
      },
      checkboxbtn: (value) => {
        return value.length > 0 || "At least one item should be selected.";
      },
      socialcheckboxbtn: (value) => {
        return value.length > 0 || "At least one item should be selected.";
      },
    },
    response: {
      name: "",
      email: "",
      bad: "",
      good: "",
      isGDGIans: "",
      knowAbout: "",
      mobiletrack: "",
      webtrack: "",
      mltrack: "",
      cloudtrack: "",
      fluttertrack: "",
    },
  }),
  methods: {
    SaveFeedback() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        // console.log(this.response);
        const timestamp = FDC.firebase.firestore.FieldValue.serverTimestamp();
        this.response.timestamp = timestamp;
        FDC.firestore
          .collection("feedback")
          .add(this.response)
          .then((res) => {
            const msg = {
              status: "success",
              email: this.response.email,
              name: this.response.name,
              docid: res.id,
            };
            this.loading = false;
            this.$emit("FeedbackSubmitedSuccess", msg);
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
          });
      }
    },
  },
};
</script>
