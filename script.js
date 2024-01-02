// Get the range input element
const range = document.getElementById('customRange1');
// Get the element to display the value
const rangeValue = document.getElementById('rangeValue');
// Qualification filter checkboxes
const qualificationCheckboxes = document.querySelectorAll('.Qualifications');
//stream filter checkbox
const streamCheckboxes = document.querySelectorAll('.Stream');
//location filter checkbox
const locationCheckboxes = document.querySelectorAll('.Location');
//Salary filter checkbox
const salaryCheckboxes = document.querySelectorAll('.Salary');



const itemsPerPage = 10; // Number of items per page
let currentPage = 1; // Current page

// Adding event listener to experience range slider
range.addEventListener('input', function() {
    const selectedExp = parseInt(range.value);
    rangeValue.textContent = `${selectedExp} Years`;

    // Filter jobs based on the selected experience value and qualifications
     fetchDataWithFilters(currentPage, getSelectedQualifications(),getSelectedStreams(),getSelectedLocations(),getSelectedSalary(), selectedExp);
});

// Adding event listener to each checkbox for qualifications
qualificationCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
         fetchDataWithFilters(currentPage, getSelectedQualifications(),getSelectedStreams(),getSelectedLocations(),getSelectedSalary(), parseInt(range.value));
    });
});

// Adding event listener to each checkbox for Streams
streamCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
         fetchDataWithFilters(currentPage, getSelectedQualifications(),getSelectedStreams(),getSelectedLocations(),getSelectedSalary(), parseInt(range.value));
    });
});

// Adding event listener to each checkbox for Location
locationCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
         fetchDataWithFilters(currentPage, getSelectedQualifications(),getSelectedStreams(),getSelectedLocations(),getSelectedSalary(), parseInt(range.value));
    });
});

// Adding event listener to each checkbox for Salary
salaryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
         fetchDataWithFilters(currentPage, getSelectedQualifications(),getSelectedStreams(),getSelectedLocations(),getSelectedSalary(), parseInt(range.value));
    });
});





// Function to get selected qualifications
function getSelectedQualifications() {
    return Array.from(qualificationCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.nextElementSibling.textContent.trim());
}

// Function to get selected Streams
function getSelectedStreams() {
    return Array.from(streamCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.nextElementSibling.textContent.trim());
}

// Function to get selected Locations
function getSelectedLocations() {
    return Array.from(locationCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.nextElementSibling.textContent.trim());
}

// Function to get selected Salary
function getSelectedSalary() {
    return Array.from(salaryCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.nextElementSibling.textContent.trim());
}





// Function to fetch data with filters
const fetchDataWithFilters = (page, selectedQualifications,selectedStreams,selectedLocations,selectedSalarys, exp) => {
    fetch(`http://localhost:3000/jobs`)
        .then(response => response.json())
        .then(data => {
            let filteredData = data;
            if (exp) {
                filteredData = data.filter(job => job.experience === exp);
           }
            
           if (selectedQualifications!=undefined   &&  selectedQualifications.length > 0) {
                filteredData = filteredData.filter(job => {
                    const trimmedSelectedQualifications = selectedQualifications.map(selQualification => selQualification.trim());
                    const trimmedJobQualification = job.qualification.trim();
                    return trimmedSelectedQualifications.includes(trimmedJobQualification);
                });
            }

            if (selectedStreams!=undefined   &&  selectedStreams.length > 0) {
                filteredData = filteredData.filter(job => {
                    const trimmedSelectedStreams = selectedStreams.map(selStream => selStream.trim());
                    const trimmedJobStreams = job.stream.trim();
                    return trimmedSelectedStreams.includes(trimmedJobStreams);
                });
            }

            if (selectedLocations!=undefined   &&  selectedLocations.length > 0) {
                filteredData = filteredData.filter(job => {
                    const trimmedSelectedLocations = selectedLocations.map(selLocation => selLocation.trim());
                    const trimmedJobLocations = job.location.trim();
                    return trimmedSelectedLocations.includes(trimmedJobLocations);
                });
            }

            if (selectedSalarys!=undefined   &&  selectedSalarys.length > 0) {
                filteredData = filteredData.filter(job => {
                    const trimmedSelectedSalarys = selectedSalarys.map(selSalary => selSalary.trim());
                    const trimmedJobSalarys = job.salary.trim();
                    return trimmedSelectedSalarys.includes(trimmedJobSalarys);
                });
            }



            displayData(filteredData);
// Inside the .then block of fetchDataWithFilters function after data is fetched
        })
      .catch(error => {
        console.error('There was a problem fetching the data:', error);
        });
};




    function displayData(data) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
      
      
        const dataContainer = document.getElementById('JobsContainer');
      dataContainer.innerHTML = ''; // Clear existing data
      data.slice(startIndex, endIndex).forEach(item => {
        const newCard=document.createElement("div");
        newCard.classList.add("row","my-3");
        newCard.innerHTML = `
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <a href="#">
                        <div class="row">
                            <div class="col-8">
                                <div class="row">
                                    <div class="col-12">
                                        <h6 style="margin-bottom: 0;">${item.role}
                                        </h6>
                                        <a>${item.company}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4">
                                <i class="fa fa-suitcase" aria-hidden="true"></i> ${item.experience}+ Years
                            </div>
                            <div class="col-4">
                                <i class="fa fa-inr" aria-hidden="true"></i> ${item.salary}
                            </div>
                            <div class="col-4">
                                <i class="fa fa-map-marker" aria-hidden="true"></i> ${item.location}
                            </div>
                        </div>
                        <div class="row pt-1">
                            <div class="col-12">
                                <i class="fa fa-file-text-o" aria-hidden="true"></i> <span
                                    class="text-muted">  ${item.qualification}  - ${item.stream} </span>
                            </div>
                        </div>
                        <div class="row pt-1">
                            <div class="col-6">
                                <small>Few Hours Ago</small>
                            </div>
                            <div class="col-6 text-end">
                                <i class="fa fa-bookmark" aria-hidden="true"></i>
                            </div>
                        </div>

                </div>
                </a>
            </div>

        </div>
          `;
        dataContainer.appendChild(newCard);
      });

      // Call function to display pagination buttons
      displayPagination(data.length/10);
    }

    function displayPagination(totalItems) {
    const container=document.getElementById('JobsContainer')
    const paginationButtons = document.createElement("div");
    paginationButtons.classList.add("mx-4","my-5");
    paginationButtons.id='pagination-buttons';

      // Create Previous button
      const prevButton = document.createElement('button');
      prevButton.textContent = 'Previous';
      prevButton.classList.add("btn","btn-outline-info");
      prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          fetchDataWithFilters(currentPage);
        }
      });
      paginationButtons.appendChild(prevButton);


      // Add page numbers dynamically
  for (let i = 1; i <= totalItems; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.add("btn","btn-outline-info","mx-1");
    pageButton.addEventListener('click', () => {
      currentPage = i;
      fetchDataWithFilters(currentPage);
    });
    paginationButtons.appendChild(pageButton);
  }

      // Create Next button
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Next';
      nextButton.classList.add("btn","btn-outline-info");
      nextButton.addEventListener('click', () => {
        if(currentPage<=totalItems){
            currentPage++;
            console.log(currentPage);
            fetchDataWithFilters(currentPage);
        }
      });
      paginationButtons.appendChild(nextButton);
      container.appendChild(paginationButtons);
    }

    // Fetch initial data for the first page
    window.onload = () => {
      fetchDataWithFilters(currentPage);
    };