import React, { useState } from 'react';
import styles from './Calendar.module.css'

function CalendarGenerator() {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [calendar, setCalendar] = useState([]);
  
    const generateCalendar = () => {
      // Проверяем корректность введенных данных (месяц от 1 до 12)
      if (isNaN(month) || month < 1 || month > 12) {
        alert('Введите корректный номер месяца (1-12)');
        return;
      }
  
      // Создаем новый объект Date для указанного месяца и года
      const currentDate = new Date(year, month - 1, 1);
  
      // Вычисляем начальный день недели для текущего месяца (0 - воскресенье, 1 - понедельник, и т.д.)
      const startDay = currentDate.getDay();
  
      // Вычисляем количество дней в месяце
      const daysInMonth = new Date(year, month, 0).getDate();
  
      // Вычисляем, сколько недель нужно для календаря
      const weeks = Math.ceil((startDay + daysInMonth) / 7);
  
      // Генерируем календарь
      const newCalendar = [];
      let day = 1;
  
      for (let week = 0; week < weeks; week++) {
        const weekArray = [];
  
        for (let weekday = 0; weekday < 7; weekday++) {
          if ((week === 0 && weekday < startDay) || day > daysInMonth) {
            weekArray.push('');
          } else {
            weekArray.push(day);
            day++;
          }
        }
  
        newCalendar.push(weekArray);
      }
  
      // Обновляем состояние с сгенерированным календарем
      setCalendar(newCalendar);
    };
  
    return (
      <div className={styles.calendar}>
        <h2>Генератор календаря</h2>
        <div>
          <label>
            Месяц (1-12):
            <input type="number" value={month} onChange={(e) => setMonth(e.target.value)} />
          </label>
          <label>
            Год:
            <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
          </label>
          <button onClick={generateCalendar}>Сгенерировать</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Вс</th>
              <th>Пн</th>
              <th>Вт</th>
              <th>Ср</th>
              <th>Чт</th>
              <th>Пт</th>
              <th>Сб</th>
            </tr>
          </thead>
          <tbody>
            {calendar.map((week, index) => (
              <tr key={index}>
                {week.map((day, dayIndex) => (
                  <td key={dayIndex}>{day}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default CalendarGenerator;