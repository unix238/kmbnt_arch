// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';

// const link = 'http://localhost:3333/';

// export default class PaymentApi {
//   static async addOrder(orderItems) {
//     const req = await axios.post(`${link}payments/new-order`, orderItems, {
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('token'),
//       },
//     });

//     return req;
//   }

//   static async getOrders() {
//     return await axios.get(`${link}payments/get-orders`, {
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('token'),
//       },
//     });
//   }
// }
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const link = 'http://localhost:8083';

export default class PaymentApi {
  static async addOrder(orderItems) {
    const req = await axios.post(`${link}/new-order`, orderItems, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    return req;
  }

  static async getOrders() {
    return await axios.get(`${link}/get-orders`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}
