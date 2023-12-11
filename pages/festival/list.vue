<template>
  <div class="wrap">
    <div class="header">
      <div class="fix-header">
        <div class="header-logo"></div>
        <div class="right">
          <el-button type="success" round>Language</el-button>
          <button type="button" class="btn">Language</button>
        </div>
        <div class="search-wrap">
          <el-input v-model="search" placeholder="가고싶은 곳을 검색해보세요"></el-input>
          <button type="button" class="btn search-btn">
            <i class="el-icon-search"></i>
          </button>
        </div>
      </div>
      <div class="scroll-header">
        <div class="header-logo"></div>
        <div class="right">
          <button type="button" class="btn header-menu"></button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="search-top">
        <div class="left">
          <div class="search-wrap">
            <el-input v-model="search" placeholder="가고싶은 곳을 검색해보세요"></el-input>
            <button type="button" class="btn search-btn">
              <i class="el-icon-search"></i>
            </button>
          </div>
        </div>
        <div class="right">
          <button type="button" class="btn btn-filter">필터</button>
        </div>
      </div>
      <div class="list-option"></div>
      <ul class="thumb-list">
        <li v-for="i in 9" :key="i" class="thumb-list--item">
          <div class="thumb">
              <img src="../../static/images/Thumbnail.png" alt="" />
            </div>
            <div class="text">
              <div class="tit">서울한강축제</div>
              <div class="info">
                <span>서울</span>
                <span>축제</span>
              </div>
            </div>
        </li>
      </ul>
      <el-backtop target=".wrap"></el-backtop>
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
