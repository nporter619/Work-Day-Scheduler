$(function () {
  // Generates the time-blocks for the 9-5 work schedule
  function createTimeBlocks() {
      const now = dayjs();
      const currentHour = now.hour();

      // Get a reference to the container element that that time-blocks will be appended ot
      const containerEl = $(".container-lg");
      // Empty the container just in case it already has time blocks
      containerEl.empty();

      // run through the iteration of 9-5 on a 24 hour clock
      for (let hour = 9; hour <= 17; hour++) {
          let timeBlockStatus = "";
          // time block status to be determined
          if (hour < currentHour) {
              timeBlockStatus = "past";
          } else if (hour === currentHour) {
              timeBlockStatus = "present";
          } else {
              timeBlockStatus = "future";
          }

          // if over 12 add pm if =12 add pm else add am
          const hourLabel = hour > 12 ? `${hour - 12}PM` : hour === 12 ? `${hour}PM` : `${hour}AM`;
          // The id of the time-block
          const id = `hour-${hour}`;
          // Gets the current hour description from local storage if found
          let description = getSavedTimeBlock(id);

          // Create the time-block with the label and description (if found)
          const timeBlock = `
          <div id="${id}" class="row time-block ${timeBlockStatus}">
          <div class="col-2 col-md-1 hour text-center py-3">${hourLabel}</div>
          <textarea class="col-8 col-md-10 description" rows="3">${description}</textarea>
          <button class="btn saveBtn col-2 col-md-1" aria-label="save">
              <i class="fas fa-save" aria-hidden="true"></i>
          </button>
          </div>
          `;

          // Append the time-block to the container
          containerEl.append(timeBlock);
      }

      // Time remaining is the total amount of minutes remaining in the hour
      // This is necessary to update the present and future time-blocks on time
      const timeRemaining = 60 - Number(now.minute());
      
      // Re-create the time-blocks again once the new hour started
      setTimeout(createTimeBlocks, timeRemaining * 1000 * 60);
  }

  // Saves the time block id and value to local storage
  function onSaveClick(e) {
      const saveButton = $(this);
      // Get the id of the closest time-block
      const timeBlockId = saveButton.closest(".time-block").attr("id");
      // Get the description value
      const description = $.trim(saveButton.siblings("textarea").val());

      // If the description is empty, then remove it from local storage
      if (description === "") {
          localStorage.removeItem(timeBlockId);
          return;
      }

      // Create the JSON to save to local storage
      const itemToSave = {
          description: description,
      };

      // Persist in local storage
      localStorage.setItem(timeBlockId, JSON.stringify(itemToSave));
  };

  // Gets the specified hour(timeBlockId) from local storage
  function getSavedTimeBlock(timeBlockId) {
      // Get from local storage
      const savedItem = localStorage.getItem(timeBlockId);
      // If empty, return an empty string otherwise return the description
      return savedItem ? JSON.parse(savedItem).description : "";
  }

  // Sets the current date in the current date header
  function setCurrentDayHeader() {
      // Get the current date using dayjs
      const currentDate = dayjs().format("dddd, MMMM D, YYYY");

      // Set the text content of the element with ID "currentDay" to the formatted date
      $("#currentDay").text(currentDate);
  }

  setCurrentDayHeader();
  createTimeBlocks();

  // set after the createTimeBlocks as the save buttons will not be in the DOM yet
  $(".saveBtn").on("click", onSaveClick);
});