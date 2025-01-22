<script setup lang="ts">

import { pages } from "@/main";
import card from '../components/card.vue';
import AppHeader from '../components/app-header.vue';
</script>

<template>
    <app-header
      class="layout-header"
      title="bisata@gmail.com"
    />
    <div class="cards">
      <card :data="page" v-for="page in pages.data"></card>
    </div>
</template>

<style scoped lang="scss">

  .cards {
    padding-top:45px;
  }

  .card {
    display:inline-block;
    height:100px;
    width: 90%;
    margin:calc(( 100 - (45 * 2) ) * 1% / (((1 - 1) * 2) + 2));
    margin-top:10px !important;
    margin-bottom:10px !important;
  }

  @media only screen and (min-width: 600px) {
    .card {
      width: 45%;
      margin:calc(( 100 - (45 * 2) ) * 1% / (((2 - 1) * 2) + 2));
    }

  }

  @media only screen and (min-width: 768px) {
    /* For desktop: */
    .card {
      width: 15%;
      margin:calc(( 100 - (15 * 6) ) * 1% / (((6 - 1) * 2) + 2));
    }

  }

</style>
