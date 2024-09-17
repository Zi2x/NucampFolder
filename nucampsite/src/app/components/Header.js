import { Navbar, NavbarBrand, Collapse, Nav } from 'reactstrap';
import NucampLogo from '../app/assets/img/logo.png';
import UserLoginForm from '../app/components/UserLoginForm'; 

const Header = () => {
    return (
        <Navbar dark expand="md">
            <NavbarBrand href="/">
                <img src={NucampLogo} alt="Nucamp Logo" />
            </NavbarBrand>
            <Collapse isOpen={true} navbar> 
                <Nav navbar>
                    
                </Nav>
                <UserLoginForm />  
            </Collapse>
        </Navbar>
    );
};

export default Header;


