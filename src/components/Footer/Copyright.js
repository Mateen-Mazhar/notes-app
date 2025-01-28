// import { Footer } from "antd/es/layout/layout";
// import React from "react";

// const Copyright = () => {
//   const year = new Date().getFullYear();
//   return (
//     <Footer className="bg-dark py-3">
//       <div className="container">
//         <div className="row">
//           <div className="col  ">
//             <p className="mb-0 text-white text-center">
//               &copy; {year}. All Rights Reserved. Created by Mateen Mazhar
//             </p>
//           </div>
//         </div>
//       </div>
//     </Footer>
//   );
// };

// export default Copyright;

import React from "react";
import { Layout } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <Footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Study App</h3>
          <p className="footer-description">
            Your personal study notes management system. Organize, create, and
            manage your study materials efficiently.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="/create">Create Note</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Connect</h4>
          <div className="social-links">
            <a target="_blank" rel="noopener noreferrer">
              <GithubOutlined />
            </a>
            <a target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined />
            </a>
            <a target="_blank" rel="noopener noreferrer">
              <TwitterOutlined />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} Study App. All rights reserved.</p>
        <p>Created with ❤️ by Mateen Mazhar</p>
      </div>
    </Footer>
  );
};

export default Copyright;
