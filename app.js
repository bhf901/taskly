if (Notification.permission !== 'granted') {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('User has allowed notifications.');
            const welcomeToNotifications = new Notification("taskly notification manager", {
                body: "this is how you'll receive notifications from taskly applications such as timers and alarms."
            });
        } else {
            console.log('User has blocked access to notifications.');
        }
    });
}

const quotes = [
    '"strive not to be a success, but rather to be of value" -albert einstein',
    '"two roads diverged in a wood, and i—i took the one less traveled by, and that has made all the difference." -robert frost',
    `"you miss 100% of the shots you don't take." -wayne gretzky`,
    '"the most difficult thing is the decision to act, the rest is merely tenacity." -amelia earhart',
    '"every strike brings me closer to the next home run." -babe ruth',
    '"life is 10% of what happens to me and 90% of how i react to it." -charles swindoll',
    '"80% of success is showing up." -woody allen',
    '"the best revenge is massive success." -frank sinatra',
    '"there is only one way to avoid criticism: do nothing, say nothing, and be nothing." -aristotle',
    `"i didn't fail the test. i just found 100 ways to do it wrong." -benjamin franklin`
];

const quoteText = document.getElementById('inspirationalQuote');
const quoteCheckbox = document.getElementById('quoteToggle');
quoteText.textContent = quotes[Math.floor(Math.random() * 10)];

function quoteToggle () {
    if (quoteCheckbox.checked) {
        quoteText.textContent = quotes[Math.floor(Math.random() * 10)];
    } else {
        quoteText.textContent = '';
    }
}

function getTime() {
    let time = new Date();
    let rawDayOfWeek = time.getDay();
    let rawMonth = time.getMonth();
    let rawDay = time.getDate();
    let rawYear = time.getFullYear();
    let rawHour = time.getHours();
    let rawMinute = time.getMinutes();
    let rawSecond = time.getSeconds();
    let amOrPm;
    const secondsToggle = document.getElementById('secondsToggle')
    const timeInText = document.getElementById('currentTime');
    const timeZoneInText = document.getElementById('timeZone');
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateInText = document.getElementById('currentDate');
    const selectedColor = document.getElementById('colorSelector').value;
    const militaryTime = document.getElementById('militaryTime');
    const timeMessage = document.getElementById('timeMessage');
    const timeMessageCheckbox = document.getElementById('messageToggle');

    const timeZoneInUTC = () => {
        const offset = time.getTimezoneOffset();
        const offsetHours = Math.abs(Math.floor(offset / 60));
        const offsetMinutes = Math.abs(offset % 60);
        const positiveOrNegative = offset <= 0 ? '+' : '-';
        return `UTC${positiveOrNegative}${offsetHours}${offsetMinutes === 0 ? "" : `${String(offsetMinutes).padStart(2, '0')}`}`;
    }

    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const timeZoneSelector = document.getElementById('timeZoneToggle');

    if (timeZoneSelector.checked) {
        timeZoneInText.textContent = `${timeZoneInUTC()} | ${timeZone}`;
    } else {
        timeZoneInText.textContent = '';
    }

    if (rawHour < 12 && rawHour > 0) {
        amOrPm = 'AM';
        if (timeMessageCheckbox.checked) {
            timeMessage.textContent = '☀️ good morning! what are your plans for the day?';
        } else {
            timeMessage.textContent = '';
        }
    } else if (rawHour > 12 && !militaryTime.checked) {
        amOrPm = 'PM';
        rawHour -= 12;
        if (timeMessageCheckbox.checked) {
            timeMessage.textContent = "🌅 you've made it to the second half of the day! what have you accomplished so far?"
        } else {
            timeMessage.textContent = '';
        }
    } else if (rawHour > 12 && militaryTime.checked) {
        if (timeMessageCheckbox.checked) {
            timeMessage.textContent = "🌅 you've made it to the second half of the day! what have you accomplished so far?"
        } else {
            timeMessage.textContent = '';
        }
    } else if (rawHour === 0 && !militaryTime.checked) {
        rawHour = 12;
        amOrPm = 'AM';
        timeMessage.textContent = '☀️ good morning! what are your plans for the day?';
    }

    if (rawMinute < 10) {
        rawMinute = `0${rawMinute}`;
    }

    if (rawSecond < 10) {
        rawSecond = `0${rawSecond}`;
    }

    if (militaryTime.checked) {
        if (rawHour < 10) {
            rawHour = `0${rawHour}`;
        }
        if (secondsToggle.checked) {
            timeInText.textContent = `${rawHour}:${rawMinute}:${rawSecond}`;
        } else {
            timeInText.textContent = `${rawHour}:${rawMinute}`;
        }
    } else {
        if (secondsToggle.checked) {
            timeInText.textContent = `${rawHour}:${rawMinute}:${rawSecond} ${amOrPm}`;
        } else {
            timeInText.textContent = `${rawHour}:${rawMinute} ${amOrPm}`;
        }
    }

    dateInText.textContent = `${daysOfWeek[rawDayOfWeek]}, ${monthsOfYear[rawMonth]} ${rawDay}, ${rawYear}`;
    const customColorContainer = document.getElementById('customColors');
    const colorPicker = document.getElementById('customColor').value;

    if (selectedColor !== 'custom') {
        customColorContainer.style.display = 'none';
        timeInText.style.color = selectedColor;
        timeZoneInText.style.color = selectedColor;
        dateInText.style.color = selectedColor;
        timeMessage.style.color = selectedColor;
        quoteText.style.color = selectedColor;
    } else if (selectedColor === 'custom') {
        customColorContainer.style.display = 'flex';
        timeInText.style.color = colorPicker;
        timeZoneInText.style.color = colorPicker;
        dateInText.style.color = colorPicker;
        timeMessage.style.color = colorPicker;
        quoteText.style.color = colorPicker;
    }
}

setInterval(getTime, 1);

const timeSettingsMenu = document.getElementById('dateSettings');
const timeSettingsButton = document.getElementById('timeSettingsToggle');

function togglePopup() {
    if (timeSettingsMenu.style.display === 'block') {
        timeSettingsMenu.style.display = 'none';
    } else {
        timeSettingsMenu.style.display = 'block';
    }
}

const errorList = document.getElementById('fullErrors');

function closeBetaMenu() {
    let betaMenuObject = document.getElementById('betaNotice');

    betaMenuObject.style.display = 'none';
    errorList.style.display = 'none';
}

document.addEventListener('click', (event) => {
    if (!timeSettingsMenu.contains(event.target) && !timeSettingsButton.contains(event.target)) {
        timeSettingsMenu.style.display = 'none';
    }
});

const feedbackForm = document.getElementById('feedbackForm');
const feedbackSubmit = document.getElementById('submitButton');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formStatus = () => {
    const formName = document.getElementById('name').value;
    const formEmail = document.getElementById('email').value.trim();
    const formSubject = document.getElementById('subject').value;
    const formBody = document.getElementById('message').value;
    return !!(formName && formEmail && emailRegex.test(formEmail) && formSubject && formBody);
}

feedbackSubmit.addEventListener('click', () => {
    if (formStatus() === true) {
        feedbackForm.submit();
        feedbackForm.reset();
        document.getElementById('formMessage').textContent = '';
    } else {
        document.getElementById('formMessage').textContent = 'Please fill out all required fields.';
    }
});

let issueListStatus = false;

function showIssues() {
    if (issueListStatus === false) {
        errorList.style.display = 'block';
        document.getElementById('errorList').textContent = 'hide the full list of known issues';
        issueListStatus = true;
    } else if (issueListStatus === true) {
        errorList.style.display = 'none';
        document.getElementById('errorList').textContent = 'view the full list of known issues';
        issueListStatus = false;
    }
}

let timerHours = document.getElementById('timerHours').value;
let timerMinutes = document.getElementById('timerMinutes').value;
let timerSeconds = document.getElementById('timerSeconds').value;
let timerValue;
let timerNameForNotification;

function setTimer() {
    timerHours = parseInt(document.getElementById('timerHours').value);
    timerMinutes = parseInt(document.getElementById('timerMinutes').value);
    timerSeconds = parseInt(document.getElementById('timerSeconds').value);

    if (isNaN(timerHours)) {
        timerHours = 0;
    }

    if (isNaN(timerMinutes)) {
        timerMinutes = 0;
    }

    if (isNaN(timerSeconds)) {
        timerSeconds = 0;
    }

    let secondsValue = parseInt(timerSeconds, 10);
    if (secondsValue < 0) {
        timerSeconds = 0;
    } else if (secondsValue > 59) {
        timerSeconds = 59;
    }

    let minutesValue = parseInt(timerMinutes, 10);
    if (minutesValue < 0) {
        timerMinutes = 0;
    } else if (minutesValue > 59) {
        timerMinutes = 59;
    }

    if (timerName.value === '') {
        timerNameInText.textContent = 'untitled timer';
        timerNameForNotification = 'untitled timer';
    } else {
        timerNameInText.textContent = timerName.value;
        timerNameForNotification = timerName.value;
    }

    timerInterval = setInterval(runTimer, 1000);
}

function alarmRunner() {
    const timerEndAudio = document.getElementById('timerAlarm');
    if (Notification.permission === 'granted') {
        const timerIsDone = new Notification("taskly timer client", {
            body: `your timer on taskly has elapsed. (name: ${timerNameForNotification})`,
            icon: 'taskly-timer-icon.png'
        });
    }
    timerEndAudio.play();
    // alert('Your timer has ended.');
    clearTimer();
}

let timerName = document.getElementById('timerName');
let timerNameInText = document.getElementById('timerNameShown');

function runTimer() {

    function padZero(value) {
        return value.toString().padStart(2, '0');
    }

    timerValue = `${padZero(timerHours)}:${padZero(timerMinutes)}:${padZero(timerSeconds)}`;
    // timerName.value === '' ? timerNameInText.textContent = 'untitled timer' : timerNameInText.textContent = timerName.value;
    document.getElementById('timerPresenter').textContent = timerValue;
    document.getElementById('clearTimer').style.display = 'inline-block';

    timerSeconds -= 1;

    if (timerSeconds < 0) {
        timerSeconds = 59;
        timerMinutes -= 1;
    }

    if (timerMinutes < 0) {
        timerMinutes = 59;
        timerHours -= 1;
    }

    if (timerHours < 0) {
        clearInterval(timerInterval);
        document.getElementById('timerPresenter').textContent = '00:00:00';
        alarmRunner();
    }
}

function clearTimer() {
    clearInterval(timerInterval);
    timerNameInText.textContent = '';
    document.getElementById('timerPresenter').textContent = '';
    document.getElementById('clearTimer').style.display = 'none';
}
