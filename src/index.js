let Fields = require.context("./fields/", false, /^\.\/field([\w-_]+)\.js$/);
let FormlyBootstrap = {
  install(Vue, options){        
    Fields.keys().forEach((key) => {
      //remove all the .vue crap
      let component = key
        .replace(/^\.\//, "")
        .replace(/\.js/, "")
        .replace(/^field/, "");
      //convert the first letter to lc
      component = component.charAt(0).toLowerCase() + component.slice(1);

      Vue.$formly.addType(component, Fields(key).default);
    });
  }
};

//auto install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(FormlyBootstrap);
}

export default FormlyBootstrap;
