function updateBatchOptions() {
    var batchSelect = document.getElementById('batch');

    batchSelect.innerHTML = '';
    batchNames = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13'];
    batchNames.forEach(function(batch) {
        var option = document.createElement('option');
        option.value = batch;
        option.text = batch;
        batchSelect.add(option);
    });
}

function displayStudents() {
    var selectedBatch = document.getElementById('batch').value;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/get_students_in_batch?batch='+selectedBatch, true);

    xhr.onreadystatechange = function () {
        if (xhr && xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var students = response.students; // Corrected access to students array

                students.sort(function (a, b) {
                    return a.id - b.id;
                });
            // console.log("Hello");
            console.log('Students:', students); 

            // Create a table element
            var table = document.createElement('table');

            // Create table headers
            var headers = ['ID', 'Name', 'Mo. No.', 'City', 'Course', 'PC No.', 'Fees Remaining'];
            var headerRow = table.insertRow(0);

            headers.forEach(function (header) {
                var th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });

            // Populate the table with student data
            students.forEach(function (student) {
                var row = table.insertRow();
                
                // Iterate through each property in the student object
                var order = ['id', 'name', 'mono', 'city', 'course', 'pcno', 'feesrem'];
                order.forEach(function (key) {
                var cell = row.insertCell();
                cell.textContent = student[key];
                });
            });

            // Append the table to a container element (assuming a div with id 'tableContainer' exists)
            var tableContainer = document.getElementById('studentsTable');
            tableContainer.innerHTML = ''; // Clear previous content
            tableContainer.appendChild(table);

        } else {
            console.error('HTTP request failed with status:', xhr.status);
        }
    }
    else {
        // Handle cases where the XMLHttpRequest object is not available or ready
        console.error('Invalid XMLHttpRequest object or readyState:', xhr.readyState);
    }
    };
    xhr.send();

    event.preventDefault();
}

// Update batch options when the page loads
updateBatchOptions();