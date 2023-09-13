let fields = [
    null,
    "circle",
    null,
    null,
    "cross",
    null,
    null,
    null,
    null
];


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