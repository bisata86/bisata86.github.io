<script setup lang="ts">
import axios from "axios";
defineProps<{
  data:{
    name:string,
    link:string,
    image:string,
    descr:string,
    type:string,
    multi:string,
    year:string
    hint:string
  }
}>()
</script>
<script lang="ts">
export default {
    methods: {
      open(i:any) {
        window.open(i)
      },
      load(i:any) {
        console.log(i)
        axios.get(i).then(response => console.log(response))
      }
    }
  }
  </script>
<template>
      

  <div class="card"> 
       <div @click="open(data.link)">
       <div class="img">
          <img  :src="data.image"/>
       </div>
       <div class="tit">{{data.name}}
        <div class="descr">{{data.descr}}</div>
        <div class="descr">{{data.type}}</div>
        <div class="descr">{{data.multi}}</div>
        
       </div>
       <div class="year">{{data.year}}</div>
       <div class="hint" v-if=data.hint>{{data.hint}}</div>
       </div>
  </div>

</template>

<style scoped lang="scss">
  .card {
    cursor:pointer;
    border:1px solid lightgray;
    box-sizing:border-box;
    border-radius:3px;
    height:100px;
    overflow:hidden;
    position:relative;
    .img {
      width:50%;
      height:100%;
      overflow:hidden;
      display: inline-block;
      background:black;
      text-align:center;
    }
    img {
      height:100px;
      overflow:hidden;
    }
    .tit {
      display: inline-block;
      vertical-align:top;
      padding-left:10px;
      width: calc(50% - 10px);
    }
    .descr {
      font-size:10px;
      margin-top:10px;
    }
    .year {
      position:absolute;
      top:0;
      background:white;
      padding:2px
    }
    .hint {
      position:absolute;
      bottom:-50px;
      left:0px;
      width:fit-content;
      transition-duration:2s;
      background:yellow;
      font-size:8px;
      padding:3px;
    }
    div {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
  }
  .card:hover {
    background:lightgray;
  }
  .card:hover .hint {
    animation-name: example;
    animation-duration: 2s;

  }

  @keyframes example {
      0% {bottom:-50px;}
      1% {bottom:0px;}
      90% {bottom:0px;}
      100% {bottom:-50px;}
  }
</style>