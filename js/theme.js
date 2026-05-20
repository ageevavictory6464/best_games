document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('user-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    const select = document.getElementById('theme-select');
    if (select) {
        select.value = saved;
        select.addEventListener('change', (e) => {
            const theme = e.target.value;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('user-theme', theme);
            swapIcons();
        });
    }
    swapIcons();
});

function swapIcons() {
    const tema = document.documentElement.getAttribute('data-theme') || 'dark';
    const isLight = tema === 'light' || tema === 'white';
    
    document.querySelectorAll('.icon-search').forEach(img => {
        img.src = isLight ? './images/search-for-light.png' : './images/search.svg';
    });
    
    const leftArrow = document.querySelector('.icon-arrow-left');
    const rightArrow = document.querySelector('.icon-arrow-right');
    if (leftArrow) leftArrow.src = isLight ? './images/left-for-light.png' : './images/left.png';
    if (rightArrow) rightArrow.src = isLight ? './images/right-for-light.png' : './images/right.png';
    
    const company1 = document.querySelector('.icon-company1');
    const company2 = document.querySelector('.icon-company2');
    const company3 = document.querySelector('.icon-company3');
    const company4 = document.querySelector('.icon-company4');
    
    if (company1) company1.src = isLight ? './images/company1-for-light.png' : './images/company1.png';
    if (company2) company2.src = isLight ? './images/company2-for-light.png' : './images/company2.png';
    if (company3) company3.src = isLight ? './images/company3-for-light.png' : './images/company3.png';
    if (company4) company4.src = isLight ? './images/company4-for-light.png' : './images/company4.png';
}