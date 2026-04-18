const translations = {
    ru: {
        titlePart1: "TCK",
        titlePart2: "Team",
        menuSostav: "Составы",
        menuMatches: "Матчи",
        menuSocial: "Соцсети",
        statWins: "Победы",
        statLosses: "Поражения",
        statMatches: "Матчи",
        runningText: "Добро пожаловать на официальный сайт TCK Team! Следите за новостями в соцсетях.",
        sostavTitle: "Состав команды",
        cap: "(Капитан)",
        backBtn: "← Назад на главную",
        followTitle: "ПОДПИСЫВАЙТЕСЬ",
        platformLabel: "Платформа",
        twitchLabel: "Твич",
        ytLabel: "Ютуб",
        dsLabel: "Дискорд",
        ttLabel: "ТикТок",
        player_smert_info: "Один из основателей Tck Team. Профессиональный игрок.",
        player_2_info: "Брат основателя. Скиловый игрок.",
        chell_2_info: "Тоже создатель TCK Team. Гл. менеджер.",
        chell_1_info: "Сделал сайт и играет в кс.",
        thankTitle: "Спасибо",
        chell_1_info: "Сделал сайт и играет в кс 2.",
        chell_2_info: "Тоже создатель TCK Team. Гл. менеджер.",
        menuthank:"Спасибо за помощь"
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
        player_2_info: "The founder's brother. A skilled player.",
        chell_1_info: "Made a website and plays CS 2.",
        chell_2_info: "Also creator of TCK Team. Head Manager.",
        thankTitle: "Thank",
        chell_1_info: "Made a website and plays CS 2.",
        chell_2_info: "Also the creator of TCK Team. Chief manager.",
        menuthank:"Thanks for help"
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
        player_2_info: "Брат засновника. Скиловий гравець.",
        chell_1_info: "Зробив сайт та грає в кс 2.",
        chell_2_info: "Теж створив TCK Team. Гол. менеджер.",
        thankTitle: "Дякую",
        chell_1_info: "Зробив сайт та грає в кс 2.",
        chell_2_info: "Теж творець TCK Team. Гол. менеджер.",
        menuthank:"Дякую за допомогу"
    }
};

function getTranslation(key) {
    const lang = localStorage.getItem('preferredLang') || 'en';
    return translations[lang] ? translations[lang][key] || key : key;
}

function updateLanguage() {
    const lang = localStorage.getItem('preferredLang') || 'en';
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    const marquee = document.querySelector('marquee[data-lang]');
    if (marquee) {
        const key = marquee.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            marquee.innerText = translations[lang][key];
        }
    }
}

document.addEventListener('DOMContentLoaded', updateLanguage);
