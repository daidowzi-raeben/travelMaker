<template>
  <div class="wrap">
    <div class="main-wrap">
      <div class="main-menu">
        <ul class="menu-list">
          <li class="menu-list--item" @click="$router.push('/festival/list')">
            <div class="icon festival"></div>
            <p class="text">축제공연행사</p>
          </li>
        </ul>
      </div>
      <div class="main-list--wrap">
        <div class="main-list--tit">
          지금, 진행중인 축제
          <router-link to="/festival/list" class="right">더보기</router-link>
        </div>
        <ul class="thumb-list">
          <li v-for="i in 4" :key="i" class="thumb-list--item">
            <div class="thumb">
              <img src="../static/images/Thumbnail.png" alt="" />
            </div>
            <div class="text">
              <div class="tit">서울한강축제</div>
              <div class="info">
                <span>서울</span> /
                <span>축제</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MainPage',
  layout: 'index',
  data() {
    return {
      search: '',
    }
  },
  computed: {},
  mounted() {},
}
</script>

<style lang="scss"></style>
