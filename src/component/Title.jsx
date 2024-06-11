export const Title = (props) => {
    const { firstTitle, secondTitle, thirdTitle, addClass } = props
    return (
    <div className='title-container'>
        <div className={`content-box ${ addClass }`}>{ firstTitle }</div>
        <div className={`content-box ${ addClass }`}>{ secondTitle }</div>
        <div className={`content-box-tiny ${ addClass }`}>{ thirdTitle }</div>
    </div>
    )
}