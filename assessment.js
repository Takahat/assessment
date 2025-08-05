'use strict';
const userInputField = document.getElementById('user-name');
const searchButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

searchButton.addEventListener(
  'click',
   () => {
    const userInput = userInputField.value;
    if (userInput.length === 0) {
      // 入力が空のときは処理を終了
      return;
    }

    // 商品推奨エリアの作成
    resultDivision.innerText = ''; // 前の結果を消す

    // headerDivisionの作成    
    const headerDivision = document.createElement('div');
    headerDivision.setAttribute('class', 'card-header text-bg-primary');
    headerDivision.innerText = 'おすすめ商品';

    // bodyDivisionの作成
    const bodyDivision = document.createElement('div');
    bodyDivision.setAttribute('class', 'card-body');

    const result = getRecommendedToothpaste(userInput);
    
    // 商品名
    const productTitle = document.createElement('h5');
    productTitle.setAttribute('class', 'card-title');
    productTitle.innerText = result.name;
    bodyDivision.appendChild(productTitle);

    // 商品説明
    const productDescription = document.createElement('p');
    productDescription.setAttribute('class', 'card-text');
    productDescription.innerText = result.description;
    bodyDivision.appendChild(productDescription);

    // 価格
    const priceElement = document.createElement('p');
    priceElement.setAttribute('class', 'card-text');
    priceElement.innerHTML = `<strong>価格: ${result.price}</strong>`;
    bodyDivision.appendChild(priceElement);

    // 特徴
    const featuresElement = document.createElement('p');
    featuresElement.setAttribute('class', 'card-text');
    featuresElement.innerHTML = `<small class="text-muted">特徴: ${result.features}</small>`;
    bodyDivision.appendChild(featuresElement);

    // resultDivisionにBootstrapのスタイルを適用する
    resultDivision.setAttribute('class', 'card');

    // headerDivision と bodyDivisionを resultDivisionに差し込む
    resultDivision.appendChild(headerDivision);
    resultDivision.appendChild(bodyDivision);

    // ツイートエリアは非表示にする
    tweetDivision.style.display = 'none';
    }
);

userInputField.addEventListener( // イベント検知の追加
  'keydown', // キー入力
  (event) => {
    if(event.code === 'Enter') { // Enterキーが押されたとき
      searchButton.dispatchEvent(new Event('click'));
    }
  }
)

const toothpasteProducts = [
  {
    name: 'ホワイトニング歯磨き粉 クリスタルホワイト',
    description: '強力な美白成分配合で、着色汚れを効果的に除去。自然な白い歯を取り戻します。',
    price: '¥1,980',
    features: 'ホワイトニング、着色汚れ除去、フッ素配合'
  },
  {
    name: '薬用歯周病ケア歯磨き粉 ガムプロテクト',
    description: '歯茎の腫れや出血を防ぎ、歯周病の進行を抑制。健康な歯茎を維持します。',
    price: '¥1,680',
    features: '歯周病予防、歯茎ケア、薬用成分配合'
  },
  {
    name: 'フレッシュブレス 口臭対策歯磨き粉',
    description: '長時間続く爽やかな息。口臭の原因菌を99.9%除菌し、清潔な口内環境を保ちます。',
    price: '¥1,480',
    features: '口臭予防、除菌効果、長時間持続'
  },
  {
    name: 'センシティブケア 知覚過敏用歯磨き粉',
    description: 'しみる痛みを和らげ、知覚過敏症状を改善。毎日使える優しい処方です。',
    price: '¥1,780',
    features: '知覚過敏対応、痛み軽減、優しい処方'
  },
  {
    name: 'トータルケア オールインワン歯磨き粉',
    description: 'これ一本で虫歯予防、歯周病ケア、ホワイトニングまで。家族みんなで使える万能タイプ。',
    price: '¥1,580',
    features: '虫歯予防、歯周病ケア、ホワイトニング'
  },
  {
    name: 'ナチュラルハーブ 天然成分歯磨き粉',
    description: '天然ハーブエキス配合で、化学成分を避けたい方に。優しく効果的な口内ケアを実現。',
    price: '¥2,180',
    features: '天然成分、ハーブエキス、無添加'
  },
  {
    name: 'キッズ用歯磨き粉 フルーツミント',
    description: '子供が喜ぶフルーツ味で、楽しく歯磨き習慣を身につけられます。フッ素配合で虫歯予防も万全。',
    price: '¥980',
    features: 'キッズ用、フルーツ味、フッ素配合'
  },
  {
    name: 'プレミアム エイジングケア歯磨き粉',
    description: '年齢とともに変化する口内環境に対応。歯茎の退縮や口の渇きをケアする高機能処方。',
    price: '¥2,680',
    features: 'エイジングケア、高機能、口の渇き対応'
  },
  {
    name: 'スポーツ用 リフレッシュ歯磨き粉',
    description: '運動後の口内をすっきりリフレッシュ。汗をかいた後の口臭も強力にブロック。',
    price: '¥1,380',
    features: 'スポーツ用、リフレッシュ、強力消臭'
  },
  {
    name: 'オーガニック 無添加歯磨き粉',
    description: '100%オーガニック成分で作られた、肌に優しい歯磨き粉。敏感な方にも安心してお使いいただけます。',
    price: '¥2,480',
    features: 'オーガニック、無添加、敏感肌対応'
  },
  {
    name: 'ミント爽快 強力清涼歯磨き粉',
    description: '強烈なミントで朝の目覚めもスッキリ。爽快感が長時間持続します。',
    price: '¥1,280',
    features: '強力ミント、爽快感、長時間持続'
  },
  {
    name: 'デリケートケア 低刺激歯磨き粉',
    description: '口内炎ができやすい方や治療中の方に。低刺激で優しく汚れを落とします。',
    price: '¥1,880',
    features: '低刺激、デリケートケア、優しい処方'
  },
  {
    name: 'プロフェッショナル 歯科医推奨歯磨き粉',
    description: '歯科医が推奨する高機能歯磨き粉。クリニック品質の口内ケアをご家庭で。',
    price: '¥3,180',
    features: '歯科医推奨、高機能、クリニック品質'
  },
  {
    name: 'トラベル用 携帯歯磨き粉',
    description: 'コンパクトサイズで持ち運び便利。出張や旅行先でも本格的な口内ケアが可能です。',
    price: '¥680',
    features: '携帯用、コンパクト、トラベルサイズ'
  },
  {
    name: 'ビタミン配合 栄養歯磨き粉',
    description: 'ビタミンC・E配合で歯茎に栄養を与えます。健康的な歯茎作りをサポート。',
    price: '¥1,980',
    features: 'ビタミン配合、栄養補給、歯茎ケア'
  },
  {
    name: 'カルシウム強化 歯質改善歯磨き粉',
    description: 'カルシウム配合で歯質を強化。虫歯になりにくい丈夫な歯を育てます。',
    price: '¥1,780',
    features: 'カルシウム配合、歯質強化、虫歯予防'
  },
  {
    name: 'プラーク除去 深層洗浄歯磨き粉',
    description: '頑固なプラークも根こそぎ除去。歯科衛生士もおすすめする深層洗浄力。',
    price: '¥2,080',
    features: 'プラーク除去、深層洗浄、歯科衛生士推奨'
  }
];

/**
 * ユーザーの入力を基に最適な歯磨き粉を推奨する関数
 * @param {string} userInput ユーザーの入力（悩みや希望）
 * @return {object} 推奨商品情報
 */
function getRecommendedToothpaste(userInput) {
   // 入力文字のコード番号を取得してそれを足し合わせる
   let sumOfCharCode = 0;
  for (let i = 0; i < userInput.length; i++) {
    sumOfCharCode = sumOfCharCode + userInput.charCodeAt(i);
  }

  // 文字のコード番号の合計を商品の数で割って添え字の数値を求める
  const index = sumOfCharCode % toothpasteProducts.length;
  return toothpasteProducts[index];
}
// テストコード
function test() {
  console.log('歯磨き粉推奨システムのテスト');

  // ホワイトニング
  console.log('ホワイトニング');
  const result1 = getRecommendedToothpaste('ホワイトニング');
  console.assert(
    result1.name && result1.description && result1.price && result1.features,
    '商品情報の取得が正しくありません'
  );

  // 歯周病
  console.log('歯周病');
  const result2 = getRecommendedToothpaste('歯周病');
  console.assert(
    result2.name && result2.description && result2.price && result2.features,
    '商品情報の取得が正しくありません'
  );

  // 口臭
  console.log('口臭');
  const result3 = getRecommendedToothpaste('口臭');
  console.assert(
    result3.name && result3.description && result3.price && result3.features,
    '商品情報の取得が正しくありません'
  );

 console.log('歯磨き粉推奨システムのテスト終了');
}

test();
