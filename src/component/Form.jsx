import moment from 'moment'

export const Form = ({ data, setRecords, form, setForm }) => {

    const {date, distance} = form
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prewForm) => ({
        ...prewForm, [name] : name === 'distance'? value.replace(/[^0-9.]/g, '') : value,
        
      }))
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
    
  
    const dateCheck = (e) => {
      const { name, value } = e.target;
      if (name === 'date'){
      let validator = moment(value).isBetween('2023-01-01','2300-01-01');
        if (!validator) {
         
         let dt = moment(value, "Y DD MM").set("year", moment().year()).format("YYYY-MM-DD");
         setForm((prewForm) => ({
          ...prewForm, 'date': dt,
          
        }))
        }}
  
    }
  
    return (
    <form onSubmit={addRecord} className='form'>
        <input name = "date" type='date' onChange={handleChange} value = {date} onBlur={dateCheck} className='input-box'></input>
        <input name = "distance" type='text' onChange={handleChange} value = {distance} placeholder='... km' className='input-box'></input>
        <button type="submit" className='input-box-tiny'>OK</button>
    </form>
    )
}