import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";  // Importing FontAwesome checkmark icon

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);  // Track success state
    const [loading, setLoading] = useState(false);  // Track loading state

    const handleTransfer = async () => {
        setLoading(true);  // Set loading state when the transfer starts
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/account/transfer", 
                { to: id, amount }, 
                { headers: { Authorization: localStorage.getItem("token") } }
            );
            if (response.status === 200) {
                setIsSuccess(true);  // Set success state if transfer was successful
            }
        } catch (error) {
            console.error("Error transferring money:", error);
        } finally {
            setLoading(false);  // Reset loading state after transfer
        }
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none" htmlFor="amount">
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button 
                                onClick={handleTransfer}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                                disabled={loading}  // Disable button while loading
                            >
                                {loading ? 'Initiating Transfer...' : 'Initiate Transfer'}
                            </button>

                            {/* Success Message and Tick Icon */}
                            {isSuccess && (
                                <div className="mt-4 text-green-500 flex items-center">
                                    <FaCheckCircle size={24} className="mr-2" />
                                    Money Successfully Sent!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
