document.getElementById("csvFile").addEventListener("change", handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Mostra o indicador de carregamento
    const loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = 'block';

    // Leitura do arquivo com a codificação correta (ISO-8859-1)
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;

        Papa.parse(text, {
            header: true, // Trata a primeira linha como cabeçalhos
            encoding: "ISO-8859-1", // Força a leitura com a codificação correta
            worker: true, // Usa Web Workers para evitar travamento
            step: function(results) {
                processRow(results.data); // Processa linha por linha
            },
            complete: function() {
                console.log("Parsing completo!");
                loadingIndicator.style.display = 'none'; // Esconde o indicador de carregamento
            },
            error: function(err) {
                console.error("Erro ao processar o arquivo", err);
                loadingIndicator.style.display = 'none';
            }
        });
    };

    // Lê o arquivo como texto
    reader.readAsText(file, "ISO-8859-1");
}

function processRow(row) {
    const outputDiv = document.getElementById("output");
    
    // Exibe os dados da linha no DOM
    const rowDiv = document.createElement("div");
    rowDiv.textContent = JSON.stringify(row);
    outputDiv.appendChild(rowDiv);
}
