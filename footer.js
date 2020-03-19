var docDomain = document.domain.split(".");

if (docDomain.length > 1) {
    if (docDomain[docDomain.length - 1] == "cn") {
        if (docDomain[docDomain.length - 2] == "zhangzhe-tech") {
            var footer_prism_break = document.getElementById("footer-prism-break");
            footer_prism_break.innerText = "京ICP备17049139号-1";
            footer_prism_break.href = "http://www.miitbeian.gov.cn/";
        }
    }
} else {
    if (docDomain[0] == "localhost") {
        var footer_prism_break = document.getElementById("footer-prism-break");
        footer_prism_break.innerText = "本地调试模式";
        footer_prism_break.href = "http://www.miitbeian.gov.cn/";
    }
}