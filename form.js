$(document).ready(function () {
    // Fetch states
    $.ajax({
        url: 'http://localhost:8080/admin/states',
        method: 'GET',
        success: function (data) {
            let stateDropdown = $('#state');
            data.forEach(function (state) {
                stateDropdown.append(
                    $('<option></option>').val(state.stateId).text(state.stateName)
                );
            });
        },
        error: function () {
            alert('Failed to fetch states.');
        },
    });

    $("#state").on('change', function () {
        var value = $("#state").val();

        // Fetch districts
        $.ajax({
            url: 'http://localhost:8080/admin/districts/' + value,
            method: 'GET',
            success: function (data) {
                let districtDropdown = $('#district');
                data.forEach(function (district) {
                    districtDropdown.append(
                        $('<option></option>').val(district.districtId).text(district.districtName)
                    );
                });
            },
            error: function () {
                alert('Failed to fetch districts.');
            },
        });

    })

    // Handle form submission
    $('#managementForm').on('submit', function (e) {
        e.preventDefault(); // Prevent form from refreshing the page

        // Serialize form data
        let serializedData = $(this).serializeArray();
        let payload = {};

        // Convert serialized array to a JSON object
        serializedData.forEach(function (field) {
            payload[field.name] = field.value;
        });

        $.ajax({
            url: 'http://localhost:8080/admin/addEvents',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (response) {
                alert('Form submitted successfully: ' + response);
            },
            error: function () {
                alert('Failed to submit the form.');
            },
        });
    });
});