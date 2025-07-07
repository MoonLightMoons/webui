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
