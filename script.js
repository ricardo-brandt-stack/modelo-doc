document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const btnPrint = document.getElementById('btn-print');
    
    // 1. TEMA
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        themeToggleBtn.innerText = isLight ? '☀️ Claro' : '🌙 Escuro';
    });

    // 2. MAPEAMENTO DOS CAMPOS EM TEMPO REAL
    const fieldsMap = [
        { input: 'input-line1', view: 'view-line1' },
        { input: 'input-line2', view: 'view-line2' },
        { input: 'input-line3', view: 'view-line3' },
        { input: 'input-line4', view: 'view-line4' },
        { input: 'input-num-oficio', view: 'view-num-oficio' },
        { input: 'input-local-data', view: 'view-local-data' },
        { input: 'input-assunto', view: 'view-assunto' },
        { input: 'input-dest-vocativo', view: 'view-dest-vocativo' },
        { input: 'input-dest-nome', view: 'view-dest-nome' },
        { input: 'input-dest-setor', view: 'view-dest-setor' },
        { input: 'input-dest-endereco', view: 'view-dest-endereco', isMultiline: true },
        { input: 'input-saudacao', view: 'view-saudacao' },
        { input: 'input-fechamento', view: 'view-fechamento' },
        { input: 'input-selo-assinatura', view: 'view-selo-assinatura' },
        { input: 'input-nome-subscritor', view: 'view-nome-subscritor' },
        { input: 'input-cargo-subscritor', view: 'view-cargo-subscritor' },
        { input: 'input-rodape-end', view: 'view-rodape-end' },
        { input: 'input-rodape-contato', view: 'view-rodape-contato' }
    ];

    fieldsMap.forEach(item => {
        const inputEl = document.getElementById(item.input);
        const viewEl = document.getElementById(item.view);

        if (inputEl && viewEl) {
            inputEl.addEventListener('input', () => {
                if (item.isMultiline) {
                    viewEl.innerHTML = inputEl.value.replace(/\n/g, '<br>');
                } else {
                    viewEl.innerText = inputEl.value;
                }
            });
        }
    });

    // 3. PARSER DO CORPO DO TEXTO
    const inputCorpo = document.getElementById('input-corpo');
    const viewCorpo = document.getElementById('view-corpo');

    function updateCorpo() {
        const text = inputCorpo.value;
        const paragraphs = text.split('\n\n');
        
        viewCorpo.innerHTML = paragraphs
            .filter(p => p.trim() !== '')
            .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
            .join('');
    }

    inputCorpo.addEventListener('input', updateCorpo);
    updateCorpo();

    // 4. UPLOAD DO LOGÓTIPO
    const inputLogo = document.getElementById('input-logo');
    const viewLogo = document.getElementById('view-logo');

    inputLogo.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                viewLogo.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // 5. IMPRESSÃO
    btnPrint.addEventListener('click', () => {
        window.print();
    });
});