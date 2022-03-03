import { Link } from "react-router-dom";
import './logo.css'
import CM from "../../../../assets/images/logo/logo.png";

export default function MenuLogo(props){
    return (
        <Link
            to="/"
            className="da-d-flex logo-container da-align-items-end"
            onClick={props.onClose}
        >
            <img className="da-logo" src={CM} alt="logo" />
        </Link>
    );
};