import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCardStatus = () => {
  const { clientId, cardId } = useParams();
  const navigate = useNavigate();
  const [cardDetail, setCardDetail] = useState(null);
  const [transactionStatusList, setTransactionStatusList] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/card/${clientId}/edit/${cardId}`)
      .then((response) => setCardDetail(response.data))
      .catch((error) => console.error("Error fetching card details:", error));

    axios
      .get("/api/transaction-statuses")
      .then((response) => setTransactionStatusList(response.data))
      .catch((error) =>
        console.error("Error fetching transaction statuses:", error)
      );
  }, [clientId, cardId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/card/${clientId}/edit/${cardId}`, cardDetail)
      .then(() =>
        navigate(
          `/card/list?referenceNo=${cardDetail.transactionInfo.referenceNumber}`
        )
      )
      .catch((error) => console.error("Error updating card status:", error));
  };

  if (!cardDetail) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Edit Card Status</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Client</label>
          <input
            type="text"
            value={cardDetail.transactionInfo.clientDetail.clientName}
            readOnly
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            value={cardDetail.transactionInfo.userName}
            readOnly
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Reference Number</label>
          <input
            type="text"
            value={cardDetail.transactionInfo.referenceNumber}
            readOnly
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            className="form-control"
            value={cardDetail.transactionInfo.transactionStatus.id}
            onChange={(e) =>
              setCardDetail({
                ...cardDetail,
                transactionInfo: {
                  ...cardDetail.transactionInfo,
                  transactionStatus: { id: e.target.value },
                },
              })
            }
            disabled={!cardDetail.transactionInfo.active}
          >
            {transactionStatusList.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
        {cardDetail.transactionInfo.active && (
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                navigate(
                  `/card/list?referenceNo=${cardDetail.transactionInfo.referenceNumber}`
                )
              }
            >
              Back
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditCardStatus;
