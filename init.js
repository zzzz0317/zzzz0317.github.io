function initJsFile(src) {
    var newscript = document.createElement('script');
    newscript.setAttribute('type', 'text/javascript');
    newscript.setAttribute('src', src);
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(newscript);
}

function init_zz_custom_js(){
    var famousperson = ['爱因斯坦', '牛顿', '爱迪生', '孔子', '伽利略', '法拉第', '贝多芬', '卢瑟福', '达尔文', '林肯', '丘吉尔', '杜鲁门', '拿破仑', '艾森豪威尔', '金三胖', '苏格拉底', '柏拉图', '亚里士多德', '卓别林', '毕加索', '马克·吐温', '但丁', '海明威', '纪晓岚'];
    console.log('淡定，淡定，不要搞事情 —— ' + famousperson[Math.floor(Math.random() * famousperson.length)] + '没说过这句话');

    if('serviceWorker'in navigator){
        console.log("ServiceWorker Initializing...");
        navigator.serviceWorker.register('/sw.js')
    }

    initJsFile("https://home.asec01.net/js/bc.js");
}

init_zz_custom_js();

