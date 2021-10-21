const fkey = document.cookie.match(/fkey=[^;]+/)[0].replace(/fkey=/, "");

function getNewNotifs() {
    fetch("https://www.khanacademy.org/api/internal/user/notifications/readable", {
        "headers": {
        "x-ka-fkey" : fkey
        }
    }).then(response => response.json()).then(data => {
        let notifs = data.notifications;
        let notif = document.getElementsByClassName("_1bzguq7u");
        
        if(!notif.length && !notifs[0].read) {
            let n = document.createElement("div");
            n.setAttribute("aria-label", "You have a new notification");
            n.classList.add("_1bzguq7u");
            n.textContent = "Notifs";
            
            document.getElementsByClassName("_4jvfagi")[0].appendChild(n);
            document.head.getElementsByTagName("title")[0].textContent = "* " + document.head.getElementsByTagName("title")[0].textContent;
        } else if (notif.length && notifs[0].read) {
            notif[0].parentElement.removeChild(notif[0]);
            document.head.getElementsByTagName("title")[0].textContent = document.head.getElementsByTagName("title")[0].textContent.replace(/\*/, "").trim();
        }
        
        getNewNotifs();
    });
}

getNewNotifs();

const notifButton = document.getElementsByClassName("_aeiww5")[0];

notifButton.addEventListener("click", () =>{
    fetch("https://www.khanacademy.org/api/internal/user/notifications/clear_brand_new", {
        "headers": {
            "x-ka-fkey": fkey
        },
        "method": "POST",
    });
});