// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
    const currentHour = dayjs().hour();
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
      // add our new timeblocks with the timeBlockStatus and hourLabel using backquotes
      const timeBlock = `
    <div id="hour-${hour}" class="row time-block ${timeBlockStatus}">
      <div class="col-2 col-md-1 hour text-center py-3">${hourLabel}</div>
      <textarea class="col-8 col-md-10 description" rows="3"></textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>
    `;
      
     $(".container-lg").append(timeBlock);  
    };
  
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  
  
  // TODO: Add code to display the current date in the header of the page.
  // Get the current date using Day.js
  const currentDate = dayjs().format("dddd, MMMM D, YYYY");

  // Set the text content of the element with ID "currentDay" to the formatted date
  $("#currentDay").text(currentDate);
});
