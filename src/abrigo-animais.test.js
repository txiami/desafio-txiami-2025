import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );

    expect(resultado.lista[0]).toBe("Bola - abrigo");
    expect(resultado.lista[1]).toBe("Fofo - pessoa 2");
    expect(resultado.lista[2]).toBe("Mimi - abrigo");
    expect(resultado.lista[3]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve rejeitar brinquedo duplicado", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,RATO,BOLA",
      "",
      "Rex"
    );
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve aplicar regra do Loco quando houver companhia", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,SKATE",
      "BOLA",
      "Loco,Rex"
    );
    expect(resultado.lista[0]).toBe("Loco - pessoa 1");
    expect(resultado.lista[1]).toBe("Rex - abrigo");
    expect(resultado.erro).toBeFalsy();
  });

  test("NÃO deve aplicar regra do Loco quando não houver companhia", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,SKATE",
      "",
      "Loco"
    );
    expect(resultado.lista[0]).toBe("Loco - abrigo");
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve limitar a adoção a 3 animais por pessoa", () => {
    const brinquedosPessoa1 = "LASER,RATO,BOLA,CAIXA,NOVELO";
    const animais = "Bebe,Rex,Zero,Bola";
    const resultado = new AbrigoAnimais().encontraPessoas(
      brinquedosPessoa1,
      "",
      animais
    );

    const adocoesPessoa1 = resultado.lista.filter((r) =>
      r.includes("pessoa 1")
    ).length;
    expect(adocoesPessoa1).toBe(3);

    expect(resultado.lista).toContain("Bola - abrigo");
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve retornar uma lista vazia para entradas vazias", () => {
    const resultado = new AbrigoAnimais().encontraPessoas("", "", "");
    expect(resultado.lista).toEqual([]);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve mandar para o abrigo quando ambos são aptos (empate)", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,BOLA",
      "Rex"
    );
    expect(resultado.lista[0]).toBe("Rex - abrigo");
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve mandar Loco para o abrigo quando ambos são aptos (empate)", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,SKATE",
      "SKATE,RATO",
      "Rex,Loco"
    );
    expect(resultado.lista[0]).toBe("Loco - abrigo");
    expect(resultado.lista[1]).toBe("Rex - abrigo");
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve passar o animal para pessoa 2 se a pessoa 1 atingir o limite (O Herdeiro)", () => {
    const brinquedosP1 = "LASER,RATO,BOLA,CAIXA,NOVELO";
    const brinquedosP2 = "CAIXA,NOVELO";
    const animais = "Bebe,Rex,Zero,Bola";

    const resultado = new AbrigoAnimais().encontraPessoas(
      brinquedosP1,
      brinquedosP2,
      animais
    );

    expect(resultado.lista).toContain("Bebe - pessoa 1");
    expect(resultado.lista).toContain("Rex - pessoa 1");
    expect(resultado.lista).toContain("Zero - pessoa 1");

    expect(resultado.lista).toContain("Bola - pessoa 2");

    const adocoesPessoa1 = resultado.lista.filter((r) =>
      r.includes("pessoa 1")
    ).length;
    expect(adocoesPessoa1).toBe(3);
  });
});
