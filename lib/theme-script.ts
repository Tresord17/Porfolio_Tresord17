export const THEME_KEY = "theme";

/** Script exécuté avant le premier affichage (voir layout) : évite le flash de thème. */
export const themeInitScript = `(function(){document.documentElement.classList.add("js");try{var p=localStorage.getItem("${THEME_KEY}");if(p!=="light"&&p!=="dark")p="system";var d=document.documentElement;d.dataset.themePref=p;d.dataset.theme=p==="system"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):p;}catch(e){}})()`;

