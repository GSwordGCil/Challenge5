// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var now = dayjs();
  var currentHour = now.format('HH');

  
  // this function generates divs and appends them to the container
  function generateDivs()
  {
    for (var i = 9;i<18;i++)
    {
      // gets the container to be appended to
      const container = document.querySelector('.container-lg');
      // create the main div under the container
      const main_div = document.createElement('div');

      // sets the class attribute of the main div based on the current time
      if (i < currentHour)
      {
        main_div.className = 'row time-block past';
      }
      else if(i > currentHour)
      {
        main_div.className = 'row time-block future';
      }
      else
      {
        main_div.className = 'row time-block present';
      }
      main_div.id = `hour-${i}`;

      // create the child div of the main div and set its text content to reflect the time for each block
      const child_div = document.createElement('div');
      child_div.className = "col-2 col-md-1 hour text-center py-3";
      if (i < 12)
      {
        child_div.textContent = `${i}AM`;
      }
      else
      {
        child_div.textContent = `${i-12 > 0 ? i-12 : 12 }PM`;
      }

      
      // create child text area
      const child_textarea = document.createElement('textarea');
      child_textarea.className = "col-8 col-md-10 description";
      child_textarea.rows = "3";

      // create button
      const child_button = document.createElement('button');
      child_button.className = "btn saveBtn col-2 col-md-1";
      child_button.setAttribute('aria-label',"save");

      // create child of the button
      const button_child_i = document.createElement('i');
      button_child_i.className = "fas fa-save";
      button_child_i.setAttribute('aria-hidden',"true");

      // append everything together
      child_button.appendChild(button_child_i);

      main_div.appendChild(child_div);
      main_div.appendChild(child_textarea);
      main_div.appendChild(child_button);
      
      container.appendChild(main_div);
    }
  };


  // add an event listener onclick and check if the target is the button
  // saves content to local storage for the corresponding button
  document.addEventListener('click',function(event)
  {
    event.preventDefault();
    // check if either the button area or the i element is clicked
    if (event.target.classList.contains('saveBtn') || event.target.classList.contains('fas'))
    {
      var parentElement = event.target.closest('div[id^="hour-"]');
      if (parentElement)
      {
        localStorage.setItem(parentElement.id,parentElement.querySelector('textarea').value);
      }
    }
  });

// this function loads local storage and displays to the corresponding time zone
  function loadStorage()
  {
    for(let i = 9; i < 18;i++)
    {
      const key = `hour-${i}`;
      const value = localStorage.getItem(key);
      const element = document.getElementById(key);
      element.querySelector('textarea').value = value;
    }
  }


  // displays current date in the header of the page
  document.getElementById('currentDay').textContent = now.format("dddd, MMMM D");

  // page init
  generateDivs();
  loadStorage();
});
