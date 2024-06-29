const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote');
const shareQuoteBtn = document.getElementById('share-quote');

// Função para obter uma citação aleatória da API
async function fetchRandomQuote() {
    const apiUrl = 'https://api.quotable.io/random';
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erro ao carregar citação');
        }
        const data = await response.json();
        return { content: data.content, author: data.author };
    } catch (error) {
        console.error('Erro ao obter citação:', error);
        throw error; // Re-throw para que o erro seja tratado pelo caller
    }
}

// Função para atualizar a UI com a citação obtida
async function updateQuote() {
    try {
        const { content, author } = await fetchRandomQuote();
        if (content && author) {
            quoteText.textContent = content;
            quoteAuthor.textContent = `— ${author}`;
        } else {
            throw new Error('Citação inválida');
        }
    } catch (error) {
        console.error('Erro ao exibir citação:', error);
        quoteText.textContent = 'Erro ao carregar citação';
        quoteAuthor.textContent = '';
    }
}

// Evento para carregar uma nova citação ao clicar no botão
newQuoteBtn.addEventListener('click', updateQuote);

// Evento para compartilhar a citação no Twitter ao clicar no botão
shareQuoteBtn.addEventListener('click', () => {
    const quote = `${quoteText.textContent.trim()} ${quoteAuthor.textContent.trim()}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)}`;
    window.open(twitterUrl, '_blank');
});

// Carrega uma citação aleatória ao carregar a página inicialmente
updateQuote();
