document.addEventListener('DOMContentLoaded', () => {
    // 1. ВСЕГДА применяем сохранённую тему при загрузке ЛЮБОЙ страницы
    const saved = localStorage.getItem('user-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);

    // 2. Работаем со списком ТОЛЬКО если он есть на странице (profile.html)
    const select = document.getElementById('theme-select');
    if (select) {
        select.value = saved; // Синхронизируем положение ползунка с сохранённой темой
        
        select.addEventListener('change', (e) => {
            const theme = e.target.value;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('user-theme', theme);
        });
    }
});