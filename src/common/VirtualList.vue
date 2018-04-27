
<template>
  <div class = "virtual-list">
    <div class = "list-view-phantom"
          :style = "{ height : contentHeight }">
      <div class = "list-view-content"
            ref = "content">
        <slot :studentInfo = "studentInfo"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VirtualList',
  data() {
    return {

    }
  },
  props : {
    list : {
      type: Array,
      required: true
    },
    itemHeight : {
      type: Number,
      required: true
    }
  },
  computed :{
    studentInfo () {
      return this.$store.state.studentInfo
    },
    contentHeight () {
      return this.list.length * this.itemHeight + 'px'
    }
  }
}
</script>

<style scoped>
 .virtual-list {
    position: relative;
    height: 100%;
    overflow-y: auto;
  }
  .list-view-phantom,
  .list-view-content {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
  }

</style>
