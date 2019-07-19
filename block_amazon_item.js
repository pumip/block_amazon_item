
//押すとblacklistを含む商品を隠すボタン作成
let btn = document.createElement("button");
btn.setAttribute("id", 'custom-button');
btn.setAttribute("style", 'width:100%; height:50px;');
btn.setAttribute("onclick", 'hide_button("100_dealView_");');
btn.innerText = "id=100_dealView_*の商品に対して実行";
document.body.appendChild(btn);

//商品を隠す関数本体
delete_specific_item	=function(arr, target_id) {
    href		=document.getElementById('widgetContent');
    if (href !== null || href !== undefined) {
        for(i=0; document.getElementById(target_id+i) !== null; i++) {
            elem      =document.getElementById(target_id+i);
            haystack  =elem.innerHTML;
            arr.forEach(function(val) {
                for($i=0; arr[$i] != undefined; $i++) {
                    if (haystack.indexOf(arr[$i]) !== -1) {
                        console.log(val + 'を非表示'); //デバッグ用
                        elem.style.border                       ="solid 1px";
                        elem.firstElementChild.style.visibility ="hidden";
                        elem.style.backgroundColor              ="gray";
                        break;
                    }
                }
            });
        };
        document.body.style.backgroundColor	='black';
        console.log('end');
        clearInterval(intervalID);
    }
};

//@rubyfmzk	https://qiita.com/rubyfmzk/items/1902453ca13e4d8662ee
function getCsv(url) {
    //CSVファイルを文字列で取得。
    let txt = new XMLHttpRequest();
    txt.open('get', url, false);
    txt.send();
    //改行ごとに配列化
    return txt.responseText.split('\r\n'); //\nではなく\r\nにしないといけない
}
//ボタン押下時に実行する関数
function hide_button(target_id) {
    let url = 'https://dl.dropboxusercontent.com/s/fr7im768zy29cjp/blacklist.csv';
    let arr = getCsv(url);
    if (arr === []) {
        alert('取得したblacklistが空である例外');
    }
    intervalID = window.setInterval(delete_specific_item, 2000, arr, target_id); //delete_specific_item内から呼び出すためグローバルスコープ
}
