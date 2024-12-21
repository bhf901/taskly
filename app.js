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
    const dateInText = document.getElementById('currentDate');
    const selectedColor = document.getElementById('colorSelector').value;
    const militaryTime = document.getElementById('militaryTime');

    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (rawHour < 12) {
        amOrPm = 'AM';
    } else if (rawHour > 12 && !militaryTime.checked) {
        amOrPm = 'PM';
        rawHour -= 12;
    } else if (rawHour > 12 && militaryTime.checked) {
        // does nothing
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
    let customColorContainer = document.getElementById('customColors');
    let customColorR = document.getElementById('redValue').value;
    let customColorG = document.getElementById('greenValue').value;
    let customColorB = document.getElementById('blueValue').value;

    if (selectedColor !== 'custom') {
        timeInText.style.color = selectedColor;
        dateInText.style.color = selectedColor;
        customColorContainer.style.display = 'none';
    } else if (selectedColor === 'custom') {
        customColorContainer.style.display = 'flex';
        timeInText.style.color = `rgba(${customColorR}, ${customColorG}, ${customColorB})`;
        dateInText.style.color = `rgba(${customColorR}, ${customColorG}, ${customColorB})`;
    }
}

setInterval(getTime, 1000);

const timeSettingsMenu = document.getElementById('dateSettings');
const timeSettingsButton = document.getElementById('timeSettingsToggle');

function togglePopup() {
    if (timeSettingsMenu.style.display === 'block') {
        timeSettingsMenu.style.display = 'none';
    } else {
        timeSettingsMenu.style.display = 'block';
    }
}

let timerHours = document.getElementById('timerHours').value;
let timerMinutes = document.getElementById('timerMinutes').value;
let timerSeconds = document.getElementById('timerSeconds').value;

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

feedbackSubmit.addEventListener('click', () => {
    feedbackForm.submit();
    feedbackForm.reset();
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
