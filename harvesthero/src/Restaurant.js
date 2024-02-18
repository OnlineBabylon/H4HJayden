import { useNavigate } from 'react-router-dom';

function Restaurant() {
    const navigate = useNavigate();

    const handleUserSelect = (userType) => {
        switch (userType) {
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
        <div style={{ backgroundColor: 'lightgreen', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ fontFamily: 'sans-serif', fontSize: '30px' }}>
                Select Your Option
            </h2>
            <button
                onClick={() => handleUserSelect('edit')}
                style={{
                    backgroundColor: 'blue',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    marginBottom: '10px', // Add margin at the bottom
                    cursor: 'pointer',
                }}
            >
                Edit Current Forms
            </button>
            <button
                onClick={() => handleUserSelect('make')}
                style={{
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    cursor: 'pointer',
                }}
            >
                Fill Out New Form
            </button>
        </div>
    );
}

export default Restaurant;
