const { DateTime } = luxon;

const form = document.getElementById("ageForm");
const input = document.getElementById("birthdate");
const result = document.getElementById("result");

// Mascara automática: insere as barras enquanto digita
input.addEventListener('input', (e) => {
  let val = input.value.replace(/\D/g, ''); // Remove tudo que não for número

  if (val.length > 8) val = val.slice(0, 8);

  let formatted = "";
  if (val.length > 4) {
    formatted = val.slice(0,2) + '/' + val.slice(2,4) + '/' + val.slice(4);
  } else if (val.length > 2) {
    formatted = val.slice(0,2) + '/' + val.slice(2);
  } else {
    formatted = val;
  }
  input.value = formatted;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = input.value.trim();

  if (!value) {
    result.textContent = "Please enter a valid date.";
    return;
  }

  const birthDate = DateTime.fromFormat(value, "dd/MM/yyyy");

  if (!birthDate.isValid) {
    result.textContent = "Invalid date format. Use DD/MM/YYYY.";
    return;
  }

  const now = DateTime.now();

  if (birthDate > now) {
    result.textContent = "Birth date cannot be in the future.";
    return;
  }

  const diff = now.diff(birthDate, ["years", "months", "days"]).toObject();

  const years = Math.floor(diff.years);
  const months = Math.floor(diff.months);
  const days = Math.floor(diff.days);

  result.textContent = `You are ${years} years, ${months} months and ${days} days old.`;
});
