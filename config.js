document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("config-form");

    // Example: Pre-populate settings if they exist (e.g., saved by the streamer)
    const setting1Input = document.getElementById("setting1");
    const setting2Input = document.getElementById("setting2");

    // Example: Load existing settings from localStorage or Twitch (simulated here)
    setting1Input.checked = localStorage.getItem("setting1") === "true"; // Assuming the stored value is "true" or "false"
    setting2Input.checked = localStorage.getItem("setting2") === "true"; // Assuming the stored value is "true" or "false"

    // Handle form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get the checkbox states (checked or not)
        const setting1 = setting1Input.checked ? "Enabled" : "Disabled";
        const setting2 = setting2Input.checked ? "Enabled" : "Disabled";

        // Save the settings to localStorage
        localStorage.setItem("setting1", setting1Input.checked); // Storing boolean value
        localStorage.setItem("setting2", setting2Input.checked); // Storing boolean value

        // Notify Twitch that settings were updated (optional)
        alert(`Settings saved! 1=${setting1} 2=${setting2}`);
    });
});
