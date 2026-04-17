const translations = {
    ru: {
        titlePart1: "TCK",
        titlePart2: "Team",
        menuSostav: "Составы",
        menuMatches: "Матчи",
        menuSocial: "Соцсети",
        sostavTitle: "Состав команды",
        cap: "(Капитан)",
        backBtn: "← Назад на главную",
        followTitle: "ПОДПИСЫВАЙТЕСЬ",
        platformLabel: "Платформа",
        instaLabel: "Инстаграм",
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
        sostavTitle: "Team Roster",
        cap: "(Captain)",
        backBtn: "← Back to Main",
        followTitle: "FOLLOW US",
        platformLabel: "Platform",
        instaLabel: "Instagram",
        ytLabel: "YouTube",
        dsLabel: "Discord",
        ttLabel: "TikTok",
        // Player descriptions
        player_smert_info: "One of the founders of Tck Team. Professional player.",
        player_2_info: "The founder's brother. A skilled player."
    },
    ua: {
        titlePart1: "TCK",
        titlePart2: "Team",
        menuSostav: "Склади",
        menuMatches: "Матчі",
        menuSocial: "Соцмережі",
        sostavTitle: "Склад команди",
        cap: "(Капітан)",
        backBtn: "← Назад на головну",
        followTitle: "ПІДПИСУЙТЕСЬ",
        platformLabel: "Платформа",
        instaLabel: "Інстаграм",
        ytLabel: "Ютуб",
        dsLabel: "Діскорд",
        ttLabel: "ТікТок",
        // Описи гравців
        player_smert_info: "Один із засновників Tck Team. Професійний гравець.",
        player_2_info: "Брат засновника. Скиловий гравець."
    }
};

function getTranslation(key) {
    const lang = localStorage.getItem('preferredLang') || 'en';
    return translations[lang] ? translations[lang][key] || key : key;
}

function updateLanguage() {
    const lang = localStorage.getItem('preferredLang') || 'en';
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
}

document.addEventListener('DOMContentLoaded', updateLanguage);
