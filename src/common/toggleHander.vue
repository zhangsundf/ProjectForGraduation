<template>
    <div class = "rightHandle" @mouseover="changeShow" >
      <span> &lt;</span>
      </div>
</template>
<script>
export default{
    name: 'rightToggle',
    data () {
        return {
            showToggle:this.showRightHander
        }
    },
    props: {
        showRightHander: {
            require:true,
            type:Boolean
        }
    },
    methods: {
        changeShow () {
            this.showToggle = !this.showRightHander
            this.$emit('toggleHander',this.showToggle)
        }
    }
}

</script>
<style scoped>
 .rightHandle {
    position: fixed;
    right: 0px;
    width:50px;
    height:100px; 
    border-radius:50px 0px 0px 50px; /* 左上、右上、右下、左下 */
    top:50%;
    background-color: #b9b5b5;
    color: #ffffff;
    text-align: center;
    line-height: 100px;
    font-size: 50px;
    font-weight: bold;
  }
</style>