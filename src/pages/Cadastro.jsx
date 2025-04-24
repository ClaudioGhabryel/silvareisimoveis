import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    nascimento: '',
    senha: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.email && form.senha) {
      localStorage.setItem(form.email, JSON.stringify(form));
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } else {
      alert('Preencha todos os campos obrigatórios!');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Cadastro</h2>
      {['nome', 'email', 'telefone', 'cpf', 'nascimento', 'senha'].map((field, i) => (
        <div key={i}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type={field === 'senha' ? 'password' : field === 'nascimento' ? 'date' : 'text'}
            name={field}
            value={form[field]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Cadastrar</button>
    </div>
  );
}

export default Cadastro;
