import React, { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import { db } from './firebase';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Order from './Order';

function Orders() {
    const [{ user }] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user?.uid) return;

        const ordersRef = collection(db, "users", user.uid, "orders");
        const ordersQuery = query(ordersRef, orderBy("created", "desc"));

        const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
            setOrders(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })));
        });

        return () => unsubscribe();
    }, [user?.uid]);

    return (
        <div className='orders'>
            <h1>Your orders</h1>
            <div className='orders__order'>
                {orders.map((order) => (
                    <Order key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
}

export default Orders;
