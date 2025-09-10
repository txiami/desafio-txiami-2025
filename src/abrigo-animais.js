const ANIMAIS = new Map([
  ['Rex', { especie: 'cão', brinquedos: ['RATO', 'BOLA'] }],
  ['Mimi', { especie: 'gato', brinquedos: ['BOLA', 'LASER'] }],
  ['Fofo', { especie: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] }],
  ['Zero', { especie: 'gato', brinquedos: ['RATO', 'BOLA'] }],
  ['Bola', { especie: 'cão', brinquedos: ['CAIXA', 'NOVELO'] }],
  ['Bebe', { especie: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] }],
  ['Loco', { especie: 'jabuti', brinquedos: ['SKATE', 'RATO'] }]
]);

const MAX_ANIMAIS_POR_PESSOA = 3;

class AbrigoAnimais {

  pessoaPodeAdotar(brinquedosPessoa, brinquedosAnimal) {
    if (brinquedosAnimal.length === 0) return true;

    let indiceBrinquedoAnimal = 0;
    for (const brinquedoPessoa of brinquedosPessoa) {
      if (brinquedoPessoa === brinquedosAnimal[indiceBrinquedoAnimal]) {
        indiceBrinquedoAnimal++;
      }
      if (indiceBrinquedoAnimal === brinquedosAnimal.length) {
        return true;
      }
    }
    return false;
  }

  pessoaPodeAdotarLoco(brinquedosPessoa, brinquedosLoco) {
    if (brinquedosLoco.length === 0) return true;
    const brinquedosPessoaSet = new Set(brinquedosPessoa);
    return brinquedosLoco.every(brinquedo => brinquedosPessoaSet.has(brinquedo));
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const listaBrinquedosP1 = brinquedosPessoa1 === '' ? [] : brinquedosPessoa1.split(',').map(b => b.trim());
    const listaBrinquedosP2 = brinquedosPessoa2 === '' ? [] : brinquedosPessoa2.split(',').map(b => b.trim());
    const animaisParaConsiderar = ordemAnimais === '' ? [] : ordemAnimais.split(',').map(a => a.trim());

    if (new Set(listaBrinquedosP1).size !== listaBrinquedosP1.length || new Set(listaBrinquedosP2).size !== listaBrinquedosP2.length) {
      return { erro: 'Brinquedo inválido' };
    }

    const nomesAnimaisUnicos = new Set();
    for (const nomeAnimal of animaisParaConsiderar) {
      if (!ANIMAIS.has(nomeAnimal) || nomesAnimaisUnicos.has(nomeAnimal)) {
        return { erro: 'Animal inválido' };
      }
      nomesAnimaisUnicos.add(nomeAnimal);
    }

    const adocoesPessoa1 = [];
    const adocoesPessoa2 = [];
    const resultados = [];

    for (const nomeAnimal of animaisParaConsiderar) {
      const animal = ANIMAIS.get(nomeAnimal);
      let podeAdotarP1, podeAdotarP2;

      if (nomeAnimal === 'Loco' && animaisParaConsiderar.length > 1) {
        podeAdotarP1 = this.pessoaPodeAdotarLoco(listaBrinquedosP1, animal.brinquedos);
        podeAdotarP2 = this.pessoaPodeAdotarLoco(listaBrinquedosP2, animal.brinquedos);
      } else {
        podeAdotarP1 = this.pessoaPodeAdotar(listaBrinquedosP1, animal.brinquedos);
        podeAdotarP2 = this.pessoaPodeAdotar(listaBrinquedosP2, animal.brinquedos);
      }

      const pessoa1AtingiuLimite = adocoesPessoa1.length >= MAX_ANIMAIS_POR_PESSOA;
      const pessoa2AtingiuLimite = adocoesPessoa2.length >= MAX_ANIMAIS_POR_PESSOA;

      const aptoP1 = podeAdotarP1 && !pessoa1AtingiuLimite;
      const aptoP2 = podeAdotarP2 && !pessoa2AtingiuLimite;

      if (aptoP1 && aptoP2) {
        resultados.push(`${nomeAnimal} - abrigo`);
      } else if (aptoP1) {
        resultados.push(`${nomeAnimal} - pessoa 1`);
        adocoesPessoa1.push(nomeAnimal);
      } else if (aptoP2) {
        resultados.push(`${nomeAnimal} - pessoa 2`);
        adocoesPessoa2.push(nomeAnimal);
      } else {
        resultados.push(`${nomeAnimal} - abrigo`);
      }
    }

    resultados.sort();
    return { lista: resultados };
  }
}

export { AbrigoAnimais as AbrigoAnimais };