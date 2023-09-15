let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];


const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Reihen
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Reihen
    [0, 4, 8], [2, 4, 6] // Diagonale Reihen
];


let currentPlayer = "circle";


function init() {
    render();
}


function render() {
    const content = document.getElementById('content');
    const table = document.createElement('table');

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            const fieldValue = fields[i * 3 + j];

            // Füge das onclick-Attribut hinzu und weise die handleClick-Funktion zu
            cell.setAttribute('onclick', `handleClick(${i}, ${j})`);

            if (fieldValue === 'circle') {
                cell.innerHTML = generateAnimatedCircleSVG();
            } else if (fieldValue === 'cross') {
                cell.innerHTML = generateAnimatedCrossSVG();
            }

            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    content.innerHTML = '';
    content.appendChild(table);
}


function restart(){
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ];

    render();
}


function handleClick(row, col) {
    const index = row * 3 + col;

    // Überprüfe, ob das Spiel bereits vorbei ist
    if (checkGameStatus()) {
        return;
    }

    // Überprüfe, ob das Feld bereits belegt ist
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        render(); // Aktualisiere das Spielfeld
        currentPlayer = currentPlayer === "circle" ? "cross" : "circle"; // Wechsle den Spieler

        // Entferne das onclick-Attribut, um erneutes Klicken zu verhindern
        document.querySelector(`[onclick="handleClick(${row}, ${col})"]`).removeAttribute('onclick');

        // Überprüfe erneut, ob das Spiel nach dem aktuellen Zug vorbei ist
        const gameStatus = checkGameStatus();
        if (gameStatus) {
            // Hier kannst du entsprechende Aktionen ausführen, z.B. den Gewinner anzeigen oder das Spiel neu starten
            console.log("Spiel vorbei! Gewinner: " + gameStatus);
        }
    }
}


function generateAnimatedCircleSVG() {
    const circleSVG = `
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="0" fill="transparent" stroke="#00B0EF" stroke-width="5">
                <animate attributeName="r" from="0" to="30" dur="125ms" begin="0s" fill="freeze" />
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 35 35" to="360 35 35" dur="125ms" begin="0s" fill="freeze" repeatCount="1" />
            </circle>
        </svg>
    `;
    return circleSVG;
}


function generateAnimatedCrossSVG() {
    const crossSVG = `
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="70" y2="70" stroke="#FFC000" stroke-width="5">
                <animate attributeName="x2" values="0; 70" dur="125ms" fill="freeze" />
                <animate attributeName="y2" values="0; 70" dur="125ms" fill="freeze" />
            </line>
            <line x1="70" y1="0" x2="0" y2="70" stroke="#FFC000" stroke-width="5">
                <animate attributeName="x2" values="70; 0" dur="125ms" fill="freeze" />
                <animate attributeName="y2" values="0; 70" dur="125ms" fill="freeze" />
            </line>
        </svg>
    `;
    return crossSVG;
}


function checkGameStatus() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) { // hier wird geprüft, ob feld 1 den gleichen wert hat wie feld 2 und ob feld 2 den gleichen wert hat wie feld 3 und fields[a] bedeutet, dass das erste feld nicht null ist (null = 0; true = 1)
            // Das Spiel ist vorbei, jemand hat gewonnen
            drawWinningLine(combination);
            return fields[a]; // Gibt den Gewinner zurück (circle oder cross)
        }
    }

    // Überprüfe, ob das Spiel unentschieden ist
    if (!fields.includes(null)) {
        return 'draw'; // Unentschieden
    }

    return null; // Das Spiel ist noch nicht vorbei
}


// Funktion, um eine weiße Linie zu zeichnen, die die gewinnenden Elemente verbindet
function drawWinningLine(combination) {
    const content = document.getElementById('content');
    const [a, b, c] = combination;

    // Erstelle ein SVG-Element für die Linie
    const lineSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    lineSVG.setAttribute("width", "100%");
    lineSVG.setAttribute("height", "100%");
    lineSVG.style.position = "absolute";
    lineSVG.style.zIndex = "1";
    
    // Zeichne die Linie
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    const cells = document.querySelectorAll('td');
    line.setAttribute("x1", cells[a].offsetLeft + cells[a].offsetWidth / 2);
    line.setAttribute("y1", cells[a].offsetTop + cells[a].offsetHeight / 2);
    line.setAttribute("x2", cells[c].offsetLeft + cells[c].offsetWidth / 2);
    line.setAttribute("y2", cells[c].offsetTop + cells[c].offsetHeight / 2);
    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "5");
    lineSVG.appendChild(line);

    // Füge das SVG-Element zum Content-Container hinzu
    content.appendChild(lineSVG);
}