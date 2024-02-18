import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Restaurant()
{
    const navigate = useNavigate(); // Initialize useNavigate

    const handleUserSelect = (userType) => {
        switch(userType) {
        /*case 'volunteer':
            navigate('/donation-request');
            break;
        */
        case 'edit':
            navigate('/restaurantEdit');
            break;
        case 'make':
            navigate('/donation-request');
            break;
        default:
            console.log('Invalid user type:', userType);
        }
    };

    return (   
        <div>
        <h2>Select what you would like to do</h2>
        <button onClick={() => handleUserSelect('edit')}>Edit Current Forms</button>
        <button onClick={() => handleUserSelect('make')}>Fill Out New Form</button>
        </div>

    );
}

export default Restaurant;