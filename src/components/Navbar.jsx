const Navbar = ({children, className}) => {
    return (
        <nav className={className}>
            {children}
        </nav>
    )
}
export default Navbar