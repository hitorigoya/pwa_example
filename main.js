let deferredPrompt;
const addBtn = document.querySelector('.pwa_install_btn');

window.addEventListener('beforeinstallprompt', (e) => {
    // Chrome 67以前のバージョンでプロンプトが自動的に表示されないようにする
    e.preventDefault();
    // 後で発生させることができるように、イベントを隠しておく。
    deferredPrompt = e;
    // ホーム画面に内側へ追加できることをユーザーに通知する UI の更新
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', (e) => {
        // プロンプトを表示
        deferredPrompt.prompt();
        // ユーザーがプロンプトに応答するのを待つ
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('ユーザーが A2HS プロンプトを受け入れました。');
            } else {
                console.log('ユーザーは A2HS のプロンプトを拒否しました。');
            }
            deferredPrompt = null;
        });
    });
});
