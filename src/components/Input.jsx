const Input = ({ type, value, className, id, placeholder, onChange}) => {
  return (
    <>
        <input type={type} value={value} className={className} id={id} placeholder={placeholder} onChange={onChange} />
    </>
  )
}
export default Input