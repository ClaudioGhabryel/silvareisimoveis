import { useNavigate } from 'react-router-dom';
import './AreaCliente.css'; // se quiser estilizar separado

function AreaCliente() {
  const navigate = useNavigate();

  const handleNavegar = (rota) => {
    alert(`Redirecionando para: ${rota}`);
    // Aqui você pode usar: navigate(`/${rota}`) se quiser navegar de verdade
  };

  return (
    <div className="area-cliente-container">
      <h2>Bem-vindo à sua área de cliente</h2>
      <div className="menu-cliente">
        <button onClick={() => handleNavegar('imoveis')}>Imóveis disponíveis</button>
        <button onClick={() => handleNavegar('meu-imovel')}>Meu Imóvel</button>
        <button onClick={() => handleNavegar('meu-boleto')}>Meu Boleto</button>
        <button onClick={() => handleNavegar('meu-contrato')}>Meu Contrato</button>
        <button onClick={() => handleNavegar('suporte')}>Suporte</button>
      </div>
    </div>
  );
}

export default AreaCliente;
