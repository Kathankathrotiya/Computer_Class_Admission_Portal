function updateBatchOptions() {
    var batchSelect = document.getElementById('newBatch');

    batchSelect.innerHTML = '';
    batchNames = ['B1', 'B2', 'B3','B4','B5','B6', 'B7', 'B8','B9','B10','B11', 'B12', 'B13',];
    batchNames.forEach(function(batch) {
    var option = document.createElement('option');
    option.value = batch;
    option.text = batch;
    batchSelect.add(option);
    });
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
//     // Make an AJAX request to get available PCs for the batch
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
// Function to fetch details for a student ID from the server
function fetchStudentDetails() {
    const studentId = document.getElementById('studentId').value.trim();
    if (studentId !== '') {
        // Make an AJAX request to get details for the provided student ID
        fetch(`/get_student_details?id=${studentId}`)
            .then(response => response.json())
            .then(studentDetails => {
                // Update the Old Batch and Old PC Number fields
                document.getElementById('oldBatch').value = studentDetails.batch || '';
                document.getElementById('oldPCNumber').value = studentDetails.pcNumber || '';
            })
            updateBatchOptions();
            
        }
    }
    document.getElementById('newBatch').addEventListener('focus', function () { populatePCDropdown(document.getElementById('newBatch').value, 0);});


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
        xhr.open('POST', '/change_batch_pc', true);
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