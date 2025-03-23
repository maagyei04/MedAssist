import { useNavigate } from 'react-router-dom';

const BuyNowButton = ({ farmer }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('...', { state: { farmer: farmer } });
    };

    return (
        <>
            <button onClick={handleClick} className="w-full bg-green-500 text-white py-2 rounded hover:bg-violet-600">Buy Now</button>
        </>
    );
};

export default BuyNowButton;
