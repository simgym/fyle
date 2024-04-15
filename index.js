document.addEventListener("DOMContentLoaded", function () {
  var taxForm = document.getElementById("taxForm");
  var ageInput = document.getElementById("age");
  var incomeInput = document.getElementById("income");
  var deductionsInput = document.getElementById("deductions");
  var totalDeductionsInput = document.getElementById("totalDeductions");
  var ageError = document.getElementById("ageError");
  var ageErrorIcon = document.getElementById("ageErrorIcon");
  var incomeError = document.getElementById("incomeError");
  var incomeErrorIcon = document.getElementById("incomeErrorIcon");
  var deductionsError = document.getElementById("deductionsError");
  var deductionsErrorIcon = document.getElementById("deductionsErrorIcon");
  var totalDeductionsError = document.getElementById("totalDeductionsError");
  var totalDeductionsErrorIcon = document.getElementById(
    "totalDeductionsErrorIcon"
  );
  var resultModal = document.getElementById("resultModal");
  var modalBody = document.getElementById("modalBody");
  var closeButton = document.getElementsByClassName("close")[0];

  function showError(element, errorElement, errorIcon, errorMessage) {
    errorElement.textContent = errorMessage;
    errorIcon.style.display = "block";

    errorIcon.addEventListener("mouseover", function () {
      errorElement.style.display = "block";
      errorElement.style.top = element.offsetTop + "px";
      errorElement.style.left =
        element.offsetLeft + element.offsetWidth + 5 + "px";
    });

    errorIcon.addEventListener("mouseout", function () {
      errorElement.style.display = "none";
    });
  }

  function hideError(errorElement, errorIcon) {
    errorElement.style.display = "none";
    errorIcon.style.display = "none";
  }

  function calculateTax(age, income, deductions) {
    var tax = 0;
    var taxableIncome = income + deductions - 8;
    if (taxableIncome > 0) {
      if (age === "<40") {
        tax = 0.3 * taxableIncome;
      } else if (age === "40-60") {
        tax = 0.4 * taxableIncome;
      } else if (age === ">=60") {
        tax = 0.1 * taxableIncome;
      }
    }
    return tax;
  }

  taxForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var age = ageInput.value;
    var income = parseFloat(incomeInput.value);
    var deductions = parseFloat(deductionsInput.value);
    var totalDeductions = parseFloat(totalDeductionsInput.value);

    console.log("Age:", age);

    hideError(ageError, ageErrorIcon);
    hideError(incomeError, incomeErrorIcon);
    hideError(deductionsError, deductionsErrorIcon);
    hideError(totalDeductionsError, totalDeductionsErrorIcon);

    var hasError = false;
    if (age === "") {
      showError(ageInput, ageError, ageErrorIcon, "Age is required");
      hasError = true;
    }
    if (isNaN(income) || income < 0) {
      showError(
        incomeInput,
        incomeError,
        incomeErrorIcon,
        "Enter a valid income"
      );
      hasError = true;
    }
    if (isNaN(deductions) || deductions < 0) {
      showError(
        deductionsInput,
        deductionsError,
        deductionsErrorIcon,
        "Enter a valid deduction amount"
      );
      hasError = true;
    }
    if (isNaN(totalDeductions) || totalDeductions < 0) {
      showError(
        totalDeductionsInput,
        totalDeductionsError,
        totalDeductionsErrorIcon,
        "Enter a valid total deduction amount"
      );
      hasError = true;
    }

    if (!hasError) {
      var tax = calculateTax(age, income, deductions);
      console.log("Tax:", tax);

      modalBody.textContent = "Tax: " + tax.toFixed(2) + " Lakhs";
      resultModal.style.display = "block";

      console.log("Modal displayed");
    }
  });

  closeButton.onclick = function () {
    resultModal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == resultModal) {
      resultModal.style.display = "none";
      console.log("Modal closed");
    }
  };

  incomeInput.addEventListener("input", function () {
    var income = parseFloat(incomeInput.value);
    if (isNaN(income) || income < 0) {
      showError(
        incomeInput,
        incomeError,
        incomeErrorIcon,
        "Enter a valid income"
      );
    } else {
      hideError(incomeError, incomeErrorIcon);
    }
  });

  deductionsInput.addEventListener("input", function () {
    var deductions = parseFloat(deductionsInput.value);
    if (isNaN(deductions) || deductions < 0) {
      showError(
        deductionsInput,
        deductionsError,
        deductionsErrorIcon,
        "Enter a valid deduction amount"
      );
    } else {
      hideError(deductionsError, deductionsErrorIcon);
    }
  });

  totalDeductionsInput.addEventListener("input", function () {
    var totalDeductions = parseFloat(totalDeductionsInput.value);
    if (isNaN(totalDeductions) || totalDeductions < 0) {
      showError(
        totalDeductionsInput,
        totalDeductionsError,
        totalDeductionsErrorIcon,
        "Enter a valid total deduction amount"
      );
    } else {
      hideError(totalDeductionsError, totalDeductionsErrorIcon);
    }
  });

  if (ageInput.value === "") {
    showError(ageInput, ageError, ageErrorIcon, "Age is required");
  }
  if (incomeInput.value === "") {
    showError(
      incomeInput,
      incomeError,
      incomeErrorIcon,
      "This field should not be empty"
    );
  }
  if (deductionsInput.value === "") {
    showError(
      deductionsInput,
      deductionsError,
      deductionsErrorIcon,
      "This field should not be empty"
    );
  }
  if (totalDeductionsInput.value === "") {
    showError(
      totalDeductionsInput,
      totalDeductionsError,
      totalDeductionsErrorIcon,
      "This field should not be empty"
    );
  }
});
