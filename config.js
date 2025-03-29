let ChannelId = " Loading...";
Twitch.ext.onAuthorized((auth) => {
    ChannelId = auth.channelId;
    
});
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("config-form");
    const setting3Input = document.getElementById("setting3");
    
    
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const setting3 = setting3Input.value;
        let settings = {
            choice_timer: setting3 || 300
        };
        Twitch.ext.configuration.set("broadcaster", "500", JSON.stringify(settings));
        socket.emit("settings",ChannelId,/*settings:*/settings);
    });
    
    document.getElementById("channel-id-txt").innerHTML = "Channel ID: " + ChannelId;
    document.getElementById("channel-id-txt").style.color = "rgb(255, 166, 0)";
});
