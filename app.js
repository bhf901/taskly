const quotes = [
    '"strive not to be a success, but rather to be of value" -albert einstein',
    '"two roads diverged in a wood, and i—i took the one less traveled by, and that has made all the difference." -robert frost',
    `"you miss 100% of the shots you don't take." -wayne gretzky`,
    '"the most difficult thing is the decision to act, the rest is merely tenacity." -amelia earhart',
    '"every strike brings me closer to the next home run." -babe ruth',
    '"life is 10% what happens to me and 90% how i react to it." -charles swindoll',
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
    let time = new Date()
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
        if (timeMessageCheckbox.checked) {
            timeMessage.textContent = '☀️ good morning! what are your plans for the day?';
        } else {
            timeMessage.textContent = '';
        }
    } else if (rawHour === 12 && !militaryTime.checked) {
        amOrPm = 'PM';
        if (timeMessageCheckbox.checked) {
            timeMessage.textContent = "🌅 you've made it to the second half of the day! what have you accomplished so far?"
        } else {
            timeMessage.textContent = '';
        }
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

const releaseNotes = document.getElementById('releaseNotes');

function closeBetaMenu() {
    let betaMenuObject = document.getElementById('betaNotice');

    betaMenuObject.style.display = 'none';
    releaseNotes.style.display = 'none';
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

let releaseNotesStatus = false;

function showIssues() {
    if (releaseNotesStatus === false) {
        releaseNotes.style.display = 'block';
        document.getElementById('releaseNotesButton').textContent = 'hide release notes';
        releaseNotesStatus = true;
    } else if (releaseNotesStatus === true) {
        releaseNotes.style.display = 'none';
        document.getElementById('releaseNotesButton').textContent = 'show release notes';
        releaseNotesStatus = false;
    }
}

let timerHours = document.getElementById('timerHours').value;
let timerMinutes = document.getElementById('timerMinutes').value;
let timerSeconds = document.getElementById('timerSeconds').value;
let timerValue;
let timerNameForNotification;
let timerInterval;

function setTimer() {
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

    if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0) {
        // do nothing
    } else {
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
}

const timerAlarmPopup = document.getElementById('timerAlarmPopup');
const timerEndAudio = document.getElementById('timerAlarm');
const timerAlertText = document.getElementById('timerOrAlarm');

let buttonIntervalAlarm;

function alarmRunner() {
    if (Notification.permission === 'granted') {
        const timerIsDone = new Notification("taskly timer client", {
            body: `your timer on taskly has elapsed. (name: ${timerNameForNotification})`,
            icon: 'taskly-timer-icon.png'
        });
    }
    timerEndAudio.play();
    timerAlertText.textContent = 'your timer has elapsed.';
    document.getElementById('dismissNudge').textContent = 'dismiss nudge (15)';
    timerAlarmPopup.style.display = 'flex';
    clearTimer();
    dismissNudgeButtonTimer = 15;
    clearInterval(buttonIntervalAlarm);
    buttonIntervalAlarm = setInterval(dismissButtonTimer, 1000);
    setTimeout(closeTimerAlert, 15000);
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

function closeTimerAlert() {
    timerEndAudio.pause();
    timerEndAudio.currentTime = 0;
    timerAlarmPopup.style.display = 'none'
}

let dismissNudgeButtonTimer;

function dismissButtonTimer() {
    document.getElementById('dismissNudge').textContent = `dismiss nudge (${dismissNudgeButtonTimer})`

    if (dismissNudgeButtonTimer === 0) {
        dismissNudgeButtonTimer = 0;
        document.getElementById('dismissNudge').textContent = `dismiss nudge (${dismissNudgeButtonTimer})`
    } else {
        dismissNudgeButtonTimer -= 1;
        document.getElementById('dismissNudge').textContent = `dismiss nudge (${dismissNudgeButtonTimer})`
    }
}

let alarmHours;
let alarmMinutes;
let alarmCheck;
let alarmNameForNotification;

function setAlarm() {
    const alarmTime = document.getElementById('alarmSelect').value;
    [alarmHours, alarmMinutes] = alarmTime.split(':');

    if (isNaN(alarmHours) || isNaN(alarmMinutes)) {
        // does nothing
    } else {
        document.getElementById('clearAlarm').style.display = 'flex';
        let alarmName = document.getElementById('alarmName');
        let shownAlarmName = document.getElementById('alarmNameShown');
        if (alarmName.value !== '') {
            shownAlarmName.textContent = alarmName.value;
            alarmNameForNotification = alarmName.value;
        } else {
            shownAlarmName.textContent = 'untitled alarm';
            alarmNameForNotification = 'untitled alarm';
        }
        if (parseInt(alarmHours) < 12 && parseInt(alarmHours) !== 0) {
            document.getElementById('alarmPresenter').textContent = `${alarmHours}:${alarmMinutes} AM`;
        } else if (parseInt(alarmHours) > 12) {
            document.getElementById('alarmPresenter').textContent = `${alarmHours - 12}:${alarmMinutes} PM`;
        } else if (parseInt(alarmHours) === 0) {
            document.getElementById('alarmPresenter').textContent = `12:${alarmMinutes} AM`;
        } else if (parseInt(alarmHours) === 12) {
            document.getElementById('alarmPresenter').textContent = `${alarmHours}:${alarmMinutes} PM`;
        }

        alarmCheck = setInterval(runAlarm, 1000);
    }
}

function runAlarm() {
    const alarmTime = new Date();
    if (parseInt(alarmHours) === alarmTime.getHours() && parseInt(alarmMinutes) === alarmTime.getMinutes()) {
        alarmAlert()
    }
}

function alarmAlert() {
    if (Notification.permission === 'granted') {
        const alarmIsRinging = new Notification("taskly alarm client", {
            body: `your alarm on taskly is ringing. (name: ${alarmNameForNotification})`,
            icon: 'taskly-timer-icon.png'
        });
    }
    timerEndAudio.play();
    timerAlertText.textContent = 'your alarm is ringing.';
    document.getElementById('dismissNudge').textContent = 'dismiss nudge (15)';
    timerAlarmPopup.style.display = 'flex';
    clearAlarm();
    dismissNudgeButtonTimer = 15;
    clearInterval(buttonIntervalAlarm);
    buttonIntervalAlarm = setInterval(dismissButtonTimer, 1000);
    setTimeout(closeTimerAlert, 15000);
}

function clearAlarm() {
    clearInterval(alarmCheck);
    document.getElementById('clearAlarm').style.display = 'none';
    document.getElementById('alarmPresenter').textContent = '';
    document.getElementById('alarmNameShown').textContent = '';
}

let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
const addTaskInput = document.getElementById('addTask');
const taskCompleteConfirmation = document.getElementById('taskCompleteConfirmation');

function refreshTaskList() {
    document.getElementById('taskList').innerHTML = '';
    if (addTaskInput.value !== '') {
        taskList.push(addTaskInput.value);
    }
    for (let i = 0; i < taskList.length; i++) {
        document.getElementById('taskList').innerHTML += `<div  id="task${i}" class="taskListItem" onclick="removeTaskItem(${i})"><img style="padding: 0 5px;" src="radio-button-unchecked.png" width="20" height="20"><p id="taskListText${i}"></p></div>`;
        document.getElementById(`taskListText${i}`).textContent = taskList[i];
    }
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

addTaskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        refreshTaskList();
        addTaskInput.value = '';
    }
});

function buttonSelectForTaskList() {
    refreshTaskList();
    addTaskInput.value = '';
}

function removeTaskItem(itemNumber) {
    document.getElementById(`task${itemNumber}`).remove();
    taskList.splice(itemNumber, 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    taskCompleteConfirmation.currentTime = 0;
    taskCompleteConfirmation.play();
    refreshTaskList();
}

function clearAllTasks() {
    if (taskList.length > 0) {
        document.getElementById('taskList').innerHTML = '';
        taskList = [];
        localStorage.setItem('taskList', JSON.stringify(taskList));
        taskCompleteConfirmation.currentTime = 0;
        taskCompleteConfirmation.play();
        refreshTaskList();
    } else {
        noTasks();
    }
}

function noTasks() {
    document.getElementById('noTasksAlert').textContent = 'there are no tasks to clear.'
    setTimeout(clearNoTasks, 3000);
}

function clearNoTasks() {
    document.getElementById('noTasksAlert').textContent = '';
}

refreshTaskList();

const element = document.documentElement;
let fullscreenStatus = false;
const fullscreenButton = document.getElementById('fullscreenToggle');

function fullscreenToggle() {
    if (fullscreenStatus === false) {
        element.requestFullscreen().then(() => {
            console.log('Fullscreen activated through Taskly request.');
            fullscreenButton.textContent = 'exit full screen';
            fullscreenStatus = true;
        }).catch((error) => {
            console.log('Issue activating fullscreen.');
            alert('there was an issue activating fullscreen.')
        });
    } else if (fullscreenStatus === true) {
        document.exitFullscreen().then(() => {
            console.log('Fullscreen deactivated through Taskly request.');
            fullscreenButton.textContent = 'enter full screen';
            fullscreenStatus = false;
        }).catch((error) => {
            console.log('Issue exiting fullscreen.');
            alert('there was an issue exiting fullscreen.');
        });
    }
}

document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
        fullscreenButton.textContent = 'exit full screen';
        fullscreenStatus = true;
    } else {
        fullscreenButton.textContent = 'enter full screen';
        fullscreenStatus = false;
    }
});

const amtOfAssignments = document.getElementById('amtOfGraded');
const className = document.getElementById('className');

function openPointsBoxes() {
    document.getElementById('pointsModeInputs').innerHTML = '';
    for (let i = 0; i < amtOfAssignments.value; i++) {
        document.getElementById('pointsModeInputs').innerHTML += `
        <hr><label for="assignment${i}Points">points earned on assignment ${i+1}:</label>
        <input type="number" id="assignment${i}Points"><br><br>
        <label for="assignment${i}Weight">total points for assignment ${i+1}:</label>
        <input type="number" id="assignment${i}Weight"><br>`;
    }
}

amtOfAssignments.addEventListener('input', openPointsBoxes);

let totalPoints = 0;
let totalWeight = 0;
let finalGrade;

function calculatePointsGrade() {
    totalPoints = 0;
    totalWeight = 0;
    finalGrade = 0;
    for (let i=0; i < amtOfAssignments.value; i++) {
        totalPoints += parseInt(document.getElementById(`assignment${i}Points`).value);
        totalWeight += parseInt(document.getElementById(`assignment${i}Weight`).value);
    }

    finalGrade = (totalPoints / totalWeight) * 100
    finalGrade = finalGrade.toFixed(2);

    if (isNaN(finalGrade)) {
        document.getElementById('finalGrade').textContent = 'invalid result. please make sure all fields are filled out.'
    } else {
        if (className.value !== '') {
            document.getElementById('finalGrade').textContent = `your grade in ${className.value} is: ${finalGrade}%`;
        } else {
            document.getElementById('finalGrade').textContent = `your grade is: ${finalGrade}%`;
        }
    }
}

const notes = document.getElementById('quickNotes');
const notesConfirmation = document.getElementById('notesConfirmation');
notes.value = JSON.parse(localStorage.getItem('notes')) || '';

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes.value));
    if (notes.value === '') {
        notesConfirmation.style.color = 'red';
        notesConfirmation.textContent = `there's nothing to save! any previously saved notes have been cleared.`;
    } else {
        notesConfirmation.style.color = 'green';
        notesConfirmation.textContent = 'notes successfully saved.';
    }
    setTimeout(clearNotesConfirmation, 3000);
}

function clearNotes() {
    if (notes.value === '') {
        notesConfirmation.style.color = 'red';
        notesConfirmation.textContent = `there's nothing to clear!`;
    } else {
        notesConfirmation.style.color = 'green';
        notesConfirmation.textContent = 'notes successfully cleared.';
    }
    notes.value = '';
    localStorage.setItem('notes', JSON.stringify(notes.value));
    setTimeout(clearNotesConfirmation, 3000);
}

function loadNotes() {
    notes.value = JSON.parse(localStorage.getItem('notes'));
    notesConfirmation.style.color = 'green';
    notesConfirmation.textContent = 'the most recent save has been loaded.';
    setTimeout(clearNotesConfirmation, 3000);
}

function clearNotesConfirmation() {
    notesConfirmation.textContent = '';
}

window.addEventListener('beforeunload', (event) => {
    if (JSON.parse(localStorage.getItem('notes')) !== notes.value) {
        const areYouSure = 'are you sure you want to leave? you have unsaved changes.';
        event.returnValue = areYouSure;
        return areYouSure;
    }
});

const musicSecurityWarning = document.getElementById('securityWarning');
const musicCanceled = document.getElementById('musicCanceled');
const musicPlayer = document.getElementById('musicPlayer');

function cancelMusic() {
    musicSecurityWarning.style.display = 'none';
    musicCanceled.style.display = 'block';
}

function approveMusic() {
    musicSecurityWarning.style.display = 'none';
    musicCanceled.style.display = 'none';
    musicPlayer.style.display = 'block';
    musicPlayer.src = 'https://embed.music.apple.com/us/playlist/top-100-global/pl.d25f5d1181894928af76c85c967f8f31';
}

document.addEventListener('DOMContentLoaded', function () {
    const externalLinks = document.querySelectorAll('a');
    externalLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const url = link.href;
            if (!url.includes(window.location.hostname)) {
                const confirmLeave = confirm('you are about to visit a website that is not affiliated with taskly. taskly cannot guarantee the security or privacy of external websites. do you wish to continue?');
                if (!confirmLeave) {
                    event.preventDefault();
                }
            }
        });
    });
});

function acknowledgeSecurityWarning() {
    document.getElementById('linksWarning').style.display = 'none';
    document.getElementById('linksList').style.display = 'block';
}
