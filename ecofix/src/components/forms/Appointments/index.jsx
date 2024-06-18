import { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Appointment.css';
import { doc, getDoc, getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
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

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const specialistsRef = collection(db, "usuarios");
        const specialistsSnapshot = await getDocs(specialistsRef);
        const specialistsList = specialistsSnapshot.docs.map(doc => doc.data());
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
          const busyTimesRef = doc(db, "appointments", `${formData.specialist}-${formData.date.toISOString().split('T')[0]}`);
          const docSnap = await getDoc(busyTimesRef);

          if (docSnap.exists()) {
            const times = docSnap.data().time;
            setBusyTimes(times);
          } else {
            console.error("No such document!");
          }
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedSpecialistEmail = formData.specialist;
      const specialistQuery = query(collection(db, "usuarios"), where("email", "==", selectedSpecialistEmail));
      const specialistSnapshot = await getDocs(specialistQuery);

      if (specialistSnapshot.empty) {
        alert('Especialista não encontrado.');
        return;
      }

      const specialistDoc = specialistSnapshot.docs[0];
      const specialistData = specialistDoc.data();
      const specialistUID = specialistData.uid;

      const appointmentData = {
        ...formData,
        date: formData.date ? formData.date.toISOString().split('T')[0] : null
      };

      if (!appointmentData.name || !appointmentData.email || !appointmentData.phone || !appointmentData.specialist || !appointmentData.date || !appointmentData.time) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      await addDoc(collection(db, "appointments"), {
        ...appointmentData,
        specialistUID
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
              <option key={specialist.uid} value={specialist.email}>
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
