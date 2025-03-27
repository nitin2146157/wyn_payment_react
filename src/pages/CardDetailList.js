import React, { useState, useEffect } from "react";
import axios from "axios";

const CardDetailList = () => {
    const [referenceNo, setReferenceNo] = useState("");
    const [cardList, setCardList] = useState([]);
    
    const fetchCardDetails = async () => {
        try {
            const response = await axios.get(`/card/list`, {
                params: { referenceNo },
            });
            setCardList(response.data || []);
        } catch (error) {
            console.error("Error fetching card details", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchCardDetails();
    };

    return (
        <div className="container mt-4">
            <div className="card p-4">
                <h3>Search Card Details</h3>
                <form onSubmit={handleSubmit} className="form-inline">
                    <div className="form-group mb-2">
                        <label className="mr-2">Reference Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={referenceNo}
                            onChange={(e) => setReferenceNo(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary ml-2">
                        <i className="fa fa-search"></i> Search
                    </button>
                </form>
            </div>

            {cardList.length > 0 && (
                <div className="card mt-4 p-4">
                    <h3>Card Info</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Reference Number</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Expired</th>
                                <th>User Name</th>
                                <th>Date Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cardList.map((card) => (
                                <tr key={card.id}>
                                    <td>{card.transactionInfo.clientDetail.clientName}</td>
                                    <td>{card.transactionInfo.referenceNumber}</td>
                                    <td>{card.currency} {card.amount}</td>
                                    <td>{card.transactionInfo.transactionStatus.name}</td>
                                    <td>{card.transactionInfo.active ? 'No' : 'Yes'}</td>
                                    <td>{card.transactionInfo.userName}</td>
                                    <td>{new Date(card.createdTs).toLocaleDateString()}</td>
                                    <td>
                                        <a href={`/card/${card.transactionInfo.clientDetail.id}/edit/${card.id}`}>
                                            View
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CardDetailList;