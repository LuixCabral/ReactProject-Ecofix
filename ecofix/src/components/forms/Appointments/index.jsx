import { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Appointment.css';
import { collection, getDocs, query, where, addDoc, getFirestore } from 'firebase/firestore';
import app from '../../DatabaseConnection';
import ptBR from 'date-fns/locale/pt-BR';

const db = getFirestore(app);

registerLocale('pt-BR', ptBR);

const Appointments = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialist: '',
    date: null,
    time: '',
    description: ''
  });
  const [specialists, setSpecialists] = useState([]);
  const [busyTimes, setBusyTimes] = useState([]);
  const [errors, setErrors] = useState({ email: '', phone: '' });

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const q = query(collection(db, "usuarios"), where("role", "==", "specialist"));
        const querySnapshot = await getDocs(q);
        const specialistsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSpecialists(specialistsList);
      } catch (error) {
        console.error("Erro ao buscar especialistas:", error);
      }
    };

    fetchSpecialists();
  }, []);

  useEffect(() => {
    if (formData.specialist && formData.date) {
      const fetchBusyTimes = async () => {
        try {
          const q = query(
            collection(db, "appointments"),
            where("specialist", "==", formData.specialist),
            where("date", "==", formData.date.toISOString().split('T')[0])
          );
          const querySnapshot = await getDocs(q);
          const times = querySnapshot.docs.map(doc => doc.data().time);
          setBusyTimes(times);
        } catch (error) {
          console.error("Erro ao buscar horários ocupados:", error);
        }
      };

      fetchBusyTimes();
    } else {
      setBusyTimes([]);
    }
  }, [formData.specialist, formData.date]);


const handleChange = (e) => {
  const { name, value } = e.target;

  // Update form data
  setFormData(prevFormData => ({
    ...prevFormData,
    [name]: value
  }));

  // Validate email and phone on change
  if (name === 'email') {
    setErrors(prevErrors => ({
      ...prevErrors,
      email: validateEmail(value) ? '' : 'Email inválido.'
    }));
  }

  let newValue = value;

  if (name === 'phone') {
    // Remove todos os caracteres não numéricos
    const newValue = value.replace(/\D/g, '');

    // Atualiza o campo de telefone formatado
    setFormData(prevFormData => ({
      ...prevFormData,
      phone: formatPhone(newValue)
    }));

    // Valida o telefone formatado
    setErrors(prevErrors => ({
      ...prevErrors,
      phone: validatePhone(newValue) ? '' : 'Telefone inválido.'
    }));
}
};

const handleDateChange = (date) => {
  setFormData(prevFormData => ({
    ...prevFormData,
    date
  }));
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  // Remove todos os caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');

  // Aceita números entre 9 e 11 dígitos
  const phoneRegex = /^\d{11}$/;
  return phoneRegex.test(cleaned);
};

const formatPhone = (phone) => {
  // Formata o telefone inserindo parênteses e hífen
  let formattedPhone = phone.replace(/\D/g, '');

  if (formattedPhone.length > 2) {
    formattedPhone = `(${formattedPhone.substring(0, 2)})${formattedPhone.substring(2)}`;
  }

  return formattedPhone;
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValid = validateEmail(formData.email);
    const phoneValid = validatePhone(formData.phone);

    if (!emailValid || !phoneValid) {
      setErrors({
        email: emailValid ? '' : 'email inválido.',
        phone: phoneValid ? '' : 'telefone inválido.'
      });
      setFormData({
        email:'',
        phone:'',
      })
      return;
    } else {
      setErrors({ email: '', phone: '' });
    }

    try {
      const appointmentData = {
        ...formData,
        date: formData.date ? formData.date.toISOString().split('T')[0] : null
      };

      // Check for missing fields
      if (!appointmentData.name || !appointmentData.email || !appointmentData.phone || !appointmentData.specialist || !appointmentData.date || !appointmentData.time) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      alert('Agendamento realizado com sucesso!');

      setFormData({
        name: '',
        email: '',
        phone: '',
        specialist: '',
        date: null,
        time: '',
        description: ''
      });
    } catch (error) {
      console.error("Erro ao agendar: ", error);
      alert('Erro ao agendar, tente novamente.');
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  const availableTimes = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"].filter(time => !busyTimes.includes(time));

  return (
    <div className="profile-page" onClick={e => e.stopPropagation()}>
      <h2 onClick={toggleFormVisibility} className="toggle-title">
        Agendamento 
      </h2>
      
        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group email">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='exemplo@email.com'
              required
            />
            {errors.email && <div className="errorEmail">{errors.email}</div>}
          </div>
          <div className="form-group telefone">
            <label htmlFor="phone">Telefone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder='Somente números.'
              required
            />
            {errors.phone && <div className="errorPhone">{errors.phone}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="specialist">Especialista:</label>
            <select
              id="specialist"
              name="specialist"
              value={formData.specialist}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              {specialists.map((specialist) => (
                <option key={specialist.id} value={specialist.name}>
                  {specialist.name} ({specialist.email})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Data:</label>
            <DatePicker
              id="date"
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              required
              className="datepicker"
              locale="pt-BR"
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Hora:</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Observação (Opcional):</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleSubmit} className="submit-button">Enviar</button>
        </form>
    </div>
  );
};

export default Appointments;
