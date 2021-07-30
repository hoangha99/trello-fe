import React, { useEffect, useState } from 'react';
import { createBoard, getAllBoard } from '../Api/func/user';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/style.css';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';
import { Button, Input } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const Home = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [items, setItems] = useState([]);

    const styleBut = {
        width: 300, background: '#43a643', borderRadius: '5px', color: '#fff', fontWeight: '500', border: 'none', margin: '20px 30px'
    };
    const styleInput = {
        margin: '20px 15px',
        width: 250,
        border: "none",
        height: '40px',
        background: '#fff',
        borderRadius: '4px',
        alignItems: 'center'
    };
    const styleButAdd = {
        width: '120px', background: '#43a643', color: '#fff', fontWeight: 'bold', alignItems: 'center', borderRadius: '4px', border: 'none', marginBottom: '10px'
    }
    const styleBox = {
        width: '300px', border: 'none', margin: '20px 30px', background: '#EBECF0', borderRadius: '4px'
    }

    const onSubmit = async () => {
        await createBoard({
            title: title
        });
        getData();
        setOpen(false);
    }
    const getData = async () => {
        const rest = await getAllBoard({
        })
        setItems(rest.data);
        console.log(items);
    }
    useEffect(() => {
        getData();
    }, []);

    const listBoard = items.map((x, index) => (
        <li key={x.boardId}>
            <Link to={'/board/' + x.boardId} >
                <div className="row mt-3">
                    <div className="col-4">
                        <div className="card" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title">{x.title}</h5>
                                {/* <p className="card-text">{x.createDate}</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    ))

    return (
        <div>
            <Header />
            <div className="container">
                <ul>
                    {listBoard}
                    <div>
                        {open ? (
                            <div style={styleBox}>
                                <Input id='title' onChange={e => setTitle(e.target.value)} type="text" style={styleInput} placeholder="Enter a title"></Input>
                                <button onClick={onSubmit} style={styleButAdd}>Add list</button>
                                <CloseOutlined onClick={() => setOpen(false)} style={{ cursor: 'pointer', marginLeft: '20px' }} />
                            </div>
                        ) : (
                            <Button onClick={() => setOpen(!open)} style={styleBut}>
                                <PlusOutlined /> Add New List
                            </Button>
                        )}
                    </div>
                </ul>
            </div>
        </div>

    );

}

export default Home;