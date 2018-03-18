<template>
  <div class="wrapper">
    <div class="inner">
      <h3>Vue-Konva, choose a example</h3>
      <ul class="examples">
        <li><router-link to="/stars">Stars</router-link></li>
        <li><router-link to="/vuex-example">Vuex Example</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script></script>

<style>
* {
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.wrapper {
  width: 100%;
  height: 100%;
  padding: 40px 0;
  margin: 0;
  overflow: auto;
}
.inner {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  background: #fff;
  border-radius: 3px;
}
h3 {
  font-size: 1.17em;
  margin: 0;
}
.examples {
  list-style: none;
  padding: 20px 30px;
  margin-top: 20px;
  border-top: 1px solid #eee;
}
.examples:before,
.examples:after {
  content: " ";
  display: table;
  line-height: 0;
}
.examples:after {
  clear: both;
}
li {
  width: 50%;
  float: left;
  padding: 10px 5px;
  font-size: 16px;
}
a {
  text-decoration: none;
}
</style>
