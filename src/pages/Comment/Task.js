import React, { useEffect } from 'react';
import { useState } from 'react';
import './task.css';
import { 
    PlusOutlined
    ,HomeOutlined,
    MenuOutlined,
    MessageOutlined,
    SmileOutlined,
    UserAddOutlined,
    FieldTimeOutlined,
    PictureOutlined,
    DownOutlined // Quang
    } from '@ant-design/icons';
    import {
        Button,
        Modal,
        Typography,
        Avatar,
        Form,
        Checkbox,
        Dropdown,
        DatePicker
      } from "antd"; // Quang
// import api from './callApi/baseUrl';
import {v4 as uuidv4} from 'uuid'
import { storage } from '../../firebase/firebase-config';
import { getComments, testApi } from '../../Api/func/user';

function Task(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);      

    const showModal = async () => {
        setIsModalVisible(true);
        console.log(userTask)
    };
    // const handleOk = () => {
    //     setIsModalVisible(false);
    // };
    
    const handleCancel = () => {
        const dom = document.getElementById("modal-member");
        dom.classList.add("isHide")
        const domImage = document.getElementById("modal-picture");
        domImage.classList.add("isHide")
        setIsModalVisible(false);
        
    };

    /**
     * Quang Bổ sung phần deadline
     */
    // new
    // deadline
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [done, setDone] = useState(true);
    const [colorDone, setColorDone] = useState("");
    const [openDeadline, setOpenDeadline] = useState(false);
    const [isModalDeadVisible, setIsModalDeadVisible] = useState(false);
    const showModalDead = () => {
        setIsModalDeadVisible(true);
    };
    const handleCancelDead = () => {
        setIsModalDeadVisible(false);
    };
    const handleSaveDeadline = () => {
        console.log(startDate);
        console.log(endDate);
        setOpenDeadline(true);
        setIsModalDeadVisible(false);
    };
    const handleDeleteDeadline = () => {
        setOpenDeadline(false);
    };
    function getDateValue(dates, dateStrings) {
        setStartDate(dateStrings[0]);
        setEndDate(dateStrings[1]);
    }
    const onChangeCheckColor = () => {
        setDone(!done);
        {
        done ? setColorDone("#61bd4f") : setColorDone("#EBECF0");
        }
    };
    const { RangePicker } = DatePicker;


    //NDL
    const styleTask = {
        padding: '5px 10px',
        background: '#fff',
        marginBottom: '10px',
        borderRadius: '5px',
        fontWeight: '500',
        textAlign: 'left',
        cursor: 'pointer'
    };
    const solves = () => {
        alert("Xử lý");
    }

    //state
    const [comments, setcomments] = useState([]);
    const [contentCmt, setcontentCmt] = useState("");
    const [userTask, setuserTask] = useState([]);
    const [userNoTask, setuserNoTask] = useState([]);
    const [image, setimage] = useState("");

    //onchange
    const commentOnChange = (e)=>{
        if(e.target.value){
            setcontentCmt(e.target.value);
        }
    }

    //get data
    //get all comment
    const getAllComment = async ()=>{
        const cmt = await getComments({
            taskId: props.obj.taskId
        });
        
        return cmt.data;
    }
    //Lấy tất cả user được giao việc trong task
    const getAllUserTask = async ()=>{
        // const ut = await api.get("user_task");
        // return ut.data;
    }
    //Lấy tât cả user trong bảng mà ko thuộc task
    const getAllUserNoTask = async()=>{
        // const unt = await api.get("user_no_task");
        // return unt.data;
    }

    //Chi tiết người dùng trong task
    const detailUserTask = (obj) =>{
        console.log(obj);
    }

    /**
     * 3 chức năng trong task
     * Thêm Thành viên, Deadline, ảnh bìa
     */

    //Click nut them thanh vien
    const btnAddMemberOnClick = async ()=>{
        const dom = document.getElementById("modal-member");
        dom.classList.toggle("isHide")
        const x = await getAllUserNoTask();
        setuserNoTask(x);
    }
    const btnCloseOnClick = ()=>{
        const dom = document.getElementById("modal-member");
        dom.classList.add("isHide")
    }
    //Click vào thành viên để thêm thành viên vào táks
    const btnAddMemberTask = (obj)=>{
        const arr = userNoTask;
        console.log("arr: ",arr)
        for(let i =0;i<arr.length;i++){
            if(obj.id==arr[i].id){
                arr.splice(i,1);
                // console.log(arr[i]);
                
            }
        }
        setuserNoTask([...arr]);
    }
    //ảnh bìa - mở
    const chooseImage = () =>{
        const dom = document.getElementById("modal-picture");
        dom.classList.toggle("isHide")
    }
    //ảnh bìa - đóng
    const btnCloseImageOnClick =()=>{
        const dom = document.getElementById("modal-picture");
        dom.classList.add("isHide")
        // setimage("");
    }
    //Ảnh bìa - chọn ảnh
    const imageOnChange = (e)=>{
        if(e.target.files[0]){
            setimage(e.target.files[0])
        }
    }
    //Ảnh bìa - tải lên ảnh
    const btnUploadImageOnClick = ()=>{
        console.log(image.name)
        if(image.name){
            var imgSplit = image.name.split(".");
            var imgName = uuidv4()+"."+imgSplit[imgSplit.length-1];
            // console.log(imgName);
            const uploadTask = storage.ref(`images/${imgName}`).put(image);
            uploadTask.on(
                "state_change",
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    storage.ref('images')
                        .child(imgName)
                        .getDownloadURL()
                        .then((url)=>{
                            console.log(url);
                            setimage(url);
                        });
                }
            );
        }else alert("Chwa chon anh");
    }
    
    /**
     * Post Data
     */
    //post comment
    const postComment = async ()=>{
        const comment = {
            task_id: props.obj.taskId,
            user_id: props.user.id,
            content: contentCmt,
            created_date: "7/29/2021 09:01:20"
        }
        // await api.post("/comment",comment).then(res=>{
        //     console.log(res);
        //     setcomments([...comments,comment]);
        //     setcontentCmt("");
        // }).catch(ex=>{
        //     console.log(ex);
        // })
    }

    //useeffect
    useEffect(() => {
        console.log("props: ",props.obj)
        const getAll = async ()=>{
            //comment
            const allComment = await getAllComment();
            if(allComment) {
                console.log(allComment);
                setcomments(allComment);
            }
                
            //user_task
            const allUserTask = await getAllUserTask();
            if(allUserTask) 
                setuserTask(allUserTask);
            
        }
        getAll();
    }, [])
    console.log("user_task: ",userTask);
    return (
        
        <>
            {/* <Modal centered width={800} visible={isModalVisible} footer={null}  onCancel={handleCancel}> */}
                <img src={(image)?image:""} className={(image.name||image=="")?"isHide":""} style={{width:"100%",height:"400px",marginBottom:"10px"}}  />
                <div className="modal-custom">
                    <div className="card-left">
                        {/* Tên task */}
                        <div className="card-left__name flex mb-10" style={{marginTop:"10px"}}>
                            <HomeOutlined className="common-icon width-10"/>
                            {/* <div className="name-icon width-10">icon</div> */}
                            <div className="name-name">Tên thẻ</div>
                        </div>

                        {/* Thành viên, ngày hết hạn */}
                        <div className="card-left__memeber flex mb-10" style={{fontSize:"14px"}}>
                            <div className="width-10"/>
                            <div className="memeber-memeber" >
                                <div>THÀNH VIÊN</div>
                                <div>
                                    {/* Duyet tat ca thanh vien */}
                                    {
                                        userTask.map((obj,index)=>(
                                            <button key={index} onClick={()=>detailUserTask(obj)} className="member-task">
                                                <Avatar
                                                    style={{
                                                    color: '#fff',
                                                    backgroundColor: '#84ABF7',
                                                    fontSize: '12px',
                                                    fontWeight: '500'
                                                    }}
                                                >{(obj.username)?obj.username.charAt(0).toUpperCase():""}
                                                </Avatar>
                                            </button>
                                        ))
                                    }
                                    <button onClick={btnAddMemberOnClick} className="member-task">
                                        <Avatar
                                            style={{
                                            color: '#fff',
                                            backgroundColor: '#84ABF7',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            margin: '0 0 0 2px'  
                                        }}><PlusOutlined/>
                                        </Avatar>
                                    </button>
                                </div>
                            </div>
                            
                            {/* new */}
                            {/* deadline box */}
                            {openDeadline ? (
                                <div className="memeber-deadline" style={{ marginLeft: "20px" }}>
                                    <div>NGÀY HẾT HẠN</div>
                                    <div className="box-deadline">
                                        <div className="time-deadline">
                                        <Checkbox checked={!done} onChange={onChangeCheckColor} />
                                        <span>
                                            From {startDate} to {endDate}
                                        </span>
                                        {!done ? (
                                            <span className="check-done">Done !</span>
                                        ) : (
                                            <div />
                                        )}
                                        <Dropdown
                                            trigger="click"
                                            overlay={
                                            <Button
                                                onClick={handleDeleteDeadline}
                                                className="butDelete-Deadline"
                                            >
                                                Delete Deadline
                                            </Button>
                                            }
                                            placement="bottomRight"
                                            arrow
                                        >
                                            <DownOutlined style={{ marginLeft: "7px" }} />
                                        </Dropdown>
                                        </div>
                                    </div>
                                </div>
                                ) : (
                            <div />
                            )}
                        </div>
                        
                        {/* Tiêu đề mô tả: icon và chữ mô tả chi tiết */}
                        <div className="card-left__description flex mb-10">
                            <MenuOutlined className="common-icon width-10" />
                            <div className="des-name">Mô tả chi tiết</div>
                        </div>

                        {/* Ô input nhập mô tả */}
                        <div className="card-left__des-input flex mb-10">
                            <div className="width-10"></div>
                            <input style={{padding:"0 0 0 10px"}} className="des-input" placeholder="Mô tả công việc" />
                        </div>

                        {/* Tiêu đề bình luận (Icon và Chữ Bình Luận) */}
                        <div className="card-left__cmt flex mb-10"  style={{marginTop:"40px"}}>
                            <MessageOutlined className="width-10 common-icon"/>
                            <div className="cmt-name">
                                <div>Bình luận</div>
                                <Button>Ẩn chi tiết</Button>
                            </div>
                        </div>
                        
                        {/* Viết bình luân (Avatar và ô input) */}
                        <div className="card-left__cmt flex mb-10">
                            {/* <div className="width-10 avatar">L</div> */}
                            <Avatar
                                style={{
                                color: '#fff',
                                backgroundColor: '#84ABF7',
                                fontSize: '12px',
                                fontWeight: '500',
                                margin: '5px 15px 0 12px'  
                            }}>L
                            </Avatar>
                            <input onChange={commentOnChange} value={contentCmt} style={{padding:"0 0 0 10px"}}  className="cmt-input" placeholder="Viết Bình Luận"  />
                        </div>

                        {/* Nút bình luận */}
                        <div className="flex mb-10">
                            <div className="width-10"></div>
                            <Button onClick={postComment}>Lưu</Button>
                        </div>
                        
                        
                        
                        {/* Nội dung bình luận (avatar và nội dung bình luận) */}
                        {
                            comments.map((obj,index)=>(
                                <div key={index} className="card-left__cmt-content flex mb-10">
                                    {/* avatar*/}
                                    <Avatar
                                        style={{
                                        color: '#fff',
                                        backgroundColor: '#84ABF7',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        margin: '5px 15px 0 12px'  
                                    }}>{(obj.fullName)?obj.fullName.charAt(0).toUpperCase():""}
                                    </Avatar>
                                    {/* Nội dung bình luận: tên, ngày, nội dung, reaction, sửa, xoá */}
                                    <div className="cmt-right">
                                        <div className="cmt-user">
                                            {/* Tên người bình luận */}
                                            {obj.fullName}
                                            <span className="cmt-date">
                                                {/* Ngày bình luận */}
                                                {obj.createDate}
                                            </span>
                                        </div>
                                        <div className="cmt-content">
                                            {/* Nội dung bình luận */}
                                            {obj.content}
                                        </div>
                                        <div className="cmt-react">
                                            <SmileOutlined /> - Chỉnh sửa - Xoá
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                    {/* Bên phải modal: các chức năng */}
                    <div className="card-right">
                        <div className="btn-right">
                            <Button onClick={btnAddMemberOnClick} style={{width:"100%"}}>
                                <UserAddOutlined />
                                Thành viên
                            </Button>
                            <div id="modal-member" className="isHide modal-member">
                                <button onClick={btnCloseOnClick} className="btnClose">X</button>
                                <center style={{marginTop:"7px", fontSize:"14px"}}>Thành viên</center>
                                <hr width="90%" />
                                <div className="search-member-input">
                                    <input type="text" placeholder="Tìm kiếm thành viên" />
                                </div>
                                <div className="title-member-board">Thành viên của bảng</div>

                                {/* Danh sachs thành viên trong bảng nhưng ko có trong task */}
                                {
                                    userNoTask.map((obj,index)=>(
                                        <div key={index} className="memeber-list">
                                            <button onClick={()=>btnAddMemberTask(obj)} className="btn-member-task">
                                                <Avatar className="avatar">{(obj.username)?(obj.username.charAt(0).toUpperCase()):""}</Avatar>
                                                {obj.username}
                                            </button>
                                        </div>
                                    ))
                                }
                                
                                

                            </div>
                        </div>

                        {/* new */}
                        {/* Deadline */}
                        <div className="btn-right">
                            <Button onClick={showModalDead} style={{ width: "100%" }}>
                                <FieldTimeOutlined />
                                Ngày
                            </Button>
                            <Modal
                                width={300}
                                title="Deadline"
                                visible={isModalDeadVisible}
                                footer={null}
                                onCancel={handleCancelDead}
                            >
                                <div>
                                <Form>
                                    <div className="title-date">
                                    <h4>Start Date</h4>
                                    <h4 style={{ marginLeft: "68px" }}>End Date</h4>
                                    </div>
                                    <RangePicker onChange={getDateValue} format="DD-MM-YYYY" />
                                    <br />
                                    <Button
                                        onClick={handleSaveDeadline}
                                        style={{ marginTop: "15px" }}
                                        type="primary"
                                    >
                                        Save
                                    </Button>
                                </Form>
                                </div>
                            </Modal>
                        </div>

                        <div className="btn-right">
                            <Button onClick={chooseImage} style={{width:"100%"}}>
                                <PictureOutlined />
                                Ảnh Bìa
                            </Button>
                            <div id="modal-picture" className="modal-member isHide">
                                <button onClick={btnCloseImageOnClick} className="btnClose">X</button>
                                <center style={{marginTop:"7px", fontSize:"14px"}}>Ảnh bìa</center>
                                <hr width="90%" />
                                
                                <div className="title-member-board">Tệp Đính Kèm</div>
                                
                                <input onChange={imageOnChange} style={{marginLeft:"13px"}} type="file" accept="image/*"/>
                                <Button onClick={btnUploadImageOnClick} style={{width:"90%",margin:"20px 0 0 13px"}}>Upload</Button>
                                <img className={(image.name||image=="")?"isHide":""} style={{width:"150px",height:"150px",margin:"10px 0 0 40px"}} src={(image)?image:""} />
                                <Button type="primary" style={{width:"90%", margin:"10px 0 0 13px"}}>OK</Button>
                            </div>
                        </div>
                    </div>
                </div>
            {/* </Modal>           */}
       
        </>
    )
}

export default Task;