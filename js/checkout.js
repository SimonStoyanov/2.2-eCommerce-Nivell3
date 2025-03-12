// Exercise 6
document.getElementById("btn").addEventListener("click", function(event) {
	event.preventDefault(); // needed to change the function to an EventListener due to the form submitting on some edge-cases
	console.log("hey!");

	var error = 0;

	// Get the input & errors inside fields
	const fields = {
		fName: {
			input: document.getElementById("fName"),
			error: document.getElementById("errorName")
		},
		fEmail: {
			input: document.getElementById("fEmail"),
			error: document.getElementById("errorEmail")
		},
		fAddress: {
			input: document.getElementById("fAddress"),
			error: document.getElementById("errorAddress")
		},
		fLastN: {
			input: document.getElementById("fLastN"),
			error: document.getElementById("errorLastN")
		},
		fPassword: {
			input: document.getElementById("fPassword"),
			error: document.getElementById("errorPassword")
		},
		fPhone: {
			input: document.getElementById("fPhone"),
			error: document.getElementById("errorPhone")
		}
	}

	// Reset before validation
	Object.values(fields).forEach(({ input, error }) => {
		input.classList.remove('border-danger');
		error.classList.remove('d-block');
	});

	// Validate fields entered by the user: name, phone, password, and email
	if(inputHasAtLeastXChar(fields.fName.input, 3) || inputIncludesChar(fields.fName.input, /\d/)) {
		addError(fields.fName);
		error++;
	}

	if(inputHasAtLeastXChar(fields.fEmail.input, 3) || !inputIncludesChar(fields.fEmail.input, /^[a-zA-Z\d\.]+@[a-zA-Z\d\.]+$/)) {
		addError(fields.fEmail);
		error++;
	}

	if(inputHasAtLeastXChar(fields.fAddress.input, 3)) {
		addError(fields.fAddress);
		error++;
	}

	if(inputHasAtLeastXChar(fields.fLastN.input, 3) || inputIncludesChar(fields.fLastN.input, /\d/)) {
		addError(fields.fLastN);
		error++;
	}

	if(inputHasAtLeastXChar(fields.fPassword.input, 3) || !inputIncludesChar(fields.fPassword.input, /^(?=.*\d)(?=.*[a-zA-Z]).+$/)) {
		addError(fields.fPassword);
		error++;
	}

	if(inputHasAtLeastXChar(fields.fPhone.input, 9) || inputIncludesChar(fields.fPhone.input, /[a-zA-Z]+/)) {
		addError(fields.fPhone);
		error++;
	}
	
	if(error>0){
		alert("Error");
	} else{
		alert("OK");
		document.getElementById("form").submit();
	}
});

const inputHasAtLeastXChar = (input, x) => {
	return input.value.trim() === "" || input.value.length < x;
}

const inputIncludesChar = (input, char) => {
	return char.test(input.value);
}

const addError = (field) => {
	field.input.classList.add('border-danger');
	field.error.classList.add('d-block');
}
