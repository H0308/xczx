// 轮播图功能实现
document.addEventListener('DOMContentLoaded', function() {
    // 轮播图数据
    const banners = [
        'img/banner1.png',
        'img/banner2.png',
        'img/banner3.png'
    ];
    
    const slidesContainer = document.querySelector('.slides');
    const carouselBtns = document.querySelectorAll('.carousel-btns span');
    const carousel = document.querySelector('.carousel');
    
    // 初始化轮播图
    function initCarousel() {
        // 动态创建轮播图
        banners.forEach((banner, index) => {
            const slide = document.createElement('div');
            slide.className = `slide ${index === 0 ? 'active' : ''}`;
            
            const img = document.createElement('img');
            img.src = banner;
            img.alt = `轮播图${index + 1}`;
            
            slide.appendChild(img);
            slidesContainer.appendChild(slide);
        });
    }
    
    // 轮播到指定索引的图片
    function showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const total = slides.length;
        
        // 处理索引边界情况
        if (index >= total) index = 0;
        if (index < 0) index = total - 1;
        
        // 移除所有active类
        slides.forEach(slide => slide.classList.remove('active'));
        carouselBtns.forEach(btn => btn.classList.remove('active'));
        
        // 添加active类到当前索引
        slides[index].classList.add('active');
        carouselBtns[index].classList.add('active');
        
        // 更新当前索引
        currentIndex = index;
    }
    
    // 自动轮播
    let currentIndex = 0;
    let intervalId;
    
    function startAutoPlay() {
        intervalId = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 3000); // 每3秒切换一次
    }
    
    function stopAutoPlay() {
        clearInterval(intervalId);
    }
    
    // 点击指示器切换轮播图
    carouselBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // 鼠标悬停暂停轮播，移出继续轮播
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // 初始化
    initCarousel();
    startAutoPlay();
    
    // 固定导航栏滚动监听功能
    const sections = document.querySelectorAll('#banner, #recommend, #programming, #data-analysis, #machine-learning, #frontend-development');
    const navLinks = document.querySelectorAll('.fixed-sidebar a');
    
    // 滚动监听函数
    function scrollSpy() {
        const scrollPosition = window.scrollY;
        
        // 找出当前滚动位置所在的区域
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // 偏移量，提前高亮
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // 移除所有导航链接的活动状态
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // 为当前区域的导航链接添加活动状态
                document.querySelector(`.fixed-sidebar a[href="#${sectionId}"]`).classList.add('active');
            }
        });
    }
    
    // 平滑滚动到锚点
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // 偏移量，避免被固定头部遮挡
                behavior: 'smooth'
            });
        });
    });
    
    // 监听滚动事件
    window.addEventListener('scroll', scrollSpy);
    
    // 初始调用一次，确保页面加载时也能正确高亮
    scrollSpy();
});
