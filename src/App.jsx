import { useState } from 'react'
import './App.css'
import moment from 'moment'
import { Records } from './component/Records'
import { Title } from './component/Title'
import { Form } from './component/Form'
let data = [['23.05.2024', '8']]

function App() {
  const [records, setRecords] = useState(data)

  const [form, setForm] = useState(
    {
      date: '',
      distance: '',
    }
  )



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
        <Title firstTitle = "Дата" secondTitle = "Пройдено" thirdTitle = "" addClass=""/>
        <Form data = { data } setRecords = { setRecords } form = { form } setForm = { setForm }/>
        <Title firstTitle = "Дата(ДД.ММ.ГГГГ)" secondTitle = "Пройдено км" thirdTitle = "Действия" addClass="align-center"/>

        <div className='table'><Records records = { records } removeRecord = { removeRecord } editRecord= { editRecord }/></div>

      </div>
    </>
  )
}

export default App
