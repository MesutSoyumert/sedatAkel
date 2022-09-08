import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarProps,
} from 'reactstrap';

function Navi(this: any, args: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<Navbar> & Readonly<NavbarProps>) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar {...args}>
                <NavbarBrand href="/"><b>Seçkin Yayınevi Not Uygulaması - Görev</b></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Bileşenler</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Navi;
