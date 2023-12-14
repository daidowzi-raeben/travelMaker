<template>
  <div>
    <div v-if="$route.fullPath == '/'" class="main-header">
      <div class="header-logo"></div>
      <div class="right">
        <el-button type="success" size="small" round>Language</el-button>
      </div>
      <div class="search-wrap">
        <el-input
          v-model="search"
          placeholder="가고싶은 곳을 검색해보세요"
        ></el-input>
        <button type="button" class="btn search-btn">
          <i class="el-icon-search"></i>
        </button>
      </div>
    </div>
    <div v-else class="header">
      <div class="header-logo" @click="$router.push('/')"></div>
      <button type="button" class="btn header-menu"></button>
    </div>
    <!-- <el-button v-if="!isSignIn" type="primary" icon="fas fa-edit"  @click="handleClickSignIn">sign
      in</el-button> -->
    <Nuxt />
  </div>
</template>

<script>
//  MUTATIONS_LOGIN
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'IndexLayout',
  data() {
    return {
      isInit: false,
      isSignIn: false,
      search: '',
    }
  },
  computed: {
    ...mapState(['VIEW_TEXT'])
  },
  created() {
    const lang = 'ko'
    this.MUTATIONS_LANGAGE_SET(lang)
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
     ...mapMutations(['MUTATIONS_LANGAGE_SET']),
    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn()
        if (!googleUser) {
          return null
        }
        console.log('googleUser', googleUser)
        console.log('getId', googleUser.getId())
        console.log('getBasicProfile', googleUser.getBasicProfile())
        console.log('getAuthResponse', googleUser.getAuthResponse())
        console.log(
          'getAuthResponse',
          this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse()
        )
        this.isSignIn = this.$gAuth.isAuthorized
      } catch (error) {
        console.error(error)
        return null
      }
    },
  },
}
</script>

<style lang="scss"></style>
