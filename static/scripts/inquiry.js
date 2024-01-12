    function updateBatchOptions() {
        var courseSelect = document.getElementById('course');
            
    var selectedCourse = courseSelect.value;

    // Clear existing options
    batchSelect.innerHTML = '';

    // Set batch names based on the selected course
    var batchNames;
    if (selectedCourse === 'English') {
        batchNames = ['E1', 'E2', 'E3','E4','E5','E6', 'E7', 'E8','E9','E10'];
    } else {
        batchNames = ['B1', 'B2', 'B3','B4','B5','B6', 'B7', 'B8','B9','B10','B11', 'B12', 'B13',];
    }

    // Populate batch options
    batchNames.forEach(function(batch) {
        var option = document.createElement('option');
        option.value = batch;
        option.text = batch;
        batchSelect.add(option);
    });
}
// Call the function initially to populate batch options based on the default selected course
updateBatchOptions();

document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Get the active element
            var activeElement = document.activeElement;

            // Find all input fields in the form
            var inputFields = Array.from(activeElement.form.querySelectorAll('input, select'));

            // Find the index of the active input field
            var currentIndex = inputFields.indexOf(activeElement);

            // Move focus to the next input field
            var nextIndex = (currentIndex + 1) % inputFields.length;
            inputFields[nextIndex].focus();
        }
    });

    function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Get the current date
const currentDate = formatDate(new Date());

// Set the initial value of the completionDate input
document.getElementById('inquiryDate').value = currentDate;

document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();

        var formData = new FormData(this);

        // Make an AJAX request to handle form submission
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/add_inquiry', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var response = JSON.parse(xhr.responseText);

                // Display a pop-up with the response message
                alert(response.message);
                if (response.status === 'success') {
                    // Redirect to the home page or your desired page
                    window.location.href = '/';  // Change '/' to the desired route
                }
                else
                {
                    // Clear the form fields
                    // document.querySelector('form').reset();
                }
            }
        };
        xhr.send(new URLSearchParams(formData));
    });