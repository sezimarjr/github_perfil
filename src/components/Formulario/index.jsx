import { useState, useEffect } from "react";

const Formulario = () => {
  const [materiaA, setMateriaA] = useState(0);
  const [materiaB, setMateriaB] = useState(0);
  const [materiaC, setMateriaC] = useState(0);
  const [nome, setNome] = useState("");

  useEffect(() => {
    console.log("o componente iniciou");

    return () => {
      console.log("Componente finalizou");
    };
  }, []);

  useEffect(() => {
    console.log("o Estado nome mudou");
  }, [nome]);

  const alteraNome = (event) => {
    // console.log(event.target.value);
    // setNome()
    setNome((estadoAnterior) => {
      return event.target.value;
    });
  };

  const renderizaResultado = () => {
    const soma = materiaA + materiaB + materiaC;
    const media = soma / 3;

    if (media >= 7) {
      return <p>Olá {nome}, você foi aprovado</p>;
    } else {
      return <p>Olá {nome}, você foi reprovado por favor estude mais</p>;
    }
  };
  return (
    <form>
      <ul>
        {[1, 2, 3, 4, 5].map((item) => (
          <li key={item}> {item}</li>
        ))}
      </ul>
      <input type="text" placeholder="Seu nome" onChange={alteraNome} />
      <input
        type="number"
        max={10}
        placeholder="Nota materia A"
        onChange={(event) => setMateriaA(parseInt(event.target.value))}
      />
      <input
        type="number"
        max={10}
        placeholder="Nota materia B"
        onChange={(event) => setMateriaB(parseInt(event.target.value))}
      />
      <input
        type="number"
        max={10}
        placeholder="Nota materia C"
        onChange={(event) => setMateriaC(parseInt(event.target.value))}
      />
      {renderizaResultado()}
    </form>
  );
};

export default Formulario;
