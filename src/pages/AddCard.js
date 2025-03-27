import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const schema = yup.object().shape({
  cardName: yup.string().required("Card name is required"),
  cardTypeId: yup.string().required("Card type is required"),
  expiryMm: yup.string().required("Expiry month is required"),
  expiryYy: yup.string().required("Expiry year is required"),
  currency: yup.string().required("Currency is required"),
  amount: yup.number().typeError("Amount must be a number").required("Amount is required"),
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),
});

const AddCard = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [cardTypes, setCardTypes] = useState([]);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    axios.get("/api/card-types").then((response) => setCardTypes(response.data));
  }, []);

  const onSubmit = (data) => {
    axios.post("/card/create", data).then((response) => {
      alert("Card created successfully!");
    });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-warning text-white">New Card Info</div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Name on Card</label>
              <input className="form-control" {...register("cardName")} />
              <p className="text-danger">{errors.cardName?.message}</p>
            </div>

            <div className="mb-3">
              <label className="form-label">Card Type</label>
              <select className="form-control" {...register("cardTypeId")}>
                <option value="">Select Card Type</option>
                {cardTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.cardTypeName}
                  </option>
                ))}
              </select>
              <p className="text-danger">{errors.cardTypeId?.message}</p>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Expiry Month</label>
                <select className="form-control" {...register("expiryMm")}>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <p className="text-danger">{errors.expiryMm?.message}</p>
              </div>
              <div className="col-md-6">
                <label className="form-label">Expiry Year</label>
                <select className="form-control" {...register("expiryYy")}>
                  {[...Array(21)].map((_, i) => (
                    <option key={i} value={currentYear - 10 + i}>{currentYear - 10 + i}</option>
                  ))}
                </select>
                <p className="text-danger">{errors.expiryYy?.message}</p>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input className="form-control" {...register("cardNumber")} />
              <p className="text-danger">{errors.cardNumber?.message}</p>
            </div>

            <div className="mb-3">
              <label className="form-label">Currency</label>
              <select className="form-control" {...register("currency")}>
                <option value="AUD">AUD</option>
                <option value="NZD">NZD</option>
              </select>
              <p className="text-danger">{errors.currency?.message}</p>
            </div>

            <div className="mb-3">
              <label className="form-label">Amount</label>
              <input className="form-control" {...register("amount")} />
              <p className="text-danger">{errors.amount?.message}</p>
            </div>

            <div className="mb-3">
              <label className="form-label">Payment Split</label>
              <input type="checkbox" {...register("split")} />
            </div>

            <div className="mb-3">
              <label className="form-label">Notes</label>
              <textarea className="form-control" rows="3" {...register("notes")} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
