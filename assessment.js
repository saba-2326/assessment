'use strict';
const userNameInput    = document.getElementById('userName');
const assessmentButton = document.getElementById('assessment');
const resultDivision   = document.getElementById('result_area');
const tweetDivision    = document.getElementById('tweet_area');


 

assessmentButton.addEventListener(//イベント検知
  'click',//ボタンがクリックされた時
  () => {//無名関数
    const userName = userNameInput.value;//名前欄の内容を取得する
    if (userName.length === 0) {//入力欄が空であるとき
      //警告して処理を中断する
      alert('名前を入力してください');
      return;
    }
    console.log(assessment(userName));

    //診断結果エリアを初期化
    while(resultDivision.firstChild) {//もしリザルト表示エリアに要素がある限り
      //リザルトエリアの先頭の小要素を削除する
      resultDivision.removeChild(resultDivision.firstChild);
    }

    //診断結果表示エリアの作成
    const header = document.createElement('h3');//h3タグの作成
    header.innerText = '診断結果';//タグの内側のテキストを設定
    resultDivision.appendChild(header);//divタグの子要素として追加

    const paragraph = document.createElement('p');//pタグの作成
    const result = assessment(userName);//診断結果の取得
    paragraph.innerText = result;//pタグの内側のテキストに診断結果を設定
    resultDivision.appendChild(paragraph);//divタグの小要素として追加


  //ツイートボタンを作成する
    //ツイートボタンのHTMLを作る
    tweetDivision.innerText = '';//ツイートエリアのDivを空にする
    const anchor = document.createElement('a');
    // const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);//aタブにurlを入れる
    anchor.setAttribute('class', 'twitter-hashtag-button');//クラスを付与する
    anchor.setAttribute('date-text', result);//診断結果を投稿する際に写すようにする
    anchor.innerText = 'あなたのいいところを投稿する';//ボタンのテキストを入れる
    // anchor.setAttribute('data-show-count', 'false');

    tweetDivision.appendChild(anchor);//ツイートボタンをdivタブの子要素に追加する

    //ボタンとして装飾し、投稿機能を実装する
    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);//ボタンを実装するスクリプトタグをHTMLに足す
  }
);

userNameInput.addEventListener(
  'keydown',
  (event) => {
    if(event.code === 'Enter') {
      assessmentButton.dispatchEvent(new Event('click'));
    }
  }
)

const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',

  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',

  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',

  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',

  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',

  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',

  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',

  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',

  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',

  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',

  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',

  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',

  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',

  '###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',

  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
]

/** 
* 名前の文字列を渡すと診断結果を返す関数
* @param {string} UserName ユーザーの名前
* @return {string}診断結果
*/
function assessment(userName) {
//TODO 診断処理を実装する
//全文字コード番号を足し合わせる
let sumOfCharCode = 0;
for (let i = 0;i < userName.length; i++) {
  sumOfCharCode += userName.charCodeAt(i);
}
//足しあわせた値を答えのパターン数で割った余りを使って、ユーザー名ごとに決まった答えを返す。
const index = sumOfCharCode % answers.length;
let result = answers[index];
result = result.replaceAll('###userName###', userName);
return result;//診断結果を返す
}


function test() {
  console.log('診断結果のテスト')
  console.log(assessment('太郎'));
  console.assert(assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。', 
  '診断結果の文言の特定の部分を置き換える処理が正しくありません。')

  console.log(assessment('次郎'));
  console.assert(assessment('次郎') === '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。', 
  '診断結果の文言の特定の部分を置き換える処理が正しくありません。')

  console.log(assessment('花子'));
  console.assert(assessment('花子') === '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
  '診断結果の文言の特定の部分を置き換える処理が正しくありません。')

  //同じ名前なら同じ結果が出力されるテスト
  console.assert(assessment('太郎') === assessment('太郎'));

  console.log('テスト完了');
}

test();