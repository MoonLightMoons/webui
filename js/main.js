// 导航栏响应式功能

const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// 轮播图功能
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
}

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
}

// 自动轮播
let slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// 鼠标悬停时暂停轮播
const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});

// 环保资讯详情数据
const newsDetails = {
    'world-environment-day': {
        title: '2025世界环境日主题发布',
        date: '2025-06-05',
        content: `<p>联合国环境规划署近日宣布，2025年世界环境日主题为"塑料污染治理：从源头到海洋"。</p>
        <p>今年的环境日将聚焦塑料污染全链条治理，呼吁各国政府、企业和公众采取联合行动：</p>
        <ul>
            <li>减少一次性塑料产品生产和使用</li>
            <li>完善塑料废弃物回收体系</li>
            <li>开发可替代材料和环保包装</li>
            <li>加强国际合作应对塑料污染跨境转移</li>
        </ul>
        <p>据统计，全球每年生产超过4亿吨塑料，其中约800万吨进入海洋，对海洋生态系统造成严重威胁。</p>`
    },
    'local-waste-rule': {
        title: '本地垃圾分类新规实施',
        date: '2025-05-20',
        content: `<p>本市垃圾分类管理办公室宣布，新版《城市生活垃圾分类管理办法》将于下月正式实施。</p>
        <p>新规主要变化包括：</p>
        <ul>
            <li>增加"电子废弃物"单独分类要求</li>
            <li>调整投放时间，实行"定时定点"投放制度</li>
            <li>建立居民垃圾分类信用积分体系</li>
            <li>扩大分类覆盖范围至所有住宅小区</li>
        </ul>
        <p>为配合新规实施，全市将新增300个智能分类投放点，并开展为期一个月的垃圾分类宣传周活动。</p>`
    }
};

// 打开新闻模态框函数
function openNewsModal(newsId) {
    const modal = document.getElementById('news-modal');
    const modalTitle = document.getElementById('news-modal-title');
    const modalDate = document.getElementById('news-modal-date');
    const modalContent = document.getElementById('news-modal-content');

    // 设置模态框内容
    modalTitle.textContent = newsDetails[newsId].title;
    modalDate.textContent = newsDetails[newsId].date;
    modalContent.innerHTML = newsDetails[newsId].content;

    // 显示模态框
    modal.style.display = 'block';
}

// 关闭新闻模态框函数
function closeNewsModal() {
    const modal = document.getElementById('news-modal');
    modal.style.display = 'none';
}

// 点击新闻模态框外部关闭
window.addEventListener('click', function (event) {
    const modal = document.getElementById('news-modal');
    if (event.target == modal) {
        closeNewsModal();
    }
});

// 垃圾分类详情数据
var garbageDetails = {
    'recyclable': {
        title: '可回收物',
        content: `<p>可回收物是指适宜回收利用和资源化利用的生活废弃物，主要包括以下几类：</p>
        <ul>
            <li><strong>废纸</strong>：报纸、期刊、图书、各种包装纸等（污染严重的纸除外）</li>
            <li><strong>塑料</strong>：各种塑料袋、塑料泡沫、塑料包装、一次性塑料餐盒餐具、硬塑料、塑料牙刷、塑料杯子、矿泉水瓶等</li>
            <li><strong>玻璃</strong>：玻璃瓶和碎玻璃片、镜子、灯泡、暖瓶等</li>
            <li><strong>金属</strong>：易拉罐、铁皮罐头盒、牙膏皮等</li>
            <li><strong>布料</strong>：废弃衣服、桌布、洗脸巾、书包、鞋等</li>
        </ul>
        <p>投放提示：轻投轻放，清洁干燥，避免污染；废纸尽量平整；立体包装物请清空内容物，清洁后压扁投放；有尖锐边角的，应包裹后投放。`
    },
    'harmful': {
        title: '有害垃圾',
        content: `<p>有害垃圾是指对人体健康或者自然环境造成直接或者潜在危害的生活废弃物，主要包括以下几类：</p>
        <ul>
            <li><strong>电池</strong>：充电电池、纽扣电池、蓄电池等</li>
            <li><strong>灯管</strong>：荧光灯管、LED灯管等</li>
            <li><strong>家用化学品</strong>：杀虫剂、除草剂、清洁剂、化妆品等</li>
            <li><strong>温度计</strong>：水银温度计、血压计等</li>
            <li><strong>药品</strong>：过期药品、药品包装等</li>
        </ul>
        <p>投放提示：投放时请注意轻放；易破损的请连带包装或包裹后投放；如易挥发，请密封后投放。`
    },
    'kitchen': {
        title: '厨余垃圾',
        content: `<p>厨余垃圾是指居民日常生活及食品加工、饮食服务、单位供餐等活动中产生的垃圾，主要包括以下几类：</p>
        <ul>
            <li><strong>剩菜剩饭</strong>：米饭、面条、馒头、粥、肉块、骨头等</li>
            <li><strong>蔬菜水果</strong>：菜叶、果皮、果核、根茎等</li>
            <li><strong>食品废料</strong>：过期食品、面包、糕点、饼干等</li>
            <li><strong>其他厨余</strong>：茶叶渣、咖啡渣、中药渣等</li>
        </ul>
        <p>投放提示：厨余垃圾应从产生时就与其他品种垃圾分开收集，投放前应尽量沥干水分；有包装物的厨余垃圾应将包装物去除后分类投放，包装物应投放到对应的可回收物或其他垃圾收集容器。`
    },
    'others': {
        title: '其他垃圾',
        content: `<p>其他垃圾是指除可回收物、有害垃圾、厨余垃圾以外的其他生活废弃物，主要包括以下几类：</p>
        <ul>
            <li><strong>砖瓦陶瓷</strong>：瓷砖、陶瓷碎片、花盆等</li>
            <li><strong>渣土灰尘</strong>：灰土、渣土、水泥块等</li>
            <li><strong>卫生用品</strong>：卫生纸、餐巾纸、湿巾、纸尿裤等</li>
            <li><strong>其他物品</strong>：烟蒂、破碎花盆、一次性餐具等难以回收的废弃物</li>
        </ul>
        <p>投放提示：其他垃圾应投入指定的垃圾桶内；对于难以辨识类别的生活垃圾，可投入其他垃圾收集容器。`
    }
};

// 显示垃圾分类模态框
function showModal(type) {
    const modal = document.getElementById('garbageModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    // 设置模态框内容
    modalTitle.textContent = garbageDetails[type].title;
    modalBody.innerHTML = garbageDetails[type].content;

    // 显示模态框
    modal.style.display = 'block';
}

// 关闭垃圾分类模态框
function closeGarbageModal() {
    const modal = document.getElementById('garbageModal');
    modal.style.display = 'none';
}

// 点击关闭按钮关闭模态框
document.querySelector('.close-btn').addEventListener('click', closeGarbageModal);

// 点击模态框外部关闭
window.addEventListener('click', function (event) {
    const modal = document.getElementById('garbageModal');
    if (event.target == modal) {
        closeGarbageModal();
    }
});

// 环保行动详情数据
const actionDetails = {
    'water-saving': {
        title: '节约用水',
        content: `<p>水是生命之源，节约用水是每个人的责任。以下是一些实用的节水技巧：</p>
        <ul>
            <li>缩短淋浴时间至5分钟以内</li>
            <li>使用节水型水龙头和淋浴喷头</li>
            <li>收集雨水用于浇灌植物</li>
            <li>修复漏水的水龙头和管道</li>
            <li>洗衣机满载时才使用</li>
        </ul>
        <p>一个滴水的水龙头一天可浪费约20升水，及时修复能有效节约水资源。</p>`
    },
    'reduce-plastic': {
        title: '减少塑料使用',
        content: `<p>塑料污染已成为全球环境面临的重大挑战。我们可以这样做：</p>
        <ul>
            <li>携带可重复使用的购物袋</li>
            <li>使用玻璃或不锈钢水杯代替塑料瓶</li>
            <li>拒绝使用一次性塑料餐具</li>
            <li>选择无包装或可生物降解包装的产品</li>
            <li>正确回收塑料垃圾</li>
        </ul>
        <p>据统计，全球每年使用超过5000亿个塑料袋，平均使用时间不到25分钟，却需要数百年才能降解。</p>`
    },
    'save-energy': {
        title: '节能用电',
        content: `<p>节约用电不仅能减少电费支出，还能降低碳排放。以下是一些节能建议：</p>
        <ul>
            <li>离开房间时随手关灯</li>
            <li>使用节能灯具，如LED灯</li>
            <li>合理设置空调温度（夏季不低于26℃，冬季不高于20℃）</li>
            <li>电器不用时拔掉插头，减少待机能耗</li>
            <li>选择能效等级高的家电产品</li>
        </ul>
        <p>一台待机状态的电视每年约消耗100度电，及时断电可显著节约能源。</p>`
    }
};

// 打开模态框函数
function openModal(actionId) {
    const modal = document.getElementById('action-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    // 设置模态框内容
    modalTitle.textContent = actionDetails[actionId].title;
    modalContent.innerHTML = actionDetails[actionId].content;

    // 显示模态框
    modal.style.display = 'block';
}

// 关闭模态框函数
function closeModal() {
    const modal = document.getElementById('action-modal');
    modal.style.display = 'none';
}

// 点击模态框外部关闭
window.onclick = function (event) {
    const modal = document.getElementById('action-modal');
    if (event.target == modal) {
        closeModal();
    }
};
