export const Records = ({ records, removeRecord, editRecord }) => {
    return(

        records.map((row, index) => 
        
        { return <div className="table-row" key={row[0] + "=" + index}>
            <span className="content-box align-center">{ row[0] }</span>
            <span className="content-box align-center">{ row[1] }</span>
            <div className="content-box-tiny flex-center"><div className='edit-btn' id={'edit' + row[0]} onClick={ editRecord }>✎</div><div className='del-btn' id={'del' + row[0]} onClick={ removeRecord }>✘</div></div>
        </div>}
    
        ) )

}