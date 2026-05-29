// 使用版本号防止缓存
const VERSION = new Date().getTime(); 

const ROLES = {
    beibei: { name: "北北", avatar: "images/beibei.jpg" },
    nannan: { name: "南南", avatar: "images/nannan.jpg" },
    mingming: { name: "明明", avatar: "images/mingming.jpg" },
    mama: { name: "妈妈", avatar: "images/mama.jpg" }, 
    baba: { name: "爸爸", avatar: "images/baba.jpg" }, 
    luren: { name: "路人", avatar: "images/luren.jpg" }
};

// 修复：全面纠正了由于解构覆盖导致的所有角色头像全变北北的 BUG，严格匹配点读逻辑
const rawData = [
   { id: "1", side: 'right', ...ROLES.nannan, zh: "你去哪儿？", th: "คุณจะไปไหน" },
    { id: "2", side: 'left', ...ROLES.beibei, zh: "我去医院。", th: "ฉันจะไปโรงพยาบาล" },
    { id: "3", side: 'left', ...ROLES.beibei, zh: "你们去哪儿？", th: "พวกคุณจะไปไหน" },
    { id: "4", side: 'right', ...ROLES.nannan, zh: "我们去学校。", th: "พวกเราจะไปโรงเรียน" },
    { id: "5", side: 'right', ...ROLES.nannan, zh: "今天几月几号？", th: "วันนี้วันที่เท่าไหร่" },
    { id: "6", side: 'left', ...ROLES.beibei, zh: "今天十一月二十九号？", th: "วันนี้วันที่ 29 พฤศจิกายน" },
    { id: "7", side: 'right', ...ROLES.nannan, zh: "今天星期几？", th: "วันนี้วันอะไร" },
    { id: "8", side: 'left', ...ROLES.beibei, zh: "今天星期二。", th: "วันนี้วันอังคาร" },
    { id: "9", side: 'right', ...ROLES.nannan, zh: "现在几点？", th: "ตอนนี้กี่โมง" },
    { id: "10", side: 'left', ...ROLES.beibei, zh: "现在七点。", th: "ตอนนี้ 7โมง" },
    { id: "11", side: 'left', ...ROLES.beibei, zh: "现在几点？", th: "ตอนนี้กี่โมง" },
    { id: "12", side: 'right', ...ROLES.nannan, zh: "现​在四点四十五分。", th: "ตอนนี้ 4:45" },
    { id: "13", side: 'left', ...ROLES.beibei, zh: "你会游泳吗？", th: "คุณว่ายน้ำเป็นไหม" },
    { id: "14", side: 'right', ...ROLES.nannan, zh: "我不会游泳。", th: "ฉันว่ายน้ำไม่เป็น" },
    { id: "15", side: 'right', ...ROLES.nannan, zh: "你会打篮球吗？", th: "คุณเล่นบาสเกตบอลเป็นไหม" },
    { id: "16", side: 'left', ...ROLES.beibei, zh: "我会打篮球。", th: "ฉันเล่นบาสเกตบอลเป็น" },
    { id: "17", side: 'left', ...ROLES.beibei, zh: "你要买什么？", th: "คุณจะซื้ออะไร" },
    { id: "18", side: 'right', ...ROLES.nannan, zh: "我要买本子。", th: "ฉันจะซื้อสมุด" },
    { id: "19", side: 'right', ...ROLES.nannan, zh: "多少钱？", th: "เท่าไหร่" },
    { id: "20", side: 'left', ...ROLES.beibei, zh: "两块。", th: "2 เหรียญ " },
    { id: "21", side: 'left', ...ROLES.mama, zh: "你想吃什么？", th: "คุณอยากกินอะไร" },
    { id: "22", side: 'right', ...ROLES.nannan, zh: "我想吃汉堡包", th: "ฉันอยากกินแฮมเบอร์เกอร์" },
    { id: "23", side: 'left', ...ROLES.mama, zh: "你想喝什么？", th: "คุณอยากดื่มอะไร" },
    { id: "24", side: 'left', ...ROLES.beibei, zh: "我想喝牛奶。", th: "ฉันอยากดื่มนม" },
    { id: "25", side: 'left', ...ROLES.beibei, zh: "你在干什么？", th: "คุณกำลังทำอะไร" },
    { id: "26", side: 'right', ...ROLES.nannan, zh: "我在学习，", th: "ฉันกำลังเรียน" },
    { id: "27", side: 'left', ...ROLES.beibei, zh: "你在学习什么？", th: "คุณกำลังเรียนอะไร" },
    { id: "28", side: 'right', ...ROLES.nannan, zh: "我在学习汉语。", th: "ฉันกำลังเรียนภาษาจีน" },
    { id: "29", side: 'left', ...ROLES.beibei, zh: "我比你高。", th: "ฉันสูงกว่าคุณ" },
    { id: "30", side: 'right', ...ROLES.nannan, zh: "我比你矮。", th: "ฉันเตี้ยกว่าคุณ" },
    { id: "31", side: 'left', ...ROLES.beibei, zh: "我比你大。", th: "ฉันโตกว่าคุณ" },
    { id: "32", side: 'right', ...ROLES.nannan, zh: "我比你小。", th: "ฉันเด็กกว่าคุณ" },
    { id: "33", side: 'left', ...ROLES.mingming, zh: "喂，南南在家吗？", th: "ฮัลโฮล หนานหนานอยู่บ้านไหม" },
    { id: "34", side: 'left', ...ROLES.mama, zh: "她在家，", th: "เขาอยู่บ้าน" },
    { id: "34-2", side: 'left', ...ROLES.mama, zh: "你是谁？", th: "คุณเป็นใคร" },
    { id: "35", side: 'left', ...ROLES.mingming, zh: "我是她的朋友明明。", th: "ฉันเป็นเพื่อนของเขา ชื่อหมิงหมิง" },
    { id: "36", side: 'left', ...ROLES.mama, zh: "等一下。", th: "รอสักครู่" },
    { id: "37", side: 'left', ...ROLES.beibei, zh: "今天天气怎么样？", th: "วันนี้อากาศเป็นอย่างไร" },
    { id: "38", side: 'right', ...ROLES.nannan, zh: "今天天气很好，", th: "วันนี้อากาศดี" },
    { id: "38-2", side: 'right', ...ROLES.nannan, zh: "今天晴天。", th: "วันนี้แดดออก" },
    { id: "39", side: 'left', ...ROLES.beibei, zh: "今天天气怎么样？", th: "วันนี้อากาศเป็นอย่างไร" },
    { id: "40", side: 'right', ...ROLES.nannan, zh: "今天天气不好，", th: "วันนี้อากาศไม่ดี" },
    { id: "40-2", side: 'right', ...ROLES.nannan, zh: "今天下雨。", th: "วันนี้ฝนตก" }
 ];

let learnedSentences = new Set(), isAudioPlaying = false, isChineseGlobal = false, totalCount = 0;
let userProfile = { name: "同学", avatar: "" };

const audioPlayer = new Audio();
const fxPlayer = new Audio(); 

const ui = {
    list: document.getElementById('list'),
    currentCount: document.getElementById('currentCount'),
    totalCount: document.getElementById('totalCount'),
    progress: document.getElementById('progressBar'),
    langWrapper: document.querySelector('.lang-wrapper'),
    langBtn: document.getElementById('langBtn'), 
};

const getSafeId = (id) => String(id).replace(/[.-]/g, '_');
const getSortVal = (id) => {
    // 如果包含连字符（如 3-emoji1 或 2-2），只取第一个分段（如 "3" 或 "2"）来转成主数字
    let mainId = String(id).split('-')[0]; 
    let mainNum = isNaN(mainId) ? 999 : parseFloat(mainId);

    // 如果是类似 2-2 这样的纯数字子句，我们给它加上小数值（如 2 + 0.2 = 2.2）用于精确排序
    let subId = String(id).split('-')[1];
    if (subId && !isNaN(subId)) {
        mainNum += parseFloat(subId) * 0.1;
    } else if (subId) {
        // 如果后面带的是字母表情包（如 3-emoji1），给它加一个极其微小的偏移量（如 0.01）
        // 确保它能精准卡在第 3 句后面，且排在第 3-2 句（权重 3.2）的前面
        mainNum += 0.01; 
    }
    
    return mainNum;
};

async function init() {
    try {
        await liff.init({ liffId: "2009077149-eCbn1Urh" }); 
        if (!liff.isLoggedIn() && liff.isInClient()) {
            liff.login();
        } else {
            const profile = await liff.getProfile();
            userProfile.name = profile.displayName;
            userProfile.avatar = profile.pictureUrl;
        }
    } catch (err) { console.error("LIFF 启动失败:", err); }

    document.body.addEventListener('touchstart', unlockAudio, { once: true });

    rawData.sort((a, b) => getSortVal(a.id) - getSortVal(b.id));
    totalCount = rawData.filter(s => !/[a-zA-Z]/.test(String(s.id).replace('-',''))).length;
    ui.totalCount.textContent = totalCount;
    renderList();
    ui.langWrapper.onclick = toggleGlobalLanguage;
}

function unlockAudio() {
    audioPlayer.play().catch(()=>{}); audioPlayer.pause();
    fxPlayer.play().catch(()=>{}); fxPlayer.pause();
}

function renderList() {
    ui.list.innerHTML = "";
    rawData.forEach((s, index) => {
        const row = document.createElement('div');
        const isImage = /[a-zA-Z]/.test(String(s.id).replace('-','')) && !s.zh;
        const safeId = getSafeId(s.id);
        row.className = `message-row ${s.side}`;
        row.style.animationDelay = `${index * 0.05}s`;
        
        row.innerHTML = isImage ? `
            <div class="user-meta"><div class="avatar" style="background-image: url('${s.avatar}')"></div><div class="nickname">${s.name}</div></div>
            <div class="bubble-and-status"><div class="bubble image-bubble"><img src="${s.content || 'images/'+s.id+'.jpg'}?v=${VERSION}" loading="lazy" alt="img"></div></div>
        ` : `
            <div class="user-meta"><div class="avatar" style="background-image: url('${s.avatar}')"></div><div class="nickname">${s.name}</div></div>
            <div class="bubble-and-status">
                <div class="bubble" id="bubble-${safeId}">
                    <div class="zh-text" style="display: ${isChineseGlobal ? 'block' : 'none'}">${s.zh}</div>
                    <div class="th-text" style="display: ${isChineseGlobal ? 'none' : 'block'}">${s.th}</div>
                </div>
                <div class="trans-btn" id="trans-${safeId}">แปล</div>
                <div class="status-mark">已读 ✔</div>
            </div>
        `;

        if (!isImage) {
            row.querySelector(`#bubble-${safeId}`).onclick = () => handlePlay(s, row);
            row.querySelector(`#trans-${safeId}`).onclick = (e) => { 
                e.stopPropagation(); 
                toggleSingleLanguage(s.id); 
            };
        }
        ui.list.appendChild(row);
    });
}

async function playFX(file) {
    fxPlayer.src = `audio/${file}?v=${VERSION}`;
    fxPlayer.load();
    try { await fxPlayer.play(); } catch(e) {}
}

function handlePlay(s, element) {
    if (isAudioPlaying) return;
    isAudioPlaying = true;
    document.body.classList.add('locked-mode');
    element.classList.add('playing-now');

    // 优化：对连字符 ID 的 mp3 文件地址加一层特殊处理，确保 URL 安全加载
    audioPlayer.src = `audio/${encodeURIComponent(s.id)}.mp3?v=${VERSION}`;
    audioPlayer.load();
    
    audioPlayer.onended = () => {
        isAudioPlaying = false;
        document.body.classList.remove('locked-mode');
        element.classList.remove('playing-now');
        if (!learnedSentences.has(s.id)) {
            learnedSentences.add(s.id);
            element.classList.add('has-learned');
            updateScore(true); 
        } else {
            playFX('yinxiao-bubble.mp3');
        }
    };

    audioPlayer.play().catch(error => {
        console.error("播放失败:", error);
        audioPlayer.onended();
    });
}

function toggleSingleLanguage(id) {
    const bubble = document.getElementById(`bubble-${getSafeId(id)}`);
    const zh = bubble.querySelector('.zh-text'), th = bubble.querySelector('.th-text');
    const isZh = zh.style.display === 'block';
    zh.style.display = isZh ? 'none' : 'block';
    th.style.display = isZh ? 'block' : 'none';
}

function toggleGlobalLanguage() {
    if (isAudioPlaying) return; 
    
    isChineseGlobal = !isChineseGlobal;
    
    if (ui.langBtn) {
        ui.langBtn.classList.toggle('chinese', isChineseGlobal);
    }
    
    // 修复：强制统一所有单句的显示状态，消除此前由于单句翻译按钮导致的“局部反向”显示错误
    document.querySelectorAll('.zh-text').forEach(el => el.style.display = isChineseGlobal ? 'block' : 'none');
    document.querySelectorAll('.th-text').forEach(el => el.style.display = isChineseGlobal ? 'none' : 'block');
} 

function updateScore(playDing) {
    const currentScore = learnedSentences.size;
    ui.currentCount.textContent = currentScore;
    ui.progress.style.width = `${(currentScore / totalCount) * 100}%`;
    if (playDing) { playFX('yinxiao-ding.mp3'); }
    if (currentScore >= totalCount && totalCount > 0) {
        setTimeout(showCongrats, 800);
    }
}

function showCongrats() {
    playFX('yinxiao-win.mp3');
    const now = new Date();
    const timeStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    document.getElementById('displayTime').textContent = timeStr;
    document.getElementById('userName').textContent = userProfile.name;
    document.getElementById('userImg').src = userProfile.avatar || 'images/default-avatar.jpg';
    document.getElementById('congrats-overlay').style.display = 'flex';
}
// ==========================================
// 初始化 Supabase 客戶端 (從 3.html 提取)
// ==========================================
const supabaseUrl = 'https://tpxvlpkyxzuqcnhkuaos.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRweHZscGt5eHp1cWNuaGt1YW9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMzI4NjcsImV4cCI6MjA4NzYwODg2N30.ZKZuZ1tazEVInlmU3IBQ_1DuRCvUedqpyqSRlbOw3Bk';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// ==========================================
// 點讀祝賀頁面 "X" 觸發的自動化動作（已加入 <title> 備援邏輯）
// ==========================================
async function handleUploadAndClose() {
    const name = userProfile.name || "LINE同学";
    
    // 第一道防線：優先抓取 h1 標籤內容
    const lessonElement = document.getElementById('lessonTitle');
    let lesson = lessonElement ? lessonElement.innerText.trim() : ""; 

    // 第二道防線：若找不到 h1，則改抓取網頁的 <title> 欄位，若連 title 都沒有，才走 "未知课程" 備用字串
    if (!lesson) {
        lesson = document.title ? document.title.trim() : "未知课程";
    }

    try {
        // 動作 1：默默同步數據到雲端
        const { error } = await supabaseClient
            .from('learning_logs')
            .insert([{ 
                student_name: name,
                lesson_id: lesson, 
                created_at: new Date()
            }]);

        if (error) {
            console.error("Supabase 儲存失敗:", error.message);
        } else {
            console.log(`數據已成功遞交至 Supabase！課程：${lesson}`);
        }
    } catch (err) {
        console.error("執行上傳時發生異常:", err);
    } finally {
        // 動作 2：不論網路成敗，必定關閉 LINE 視窗
        if (typeof liff !== 'undefined' && liff.closeWindow) {
            liff.closeWindow();
        }
    }
}

window.onload = init;