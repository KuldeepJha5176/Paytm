import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const TransferSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
            navigate("/dashboard");
        }, 2000);
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                <div className="flex justify-center items-center mb-4">
                    <FaCheckCircle className="text-green-500" size={70} />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Transfer Successful!</h2>
                <p className="text-lg text-gray-600 mb-4">The money has been transferred successfully.</p>
                <p className="text-sm text-gray-500">You will be redirected to the dashboard shortly.</p>
            </div>
        </div>
    );
};
