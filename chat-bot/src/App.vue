<template>
  <div id="app">
    <chat-bot></chat-bot>
  </div>
</template>

<script>
import ChatBot from '../src/components/ChatBot.vue';
export default {
  components: {
    ChatBot
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
}
</style>
