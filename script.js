let language = "ar";

const questions = [
    {
        question: {
            ar: "أي شعار يخص Google؟",
            en: "Which logo belongs to Google?"
        },
        logos: [
            {
                name: "Apple",
                image: "assets/apple.png"
            },
            {
                name: "Google",
                image: "assets/google.png"
            },
            {
                name: "Netflix",
                image: "assets/netflix.png"
            },
            {
                name: "Spotify",
                image: "assets/spotify.png"
            }
        ],
        correct: 1
    },
    {
        question: {
            ar: "أي شعار يخص Gmail؟",
            en: "Which logo belongs to Gmail?"
        },
        logos: [
            {
                name: "Gmail",
                image: "assets/gmail.png"
            },
            {
                name: "Taif University",
                image: "assets/TU.png"
            },
            {
                name: "BMW",
                image: "assets/BMW.png"
            },
            {
                name: "WhatsApp",
                image: "assets/WhatsApp.png"
            }
        ],
        correct: 0
    },
    {
        question: {
            ar: "أي شعار يخص Chrome؟",
            en: "Which logo belongs to Chrome?"
        },
        logos: [
            {
                name: "Phone",
                image: "assets/Phone.png"
            },
            {
                name: "Chrome",
                image: "assets/chrome.png"
            },
            {
                name: "Snapchat",
                image: "assets/SnapChat.png"
            },
            {
                name: "Safari",
                image: "assets/Safari.png"
            }
        ],
        correct: 1
    },
    {
        question: {
            ar: "أي شعار يخص Google Drive؟",
            en: "Which logo belongs to Google Drive?"
        },
        logos: [
            {
                name: "Google Drive",
                image: "assets/Drive.png"
            },
            {
                name: "iCloud",
                image: "assets/Iclaude.png"
            },
            {
                name: "Discord",
                image: "assets/Discord.png"
            },
            {
                name: "YouTube",
                image: "assets/YouTube.webp"
            }
        ],
        correct: 0
    },
    {
        question: {
            ar: "أي شعار يخص Gemini؟",
            en: "Which logo belongs to Gemini?"
        },
        logos: [
            {
                name: "Gemini",
                image: "assets/Gemini.png"
            },
            {
                name: "ChatGPT",
                image: "assets/ChatGPT.png"
            },
            {
                name: "TikTok",
                image: "assets/TikTok.png"
            },
            {
                name: "PlayStation",
                image: "assets/PlayStation.png"
            }
        ],
        correct: 0
    }
];

let currentQuestion = 0;

const $ = (id) => document.getElementById(id);

const home = $("home");
const game = $("game");
const result = $("result");

const startBtn = $("startBtn");
const restartBtn = $("restartBtn");
const againBtn = $("againBtn");
const languageBtn = $("languageBtn");

const logosGrid = $("logosGrid");
const feedback = $("feedback");

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(section => {
            section.classList.remove("active");
        });

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function startGame() {

    currentQuestion = 0;

    showScreen(game);

    renderQuestion();
}

function renderQuestion() {

    const question = questions[currentQuestion];

    logosGrid.innerHTML = "";

    feedback.textContent = "";

    feedback.className = "feedback";

    againBtn.classList.add("hidden");

    $("gameLabel").textContent =
        language === "ar"
            ? `السؤال ${String(currentQuestion + 1).padStart(2, "0")}`
            : `QUESTION ${String(currentQuestion + 1).padStart(2, "0")}`;

    $("question").textContent =
        question.question[language];

    question.logos.forEach((logo, index) => {

        const card = document.createElement("button");

        card.type = "button";

        card.className = "logo-card";

        const image = document.createElement("img");

        image.src = logo.image;

        image.alt = logo.name;

        card.appendChild(image);

        card.addEventListener("click", () => {

            selectLogo(card, index);

        });

        logosGrid.appendChild(card);

    });
}

function selectLogo(card, index) {

    const question = questions[currentQuestion];

    document
        .querySelectorAll(".logo-card")
        .forEach(item => {

            item.classList.remove(
                "selected",
                "wrong"
            );

        });

    card.classList.add("selected");

    if (index === question.correct) {

        card.classList.remove("selected");

        card.classList.add("wrong");

        feedback.className = "feedback error";

        feedback.textContent =
            language === "ar"
                ? "❌ إجابة خاطئة"
                : "❌ Incorrect answer";

        againBtn.classList.remove("hidden");

        return;
    }

    feedback.className = "feedback success";

    feedback.textContent =
        language === "ar"
            ? "✓ إجابة صحيحة"
            : "✓ Correct answer";

    setTimeout(() => {

        currentQuestion++;

        if (currentQuestion < questions.length) {

            renderQuestion();

        } else {

            showScreen(result);

        }

    }, 700);
}

function restartGame() {

    currentQuestion = 0;

    showScreen(game);

    renderQuestion();
}

function updateLanguage() {

    document.documentElement.lang = language;

    document.documentElement.dir =
        language === "ar"
            ? "rtl"
            : "ltr";

    languageBtn.textContent =
        language === "ar"
            ? "EN"
            : "عربي";

    $("eyebrow").textContent =
        language === "ar"
            ? "تحدّي الشعارات"
            : "LOGO CHALLENGE";

    $("title").textContent =
        language === "ar"
            ? "اختبر معلوماتك عن الشعارات"
            : "Test Your Logo Knowledge";

    $("description").textContent =
        language === "ar"
            ? "اختر الشعار الصحيح."
            : "Choose the correct logo.";

    startBtn.textContent =
        language === "ar"
            ? "ابدأ اللعبة ←"
            : "START GAME →";

    $("gameEyebrow").textContent =
        language === "ar"
            ? "اختبر معلوماتك"
            : "TEST YOUR KNOWLEDGE";

    $("resultTitle").textContent =
        language === "ar"
            ? "انتهت اللعبة"
            : "GAME OVER";

    $("resultText").textContent =
        language === "ar"
            ? "شكرًا على اللعب."
            : "Thanks for playing.";

    restartBtn.textContent =
        language === "ar"
            ? "العب مرة أخرى ↻"
            : "PLAY AGAIN ↻";

    if (game.classList.contains("active")) {

        renderQuestion();

    }
}

startBtn.addEventListener(
    "click",
    startGame
);

restartBtn.addEventListener(
    "click",
    restartGame
);

againBtn.addEventListener(
    "click",
    renderQuestion
);

languageBtn.addEventListener(
    "click",
    () => {

        language =
            language === "ar"
                ? "en"
                : "ar";

        updateLanguage();

    }
);

updateLanguage();