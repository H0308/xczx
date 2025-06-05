// 导航高亮
document.addEventListener('DOMContentLoaded', function() {
    // 导航链接点击高亮
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.nav a.active').classList.remove('active');
            this.classList.add('active');
        });
    });
    
    // 标签页切换高亮
    const tabLinks = document.querySelectorAll('.tab a');
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const parentTab = this.closest('.tab');
            parentTab.querySelector('.active').classList.remove('active');
            this.classList.add('active');
        });
    });
    
    // 兴趣标签高亮
    const interestItems = document.querySelectorAll('.interest li:not(:nth-child(even))');
    interestItems.forEach(item => {
        item.addEventListener('click', function() {
            document.querySelector('.interest li.active').classList.remove('active');
            this.classList.add('active');
        });
    });
    
    // 实现轮播图功能
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.carousel-btns span');
    let currentSlide = 0;
    
    // 假设我们有多个轮播图的情况
    // const images = ['banner1.png', 'banner2.png', 'banner3.png'];
    // let slideHTML = '';
    // images.forEach(image => {
    //     slideHTML += `<img src="images/${image}" alt="${image}">`;
    // });
    // slides.innerHTML = slideHTML;
    
    // 自动轮播
    function autoSlide() {
        currentSlide = (currentSlide + 1) % dots.length;
        updateSlide();
    }
    
    // 更新轮播图显示
    function updateSlide() {
        // 实际项目中应该通过改变slides的transform来显示不同图片
        // slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // 点击小圆点切换轮播图
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide();
            resetTimer();
        });
    });
    
    let slideTimer = setInterval(autoSlide, 3000);
    
    function resetTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(autoSlide, 3000);
    }
    
    // 继续学习按钮
    document.getElementById('continue-learning').addEventListener('click', function() {
        // 实际项目中可能需要从localStorage或API获取最后学习的课程
        alert('继续上次学习的课程');
    });
});
