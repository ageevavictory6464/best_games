document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');
    const passInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm-password');
    const matchMsg = document.getElementById('match-message');
    const form = document.querySelector('.auth-form');

    // 1. Маска телефона +7(XXX)-XXX-XX-XX
    phoneInput.addEventListener('input', (e) => {
        let digits = e.target.value.replace(/\D/g, '');
        if (digits.startsWith('8')) digits = '7' + digits.slice(1);
        let formatted = '+7';
        if (digits.length > 1) formatted += '(' + digits.slice(1, 4);
        if (digits.length >= 4) formatted += ')-' + digits.slice(4, 7);
        if (digits.length >= 7) formatted += '-' + digits.slice(7, 9);
        if (digits.length >= 9) formatted += '-' + digits.slice(9, 11);
        e.target.value = formatted;
    });

    // 2. Проверка сложности пароля
    const checks = {
        length: v => v.length >= 8,
        upper: v => /[A-ZА-ЯЁ]/.test(v),
        lower: v => /[a-zа-яё]/.test(v),
        number: v => /[0-9]/.test(v),
        special: v => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(v)
    };

    passInput.addEventListener('input', () => {
        const val = passInput.value;
        document.querySelectorAll('.req-item').forEach(el => {
            const rule = checks[el.dataset.req];
            el.classList.toggle('valid', rule(val));
            el.classList.toggle('invalid', val.length > 0 && !rule(val));
        });
        checkMatch();
    });

    // 3. Проверка совпадения паролей
    confirmInput.addEventListener('input', checkMatch);

    function checkMatch() {
        const p1 = passInput.value;
        const p2 = confirmInput.value;
        if (!p2) { matchMsg.textContent = ''; matchMsg.className = 'match-message'; return; }
        if (p1 === p2) {
            matchMsg.textContent = '✓ Пароли совпадают';
            matchMsg.className = 'match-message success';
        } else {
            matchMsg.textContent = '✗ Пароли не совпадают';
            matchMsg.className = 'match-message error';
        }
    }

    // 4. Финальная проверка перед отправкой
    form.addEventListener('submit', (e) => {
        if (passInput.value !== confirmInput.value) {
            e.preventDefault();
            confirmInput.focus();
            return;
        }
        if (phoneInput.value.replace(/\D/g, '').length < 11) {
            e.preventDefault();
            phoneInput.focus();
            return;
        }
    });
});
