const versions = document.getElementById("vers");
fetch('versionsV3/versions.json').then((response) => response.json()).then((json) => {
    const map = Object.entries(json);
    map.sort((a, b) => {
        return (a[1].releaseTime < b[1].releaseTime) ? 1 : ((a[1].releaseTime > b[1].releaseTime) ? -1 : 0);
    })
    for (var i = 0; i < map.length; i++) {
        const entry = map[i];
        const versionID = entry[1].id;
        const versionJSON = entry[1].url;

        fetch(versionJSON).then((response2) => response2.json()).then((json2) => {
            const downloads = json2.downloads;
            const clientURL = downloads.client.url;
            const serverURL = downloads.server != null ? downloads.server.url : undefined;

            const mappings = entry[1].resources;
            const div = document.createElement("div");
            div.onfocus = function() {
                history.pushState({}, "", "#" + versionID)
            };
            //div.onblur = function() { history.pushState({}, "", " ") };
            div.id = versionID;
            div.className = "mc scrollitem";
            div.tabIndex = -1;

            const child1 = document.createElement("div");
            child1.className = "flex_space";
            child1.appendChild(document.createTextNode(versionID));

            const child3 = document.createElement("span");
            child3.className = "flex";

            const child4 = document.createElement("a");
            child4.href = clientURL;
            child4.appendChild(document.createTextNode("Client"));
            child3.appendChild(child4);
            child3.appendChild(getServerTag(serverURL));
            child1.appendChild(child3);

            const child2 = document.createElement("a");
            child2.href = mappings;
            child2.className = "res minwidth";
            child2.appendChild(document.createTextNode("Mappings"));
            div.appendChild(child1);
            div.appendChild(child2);
            versions.appendChild(div);
            if (div.id == location.hash.slice(1)) {
                scrollTo(location.hash);
            }
        })
    }
}).catch((err) => {
    versions.innerHTML = "<div class=\"red mc\">Versions could not be loaded</div>";
})

function addEvents(textBox) {
    textBox.addEventListener("keydown", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            var childDivs = document.getElementById('vers').getElementsByTagName('div');

            for (i = 0; i < childDivs.length; i++) {
                var childDiv = childDivs[i];
                if (childDiv.id.includes(searchBox.value)) {
                    scrollTo(childDiv.id);
                    return;
                }
            }
        }
    })
}

function updateSearch(searchBox, changeFocus) {
    var childDivs = document.getElementById('vers').getElementsByTagName('div');
    var fullyEquals = null;
    for (i = 0; i < childDivs.length; i++) {
        var childDiv = childDivs[i];
        if (searchBox.value != "" && childDiv.id == searchBox.value) {
            fullyEquals = childDiv;
        }
    }
    if (fullyEquals != null) {
        if (changeFocus) {
            scrollTo(fullyEquals.id);
        } else {
            fullyEquals.scrollIntoView();
        }
        return;
    }
    for (i = 0; i < childDivs.length; i++) {
        var childDiv = childDivs[i];
        if (childDiv.id.includes(searchBox.value)) {
            if (changeFocus) {
                scrollTo(childDiv.id);
            } else {
                childDiv.scrollIntoView();
            }
            return;
        }
    }
}

function onKeyPress(searchBox, k) {
    console.log(1);
    var childDivs = document.getElementById('vers').getElementsByTagName('div');

    for (i = 0; i < childDivs.length; i++) {
        var childDiv = childDivs[i];
        if (k === Key && childDiv.id.includes(searchBox.value)) {
            scrollTo(childDiv.id);
            return;
        }
    }
}

function scrollTo(hash) {
    location.hash = "";
    location.hash = hash;
}

function getServerTag(serverURL) {
    if (notNullOrUndefined(serverURL)) {
        const tag = document.createElement("a");
        tag.href = serverURL;
        tag.appendChild(document.createTextNode("Server"));
        return tag;
    } else {
        const tag = document.createElement("span");
        tag.className = "darkgray";
        tag.appendChild(document.createTextNode("Server"));
        return tag;
    }
}

function notNullOrUndefined(thing) {
    if (typeof thing === "undefined") {
        return false
    } else if (thing === null) {
        return false
    } else {
        return true
    }
}