<template>
  <div>
    <el-button v-if="!isSignIn" type="primary" icon="fas fa-edit"  @click="handleClickSignIn">sign
      in</el-button>
    <Nuxt />
  </div>
</template>

<script>
//  MUTATIONS_LOGIN

export default {
  name: 'IndexLayout',
  data() {
    return {
     isInit: false,
      isSignIn: false,
    }
  },
    created() {
    // const that = this;
    // const checkGauthLoad = setInterval(function () {
    //   that.isInit = that.$gAuth.isInit;
    //   that.isSignIn = that.$gAuth.isAuthorized;
    //   if (that.isInit) clearInterval(checkGauthLoad);
    // }, 1000);
  },
  mounted() {
    // this.googleInitialize()
  },
  methods: {

    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        console.log("googleUser", googleUser);
        console.log("getId", googleUser.getId());
        console.log("getBasicProfile", googleUser.getBasicProfile());
        console.log("getAuthResponse", googleUser.getAuthResponse());
        console.log(
          "getAuthResponse",
          this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse()
        );
        this.isSignIn = this.$gAuth.isAuthorized;
      } catch (error) {
        console.error(error);
        return null;
      }
    },

  }


}
</script>

<style lang="scss"></style>
