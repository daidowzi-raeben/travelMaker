<template>
    <div>
    <el-select  placeholder="Select" :value="location.do" @change="onChangeGuData">
        <el-option
          v-for="(v,i) in LOCATION_CODE.do"
          :key="i"
          :label="v.doName"
          :value="v.doCode">
        </el-option>
      </el-select>

      <el-select  placeholder="Select" :value="location.gu" @change="onChangeLocation">
            <el-option
              v-for="(v, i) in LOCATION_CODE[`gu${location.do}`]"
              :key="i"
              :label="v.guName"
              :value="v.guCode">
            </el-option>
          </el-select>

    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'ExamplePage',
    layout: 'index',
    data() {
        return {
            location: {
                do: '1',
                gu : '1',
            }
        }
    },
        computed: {
        ...mapState(['LOCATION_CODE'])
    },
    mounted() { },
    methods: {
        onChangeGuData(v) {
            this.location.do = v
            this.location.gu = '1'
        },
        onChangeLocation(v) {
            this.location.gu = v
        }
    }
}
</script>

<style lang="scss"></style>
