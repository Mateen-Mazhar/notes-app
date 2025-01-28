import { message } from "antd";

window.appName = "Learning React";

const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
window.isEmail = (email) => emailregex.test(email);

window.notify = (text, type) => {
  switch (type) {
    case "success":
      message.success(text);
      break;
    case "error":
      message.error(text);
      break;
    case "warning":
      message.warning(text);
      break;
    case "info":
      message.info(text);
      break;

    default:
      message.info(text);
      break;
  }
};



window.RandomId = ()=>{ return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);}





