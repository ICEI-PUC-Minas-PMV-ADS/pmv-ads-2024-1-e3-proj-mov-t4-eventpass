export function obterPrimeiroNome(nomeCompleto?: string) {
    if (!nomeCompleto) {
        return null;
    }

    const palavras = nomeCompleto.trim().split(' ');
    
    if (palavras.length > 1) {
        return palavras[0];
    }

    return nomeCompleto;
}