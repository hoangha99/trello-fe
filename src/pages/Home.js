import React, { useState } from 'react';
import { deleteBoardApi } from '../Api/func/user';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = (props) => {
    // const [id, setId] = useState("");
    // const deleteData = async () => {
    //     const res = await deleteBoardApi({
    //         id: "1"

    //     });
    //     console.log("DATAAAAA", res.data)
    // }
    return (
        <div class="container">
            <div className="row mt-3">
                <div className="col-4">
                    <div className="card" style={{ width: '18rem' }}>
                        <img className="card-img-top" src="..." alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="/" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card" style={{ width: '18rem' }}>
                        <img className="card-img-top" src="..." alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="/" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card" style={{ width: '18rem' }}>
                        <img className="card-img-top" src="..." alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="/" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Home;