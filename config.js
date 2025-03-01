
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("config-form");

    const setting1Input = document.getElementById("setting1");
    const setting2Input = document.getElementById("setting2");

    setting1Input.checked = localStorage.getItem("setting1") === "true";
    setting2Input.checked = localStorage.getItem("setting2") === "true";

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const setting1 = setting1Input.checked ? "Enabled" : "Disabled";
        const setting2 = setting2Input.checked ? "Enabled" : "Disabled";

        localStorage.setItem("setting1", setting1Input.checked);
        localStorage.setItem("setting2", setting2Input.checked);

        alert(`Settings saved! 1=${setting1} 2=${setting2}`);
        window.sendMessage(`Settings saved! 1=${setting1} 2=${setting2}`);
    });
});
