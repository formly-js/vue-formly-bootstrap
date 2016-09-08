import directives from './directives/index.js';
let Fields = require.context("./fields/", false, /^\.\/field([\w-_]+)\.vue$/);
let FormlyBootstrap = {
    install(Vue, options){
        directives(Vue);
        
        Fields.keys().forEach((key) => {
            //remove all the .vue crap
            let component = key
                    .replace(/^\.\//, "")
                    .replace(/\.vue/, "")
                    .replace(/^field/, "");
            
            //convert the first letter to lc
            component = component.charAt(0).toLowerCase() + component.slice(1);

            Vue.$formly.addType(component, Fields(key));
        });
    }
};

//auto install
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(FormlyBootstrap);
}

export default FormlyBootstrap;
