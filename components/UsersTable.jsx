import React, { useEffect, useState } from "react";
import styles from "./UsersTable.module.css";
import useSWR, { mutate } from "swr";
import toast from "react-hot-toast";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    city: "",
    phone: "",
    website: "",
    company: "",
  });
  const [editedUser, setEditedUser] = useState(null); // Состояние для редактируемого пользователя
  const [sortField, setSortField] = useState(""); // Поле для сортировки
  const [sortDirection, setSortDirection] = useState("asc"); // Направление сортировки

  useEffect(() => {
    fetch("http://localhost:3333/users")
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

  // const handleDeleteUser = (userId) => {
  //   const updatedUsers = users.filter((user) => user.id !== userId);
  //   setUsers(updatedUsers);
  // };

  const handleDeleteUser = (userId) => {
    // Удаление пользователя с локального сервера
    fetch(`http://localhost:3333/users/${userId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        toast.success("Пользователь удален");
        mutate("http://localhost:3333/users");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Ошибка при удалении пользователя");
      });
  };

  // const handleAddUser = () => {
  //   setUsers([...users, newUser]);
  //   setNewUser({
  //     name: "",
  //     email: "",
  //     city: "",
  //     phone: "",
  //     website: "",
  //     company: "",
  //   });
  // };

  const handleAddUser = () => {
    // Добавление нового пользователя на локальный сервер
    fetch("http://localhost:3333/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers([...users, data]);
        setNewUser({
          name: "",
          email: "",
          city: "",
          phone: "",
          website: "",
          company: "",
        });
        toast.info(`${data} добавлен`);
        mutate("http://localhost:3333/users");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        toast.error("Ошибка при добавлении прльзователя");
      });
  };

  const handleEditUser = (user) => {
    setEditedUser({ ...user }); // Устанавливаем редактируемого пользователя с копией
  };

  // const handleSaveUser = () => {
  //   const updatedUsers = users.map((user) =>
  //     user.id === editedUser.id ? editedUser : user
  //   );
  //   setUsers(updatedUsers);
  //   setEditedUser(null);
  // };

  const handleSaveUser = () => {
    // Обновление данных пользователя на локальном сервере
    fetch(`http://localhost:3333/users/${editedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUser),
    })
      .then(() => {
        const updatedUsers = users.map((user) =>
          user.id === editedUser.id ? editedUser : user
        );
        setUsers(updatedUsers);
        setEditedUser(null);
        toast.success("Пользователь обновлен");
        mutate("http://localhost:3333/users");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Ошибка при изменении пользователя");
      });
  };

  const handleSort = (field) => {
    const direction =
      field === sortField && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);

    const sortedUsers = [...users].sort((a, b) => {
      if (a[field] < b[field]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedUsers);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th} onClick={() => handleSort("name")}>
              Имя
            </th>
            <th className={styles.th} onClick={() => handleSort("email")}>
              Email
            </th>
            <th className={styles.th} onClick={() => handleSort("city")}>
              Город
            </th>
            <th className={styles.th} onClick={() => handleSort("phone")}>
              Телефон
            </th>
            <th className={styles.th} onClick={() => handleSort("website")}>
              Website
            </th>
            <th className={styles.th} onClick={() => handleSort("company")}>
              Компания
            </th>
            <th className={styles.th}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className={styles.td}>
                {editedUser !== null && editedUser.id === user.id ? (
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, name: e.target.value })
                    }
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className={styles.td}>
                {editedUser !== null && editedUser.id === user.id ? (
                  <input
                    type="text"
                    value={editedUser.email}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, email: e.target.value })
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className={styles.td}>
                {editedUser !== null && editedUser.id === user.id ? (
                  <input
                    type="text"
                    value={editedUser.city}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, city: e.target.value })
                    }
                  />
                ) : (
                  user.city
                )}
              </td>
              <td className={styles.td}>
                {editedUser !== null && editedUser.id === user.id ? (
                  <input
                    type="text"
                    value={editedUser.phone}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, phone: e.target.value })
                    }
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td className={styles.td}>
                {editedUser !== null && editedUser.id === user.id ? (
                  <input
                    type="text"
                    value={editedUser.website}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, website: e.target.value })
                    }
                  />
                ) : (
                  user.website
                )}
              </td>
              <td className={styles.td}>{user.company}</td>
              <td className={styles.td}>
                {editedUser !== null && editedUser.id === user.id ? (
                  <>
                    <button onClick={handleSaveUser}>Сохранить</button>
                    <button onClick={() => setEditedUser(null)}>Отмена</button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEditUser(user)}
                    >
                      Редактировать
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Удалить
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.addUser}>
        <h2>Добавить пользователя</h2>
        <input
          type="text"
          placeholder="Имя"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Город"
          value={newUser.address}
          onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="Телефон"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Website"
          value={newUser.website}
          onChange={(e) => setNewUser({ ...newUser, website: e.target.value })}
        />
        <input
          type="text"
          placeholder="Компания"
          value={newUser.company.name}
          onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
        />
        <button onClick={handleAddUser}>Добавить</button>
      </div>
    </div>
  );
}

export default UsersTable;
