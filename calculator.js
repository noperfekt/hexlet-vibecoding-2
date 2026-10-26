(function (root) {
  function calcBmr({ sex, age, height, weight }) {
    const base = 10 * weight + 6.25 * height - 5 * age;
    return sex === 'male' ? base + 5 : base - 161;
  }

  function calcCalories(input) {
    const bmr = calcBmr(input);
    const maintain = bmr * input.activity;
    return {
      bmr: Math.round(bmr),
      maintain: Math.round(maintain),
      lose: Math.round(maintain * 0.85),
      gain: Math.round(maintain * 1.15),
    };
  }

  function validate({ age, height, weight }) {
    if (!(age >= 10 && age <= 100)) return 'Возраст должен быть от 10 до 100 лет';
    if (!(height >= 100 && height <= 250)) return 'Рост должен быть от 100 до 250 см';
    if (!(weight >= 30 && weight <= 300)) return 'Вес должен быть от 30 до 300 кг';
    return '';
  }

  const api = { calcBmr, calcCalories, validate };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.calculator = api;

  if (typeof document === 'undefined') return;

  const $ = (id) => document.getElementById(id);
  $('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = {
      sex: document.querySelector('input[name="sex"]:checked').value,
      age: parseFloat($('age').value),
      height: parseFloat($('height').value),
      weight: parseFloat($('weight').value),
      activity: parseFloat($('activity').value),
    };
    const error = validate(input);
    $('error').textContent = error;
    $('result').hidden = Boolean(error);
    if (error) return;

    const r = calcCalories(input);
    for (const key of Object.keys(r)) $(key).textContent = r[key] + ' ккал/день';
  });
})(this);
