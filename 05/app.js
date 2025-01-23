function convert() {
    const textBox = document.getElementById("textBox");
    const result = document.getElementById("result");
    const toFahrenheit = document.getElementById("toFahrenheit");
    const toCelsius = document.getElementById("toCelsius");

    const inputTemp = parseFloat(textBox.value);

    if (toFahrenheit.checked) {
        // Convert Celsius to Fahrenheit
        const fahrenheit = (inputTemp * 9/5) + 32;
        result.textContent = `${inputTemp}°C is equal to ${fahrenheit.toFixed(2)}°F`;
    } else if (toCelsius.checked) {
        // Convert Fahrenheit to Celsius
        const celsius = (inputTemp - 32) * 5/9;
        result.textContent = `${inputTemp}°F is equal to ${celsius.toFixed(2)}°C`;
    } else {
        result.textContent = "Please select a unit for conversion.";
    }
}
