const Button = ({children, className, type, onClick, disabled = false}) => {
  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>{children}</button>
  )
}
export default Button