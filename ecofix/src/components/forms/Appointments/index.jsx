import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Appointment.css';
import { collection, getDocs, query, where, addDoc, getFirestore } from 'firebase/firestore';
import app from '../../DatabaseConnection';
import ptBR from 'date-fns/locale/pt-BR';


const db =getFirestore(app);

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

  useEffect(() => {
    const fetchSpecialists = async () => {
      const q = query(collection(db, "usuarios"), where("role", "==", "specialist"));
      const querySnapshot = await getDocs(q);
      const specialistsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSpecialists(specialistsList);
    };

    fetchSpecialists();
  }, []);

  useEffect(() => {
    if (formData.specialist && formData.date) {
      const fetchBusyTimes = async () => {
        const q = query(
          collection(db, "agendamentos"),
          where("specialist", "==", formData.specialist),
          where("date", "==", formData.date.toISOString().split('T')[0])
        );
        const querySnapshot = await getDocs(q);
        const times = querySnapshot.docs.map(doc => doc.data().time);
        setBusyTimes(times);
      };

      fetchBusyTimes();
    } else {
      setBusyTimes([]);
    }
  }, [formData.specialist, formData.date]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "agendamentos"), {
        ...formData,
        date: formData.date.toISOString().split('T')[0]
      });
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
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
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
          <button type="submit" className="submit-button">Enviar</button>
        </form>
    </div>
  );
};

export default Appointments;
