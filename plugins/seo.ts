import { Plugin } from '@nuxt/types'
import { MetaInfo } from 'vue-meta';
function SEO(obj: {title: string,description: string}): MetaInfo {
  return {
    title:obj.title,
    meta: [
      {
        name: "title",
        content: obj.title,
        hid: "title",
      },
      {
        property: "og:title",
        content: obj.title,
        hid: "og:title",
      },
      {
        hid: "description",
        name: "description",
        content: obj.description,
      },
      {
        property: "og:description",
        content: obj.description,
        hid: "og:description",
      },
    ],
  };
}
const seo: Plugin = (app, inject) => {
    inject("seo",SEO);
  };
  export default seo
  export {SEO}