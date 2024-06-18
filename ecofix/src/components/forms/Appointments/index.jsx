import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Appointment.css';

const Appointments = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialist: '',
    date: null,
    time: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    console.log(formData);
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div className="profile-page">
      <h2 onClick={toggleFormVisibility} className="toggle-title">
        Agendamento
      </h2>
      {formVisible && (
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
            <label htmlFor="specialist">Especialista:</label>
            <select
              id="specialist"
              name="specialist"
              value={formData.specialist}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="Especialista 1">Especialista 1</option>
              <option value="Especialista 2">Especialista 2</option>
              <option value="Especialista 3">Especialista 3</option>
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
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
            </select>
          </div>
          <button type="submit" className="submit-button">Enviar</button>
        </form>
      )}
    </div>
  );
};

export default Appointments;
