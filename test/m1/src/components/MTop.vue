<template>
  <div class="main">
    <span>新绿洲医药</span>
    <span class="user">
      <img :src=src alt="">
      <span>{{user}}</span>
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
</style>
