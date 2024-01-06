function fetchStudentDetails() {
    var studentId = document.getElementById('studentId').value;

    // Make an AJAX request to the server to fetch student details from completion data
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/get_student_details_from_completion?id=' + studentId, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var studentDetails = JSON.parse(xhr.responseText);

            // Update form fields with fetched details
            document.getElementById('name').value = studentDetails.Name || '';
            document.getElementById('batch').value = studentDetails.Batch || '';
            document.getElementById('course').value = studentDetails['Course'] || '';
            document.getElementById('completionDate').value = studentDetails['Completion Date'] || '';
            document.getElementById('examDate').value = studentDetails['Exam Date'] || '';
            document.getElementById('certificateNumber').value = studentDetails['Certificate Number'] || '';
            document.getElementById('issueCertificateDate').value = studentDetails['Issue Certificate Date'] || '';
            document.getElementById('receiverName').value = studentDetails['Receiver Name'] || '';
            document.getElementById('finalFees').value = studentDetails['Final Fees'] || '';
        }
    };
    xhr.send();
}

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

function populateCompletionStudentDropdown() {
var studentIdDropdown = document.getElementById('studentId');
studentIdDropdown.innerHTML = '';

// Make an AJAX request to get the list of students for completion data
var xhr = new XMLHttpRequest();
xhr.open('GET', '/get_completion_student_list', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var studentList = JSON.parse(xhr.responseText);

        // Populate the student dropdown with available options
        studentList.students.forEach(function (student) {
            var option = document.createElement('option');
            option.value = student.id;
            option.text = student.name + ' (ID: ' + student.id + ')';
            studentIdDropdown.add(option);
        });
    }
};
xhr.send();
}

// Call the function to populate the student dropdown for completion data on page load
populateCompletionStudentDropdown();

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData(this);

    // Make an AJAX request to handle form submission
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/update_completion_data', true);
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