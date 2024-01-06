function fetchStudentDetails() {
    var studentId = document.getElementById('studentId').value;

    // Make an AJAX request to the server to fetch student details
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/get_student_details?id=' + studentId, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var studentDetails = JSON.parse(xhr.responseText);

            // Update form fields with fetched details
            document.getElementById('batch').value = studentDetails.batch || '';
            document.getElementById('name').value = studentDetails.name || '';
            document.getElementById('course').value = studentDetails.course || '';
            document.getElementById('completionDate').value = studentDetails.completionDate || '';
            document.getElementById('installmentDate1').value = studentDetails.installmentDate1 || '';
            document.getElementById('installmentAmount1').value = studentDetails.installmentAmount1 || '';
            document.getElementById('installmentDate2').value = studentDetails.installmentDate2 || '';
            document.getElementById('installmentAmount2').value = studentDetails.installmentAmount2 || '';
            document.getElementById('installmentDate3').value = studentDetails.installmentDate3 || '';
            document.getElementById('installmentAmount3').value = studentDetails.installmentAmount3 || '';
            document.getElementById('amounttobePaid').value = studentDetails.amounttobePaid || '';
            document.getElementById('finalFees').value = studentDetails.finalFees || '';

            // Populate PC dropdown based on availability
            populatePCDropdown(studentDetails.batch, studentDetails.pcNumber);
        }
    };
    xhr.send();
}

function populatePCDropdown(batchName, assignedPC) {
    var pcNumberDropdown = document.getElementById('pcNumber');
    pcNumberDropdown.innerHTML = ''; // Clear existing options

    // If PC is assigned, set it as the default value
    if (assignedPC) {
        var assignedOption = document.createElement('option');
        assignedOption.value = assignedPC;
        assignedOption.text = assignedPC;
        assignedOption.selected = true;
        pcNumberDropdown.add(assignedOption);
    } else {
        // Make an AJAX request to get available PCs for the batch
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/get_unassigned_pcs?batch=' + batchName, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var unassignedPCs = response.pcs;

                // Populate the PC dropdown with available options
                unassignedPCs.forEach(function(pc) {
                    var option = document.createElement('option');
                    option.value = pc;
                    option.text = pc;
                    pcNumberDropdown.add(option);
                });
            }
        };
        xhr.send();
    }
}

function calculateAmountToBePaid() {
    // Fetch the final fees and installment amounts
    var finalFees = parseFloat(document.getElementById('finalFees').value) || 0;
    var installmentAmount1 = parseFloat(document.getElementById('installmentAmount1').value) || 0;
    var installmentAmount2 = parseFloat(document.getElementById('installmentAmount2').value) || 0;
    var installmentAmount3 = parseFloat(document.getElementById('installmentAmount3').value) || 0;

    // Calculate the amount to be paid
    var amountToBePaid = finalFees - (installmentAmount1 + installmentAmount2 + installmentAmount3);

    // Update the "Amount to be Paid" field
    document.getElementById('amounttobePaid').value = amountToBePaid;
}

// Event listeners to trigger the calculation
document.getElementById('installmentAmount1').addEventListener('input', calculateAmountToBePaid);
document.getElementById('installmentAmount2').addEventListener('input', calculateAmountToBePaid);
document.getElementById('installmentAmount3').addEventListener('input', calculateAmountToBePaid);
    
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

    function populateStudentDropdown() {
    var studentIdDropdown = document.getElementById('studentId');
    studentIdDropdown.innerHTML = '';

    // Make an AJAX request to get the list of students
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/get_student_list', true);
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

// Call the function to populate the student dropdown on page load
populateStudentDropdown();

document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();

        var formData = new FormData(this);

        // Make an AJAX request to handle form submission
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/update_remaining_data', true);
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