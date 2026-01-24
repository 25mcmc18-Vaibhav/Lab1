const form = document.getElementById('regForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const dobInput = document.getElementById('dob');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');
const strengthBar = document.getElementById('strengthBar');

const patterns = {
    name: /^[a-zA-Z\s]+$/, 
    email: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/, 
    phone: /^\d{10}$/, 
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

function validateField(input, regex, errorId, errorMsg) {
    const errorSpan = document.getElementById(errorId);
    
    if (regex.test(input.value)) {
        input.className = 'valid';
        errorSpan.style.display = 'none';
        return true;
    } else {
        input.className = 'invalid';
        errorSpan.innerText = errorMsg;
        errorSpan.style.display = 'block';
        return false;
    }
}

nameInput.addEventListener('input', () => {
    validateField(nameInput, patterns.name, 'nameError', 'Name must contain only alphabets.');
    checkFormValidity();
});

emailInput.addEventListener('input', () => {
    validateField(emailInput, patterns.email, 'emailError', 'Enter a valid email address.');
    checkFormValidity();
});

phoneInput.addEventListener('input', () => {
    validateField(phoneInput, patterns.phone, 'phoneError', 'Phone must be exactly 10 digits.');
    checkFormValidity();
});

dobInput.addEventListener('input', () => {
    const dob = new Date(dobInput.value);
    const today = new Date();
    
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    const errorSpan = document.getElementById('dobError');
    if (age >= 18) {
        dobInput.className = 'valid';
        errorSpan.style.display = 'none';
    } else {
        dobInput.className = 'invalid';
        errorSpan.innerText = 'You must be at least 18 years old.';
        errorSpan.style.display = 'block';
    }
    checkFormValidity();
});

passInput.addEventListener('input', () => {
    const value = passInput.value;
    const isValid = validateField(passInput, patterns.password, 'passwordError', 'Password must be 8+ chars, incl. Upper, Lower, Number & Special.');
    
    let score = 0;
    if (value.length > 5) score += 20;
    if (/[A-Z]/.test(value)) score += 20;
    if (/[a-z]/.test(value)) score += 20;
    if (/[0-9]/.test(value)) score += 20;
    if (/[@$!%*?&]/.test(value)) score += 20;

    const finalScore = Math.min(100, score);
    
    strengthBar.style.width = `${finalScore}%`;

    if (finalScore < 40) strengthBar.style.backgroundColor = 'red';
    else if (finalScore < 80) strengthBar.style.backgroundColor = 'orange';
    else strengthBar.style.backgroundColor = 'green';

    checkFormValidity();
});

function checkFormValidity() {
    const inputs = document.querySelectorAll('input');
    let allValid = true;
    
    inputs.forEach(input => {
        if (!input.classList.contains('valid')) {
            allValid = false;
        }
    });

    submitBtn.disabled = !allValid;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form Submitted Successfully!');
});