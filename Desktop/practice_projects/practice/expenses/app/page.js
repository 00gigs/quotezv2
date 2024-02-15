"use client";
import { collection, addDoc } from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";

export default function Home() {
  const [items, setItems] = useState([
    { name: "t-shirt", price: 42.95 },
    { name: "parking", price: 4.55 },
    { name: "food", price: 12.95 },
  ]);
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [total, setTotal] = useState(0);
  //add item to database

  const additem = async (e) => {
    e.preventDefault();
    if(newItem.name !== '' && newItem.price !== ''){
      setItems([...items,newItem])
    } 
  };

  //read items

  //delete items from database

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl py-4 text-center ">expense tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg ">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.name}
              onChange={(e)=>setNewItem({...newItem , name:e.target.value})}
              className="col-span-3 p-3 border rounded-sm"
              type="text"
              placeholder="enter item"
            />
            <input
              value={newItem.price}
              onChange={(e)=>setItems({...newItem , price:e.target.value})}
              className="col-span-2 p-3 border rounded-sm mx-3"
              type="text"
              placeholder="$ amount"
            />
            <button
            onClick={additem}
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
              type="submit"
            >
              <h1>
                
              </h1>
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li key={id} className="my-4 w-full flex justify-between">
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>{item.price}</span>
                </div>
                <button className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16">
                  deleteX
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="flex justify-between p-3">
              <span>total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
