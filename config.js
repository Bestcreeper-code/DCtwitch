document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("config-form");

    // Example: Pre-populate settings if they exist (e.g., saved by the streamer)
    const setting1Input = document.getElementById("setting1");
    const setting2Input = document.getElementById("setting2");

    // Example: Load existing settings from localStorage or Twitch (simulated here)
    setting1Input.value = localStorage.getItem("setting1") || "";
    setting2Input.value = localStorage.getItem("setting2") || "";

    // Handle form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const setting1 = setting1Input.value;
        const setting2 = setting2Input.value;

        // Example: Save the settings
        localStorage.setItem("setting1", setting1);
        localStorage.setItem("setting2", setting2);

        // Notify Twitch that settings were updated (optional)
        if (window.Twitch && window.Twitch.ext) {
            window.Twitch.ext.actions.requestSaveSettings({ setting1, setting2 });
        }

        alert("Settings saved!");
    });
});
