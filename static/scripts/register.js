function toggleCourseDetails(show) {
    const courseWhich = document.getElementById('courseWhich');
    courseWhich.style.display = show ? 'block' : 'none';
    const courseWhere = document.getElementById('courseWhere');
    courseWhere.style.display = show ? 'block' : 'none';
}

document.getElementById('fees').addEventListener('input', function() {
    const fees = parseFloat(document.getElementById('fees').value) || 0;
    const discount = parseFloat(document.getElementById('discount').value) || 0;
    const finalFees = fees - discount;
    document.getElementById('finalFees').value = finalFees;
});

document.getElementById('discount').addEventListener('input', function() {
    const fees = parseFloat(document.getElementById('fees').value) || 0;
    const discount = parseFloat(document.getElementById('discount').value) || 0;
    const finalFees = fees - discount;
    document.getElementById('finalFees').value = finalFees;
});

function updateBatchOptions() {
    var courseSelect = document.getElementById('course');
    var batchSelect = document.getElementById('batch');
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
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData(this);

    // Make an AJAX request to handle form submission
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/update_excel', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var response = JSON.parse(xhr.responseText);

            // Display a pop-up with the response message
            alert(response.message);

            // Clear the form fields
            document.querySelector('form').reset();
        }
    };
    xhr.send(new URLSearchParams(formData));
});