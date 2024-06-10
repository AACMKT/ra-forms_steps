import { useState } from 'react'
import './App.css'
import moment from 'moment'
import { Records } from './component/Records'
let data = [['23.05.2024', '8']]

function App() {
  const [form, setForm] = useState(
    {
      date: '',
      distance: '',
    }
  )

  const {date, distance} = form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prewForm) => ({
      ...prewForm, [name] : name === 'distance'? value.replace(/[^0-9.]/g, '') : value,
      
    }))
  }

  const [records, setRecords] = useState(data)

  const dateCheck = (e) => {
    const { name, value } = e.target;
    if (name === 'date'){
    let validator = moment(value).isBetween('2023-01-01','2300-01-01');
      if (!validator) {
       
       let dt = moment(value, "YYYY DD MM").set("year", moment().year()).format("YYYY-MM-DD");
       setForm((prewForm) => ({
        ...prewForm, 'date': dt,
        
      }))
      }}

  }



  const addRecord = (e) => {
    e.preventDefault()
    if(date && distance) {
      let repeat = false
      let dt = moment(date).format('DD.MM.YYYY');
      let validator = moment(date).isBetween('2023-01-01','2300-01-01');
      if (!validator) {
        
       dt = moment(date).date() + '.' + moment(date).month() + '.' + moment().year();
      }
      data.forEach(el => {
        if (el[0] === dt) {
          el[1] = String(Number(el[1]) + Number(distance));
          setRecords(data)
          setForm(() => ({
          
              date: '',
              distance: ''
            
          }))
          repeat = true;
          return
        }
      })
      if (!repeat) {
        data.push([dt, distance]);
        data.sort((a, b) => moment(b[0], "DD MM YYYY") - moment(a[0], "DD MM YYYY"))
      }
    }
    
    setRecords(data)
    setForm(() => ({
    
        date: '',
        distance: '',
      
    }))
  }

  const removeRecord = (e) => {
    let date = e.target.id.replace("del", "")
    data = data.filter(el => el[0] !== date);
    setRecords(data)
}
 
  const editRecord = (e) => {
    let date = e.target.id.replace("edit", "");
    setForm(
      {
        date: moment(date, "DD-MM-YYYY").format("YYYY-MM-DD"),
        distance: data.find(el => el[0] === date)[1],
      }
    )
    data = data.filter(el => el[0] !== date);
    setRecords(data)
  }
  return (
    <>
      <div className='container'>
        <div className='title-container'>
          <div className='content-box'>Дата</div>
          <div className='content-box'>Пройдено</div>
          <div className='content-box-tiny'></div>
        </div>
        <form onSubmit={addRecord} className='form'>
          <input name = "date" type='date' onChange={handleChange} value = {date} onBlur={dateCheck} className='input-box'></input>
          <input name = "distance" type='text' onChange={handleChange} value = {distance} placeholder='... km' className='input-box'></input>
          <button type="submit" className='input-box-tiny'>OK</button>
        </form>
        <div className='table-title'>
        <div className='content-box align-center'>Дата(ДД.ММ.ГГГГ)</div>
          <div className='content-box align-center'>Пройдено км</div>
          <div className='content-box-tiny flex-center'>Действия</div>
        </div>
        <div className='table'><Records records = { records } removeRecord = { removeRecord } editRecord= { editRecord }/></div>

      </div>
    </>
  )
}

export default App
