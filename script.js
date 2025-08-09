const tasks = [
    { question: "Im Süden gibt es am Abend Gewitter.", answer: "Im Süden wird es am Abend Gewitter geben." },
    { question: "Ich komme bestimmt pünktlich.", answer: "Ich werde bestimmt pünktlich kommen." },
    { question: "Dieser Film bekommt einen Oscar.", answer: "Dieser Film wird einen Oscar bekommen." },
    { question: "Du gehst jetzt sofort ins Bett.", answer: "Du wirst jetzt sofort ins Bett gehen." },
    { question: "Ich esse nie wieder Süßigkeiten.", answer: "Ich werde nie wieder Süßigkeiten essen." },
    { question: "Ich helfe dir, wenn du es allein nicht schaffst.", answer: "Ich werde dir helfen, wenn du es allein nicht schaffst." },
    { question: "Du lässt mich jetzt sofort in Ruhe.", answer: "Du wirst mich jetzt sofort in Ruhe lassen." },
    { question: "Ich trinke nie wieder so viel Wodka.", answer: "Ich werde nie wieder so viel Wodka trinken." },
    { question: "Ich mache jeden Tag meine Hausaufgaben.", answer: "Ich werde jeden Tag meine Hausaufgaben machen." },
    { question: "Ihr heiratet und bekommt drei Kinder.", answer: "Ihr werdet heiraten und drei Kinder bekommen." },
    { question: "Ich fahre nie wieder so schnell.", answer: "Ich werde nie wieder so schnell fahren." },
    { question: "Morgen fange ich an, eine Arbeit zu suchen.", answer: "Morgen werde ich anfangen, eine Arbeit zu suchen." },
    { question: "Ich gebe dir das Geld ganz sicher zurück.", answer: "Ich werde dir das Geld ganz sicher zurückgeben." },
    { question: "Die Arbeitslosigkeit steigt.", answer: "Die Arbeitslosigkeit wird steigen." },
    { question: "Du hörst jetzt sofort damit auf.", answer: "Du wirst jetzt sofort damit aufhören." },
    { question: "Im nächsten Jahr treibe ich regelmäßig Sport.", answer: "Im nächsten Jahr werde ich regelmäßig Sport treiben." },
    { question: "Es tut mir leid, aber das kommt nie wieder vor.", answer: "Es tut mir leid, aber das wird nie wieder vorkommen." },
    { question: "Im nächsten Jahr esse ich mehr Obst und Gemüse.", answer: "Im nächsten Jahr werde ich mehr Obst und Gemüse essen." }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);