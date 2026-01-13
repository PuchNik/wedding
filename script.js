function toggleContent() {
    const contentWrapper = document.getElementById("contentWrapper");
    const button = document.querySelector(".flip-btn");

    if (!contentWrapper || !button) {
        console.error("Элементы не найдены");
        return;
    }

    contentWrapper.classList.toggle("hidden");

    if (contentWrapper.classList.contains("hidden")) {
        button.textContent = "Открыть приглашение";
        // Плавно прокручиваем вверх к карточке
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    } else {
        button.textContent = "Закрыть приглашение";
        // Плавно прокручиваем к контенту
        setTimeout(() => {
            contentWrapper.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    }
}

// Функция для отсчета времени до свадьбы
function updateCountdown() {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const countdownEl = document.getElementById("countdown");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !countdownEl) {
        return;
    }

    // Создаем дату в локальном времени на 14 августа 2026, 00:00:00
    const targetDate = new Date(2026, 7, 14, 0, 0, 0).getTime(); // месяц 7 = август (0-индексация)
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        countdownEl.innerHTML =
            '<div class="countdown-message">Свадьба уже состоялась!</div>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
}

// Добавляем плавную анимацию при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
    const card = document.querySelector(".card");
    if (card) {
        card.style.opacity = "0";

        setTimeout(() => {
            card.style.transition = "opacity 0.5s ease";
            card.style.opacity = "1";
        }, 100);
    }

    // Запускаем отсчет времени
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Синхронизация ширины divider с subtitle-wedding
    syncDividerWidth();

    // Инициализация Яндекс карты
    initYandexMap();
});

// Функция для синхронизации ширины divider с subtitle-wedding
function syncDividerWidth() {
    const subtitleWedding = document.querySelector(".subtitle-wedding");
    const divider = document.querySelector(".divider");

    if (subtitleWedding && divider) {
        const updateWidth = () => {
            const subtitleWidth = subtitleWedding.offsetWidth;
            divider.style.width = subtitleWidth + "px";
        };

        // Обновляем ширину при загрузке
        updateWidth();

        // Обновляем ширину при изменении размера окна
        window.addEventListener("resize", updateWidth);
    }
}

// Функция для инициализации Яндекс карты
function initYandexMap() {
    // Проверяем, загружена ли библиотека Яндекс карт
    if (typeof ymaps === "undefined") {
        console.error("Яндекс карты не загружены");
        return;
    }

    ymaps.ready(function () {
        const mapContainer = document.getElementById("yandex-map");
        if (!mapContainer) {
            return;
        }

        // Координаты места проведения
        const coordinates = [55.798308, 37.583284];

        // Создаем карту
        const map = new ymaps.Map("yandex-map", {
            center: coordinates,
            zoom: 16,
            controls: ["zoomControl", "fullscreenControl"],
        });

        // Добавляем метку на карту
        const placemark = new ymaps.Placemark(
            coordinates,
            {
                balloonContent: "Место проведения свадьбы",
            },
            {
                preset: "islands#goldDotIcon",
            }
        );

        map.geoObjects.add(placemark);
    });
}
