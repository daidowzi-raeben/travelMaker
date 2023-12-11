<template>
  <div class="wrap">
    <div class="main-header">
      <div class="header-logo"></div>
      <div class="right">
        <el-button type="success" size="small" round>Language</el-button>
      </div>
      <div class="search-wrap">
        <el-input v-model="search" placeholder="가고싶은 곳을 검색해보세요"></el-input>
        <button type="button" class="btn search-btn">
          <i class="el-icon-search"></i>
        </button>
      </div>
    </div>
    <div class="main-wrap">
      <div class="main-menu">
        <ul class="menu-list">
          <li class="menu-list--item">
            <div class="icon festival"></div>
            <p class="text">축제공연행사</p>
          </li>
        </ul>
      </div>
      <div class="main-list--wrap">
        <div class="main-list--tit">지금, 진행중인 축제</div>
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
  computed: {

  },
  mounted() {
  },
}
</script>

<style lang="scss" ></style>
