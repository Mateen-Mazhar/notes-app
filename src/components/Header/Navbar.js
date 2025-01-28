import React from "react";
import { Avatar, Button, Dropdown } from "antd";
import {
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuthContext } from "../../Contexts/auth";
import { useNotesContext } from "../../Contexts/notes";

const Navbar = () => {
  const { user, isAuth, handleLogout } = useAuthContext();
  const { setSearchQuery } = useNotesContext();

  const handleSearch = (value) => {
    setSearchQuery(value);
  };
  return (
    <nav
      className="navbar navbar-expand-lg py-3"
      style={{
        background: "linear-gradient(to right, #1a237e, #121858)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div className="container">
        {/* Brand/Logo */}
        <h1
          className=" mb-0 mx-sm-3 mx-lg-0 mx-3"
          style={{
            background: "linear-gradient(45deg, #1890ff, #722ed1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          Studify
        </h1>

        {/* Toggle Button */}
        <button
          className="navbar-toggler bg-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center ms-auto gap-3 mt-3 mt-lg-0">
            {/* Search Form */}
            <form className="d-flex w-100">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search notes by keywords"
                aria-label="Search"
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: "300px" }}
              />
            </form>

            {/* User Actions */}
            <div className="d-flex align-items-center gap-3">
              <Button type="text" icon={<BellOutlined />} />
              <Button type="text" icon={<SettingOutlined />} />
              {isAuth ? (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: "Profile",
                        icon: <UserOutlined />,
                      },
                      {
                        key: "2",
                        label: "Logout",
                        icon: <LogoutOutlined />,
                        onClick: handleLogout,
                      },
                    ],
                  }}
                >
                  <Avatar
                    style={{ backgroundColor: "#1890ff", cursor: "pointer" }}
                  >
                    {user?.email?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </Dropdown>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
