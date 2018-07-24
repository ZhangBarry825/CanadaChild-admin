<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
  import adminDashboard from './admin';


  export default {
    name      : "homeIndex",
    components: {adminDashboard},
    data() {
      return {
        currentRole: 'adminDashboard',
      };
    },
    mounted(){
    }
  };
</script>

<style scoped>

</style>
