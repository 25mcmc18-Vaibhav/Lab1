$(document).ready(function() {
    
    // The JSON Object defining our form structure
    const formStructure = [
        { id: "fullname", label: "Full Name", type: "text", required: true, errorMsg: "Name is required." },
        { id: "email", label: "Email Address", type: "email", required: true, errorMsg: "A valid email is required." },
        { id: "password", label: "Password", type: "password", required: true, errorMsg: "Password must be at least 6 characters." },
        { id: "country", label: "Country", type: "select", options: ["", "USA", "France", "UK", "India", "Japan", "Italy", "Russia"], required: true, errorMsg: "Please select a country." },
        // dependsOn property for conditional logic
        { id: "state", label: "State", type: "select", options: ["", "California", "New York", "Texas", "Ohio", "New Jersey"], required: true, errorMsg: "Please select a state.", dependsOn: "USA" }
    ];

    const $form = $('#dynamicForm');

    // Build the Form Dynamically
    formStructure.forEach(field => {
        // Create the wrapper and label
        let html = `<div class="form-group" id="group-${field.id}">
                        <label for="${field.id}">${field.label}</label>`;

        // Creating a dropdown or an input field based on JSON type
        if (field.type === "select") {
            html += `<select id="${field.id}" name="${field.id}">`;
            field.options.forEach(opt => {
                html += `<option value="${opt}">${opt === "" ? "Select an option" : opt}</option>`;
            });
            html += `</select>`;
        } else {
            html += `<input type="${field.type}" id="${field.id}" name="${field.id}">`;
        }

        // Adding the error message container (hidden via CSS) and close the group
        html += `<div class="error-msg" id="error-${field.id}">${field.errorMsg}</div>
                 </div>`;
        
        $form.append(html);

        // hiding conditional fields initially (like the State field)
        if (field.dependsOn) {
            $(`#group-${field.id}`).hide();
        }
    });

    // Submit Button at the end
    $form.append('<button type="submit" id="submitBtn">Register</button>');

    // Conditional activity
    $('#country').on('change', function() {
        if ($(this).val() === "USA") {
            $('#group-state').slideDown(); // Show state dropdown
        } else {
            $('#group-state').slideUp(); // Hide state dropdown
            $('#state').val(''); // Reset its value
            $('#error-state').hide(); // Hide its error if visible
        }
    });

// Form Validation on Submit
    $form.on('submit', function(e) {
        e.preventDefault(); 
        let isFormValid = true;

        formStructure.forEach(field => {
            const $group = $(`#group-${field.id}`);
            const $input = $(`#${field.id}`);
            const $error = $(`#error-${field.id}`);

            if ($group.is(':visible') && field.required) {
                let val = $input.val().trim();
                let fieldIsValid = true;
                let specificError = field.errorMsg; // Default error message

                // Name Validation (Only Alphabets)
                if (field.id === "fullname") {
                    const nameRegex = /^[A-Za-z\s]+$/;
                    if (val === "" || !nameRegex.test(val)) {
                        fieldIsValid = false;
                        specificError = "Name must contain only alphabets.";
                    }
                }

                // Email Validation (Must have @ and a dot)
                else if (field.type === "email") {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(val)) {
                        fieldIsValid = false;
                        specificError = "Enter a valid email (e.g., name@mail.com).";
                    }
                }

                // Password Validation (Capital, Special Char, 6+ length)
                else if (field.type === "password") {
                    const hasCapital = /[A-Z]/.test(val);
                    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(val);
                    
                    if (val.length < 6 || !hasCapital || !hasSpecial) {
                        fieldIsValid = false;
                        specificError = "Password needs 6+ chars, 1 capital, and 1 special char.";
                    }
                }

                // Empty Check for Selects
                else if (val === "") {
                    fieldIsValid = false;
                }

                // Applying the Validation UI
                if (!fieldIsValid) {
                    $error.text(specificError).fadeIn(); // Updating text dynamically
                    isFormValid = false;
                } else {
                    $error.fadeOut();
                }
            }
        });

        if (isFormValid) {
            alert("Registration Successfull!");
            $form[0].reset();
            $('#group-state').hide();
        }
    });
});