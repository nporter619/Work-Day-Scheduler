$(function () {
 
  function createTimeBlocks() {
      // run through the iteration of 9-5 on a 24 hour clock
      for (let hour = 9; hour <= 17; hour++) {
          // if over 12 add pm if =12 add pm else add am
          const hourLabel = hour > 12 ? `${hour - 12}PM` : hour === 12 ? `${hour}PM` : `${hour}AM`;
          const id = 'hour-' + hour;
          // Get the saved item for the current hour;
          let description = getSavedTimeBlock(id);

          // add our new timeblocks with the timeBlockStatus and hourLabel using backquotes
          const timeBlock = `
          <div id="${id}" class="row time-block past">
          <div class="col-2 col-md-1 hour text-center py-3">${hourLabel}</div>
          <textarea class="col-8 col-md-10 description" rows="3">${description}</textarea>
          <button class="btn saveBtn col-2 col-md-1" aria-label="save">
              <i class="fas fa-save" aria-hidden="true"></i>
          </button>
          </div>
          `;

          $(".container-lg").append(timeBlock);
      }

      // This will update the present and future time blocks every hour
      updateTimeBlockStatus();
  }

  // Updates the present and future time blocks
  function updateTimeBlockStatus() {
      const now = dayjs();
      const hour = Number(now.hour());

      // Time remaining is the total amount of minutes left in the hour
      // This is necessary so we can update the present and future slots on time
      const timeRemaining = 60 - Number(now.minute());

      // Remove status
      $('.time-block').removeClass('future present');

      // Set the present and future 
      $('#hour-' + hour).addClass('present');
      $('#hour-' + (hour + 1)).addClass('future');

      // Call again once the new hour started
      setTimeout(updateTimeBlockStatus, timeRemaining * 1000 * 60);
  }

  // Saves the specified hour to local storage
  function onSaveClick(e) {
      const timeBlockId = $(this).closest(".time-block").attr("id");
      const eventDescription = $(this).siblings("textarea").val();

      // Save the event data as a JSON string
      const eventData = {
          description: eventDescription,
      };

      localStorage.setItem(timeBlockId, JSON.stringify(eventData));
  };

  // Gets the specified hour from local storage
  function getSavedTimeBlock(hour) {
      const savedItem = localStorage.getItem(hour);
      return savedItem ? JSON.parse(savedItem).description : '';
  }
  // Sets the current date 
  function setCurrentDay() {
      // Get the current date using Day.js
      const currentDate = dayjs().format("dddd, MMMM D, YYYY");

      // Set the text content of the element with ID "currentDay" to the formatted date
      $("#currentDay").text(currentDate);
  }

  setCurrentDay();
  createTimeBlocks();

  // This must be set after the createTimeBlocks as the save buttons will not be in the DOM yet
  $(".saveBtn").on("click", onSaveClick);
});