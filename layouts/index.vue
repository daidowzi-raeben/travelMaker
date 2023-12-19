<template>
  <div>
    <div class="modal" v-bind:class="{ show: headerMenuShow }">
      <div class="modal-dim" @click="headerMenuShow = false"></div>
      <div class="modal-con right">
        <button type="button" class="btn btn-close" @click="headerMenuShow = false">&times;</button>
        <div class="header-menu--top">
          언어선택
          <el-select v-model="lang" placeholder="언어선택">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <ul class="header-menu--list">
          <li class="item">
            <router-link to="/festival/list" class="btn">축제공연행사</router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div v-if="$route.fullPath == '/'" class="main-header">
      <div class="header-logo"></div>
      <div class="right">
        <button type="button" class="btn header-menu" @click="headerMenuShow = true"></button>
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
    </div> -->
    <div class="header">
      <div class="header-logo" @click="$router.push('/')"></div>
      <button type="button" class="btn header-menu" @click="headerMenuShow = true"></button>
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

      headerMenuShow: false,

      options: [{
        value: 'ko',
        label: '한국어'
      }, {
        value: 'en',
        label: '영어'
      }, {
        value: 'ch',
        label: '중국어'
      }, {
        value: 'jp',
        label: '일본어'
      }],
      lang: '한국어',
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
