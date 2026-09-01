/**
 * RAVEN ARCHIVE — Frontispiece Auto-loader
 * imagesフォルダに画像を置くだけで扉絵が自動表示されます。
 *
 * 対応ファイル名（images/フォルダに置く）:
 *   veskenport.jpg   → RA-001
 *   grauhallen.jpg   → RA-002
 *   talgrim.jpg      → RA-003
 *   askveld.jpg      → RA-004
 *   ravnekrypt.jpg   → RA-005
 *   rf001.jpg        → RF-001 魔女の夜
 *   rf002.jpg        → RF-002 死者が戻る夜
 *   rf003.jpg        → RF-003 黒い帆船の夜
 *   rf004.jpg        → RF-004 水が記憶を持つ日
 *   rf005.jpg        → RF-005 記憶が最も高値で売れる日
 *
 * jpg / png / webp すべて対応。拡張子が違う場合は下の IMAGE_MAP を編集。
 */

const IMAGE_MAP = {
  'veskenport.html' : 'images/veskenport.jpg',
  'grauhallen.html' : 'images/grauhallen.jpg',
  'talgrim.html'    : 'images/talgrim.jpg',
  'askveld.html'    : 'images/askveld.jpg',
  'ravnekrypt.html' : 'images/ravnekrypt.jpg',
  'rf001.html'      : 'images/rf001.jpg',
  'rf002.html'      : 'images/rf002.jpg',
  'rf003.html'      : 'images/rf003.jpg',
  'rf004.html'      : 'images/rf004.jpg',
  'rf005.html'      : 'images/rf005.jpg',
};

(function () {
  // 現在のページのファイル名を取得
  const filename = location.pathname.split('/').pop() || 'index.html';
  const imagePath = IMAGE_MAP[filename];

  if (!imagePath) return; // 対象外のページは何もしない

  const frame = document.querySelector('.frontispiece-frame');
  const placeholder = document.querySelector('.frontispiece-placeholder');

  if (!frame) return;

  // 画像を試しに読み込む
  const img = new Image();

  img.onload = function () {
    // 画像が存在した → プレースホルダーを消して画像を表示
    if (placeholder) placeholder.style.display = 'none';

    const el = document.createElement('img');
    el.src = imagePath;
    el.alt = filename.replace('.html', '');
    el.style.cssText = [
      'width:100%',
      'height:100%',
      'object-fit:cover',
      'object-position:center',
      'display:block',
      'opacity:0',
      'filter:sepia(0.25) brightness(0.82)',
      'transition:opacity 0.8s ease',
    ].join(';');

    // borderの内側の最前面に挿入
    frame.insertBefore(el, frame.firstChild);

    // フェードイン
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { el.style.opacity = '0.88'; });
    });
  };

  img.onerror = function () {
    // 画像が存在しない → プレースホルダーをそのまま表示（何もしない）
  };

  img.src = imagePath;
})();
