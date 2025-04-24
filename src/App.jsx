import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const imoveisData = [
  {
    id: 1,
    titulo: "Apartamento - Setor Bueno",
    preco: "R$ 1.500/mês - 2 Quartos",
    valor: 1500,
    tipo: "Apartamento",
    local: "Setor Bueno",
    imagens: ["/img/imovel1.jpg", "/img/imovel1b.jpg", "/img/imovel1c.jpg"]
  },
  {
    id: 2,
    titulo: "Casa com garagem - Jardim América",
    preco: "R$ 2.100/mês - 3 Quartos",
    valor: 2100,
    tipo: "Casa",
    local: "Jardim América",
    imagens: ["/img/imovel2.jpg", "/img/imovel2b.jpg", "/img/imovel2c.jpg"]
  }
];

function Galeria({ imagens }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const next = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((index + 1) % imagens.length);
      setFade(true);
    }, 200);
  };

  const prev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((index - 1 + imagens.length) % imagens.length);
      setFade(true);
    }, 200);
  };

  return (
    <div className="galeria">
      <button className="seta" onClick={prev}>←</button>
      <img src={imagens[index]} alt="Imóvel" style={{ opacity: fade ? 1 : 0.4 }} />
      <button className="seta" onClick={next}>→</button>
    </div>
  );
}

function App() {
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('');
  const [precoMax, setPrecoMax] = useState(3000);
  const [resultado, setResultado] = useState(imoveisData);
  const [mostrarCards, setMostrarCards] = useState(true);

  const navigate = useNavigate(); // hook de navegação

  const filtrar = (e) => {
    e.preventDefault();
    setMostrarCards(false);

    const filtrado = imoveisData.filter((i) => {
      const matchBusca = i.local.toLowerCase().includes(busca.toLowerCase());
      const matchTipo = tipo ? i.tipo === tipo : true;
      const matchPreco = i.valor <= precoMax;
      return matchBusca && matchTipo && matchPreco;
    });

    setTimeout(() => {
      setResultado(filtrado);
      setMostrarCards(true);
    }, 250);
  };

  return (
    <div>
      <header className="header">
        <div className="header-top">
          <img src="/img/logo.png" className="logo" alt="Logo Silva Reis Imóveis" />
          <h1>Silva Reis Imóveis</h1>
          <div className="auth-buttons">
            <button onClick={() => navigate('/login')}>Entrar</button>
            <button className="cadastro" onClick={() => navigate('/cadastro')}>Cadastro</button>
          </div>
        </div>
      </header>

      <section className="busca">
        <h2>Encontre seu imóvel</h2>
        <form onSubmit={filtrar}>
          <input
            type="text"
            placeholder="Cidade, bairro ou rua"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Todos</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Casa">Casa</option>
            <option value="Comercial">Comercial</option>
          </select>
          <div className="range-container">
            <label htmlFor="preco">Até R$ {precoMax}</label>
            <input
              type="range"
              id="preco"
              min="500"
              max="10000"
              step="100"
              value={precoMax}
              onChange={(e) => setPrecoMax(Number(e.target.value))}
            />
            <input
              type="number"
              min="500"
              max="10000"
              step="100"
              value={precoMax}
              onChange={(e) => setPrecoMax(Number(e.target.value))}
            />
          </div>
          <button type="submit">Buscar</button>
        </form>
      </section>

      <section className={`cards ${mostrarCards ? 'fade-in' : 'fade-out'}`}>
        {resultado.length > 0 ? resultado.map(imovel => (
          <div key={imovel.id} className="card">
            <Galeria imagens={imovel.imagens} />
            <h3>{imovel.titulo}</h3>
            <p>{imovel.preco}</p>
            <button>Ver detalhes</button>
          </div>
        )) : <p style={{ color: '#aaa' }}>Nenhum imóvel encontrado.</p>}
      </section>

      <footer className="footer">
        <p>&copy; 2025 Silva Reis Imóveis - CRECI 36.724</p>
        <p className="hashtag">#TeamSilvaReisImóveis 😎🏡</p>
      </footer>
    </div>
  );
}

export default App;
