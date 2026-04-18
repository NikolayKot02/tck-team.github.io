const translations = {
    ru: {
        // Главная
        titlePart1: "TCK",
        titlePart2: "Team",
        menuSostav: "Составы",
        menuMatches: "Матчи",
        menuSocial: "Соцсети",
        
        // Статистика (Верхняя панель)
        statWins: "Победы",
        statLosses: "Поражения",
        statMatches: "Матчи",
        
        // Бегущая строка
        runningText: "Добро пожаловать на официальный сайт TCK Team! Следите за новостями в соцсетях.",

        // Страница состава
        sostavTitle: "Состав команды",
        cap: "(Капитан)",
        backBtn: "← Назад на главную",

        // Страница соцсетей
        followTitle: "ПОДПИСЫВАЙТЕСЬ",
        platformLabel: "Платформа",
        twitchLabel: "Твич",
        ytLabel: "Ютуб",
        dsLabel: "Дискорд",
        ttLabel: "ТикТок",

        // Описания игроков
        player_smert_info: "Один из основателей Tck Team. Профессиональный игрок.",
        player_2_info: "Брат основателя. Скиловый игрок."
    },
    en: {
        titlePart1: "TCK",
        titlePart2: "Team",
        menuSostav: "Rosters",
        menuMatches: "Matches",
        menuSocial: "Social",

        statWins: "Wins",
        statLosses: "Losses",
        statMatches: "Matches",

        runningText: "Welcome to the official TCK Team website! Follow us on social for updates.",

        sostavTitle: "Team Roster",
        cap: "(Captain)",
        backBtn: "← Back to Main",

        followTitle: "FOLLOW US",
        platformLabel: "Platform",
        twitchLabel: "Twitch",
        ytLabel: "YouTube",
        dsLabel: "Discord",
        ttLabel: "TikTok",

        player_smert_info: "One of the founders of Tck Team. Professional player.",
        player_2_info: "The founder's brother. A skilled player."
    },
    ua: {
        titlePart1: "TCK",
        titlePart2: "Team",
        menuSostav: "Склади",
        menuMatches: "Матчі",
        menuSocial: "Соцмережі",

        statWins: "Перемоги",
        statLosses: "Поразки",
        statMatches: "Матчі",

        runningText: "Ласкаво просимо до офіційного сайту TCK Team! Слідкуйте за новинами у соцмережах.",

        sostavTitle: "Склад команди",
        cap: "(Капітан)",
        backBtn: "← Назад на головну",

        followTitle: "ПІДПИСУЙТЕСЬ",
        platformLabel: "Платформа",
        twitchLabel: "Твіч",
        ytLabel: "Ютуб",
        dsLabel: "Діскорд",
        ttLabel: "ТікТок",

        player_smert_info: "Один із засновників Tck Team. Професійний гравець.",
        player_2_info: "Брат засновника. Скиловий гравець."
    }
};

// Функция для получения перевода (для модалок)
function getTranslation(key) {
    const lang = localStorage.getItem('preferredLang') || 'en';
    return translations[lang] ? translations[lang][key] || key : key;
}

// Функция смены языка (для кнопок EN/RU/UA)
function setLanguage(newLang) {
    localStorage.setItem('preferredLang', newLang);
    updateLanguage();
}

// Обновление всех текстов на странице
function updateLanguage() {
    const lang = localStorage.getItem('preferredLang') || 'en';
    
    // Переводим все элементы с data-lang
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // Специальная обработка для бегущей строки (marquee), если она есть
    const marquee = document.querySelector('marquee[data-lang]');
    if (marquee) {
        const key = marquee.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            marquee.innerText = translations[lang][key];
        }
    }
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', updateLanguage);
