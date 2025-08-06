const Alert = ({ message, type }) => {
    const alertClasses = type === 'error' ? 'alert-error' : 'alert-success'
  
    return (
      <div className={`${alertClasses} mb-6`} role="alert">
        <span className="block sm:inline">{message}</span>
      </div>
    )
  }
  
  export default Alert