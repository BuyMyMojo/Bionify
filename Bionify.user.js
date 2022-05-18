// ==UserScript==
// @name         Bionify
// @namespace    https://news.ycombinator.com/item?id=30787290
// @version      0.1
// @description  Replicates Bionic Reader on all pages
// @author       You
// @match      *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

 function bionifyPage(){
        function bionifyWord(word) {
            if (word.length == 1) {
                return word;
            }
            var numBold = Math.ceil(word.length * 0.3);

            // return "<div class=\"bionic-highlight\">" + word.slice(0, numBold) + "</div>" +  + "<div class=\"bionic-rest\">" + word.slice(numBold) + "</div>";
            return "<b>" + word.slice(0, numBold) + "</b>" + "<span>" + word.slice(numBold) + "</span>";
        }

        function bionifyText(text) {
            var res = "";
            if (text.length < 10) {
                return text;
            }
            for (var word of text.split(" ")) {
                res += bionifyWord(word) + " ";
            }
            return res;
        }

        function bionifyNode(node) {
            if (node.tagName == 'SCRIPT') return;
            if ((node.childNodes == undefined) || (node.childNodes.length == 0)) {
                if ((node.textContent != undefined) && (node.tagName == undefined)) {
                    var newNode = document.createElement('span');
                    var bionifiedText = bionifyText(node.textContent)
                    newNode.innerHTML = bionifiedText;
                    if (node.textContent.length > 20){
                        node.replaceWith(newNode);
                    }
                }
            }
            else {
                for (var child of node.childNodes) {
                    bionifyNode(child);
                }
            }
        }
        bionifyNode(document.body);
    }
bionifyPage();
