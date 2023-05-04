// Function to display the current day
function displayCurrentDay() {
  const currentDay = dayjs().format("MMMM D, YYYY");
  $("#currentDay").text(currentDay);
}

// Function to create time blocks
function createTimeBlocks() {
  const startHour = 9;
  const endHour = 17;

  for (let hour = startHour; hour <= endHour; hour++) {
    let timeBlockStatus = "";

    if (hour < currentHour) {
      timeBlockStatus = "past";
    } else if (hour === currentHour) {
      timeBlockStatus = "present";
    } else {
      timeBlockStatus = "future";
    }}
  
    const hourLabel = hour > 12 ? `${hour - 12}PM` : hour === 12 ? `${hour}PM` : `${hour}AM`;
  
    const timeBlock = `
      <div id="hour-${hour}" class="row time-block ${timeBlockStatus}">
        <div class="col-2 col-md-1 hour text-center py-3">${hourLabel}</div>
        <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `;
  // Append the generated time blocks to the container
  $(".container-lg").append(timeBlock);

}

// Function to save events to local storage
function saveEvent(timeBlockId, eventDescription) {
  const eventData = {
    description: eventDescription,
  };

  localStorage.setItem(timeBlockId, JSON.stringify(eventData));
}

// Function to load events from local storage
function loadEvents() {
  $(".time-block").each(function () {
    const timeBlockId = $(this).attr("id");
    const savedDataJSON = localStorage.getItem(timeBlockId);

    if (savedDataJSON) {
      const savedData = JSON.parse(savedDataJSON);
      $(this).find("textarea").val(savedData.description);
    }
  });
}

// Function to handle the save button clicks
function setupSaveButtonClickListener() {
  $(".saveBtn").on("click", function () {
    const timeBlockId = $(this).closest(".time-block").attr("id");
    const eventDescription = $(this).siblings("textarea").val();
    saveEvent(timeBlockId, eventDescription);
  });
}

// Function to schedule a refresh for the next hour
function scheduleNextHourRefresh() {
  const now = dayjs();
  const nextHour = now.add(1, 'hour').startOf('hour');
  const remainingTime = nextHour.diff(now);

  setTimeout(() => {
    location.reload();
  }, remainingTime);
}

// Wrap all code that interacts with the DOM in a call to jQuery
$(function () {
  displayCurrentDay();
  createTimeBlocks();
  loadEvents();
  setupSaveButtonClickListener();
  scheduleNextHourRefresh();
});