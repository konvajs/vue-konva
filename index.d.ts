
declare module "vue-konva" {
  import {PluginFunction, PluginObject} from 'vue';
  const konvaPlugin: PluginObject<{}> | PluginFunction<{}>;
  export default konvaPlugin;
}
