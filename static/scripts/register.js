document.getElementById('isExistingStudent').addEventListener('change', function() {
    var dropdown = document.getElementById('existingStudentDropdown');
    dropdown.style.display = (this.value === 'yes') ? 'block' : 'none';
});

fetch('/get_all_past_students')
    .then(response => response.json())
    .then(data => {
        const selectDropdown = document.getElementById('pastStudentDropdown');

        // Populate the dropdown options
        data.forEach(student => {
            const option = document.createElement('option');
            option.value = student.id;
            option.text = student.name+'('+student.id+')';
            selectDropdown.add(option);
        });
    })
    .catch(error => console.error('Error fetching past students:', error));

// Function to fetch details of a specific past student
function fetchPastStudentDetails() {
    const studentId = document.getElementById('pastStudentDropdown').value;

    // Fetch details of the selected past student
    fetch(`/fetch_past_student_details?id=${studentId}`)
        .then(response => response.json())
        .then(studentDetails => {
            // Update other fields with the fetched details
            document.getElementById('name').value = studentDetails.name || '';
            document.getElementById('address').value = studentDetails.address || '';
            document.getElementById('city').value = studentDetails.city || '';
            document.getElementById('moNo1').value = studentDetails.moNo1 || '';
            document.getElementById('moNo2').value = studentDetails.moNo2 || '';
            document.getElementById('standard').value = studentDetails.standard || '';
            document.getElementById('school').value = studentDetails.school || '';
            document.getElementById('dob').value = studentDetails.dob || '';
            document.getElementById('occ').value = studentDetails.occ || '';
            // document.getElementById ('courseYes').value = studentDetails.course1 || '';
            // document.getElementById ('courseNo').value = studentDetails.course1 || '';
            // document.getElementById('courseWhich').value = studentDetails.courseWhich || '';
            // document.getElementById('courseWhere').value = studentDetails.courseWhere || '';
            // Update other fields as needed
        })
        .catch(error => console.error('Error fetching past student details:', error));

}

document.getElementById('fetchPastStudentButton').addEventListener('click', fetchPastStudentDetails);

function fetchAndDisplayRegistrationNumber() {
    // Make an AJAX request to the server to get the current registration number
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/get_current_registration_number', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var currentRegistrationNumber = JSON.parse(xhr.responseText).registrationNumber;

            // Display the current registration number in the form
            document.getElementById('registrationNumber').value = currentRegistrationNumber;
        }
    };
    xhr.send();
}

// Call the function when the page is loaded
window.onload = function() {
    fetchAndDisplayRegistrationNumber();
};

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

            if (response.status === 'success') {
                // Redirect to the home page or your desired page
                window.location.href = '/';  // Change '/' to the desired route
            }
            else
            {
                // document.querySelector('form').reset();
            }
            // Clear the form fields
        }
    };
    xhr.send(new URLSearchParams(formData));
});

