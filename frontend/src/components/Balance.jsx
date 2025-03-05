
export const Balance = ({ value }) => {
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="text-lg font-bold">
            Balance: ₹{value}
        </div>
    </div>
}