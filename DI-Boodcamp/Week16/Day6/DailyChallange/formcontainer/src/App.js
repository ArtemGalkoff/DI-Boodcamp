import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    destination: '',
    gender: '',
    workConditions: {
      fullDay: false,
      withFood: false,
      withNargilla: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        workConditions: {
          ...prevData.workConditions,
          [name]: checked,
        },
      }));
    } else if (type === 'radio') {
      setFormData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Sent: ${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <div className="App">
      <h1>Forms</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="destination">Direction</label>
          <select
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
          >
            <option value="">Chose countrie</option>
            <option value="Gabon">Gabon</option>
            <option value="Panama">Panama</option>
            <option value="Nauru">Nauru</option>
          </select>
        </div>

        <div>
          <label>Пол</label>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />
            <label htmlFor="female">Femail</label>
          </div>
        </div>

        <div>
          <label>Conditionals of job</label>
          <div>
            <input
              type="checkbox"
              id="fullDay"
              name="fullDay"
              checked={formData.workConditions.fullDay}
              onChange={handleChange}
            />
            <label htmlFor="fullDay">From home</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="withFood"
              name="withFood"
              checked={formData.workConditions.withFood}
              onChange={handleChange}
            />
            <label htmlFor="withFood">With food</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="withNargilla"
              name="withNargilla"
              checked={formData.workConditions.withNargilla}
              onChange={handleChange}
            />
            <label htmlFor="withNargilla">With nargilla</label>
          </div>
        </div>

        <button type="submit">Send</button>
      </form>

      {/* Отображение введенной информации */}
      <div className="entered-info">
        <h2>Entered Information:</h2>
        <p><strong>Name:</strong> {formData.firstName}</p>
        <p><strong>Last name:</strong> {formData.lastName}</p>
        <p><strong>Age:</strong> {formData.age}</p>
        <p><strong>Direction:</strong> {formData.destination}</p>
        <p><strong>Sex:</strong> {formData.gender}</p>
        <p><strong>Conditionals of job:</strong> 
          {formData.workConditions.fullDay ? ' From home' : ''}
          {formData.workConditions.withFood ? ' With food' : ''}
          {formData.workConditions.withNargilla ? ' With nargilla' : ''}
        </p>
      </div>
    </div>
  );
}

export default App;