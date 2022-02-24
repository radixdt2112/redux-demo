import React from 'react'
import { Link } from 'react-router-dom';
import { Counter } from '../features/counter/Counter';
export const Home = () => {
    return (
        <div>
            <Counter />
            <div>Home Page</div>
            <Link to="/user">User </Link>
            <Link to="/fdemo">formik </Link>
        </div>
    )
}
