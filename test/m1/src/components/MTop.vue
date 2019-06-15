<template>
  <div class="main">
    <span>新绿洲医药</span>
    <span class="user">
      <img :src=src alt="">
      <span>{{user}}<Icon type="md-power" style="margin-bottom: 4px;margin-left: 10px;" @click="exit"/></span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'MTop',
  props: {
    src: {
      type: String,
      default: ''
    },
    user: {
      type: String,
      default: ''
    }
  },
  methods: {
    exit () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="stylus">
.main
  height: 50px;
  width: 100%;
  display flex
  color: #fff;
  font-size: 18px;
  box-sizing border-box;
  padding: 0 20px;
  justify-content space-between;
  align-items center;
  background-color #6ba5ce;
  .user
    color: #fff;
    font-size 16px;
    display flex
    justify-content center
    align-items center
    span
      display flex
      justify-content center
      align-items center
</style>
