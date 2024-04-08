                                          
export const Footer = () => {
    let year = new Date().getFullYear()
    
    return (
        <footer>
            <h5>Creative Coyotes</h5>
            <small>All. Rights. Reserved. {year}&copy;</small>
        </footer>
    )
}