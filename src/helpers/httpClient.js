import React from 'react'

const API="https://expensetracker-api-01.herokuapp.com/";
const URL_POSTEXPENSE= "expense/";
const URL_PATHEXPENSE= "expense/";
const URL_DELETEEXPENSE= "expense/";
const URL_GETEXPENSE= "expense/user/";
class HttpService{

  async saveExpense(body)//=> 
  {
    const result = await fetch(API + URL_POSTEXPENSE, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    });
    return await result.json();
  }
  async updateExpense(idexpense, body)//=> 
  {
    console.log(JSON.stringify(body))
    const result = await fetch(API + URL_PATHEXPENSE+idexpense, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(body)
    });
    return await result.json();
  }
  deleteExpense(idexpense)//=> 
  {
    const result = fetch(API + URL_DELETEEXPENSE+idexpense, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    });
    return result;
  }

  getExpense(idUser)//=>
  {
    return fetch(API+URL_GETEXPENSE+idUser).then(result => result.json());
  }
}

export default new HttpService();;
