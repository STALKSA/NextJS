import React, { useEffect, useState } from "react";
import styles from "./UsersTable.module.css";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>Имя</th>
          <th className={styles.th}>Email</th>
          <th className={styles.th}>Город</th>
          <th className={styles.th}>Телефон</th>
          <th className={styles.th}>Website</th>
          <th className={styles.th}>Компания</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className={styles.td}>{user.name}</td>
            <td className={styles.td}>{user.email}</td>
            <td className={styles.td}>{user.address.city}</td>
            <td className={styles.td}>{user.phone}</td>
            <td className={styles.td}>{user.website}</td>
            <td className={styles.td}>{user.company.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersTable;
