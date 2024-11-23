import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "../redux/async/logsSlice";

const LogsList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.logs);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLogs()); // Ambil semua logs
    }
  }, [status, dispatch]);

  if (status === "loading") return <div>Loading logs...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Logs List</h2>
      <ul>
        {items.map((log) => (
          <li key={log.id}>
            [{log.type}] {log.note} - {log.quantity} (Date: {new Date(log.date).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogsList;
