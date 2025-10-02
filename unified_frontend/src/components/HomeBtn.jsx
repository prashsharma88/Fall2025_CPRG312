import { useLocation, useNavigate } from 'react-router-dom';


function HomeBtn() {
    const navigate = useNavigate();
    const location = useLocation();
    const homeBtnDisplay = location.pathname == '/'?"none":"";
    return (
        <div id='home-btn-container' style={{"display":homeBtnDisplay}}>
            <p className='btn home-btn' onClick={() => navigate('/')}>Go To Home</p>
        </div>
        
    );
}

export default HomeBtn;