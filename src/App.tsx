import { useState, FormEvent } from 'react'
import './App.css'

import logoImg from './assets/logo.png'

function App() {

  const [gasolinaInput, setGasolinaInput] = useState(0)
  const [alcoolInput, setAlcoolInput] = useState(0)
  const [info, setInfo] = useState<InfoProps>()

  interface InfoProps{
    title: string;
    gasolina: string | number;
    alcool: string | number;
  }

  function Calcular(event: FormEvent){
    event.preventDefault();

    let calculo = (alcoolInput / gasolinaInput);
    if( calculo <= 0.7){
      setInfo({
        title: 'álcool',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      })
    }else{
      setInfo({
        title: 'gasolina',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      })
    }
  }

  function formatarMoeda(valor: number){
    let valorFormatado = valor.toLocaleString("pt-br",
    {style: 'currency',
    currency: 'BRL'
    })

    return valorFormatado;
  }


  return (
      <div>
        <main className='container'>
          <img
          className='logo'
          src={logoImg}
          alt='Logo da Calculadora de Combustível'
          />
          <h1 className='title'>Qual é a melhor opção?</h1>

          <form className='form' onSubmit={Calcular}>
            <label>Álcool (preço por litro):</label>
            <input
              className='input'
              type='number'
              placeholder='4,90'
              min='1'
              step='0.01'
              required
              value={alcoolInput}
              onChange={ (e) => setAlcoolInput(Number(e.target.value))}
            />

            <label>Gasolina (preço por litro):</label>
            <input
              className='input'
              type='number'
              placeholder='4,90'
              min='1'
              step='0.01'
              required
              value={gasolinaInput}
              onChange={ (e) => setGasolinaInput(Number(e.target.value))}
            />
            <div className='btn-wrapper'>
              <input 
                type="submit" 
                value='Calcular'
                className='btn'
              />
            </div>
          </form>

          {info && Object.keys(info).length > 0 && (
            <section className='result'>
              <h2 className='result-title'>Compensa usar <strong>{info.title}!</strong></h2>
              <span>Álcool {info.alcool}</span>
              <span>Gasolina {info.gasolina}</span>
            </section>
          )}
        </main>
      </div>
  )
}

export default App
