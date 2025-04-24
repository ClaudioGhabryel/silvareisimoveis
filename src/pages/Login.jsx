import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const dadosSalvos = JSON.parse(localStorage.getItem(email));

    if (!dadosSalvos) {
      alert('Usuário não encontrado.');
      return;
    }

    if (dadosSalvos.senha !== senha) {
      alert('Senha incorreta.');
      return;
    }

    alert('Login realizado com sucesso!');
    navigate('/cliente');
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Senha</label>
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default Login;
